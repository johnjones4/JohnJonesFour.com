package main

import (
	"bytes"
	"context"
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

	router.Post("/api/contact", contactHandler)
}

func handler(request events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {
	if router == nil {
		initMux()
	}

	bodyBytes := []byte(request.Body)
	req := &http.Request{
		Method: request.HTTPMethod,
		URL: &url.URL{
			Path: request.Path,
		},
		Header: request.MultiValueHeaders,
		Body: &closeable{
			Reader: bytes.NewReader(bodyBytes),
		},
		ContentLength: int64(len(bodyBytes)),
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
