---
layout: project
title: "Backup Tool"
githubs:
- "johnjones4/BackupTool"
- "johnjones4/BackupTool-Mac-Status"
description: "I wasn't impressed with the open-source Glacier backup tools out there, so I'm implementing my tool own in Node.js along with a Mac status bar application."
type: minor
links:
- src: "/download/BackupToolStatus.zip"
  name: "Download Mac App"
- src: "https://www.npmjs.com/package/backuptool"
  name: "NPM"
---

I wasn't impressed with the open-source Glacier backup tools out there, so I'm implementing my own in Node.js. There are more than a few open-source backup tool options out there, but I just wasn't happy with them. I wanted something that worked with Amazon Glacier and worked on a variety of platforms with or without a GUI.

Nothing out there seemed to fit those requirements, so I'm creating one called Backup Tool. The tool uses a JSON file to store configuration options for directories to backup, destination information, and AWS authentication information. The core backup functionality is running stably on my Mac, and next I'll be rolling it out to another Fedora machine I have. After that, I plan to go back and write an interactive installer that builds the configuration file and sets up scheduling. (That is all manual right now.) Possibly after that I will look at some GUI options.

The Mac status bar app is not a separate implementation of BackupTool. Rather, it is a tool to monitor the status of BackupTool's progress in the Mac OSX status bar.
