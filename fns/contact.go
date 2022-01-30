package main

import (
	"context"
	"encoding/json"
	"fmt"
	"os"
	"strings"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
	"github.com/aws/aws-sdk-go-v2/aws"
	"github.com/aws/aws-sdk-go-v2/config"
	"github.com/aws/aws-sdk-go-v2/service/sns"
)

type contactInput struct {
	Name    string `json:"name"`
	Subject string `json:"subject"`
	Email   string `json:"email"`
	Message string `json:"message"`
}

func Handler(request events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {
	var input contactInput
	err := json.Unmarshal([]byte(request.Body), &input)
	if err != nil {
		return events.APIGatewayProxyResponse{}, err
	}

	msgs := map[string]string{
		"From":    input.Name,
		"Subject": input.Subject,
		"Email":   input.Email,
		"Message": input.Message,
	}
	msg := strings.Builder{}
	for key, value := range msgs {
		msg.WriteString(fmt.Sprintf("%s: %s", key, value))
	}

	cfg, err := config.LoadDefaultConfig(context.TODO())
	if err != nil {
		return events.APIGatewayProxyResponse{}, err
	}

	client := sns.NewFromConfig(cfg)

	_, err = client.Publish(context.TODO(), &sns.PublishInput{
		Message:  aws.String(msg.String()),
		TopicArn: aws.String(os.Getenv("SNS_TOPIC_ARN")),
	})
	if err != nil {
		return events.APIGatewayProxyResponse{}, err
	}

	return events.APIGatewayProxyResponse{
		StatusCode: 200,
		Body:       "ok",
		Headers: map[string]string{
			"Content-type": "text/plain",
		},
	}, nil

}

func main() {
	lambda.Start(Handler)
}
