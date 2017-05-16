---
layout: post
title:  "Backing Up Cloud Services With Doomsday Machine"
description: "With a rising threat of ransomware and other data-crippling threats, backups are indispensable. While cloud services, by their nature, are extremely stable and backed-up often, there is still the threat that a malicious entity could compromise or corrupt those services."
githubs:
- "johnjones4/Doomsday-Machine"
background_image: doomsdaymachine.jpg
---

With a rising threat of ransomware and other data-crippling threats, backups are indispensable. While cloud services, by their nature, are extremely stable and backed-up often, there is still the threat that a malicious entity could compromise or corrupt those services.

To help curb that threat, I've created [*Doomsday Machine*](https://github.com/johnjones4/Doomsday-Machine), a tool that backs up a user's cloud service data to a local machine in a generally accessible format. It supports Dropbox, Google Drive, IMAP Email, Google Contacts, LastPass, Evernote, GitHub, and Todoist. I recommend this backup be run on a separate machine that is dedicated to the backup task so that should the primary machine be compromised, the backups are safe elsewhere.

Below is how I've setup *Doomsday Machine* for my own purposes:

### The Computer

![Backup server](/img/doomsdaymachine_server.jpg){: .img-responsive}

For my purposes, I had an old Dell PowerEdge 1950 sitting unused. So I picked up two 1TB 2.5 inch SATA drives and with drive caddies and installed CentOS 7. An actual server like I've used here is not required, but it was available for me at the time of writing.

### Docker

To run the service on the machine, I set it up to run containerized using Docker Compose. For those unfamiliar with containerization, check out [Docker's great guide](https://www.docker.com/what-docker).

The `docker-compose.yml` file I use is below with a few notes:

* The Git project for *Doomsday Machine* is in a directory next to this file named doomsdaymachine.
* The file mysql.env contains the variables for MYSQL_USER, MYSQL_PASSWORD, MYSQL_DATABASE, and MYSQL_ROOT_PASSWORD.
* The file vars.env contains all other variables list on the [readme](https://github.com/johnjones4/Doomsday-Machine/blob/master/Readme.md).
* The directory /var/backup on the container is mapped to /var/backup on the host machine. Make sure to create the directory on the host machine.

```yaml
version: '2'

services:
  mysql:
    image: mysql
    volumes:
      - mysql:/var/lib/mysql/
    ports:
      - "3306:3306"
    env_file:
      - ./mysql.env
  doomsdaymachine:
    build: ./doomsdaymachine
    links:
      - "mysql:mysql"
    ports:
      - "8000:8000"
    volumes:
      - "./doomsdaymachine:/src/app"
      - "/var/backup:/var/backup"
    env_file:
      - ./mysql.env
      - ./vars.env
    command: "app/start.sh"
    restart: always

volumes:
  mysql:
```

Also, the Dockerfile inside `./doomsdaymachine` is:

```
FROM node:6.9.4

RUN apt-get update && apt-get install -y netcat
RUN mkdir /src
WORKDIR /src
ADD package.json package.json
RUN npm install
```

And, there is an additional file in `./doomsdaymachine` that is the entry executable for the container named `start.sh`. It waits for the MySQL server to become available before starting note. Make sure to make the file executable by running `chome +x ./doomsdaymachine/start.sh`.

```
#!/bin/bash
echo ">> Waiting for MySQL to start"
WAIT=0
while ! netcat -z mysql 3306; do
  sleep 1
  WAIT=$(($WAIT + 1))
  if [ "$WAIT" -gt 600 ]; then
    echo "Error: Timeout waiting for MySQL to start"
    exit 1
  fi
done
node /src/app/index.js
```

To start it all up, simply run `docker-compose build` and `docker-compose up -d`.

### Configuration

![Doomsday Machine screenshot](https://raw.githubusercontent.com/johnjones4/Doomsday-Machine/master/screenshot.png){: .img-responsive}

With the system up and running, it's time to configure each service. Depending upon server configurations, the URL for the service will be different, but if when running it on a local machine at the default port, the URL will be http://localhost:8000.

To create new backup service, click the *+ Add Service* button in the upper right-hand corner of the screen and choose a service to add. Each service's setup page contains brief instructions on how to configure it. Most service rely on some sort of OAuth credentials that vary by provider. After the configuration of a new service, it's backup will begin during the system's next backup sweep.
