package main

import (
	"bytes"
	"net/http"
)

type closeable struct {
	*bytes.Reader
}

func (c *closeable) Close() error {
	return nil
}

type writer struct {
	header http.Header
	body   []byte
	status int
}

func (w *writer) Header() http.Header {
	return w.header
}

func (w *writer) Write(b []byte) (int, error) {
	w.body = append(w.body, b...)
	return len(b), nil
}

func (w *writer) WriteHeader(statusCode int) {
	w.status = statusCode
}
