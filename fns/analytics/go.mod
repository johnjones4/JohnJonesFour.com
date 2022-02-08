module main

go 1.16

require (
	github.com/aws/aws-lambda-go v1.28.0
	github.com/aws/aws-sdk-go-v2/service/ses v1.12.0 // indirect
	github.com/johnjones4/JohnJonesFour.com/fns/lib v0.0.0-00010101000000-000000000000
)

replace github.com/johnjones4/JohnJonesFour.com/fns/lib => ../lib
