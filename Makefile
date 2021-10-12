install:
	docker run --volume $(shell pwd):/usr/src/app --workdir /usr/src/app node:14 /usr/local/bin/npm install

run:
	docker run -p 8000:8000 --volume $(shell pwd):/usr/src/app --workdir /usr/src/app node:14 /usr/local/bin/npm start
