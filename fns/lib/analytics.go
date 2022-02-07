//https://pkg.go.dev/github.com/aws/aws-sdk-go-v2/service/cloudwatchlogs#FilterLogEventsInput
package lib

import (
	"context"
	"encoding/json"
	"os"
	"sort"
	"strings"
	"time"

	"github.com/aws/aws-sdk-go-v2/aws"
	"github.com/aws/aws-sdk-go-v2/config"
	"github.com/aws/aws-sdk-go-v2/service/cloudwatchlogs"
)

type rankedItem struct {
	Name  string `json:"name"`
	Value int    `json:"value"`
}
type analyticsOutput struct {
	StartDate          time.Time    `json:"startDate"`
	EndDate            time.Time    `json:"endDate"`
	TotalHits          int          `json:"totalHits"`
	UniqueVisitors     int          `json:"uniqueVisitors"`
	Sessions           int          `json:"sessions"`
	AvgPagesPerSession float64      `json:"avgPagesPerSession"`
	TopReferers        []rankedItem `json:"topReferers"`
	TopUserAgents      []rankedItem `json:"topUserAgents"`
	TopPages           []rankedItem `json:"topPages"`
}

var bots = []string{
	"Googlebot",
	"AhrefsBot",
	"curl",
	"PetalBot",
}

func getEvents(start, end time.Time) ([]pingEvent, error) {
	cfg, err := config.LoadDefaultConfig(context.TODO())
	if err != nil {
		return nil, err
	}

	client := cloudwatchlogs.NewFromConfig(cfg)

	var nextPage *string = nil
	var firstRun = true
	collector := make([]pingEvent, 0)

	for nextPage != nil || firstRun {
		firstRun = false
		results, err := client.FilterLogEvents(context.TODO(), &cloudwatchlogs.FilterLogEventsInput{
			LogGroupName:  aws.String("/aws/lambda/johnjonesfour-dot-com-prod-ping"),
			EndTime:       aws.Int64(end.UnixNano() / int64(time.Millisecond)),
			StartTime:     aws.Int64(start.UnixNano() / int64(time.Millisecond)),
			FilterPattern: aws.String("PING"),
			NextToken:     nextPage,
		})
		if err != nil {
			return nil, err
		}
		for _, event := range results.Events {
			str := (*event.Message)[6:]
			var pe pingEvent
			err = json.Unmarshal([]byte(str), &pe)
			if err != nil {
				return nil, err
			}
			collector = append(collector, pe)
		}
		nextPage = results.NextToken
	}
	return collector, nil
}

func RunAndFormatAnalytics(start, end time.Time) (string, error) {
	a, e := RunAnalytics(start, end)
	if e != nil {
		return "", e
	}
	return formatReport(a)
}

func RunAnalytics(start, end time.Time) (analyticsOutput, error) {
	events, err := getEvents(start, end)
	if err != nil {
		return analyticsOutput{}, err
	}

	referers := make(map[string][]pingEvent)
	userAgents := make(map[string][]pingEvent)
	pages := make(map[string][]pingEvent)

	userMap := make(map[string]map[string][]pingEvent)
	sessions := 0
	validevents := 0
	for _, event := range events {
		if ua, ok := event.Request.Headers["User-Agent"]; ok && !deepContains(bots, ua) {
			if ip, ok1 := event.Request.Headers["X-Forwarded-For"]; ok1 && !strings.Contains(ip, os.Getenv("MY_IP")) {
				validevents++

				if _, ok := userMap[event.User]; !ok {
					userMap[event.User] = make(map[string][]pingEvent)
				}
				if _, ok := userMap[event.User][event.Session]; !ok {
					userMap[event.User][event.Session] = make([]pingEvent, 0)
					sessions++
				}

				userMap[event.User][event.Session] = append(userMap[event.User][event.Session], event)

				referers = upsert(referers, event.Info.Referer, event)
				pages = upsert(pages, event.Info.URL, event)
				userAgents = upsert(userAgents, ua, event)
			}
		}
	}

	pagesTotal := 0
	for _, userSessions := range userMap {
		for _, userSession := range userSessions {
			pagesTotal += len(userSession)
		}
	}

	return analyticsOutput{
		StartDate:          start,
		EndDate:            end,
		TotalHits:          validevents,
		UniqueVisitors:     len(userMap),
		Sessions:           sessions,
		AvgPagesPerSession: float64(pagesTotal) / float64(sessions),
		TopReferers:        mapToList(referers),
		TopUserAgents:      mapToList(userAgents),
		TopPages:           mapToList(pages),
	}, nil
}

func deepContains(l []string, v string) bool {
	for _, lv := range l {
		if strings.Contains(v, lv) {
			return true
		}
	}
	return false
}

func mapToList(m map[string][]pingEvent) []rankedItem {
	l := make([]rankedItem, len(m))
	i := 0
	for name, pings := range m {
		l[i] = rankedItem{
			Name:  name,
			Value: len(pings),
		}
		i++
	}

	sort.Slice(l, func(a, b int) bool {
		return l[a].Value > l[b].Value
	})

	if len(l) < 50 {
		return l
	}

	return l[:50]
}

func upsert(m map[string][]pingEvent, key string, event pingEvent) map[string][]pingEvent {
	if _, ok := m[key]; !ok {
		m[key] = []pingEvent{event}
	} else {
		m[key] = append(m[key], event)
	}
	return m
}
