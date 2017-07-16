---
layout: project
title: "Doomsday Machine"
github: "johnjones4/Doomsday-Machine"
description: "Doomsday Machine is a tool for backing up cloud services to a local machine."
type: minor
---

Doomsday Machine is a tool for backing up cloud services to a local machine. It syncs all content to a local directory in non-vendor-specific file formats. (Whenever possible, it opts for formats such as .html, .csv, etc.) It requires a MySQL database to store backup configurations and object metadata. All configuration data is encrypted at rest, but metadata is not. Also, all backup archives are encrypted at rest, but the backup work directory is not.
