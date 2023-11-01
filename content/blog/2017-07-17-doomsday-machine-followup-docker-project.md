---

title:  "Doomsday Machine Followup: Docker Project"
description: "Doomsday Machine is a tool for backing up cloud services to a local machine. This project is a followup to a Node.js project I started in April. While that project worked well, I wasn't happy with the code's performance and lack of support, being that the project was just my code. Instead, I've constructed this project which is really just an amalgamation of others' great projects."
githubs:
- "johnjones4/Doomsday-Machine-2"
background_image: doomsdaymachine.jpg
---

Doomsday Machine is a tool for backing up cloud services to a local machine. This project is a followup to a Node.js project I started in April. While that project worked well, I wasn't happy with the code's performance and lack of support, being that the project was just my code. Instead, I've constructed this project which is really just an amalgamation of others' great projects.

With a rising threat of ransomware and other data-crippling threats, backups are indispensable. While cloud services, by their nature, are extremely stable and backed-up often, there is still the threat that a malicious entity could compromise or corrupt those services.

To help curb that threat, I’ve created Doomsday Machine, a tool that backs up a user’s cloud service data to a local machine in a generally accessible format. It supports cloud file services such as Dropbox and Google Drive, IMAP Email, Google Contacts, LastPass, Evernote, GitHub, and Todoist. I recommend this backup be run on a separate machine that is dedicated to the backup task so that should the primary machine be compromised, the backups are safe elsewhere.

For my purposes, I am using an old Dell PowerEdge 1950 that was sitting unused. I picked up two 1TB 2.5 inch SATA drives with drive caddies, configured them to run in RAID 0, and installed CentOS 7. An actual server like I’ve used here is not required, but it was available for me at the time of writing.

To learn how to setup Doomsday Machine to backup your services, check out the project's [page on GitHub](https://github.com/johnjones4/Doomsday-Machine-2).
