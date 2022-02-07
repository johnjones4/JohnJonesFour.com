package lib

import (
	"bytes"
	"fmt"
	"html/template"
	"time"
)

type metric struct {
	Key   string
	Value string
}

type table struct {
	Title  string
	Values []rankedItem
}

type analyticsReportTemplateVar struct {
	StartDate  time.Time
	EndDate    time.Time
	KeyMetrics []metric
	Tables     []table
}

func formatReport(a analyticsOutput) (string, error) {
	t, err := template.ParseFiles("../lib/analytics_report.html")
	if err != nil {
		return "", err
	}

	tv := analyticsReportTemplateVar{
		StartDate: a.StartDate,
		EndDate:   a.EndDate,
		KeyMetrics: []metric{
			{
				Key:   "Total Hits",
				Value: fmt.Sprint(a.TotalHits),
			},
			{
				Key:   "Unique Visitors",
				Value: fmt.Sprint(a.UniqueVisitors),
			},
			{
				Key:   "Sessions",
				Value: fmt.Sprint(a.Sessions),
			},
			{
				Key:   "Average Pages Per Session",
				Value: fmt.Sprint(a.AvgPagesPerSession),
			},
		},
		Tables: []table{
			{
				Title:  "Top Pages",
				Values: a.TopPages,
			},
			{
				Title:  "Top Referers",
				Values: a.TopReferers,
			},
			{
				Title:  "Top User Agents",
				Values: a.TopUserAgents,
			},
		},
	}

	buf := bytes.NewBuffer([]byte{})
	err = t.Execute(buf, tv)
	if err != nil {
		return "", err
	}
	return buf.String(), nil
}
