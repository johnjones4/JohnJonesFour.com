// package lib
package main

import (
	"fmt"
	"net/http"
	"strings"
	"time"

	"github.com/aws/aws-sdk-go-v2/aws"
	"github.com/aws/aws-sdk-go-v2/config"
	"github.com/aws/aws-sdk-go-v2/service/sns"

	"github.com/go-jose/go-jose/v3/jwt"
)

const contactBody = "<html><body><script>setTimeout(() => window.location.assign('/contact/thankyou'), 100)</script></body></html>"

func contactHandler(w http.ResponseWriter, r *http.Request) {
	err := r.ParseForm()
	if err != nil {
		log.Error(err)
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	nonce := r.FormValue("nonce")
	token := r.FormValue("token")

	tok, err := jwt.ParseSigned(token)
	if err != nil {
		log.Error(err)
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	out := jwt.Claims{}
	if err := tok.Claims(nonceKey, &out); err != nil {
		log.Error(err)
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	err = out.Validate(jwt.Expected{
		Subject: nonce,
		Issuer:  nonceIssuer,
		Time:    time.Now(),
	})
	if err := tok.Claims(nonceKey, &out); err != nil {
		log.Error(err)
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	msgs := map[string]string{
		"Subject": r.FormValue("subject"),
		"Email":   r.FormValue("email"),
		"Message": r.FormValue("message"),
	}
	msg := strings.Builder{}
	for key, value := range msgs {
		msg.WriteString(fmt.Sprintf("%s: %s\n\n", key, value))
	}

	cfg, err := config.LoadDefaultConfig(r.Context())
	if err != nil {
		log.Error(err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	client := sns.NewFromConfig(cfg)

	var nextToken *string = nil
	topicArn := ""

	for topicArn == "" {
		listInput := &sns.ListTopicsInput{}
		if nextToken != nil {
			listInput.NextToken = nextToken
		}
		results, err := client.ListTopics(r.Context(), listInput)
		if err != nil {
			log.Error(err)
			w.WriteHeader(http.StatusInternalServerError)
			return
		}

		for _, result := range results.Topics {
			if strings.HasSuffix(*result.TopicArn, "contact") {
				topicArn = *result.TopicArn
			}
		}

		nextToken = results.NextToken
	}

	_, err = client.Publish(r.Context(), &sns.PublishInput{
		Message:  aws.String(msg.String()),
		TopicArn: aws.String(topicArn),
	})
	if err != nil {
		log.Error(err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-type", "text/html")
	w.Write([]byte(contactBody))
}
