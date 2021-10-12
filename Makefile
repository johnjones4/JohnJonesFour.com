install:
	docker run --volume $(shell pwd):/usr/src/app --workdir /usr/src/app node:14 /usr/local/bin/npm install

run:
	docker run --volume $(shell pwd):/usr/src/app --workdir /usr/src/app node:14 /usr/local/bin/npm start
