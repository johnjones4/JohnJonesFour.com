package lib

import (
	"encoding/json"
	"fmt"
	"net/http"
	"os"
	"time"

	"github.com/aws/aws-lambda-go/events"
	"github.com/google/uuid"
)

type pingInfo struct {
	URL     string `json:"url"`
	Referer string `json:"referer"`
}

type pingEvent struct {
	Timestamp time.Time                     `json:"timestamp"`
	Request   events.APIGatewayProxyRequest `json:"request"`
	User      string                        `json:"user"`
	Session   string                        `json:"session"`
	Info      pingInfo                      `json:"info"`
}

const userCookieName = "jj4uid"
const sessionCookieName = "jj4ses"

func PingHandler(request events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {
	var info pingInfo
	err := json.Unmarshal([]byte(request.Body), &info)
	if err != nil {
		return events.APIGatewayProxyResponse{}, err
	}

	response := events.APIGatewayProxyResponse{
		StatusCode:        200,
		Body:              "",
		MultiValueHeaders: make(map[string][]string),
	}

	cookies := readCookies(request.MultiValueHeaders, "")

	userId := ""
	sesId := ""
	for _, cookie := range cookies {
		if cookie.Name == userCookieName {
			userId = cookie.Value
		} else if cookie.Name == sessionCookieName {
			sesId = cookie.Value
		}
	}

	if sesId == "" {
		sesId = uuid.NewString()
	}

	cookie := http.Cookie{
		Name:    sessionCookieName,
		Value:   sesId,
		Path:    "/",
		Domain:  os.Getenv("DOMAIN"),
		Expires: time.Now().UTC().Add(time.Hour),
	}
	response.MultiValueHeaders["Set-Cookie"] = []string{cookie.String()}

	if userId == "" {
		userId = uuid.NewString()
		cookie := http.Cookie{
			Name:    userCookieName,
			Value:   userId,
			Path:    "/",
			Domain:  os.Getenv("DOMAIN"),
			Expires: time.Now().UTC().Add(time.Hour * 24 * 365 * 100),
		}
		response.MultiValueHeaders["Set-Cookie"] = append(response.MultiValueHeaders["Set-Cookie"], cookie.String())
	}

	e := pingEvent{
		Timestamp: time.Now().UTC(),
		Request:   request,
		User:      userId,
		Session:   sesId,
		Info:      info,
	}

	bytes, err := json.Marshal(e)
	if err != nil {
		return events.APIGatewayProxyResponse{}, err
	}

	fmt.Printf("PING: %s\n", string(bytes))

	return response, nil
}
