package main

import (
	"fmt"
	"time"

	"github.com/johnjones4/JohnJonesFour.com/fns/lib"
)

func main() {
	now := time.Now()
	report, err := lib.RunAndFormatAnalytics(now.Add(time.Hour*24*7*-1), now)
	fmt.Println(report)
	if err != nil {
		panic(err)
	}
}
