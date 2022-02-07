package main

import (
	"time"

	"github.com/johnjones4/JohnJonesFour.com/fns/lib"
)

func main() {
	now := time.Now()
	_, err := lib.RunAnalytics(now.Add(time.Hour*24*7-1), now)
	if err != nil {
		panic(err)
	}
}
