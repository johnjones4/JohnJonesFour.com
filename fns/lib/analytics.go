//https://pkg.go.dev/github.com/aws/aws-sdk-go-v2/service/cloudwatchlogs#FilterLogEventsInput
package lib

import (
	"context"
	"log"
	"time"

	"github.com/aws/aws-sdk-go-v2/aws"
	"github.com/aws/aws-sdk-go-v2/config"
	"github.com/aws/aws-sdk-go-v2/service/cloudwatchlogs"
	"github.com/aws/aws-sdk-go-v2/service/cloudwatchlogs/types"
)

type rankedItem struct {
	Name  string `json:"name"`
	Value int    `json:"value"`
}
type analyticsOutput struct {
	TotalVisitors      int          `json:"totalVisitors"`
	UniqueVisitors     int          `json:"uniqueVisitors"`
	Sessions           int          `json:"sessions"`
	AvgPagesPerSession float64      `json:"avgPagesPerSession"`
	TopReferers        []rankedItem `json:"topReferers"`
	TopUserAgents      []rankedItem `json:"topUserAgents"`
}

func getEvents(start, end time.Time) ([]types.FilteredLogEvent, error) {
	cfg, err := config.LoadDefaultConfig(context.TODO())
	if err != nil {
		return nil, err
	}

	client := cloudwatchlogs.NewFromConfig(cfg)

	var nextPage *string = nil
	var firstRun = true
	collector := make([]types.FilteredLogEvent, 0)

	for nextPage != nil || firstRun {
		firstRun = false
		results, err := client.FilterLogEvents(context.TODO(), &cloudwatchlogs.FilterLogEventsInput{
			LogGroupName:  aws.String("/aws/lambda/johnjonesfour-dot-com-prod-ping"),
			EndTime:       aws.Int64(end.Unix()),
			StartTime:     aws.Int64(start.Unix()),
			FilterPattern: aws.String("PING"),
			NextToken:     nextPage,
		})
		if err != nil {
			return nil, err
		}
		collector = append(collector, results.Events...)
		nextPage = results.NextToken
	}
	return collector, nil
}

func RunAnalytics(start, end time.Time) (analyticsOutput, error) {
	events, err := getEvents(start, end)
	if err != nil {
		return analyticsOutput{}, err
	}
	log.Println(events)
	return analyticsOutput{}, err
}
