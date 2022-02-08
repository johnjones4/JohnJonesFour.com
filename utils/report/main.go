package main

import (
	"flag"
	"os"
	"time"

	"github.com/johnjones4/JohnJonesFour.com/fns/lib"
)

const (
	dateFormat = "2006-01-02"
)

func main() {
	var startStr string
	var endStr string
	var outputFile string

	flag.StringVar(&startStr, "start", "", "Report start date")
	flag.StringVar(&endStr, "end", "", "Report end date")
	flag.StringVar(&outputFile, "output", "./report.html", "Report end date")

	flag.Parse()

	start, err := time.Parse(dateFormat, startStr)
	if err != nil {
		panic(err)
	}

	var end time.Time
	if endStr != "" {
		end, err = time.Parse(dateFormat, endStr)
		if err != nil {
			panic(err)
		}
	} else {
		end = time.Now()
	}

	report, err := lib.RunAndFormatAnalytics(start, end)
	if err != nil {
		panic(err)
	}

	os.WriteFile(outputFile, []byte(report), 0777)
}
