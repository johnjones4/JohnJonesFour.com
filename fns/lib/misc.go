package lib

type Response struct {
	Ok      bool   `json:"ok"`
	Message string `json:"message"`
}

var NormalHeaders = map[string]string{
	"Content-type": "application/json",
}
