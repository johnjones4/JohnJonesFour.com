package lib

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"
	"strings"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-sdk-go-v2/aws"
	"github.com/aws/aws-sdk-go-v2/config"
	"github.com/aws/aws-sdk-go-v2/service/sns"
)

type contactInput struct {
	Name    string `json:"name"`
	Subject string `json:"subject"`
	Email   string `json:"email"`
	Message string `json:"message"`
	Nonce   string `json:"nonce"`
}

func ContactHandler(request events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {
	if val, ok := request.Headers["content-type"]; !ok || val != "application/json" {
		bytes, _ := json.Marshal(Response{
			Ok:      false,
			Message: "Unsupported content type",
		})
		return events.APIGatewayProxyResponse{
			StatusCode: http.StatusBadRequest,
			Body:       string(bytes),
			Headers:    NormalHeaders,
		}, nil
	}

	var input contactInput
	err := json.Unmarshal([]byte(request.Body), &input)
	if err != nil {
		return events.APIGatewayProxyResponse{}, err
	}

	ok, err := verifyNonce(request, input.Nonce)
	if err != nil {
		return events.APIGatewayProxyResponse{}, err
	}
	if !ok {
		bytes, _ := json.Marshal(Response{
			Ok:      false,
			Message: "Bad nonce",
		})
		return events.APIGatewayProxyResponse{
			StatusCode: http.StatusBadRequest,
			Body:       string(bytes),
			Headers:    NormalHeaders,
		}, nil
	}

	msgs := map[string]string{
		"From":    input.Name,
		"Subject": input.Subject,
		"Email":   input.Email,
		"Message": input.Message,
	}
	msg := strings.Builder{}
	for key, value := range msgs {
		msg.WriteString(fmt.Sprintf("%s: %s\n\n", key, value))
	}

	cfg, err := config.LoadDefaultConfig(context.TODO())
	if err != nil {
		return events.APIGatewayProxyResponse{}, err
	}

	client := sns.NewFromConfig(cfg)

	var nextToken *string = nil
	topicArn := ""

	for topicArn == "" {
		listInput := &sns.ListTopicsInput{}
		if nextToken != nil {
			listInput.NextToken = nextToken
		}
		results, err := client.ListTopics(context.TODO(), listInput)
		if err != nil {
			return events.APIGatewayProxyResponse{}, err
		}

		for _, result := range results.Topics {
			if strings.HasSuffix(*result.TopicArn, "contact") {
				topicArn = *result.TopicArn
			}
		}

		nextToken = results.NextToken
	}

	_, err = client.Publish(context.TODO(), &sns.PublishInput{
		Message:  aws.String(msg.String()),
		TopicArn: aws.String(topicArn),
	})
	if err != nil {
		return events.APIGatewayProxyResponse{}, err
	}

	bytes, _ := json.Marshal(Response{
		Ok:      true,
		Message: "",
	})

	return events.APIGatewayProxyResponse{
		StatusCode: http.StatusOK,
		Body:       string(bytes),
		Headers:    NormalHeaders,
	}, nil

}
