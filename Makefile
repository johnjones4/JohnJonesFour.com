.PHONY:

publish: content deploy-site

content: .PHONY
	rm -rf site/public/data || true
	cd content && node index.js
	mv content/outdata site/public/data

build-fns:
	rm -rf fns/bin || true
	cd fns/contact && GOOS=linux go build -ldflags="-s -w" -o ../bin/contact
	cd fns/get_nonce && GOOS=linux go build -ldflags="-s -w" -o ../bin/get_nonce
	cd fns/ping && GOOS=linux go build -ldflags="-s -w" -o ../bin/ping
	cd fns/analytics && GOOS=linux go build -ldflags="-s -w" -o ../bin/analytics

deploy-fns: build-fns
	cd fns && ./node_modules/serverless/bin/serverless.js deploy --verbose --force

build-site:
	cd site && npm run build

deploy-site: build-site
	cd site && aws s3 sync build/. s3://johnjonesfour.com --acl public-read
	aws cloudfront create-invalidation --distribution-id EP9VBRV46T1UC --paths '/*'

provision-bot-role:
	aws cloudformation update-stack --stack-name johnjonesfourdotcom-bot --template-body file://bot_role.yml  --capabilities  CAPABILITY_NAMED_IAM

install:
	cd content && npm install
	cd fns && npm install
	cd fns/lib && go get .
	cd fns/contact && go get .
	cd fns/get_nonce && go get .
	cd fns/ping && go get .
	cd fns/analytics && go get .
	cd site && npm install
