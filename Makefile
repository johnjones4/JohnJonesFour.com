.PHONY:

content: .PHONY
	rm -rf site/public/data || true
	cd content && node index.js
	mv content/outdata site/public/data

build-fns:
	rm -rf fns/bin || true
	cd fns/contact && GOOS=linux go build -ldflags="-s -w" -o ../bin/contact
	cd fns/get_nonce && GOOS=linux go build -ldflags="-s -w" -o ../bin/get_nonce

deploy-fns: build-fns
	cd fns && sls deploy --verbose --force

deploy-site:
	cd site && npm run build
	cd site && aws s3 sync build/. s3://johnjonesfour.com
	aws cloudfront create-invalidation --distribution-id EP9VBRV46T1UC --paths '/*'
