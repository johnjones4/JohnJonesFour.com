package lib

import (
	"net"
	"net/http"
	"net/textproto"
	"strings"
	"time"

	"golang.org/x/net/http/httpguts"
)

func readCookies(h http.Header, filter string) []*http.Cookie {
	lines := h["Cookie"]
	if len(lines) == 0 {
		return []*http.Cookie{}
	}

	cookies := make([]*http.Cookie, 0, len(lines)+strings.Count(lines[0], ";"))
	for _, line := range lines {
		line = textproto.TrimString(line)

		var part string
		for len(line) > 0 { // continue since we have rest
			if splitIndex := strings.Index(line, ";"); splitIndex > 0 {
				part, line = line[:splitIndex], line[splitIndex+1:]
			} else {
				part, line = line, ""
			}
			part = textproto.TrimString(part)
			if len(part) == 0 {
				continue
			}
			name, val := part, ""
			if j := strings.Index(part, "="); j >= 0 {
				name, val = name[:j], name[j+1:]
			}
			if !isCookieNameValid(name) {
				continue
			}
			if filter != "" && filter != name {
				continue
			}
			val, ok := parseCookieValue(val, true)
			if !ok {
				continue
			}
			cookies = append(cookies, &http.Cookie{Name: name, Value: val})
		}
	}
	return cookies
}

// validCookieDomain reports whether v is a valid cookie domain-value.
func validCookieDomain(v string) bool {
	if isCookieDomainName(v) {
		return true
	}
	if net.ParseIP(v) != nil && !strings.Contains(v, ":") {
		return true
	}
	return false
}

// validCookieExpires reports whether v is a valid cookie expires-value.
func validCookieExpires(t time.Time) bool {
	// IETF RFC 6265 Section 5.1.1.5, the year must not be less than 1601
	return t.Year() >= 1601
}

// isCookieDomainName reports whether s is a valid domain name or a valid
// domain name with a leading dot '.'.  It is almost a direct copy of
// package net's isDomainName.
func isCookieDomainName(s string) bool {
	if len(s) == 0 {
		return false
	}
	if len(s) > 255 {
		return false
	}

	if s[0] == '.' {
		// A cookie a domain attribute may start with a leading dot.
		s = s[1:]
	}
	last := byte('.')
	ok := false // Ok once we've seen a letter.
	partlen := 0
	for i := 0; i < len(s); i++ {
		c := s[i]
		switch {
		default:
			return false
		case 'a' <= c && c <= 'z' || 'A' <= c && c <= 'Z':
			// No '_' allowed here (in contrast to package net).
			ok = true
			partlen++
		case '0' <= c && c <= '9':
			// fine
			partlen++
		case c == '-':
			// Byte before dash cannot be dot.
			if last == '.' {
				return false
			}
			partlen++
		case c == '.':
			// Byte before dot cannot be dot, dash.
			if last == '.' || last == '-' {
				return false
			}
			if partlen > 63 || partlen == 0 {
				return false
			}
			partlen = 0
		}
		last = c
	}
	if last == '-' || partlen > 63 {
		return false
	}

	return ok
}

func parseCookieValue(raw string, allowDoubleQuote bool) (string, bool) {
	// Strip the quotes, if present.
	if allowDoubleQuote && len(raw) > 1 && raw[0] == '"' && raw[len(raw)-1] == '"' {
		raw = raw[1 : len(raw)-1]
	}
	for i := 0; i < len(raw); i++ {
		if !validCookieValueByte(raw[i]) {
			return "", false
		}
	}
	return raw, true
}

func isCookieNameValid(raw string) bool {
	if raw == "" {
		return false
	}
	return strings.IndexFunc(raw, isNotToken) < 0
}

func validCookieValueByte(b byte) bool {
	return 0x20 <= b && b < 0x7f && b != '"' && b != ';' && b != '\\'
}

func isNotToken(r rune) bool {
	return !httpguts.IsTokenRune(r)
}
