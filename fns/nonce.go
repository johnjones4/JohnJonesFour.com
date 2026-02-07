package main

import (
	"encoding/json"
	"net/http"
	"os"
	"time"

	"github.com/go-jose/go-jose/v3"
	"github.com/go-jose/go-jose/v3/jwt"
	"github.com/google/uuid"
)

var nonceKey = []byte(os.Getenv("nonceKey"))

const (
	nonceIssuer = "johnjonesfour.com"
)

type nonceResponse struct {
	Token string `json:"token"`
	Nonce string `json:"nonce"`
}

func nonceHandler(w http.ResponseWriter, r *http.Request) {

	sig, err := jose.NewSigner(jose.SigningKey{Algorithm: jose.HS256, Key: nonceKey}, (&jose.SignerOptions{}).WithType("JWT"))
	if err != nil {
		log.Error(err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	cl := jwt.Claims{
		Subject: uuid.NewString(),
		Issuer:  nonceIssuer,
		Expiry:  jwt.NewNumericDate(time.Now().Add(time.Minute * 5)),
	}

	raw, err := jwt.Signed(sig).Claims(cl).CompactSerialize()
	if err != nil {
		log.Error(err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	body, err := json.Marshal(nonceResponse{
		Nonce: cl.Subject,
		Token: raw,
	})
	if err != nil {
		log.Error(err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-type", "application/json")
	w.Write(body)
}
