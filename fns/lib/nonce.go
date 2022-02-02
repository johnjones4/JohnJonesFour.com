package lib

import (
	"bytes"
	"crypto/aes"
	"crypto/cipher"
	"encoding/hex"
	"encoding/json"
	"errors"
	"log"
	"os"
	"strings"
	"time"

	"github.com/aws/aws-lambda-go/events"
)

type nonce struct {
	Timestamp time.Time         `json:"timestamp"`
	Headers   map[string]string `json:"headers"`
}

var (
	key = []byte(os.Getenv("NONCE_KEY"))
	iv  = []byte(os.Getenv("NONCE_IV"))
)

func generateNonce(request events.APIGatewayProxyRequest) (string, error) {
	headers, err := getNonceHeaders(request)
	if err != nil {
		return "", err
	}

	n := nonce{
		Timestamp: time.Now().UTC(),
		Headers:   headers,
	}

	nonceBytes, err := json.Marshal(n)
	if err != nil {
		return "", err
	}

	bPlaintext := pKCS5Padding(nonceBytes, aes.BlockSize, len(nonceBytes))
	block, err := aes.NewCipher(key)
	if err != nil {
		return "", err
	}
	ciphertext := make([]byte, len(bPlaintext))
	mode := cipher.NewCBCEncrypter(block, iv)
	mode.CryptBlocks(ciphertext, bPlaintext)
	str := hex.EncodeToString(ciphertext)

	return str, nil
}

func pKCS5Padding(ciphertext []byte, blockSize int, after int) []byte {
	padding := (blockSize - len(ciphertext)%blockSize)
	padtext := bytes.Repeat([]byte{' '}, padding)
	return append(ciphertext, padtext...)
}

func getNonceHeaders(request events.APIGatewayProxyRequest) (map[string]string, error) {
	userAgent, ok := request.Headers["User-Agent"]
	if !ok {
		return nil, errors.New("missing user agent")
	}

	ips, ok := request.Headers["X-Forwarded-For"]
	if !ok {
		return nil, errors.New("missing ips")
	}
	ipsArr := strings.Split(ips, ", ")
	if len(ipsArr) == 0 {
		return nil, errors.New("bad ip string")
	}

	return map[string]string{
		"userAgent": userAgent,
		"ip":        ipsArr[0],
	}, nil
}

func verifyNonce(request events.APIGatewayProxyRequest, nonceEncr string) (bool, error) {
	cipherTextDecoded, err := hex.DecodeString(nonceEncr)
	if err != nil {
		return false, err
	}

	block, err := aes.NewCipher(key)
	if err != nil {
		return false, err
	}

	mode := cipher.NewCBCDecrypter(block, iv)
	mode.CryptBlocks([]byte(cipherTextDecoded), []byte(cipherTextDecoded))

	trimmed := strings.TrimSpace(string(cipherTextDecoded))
	log.Println(trimmed)

	var n nonce
	err = json.Unmarshal([]byte(trimmed), &n)
	if err != nil {
		if e, ok := err.(*json.SyntaxError); ok {
			log.Printf("syntax error at byte offset %d", e.Offset)
		}
		return false, err
	}

	headers, err := getNonceHeaders(request)
	if err != nil {
		return false, err
	}

	for header, value := range n.Headers {
		found := false
		for header1, value1 := range headers {
			if header == header1 && value == value1 {
				found = true
				break
			}
		}
		if !found {
			return false, nil
		}
	}

	log.Println(time.Since(n.Timestamp) < time.Minute)

	return time.Since(n.Timestamp) < time.Minute, nil
}
