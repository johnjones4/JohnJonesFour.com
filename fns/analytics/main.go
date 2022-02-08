package main

import (
	"time"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
	"github.com/johnjones4/JohnJonesFour.com/fns/lib"
)

func HandleRequest(events.CloudWatchEvent) (string, error) {
	now := time.Now()
	err := lib.RunFormatAndEmailAnalytics(now.Add(time.Hour*24*30*-1), now)
	if err != nil {
		panic(err)
	}
	return "", nil
}

func main() {
	lambda.Start(HandleRequest)
}
