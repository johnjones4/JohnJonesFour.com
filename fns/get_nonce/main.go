package main

import (
	"github.com/aws/aws-lambda-go/lambda"

	"github.com/johnjones4/JohnJonesFour.com/fns/lib"
)

func main() {
	lambda.Start(lib.GetNonceHandler)
}
