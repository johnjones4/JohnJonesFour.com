package lib

import (
	"encoding/json"
	"net/http"

	"github.com/aws/aws-lambda-go/events"
)

type nonceResponse struct {
	Nonce string `json:"nonce"`
}

func GetNonceHandler(request events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {
	nonce, err := generateNonce(request)
	if err != nil {
		return events.APIGatewayProxyResponse{}, err
	}

	response := nonceResponse{
		Nonce: nonce,
	}

	bytes, err := json.Marshal(response)
	if err != nil {
		return events.APIGatewayProxyResponse{}, err
	}

	return events.APIGatewayProxyResponse{
		StatusCode: http.StatusOK,
		Body:       string(bytes),
		Headers:    NormalHeaders,
	}, nil
}
