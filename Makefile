all: deploy-site deploy-fns

build-fns:
	rm -rf fns/bin || true
	cd fns && GOOS=linux go build -ldflags="-s -w" -o ./bin/fns

deploy-fns: build-fns
	cd fns && ./node_modules/serverless/bin/serverless.js deploy --verbose --force

build-site:
	npm run build

deploy-site: build-site
	AWS_PAGER="" aws s3 sync _site/. s3://johnjonesfour.com 
	AWS_PAGER="" aws cloudfront create-invalidation --distribution-id E3TRIT7GNH2EU --paths '/*'

provision-bot-role:
	aws cloudformation update-stack --stack-name johnjonesfourdotcom-bot --template-body file://bot_role.yml --capabilities CAPABILITY_NAMED_IAM

install:
	npm install
	cd fns && npm install
	cd fns && go get .
