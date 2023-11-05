package main

import (
	"bytes"
	"context"
	"encoding/base64"
	"net/http"
	"net/url"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/sirupsen/logrus"
)

var router *chi.Mux
var log = logrus.New()

func initMux() {
	router = chi.NewRouter()
	router.Use(middleware.RequestID)
	router.Use(middleware.RealIP)
	router.Use(middleware.RequestLogger(&middleware.DefaultLogFormatter{Logger: log}))
	router.Use(middleware.Recoverer)

	router.Post("/prod/action/contact", contactHandler)
	router.Get("/prod/action/nonce", nonceHandler)
}

func handler(request events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {
	if router == nil {
		initMux()
	}

	var body []byte
	if request.IsBase64Encoded {
		var err error
		body, err = base64.StdEncoding.DecodeString(request.Body)
		if err != nil {
			return events.APIGatewayProxyResponse{}, err
		}
	} else {
		body = []byte(request.Body)
	}

	req := &http.Request{
		Method: request.HTTPMethod,
		URL: &url.URL{
			Path:     request.Path,
			RawQuery: url.Values(mapValues(request.QueryStringParameters, request.MultiValueQueryStringParameters)).Encode(),
		},
		Header: mapValues(request.Headers, request.MultiValueQueryStringParameters),
		Body: &closeable{
			Reader: bytes.NewReader(body),
		},
		ContentLength: int64(len(body)),
	}
	req = req.WithContext(context.Background())

	res := &writer{
		header: make(http.Header),
		body:   make([]byte, 0),
	}

	router.ServeHTTP(res, req)

	return events.APIGatewayProxyResponse{
		StatusCode:        res.status,
		MultiValueHeaders: res.header,
		Body:              string(res.body),
	}, nil
}

func main() {
	lambda.Start(handler)
}
