---
layout: post
title:  "New Node.js Package: Mongoosey"
links:
- src: "https://www.npmjs.com/package/mongoosey"
  name: "NPM"
description: "A simple Mongoose frontend that can be built into a pre-existing Express application."
githubs:
- "johnjones4/Mongoosey"
---

This is a simple Mongoose frontend that can be built into a pre-existing Express application.

## Installation and Usage

To add Mongoosey to a project, first install the npm package:

```
# npm install --save mongoosey
```

Then, pass your express app to Mongoosey:

```
var mongoosey = require('mongoosey');
mongoosey.set('app',app);
```

For a full example, take a look at [demo.js](https://github.com/johnjones4/Mongoosey/blob/master/demo.js).

After that, Mongoosey will setup routes under `/db` to manage all defined Mongoose models. For instance, if there is a model named _User_, Mongoosey will setup the following pages to manage it:

* **/db/User** - Lists all MongoDB documents in the collection associated with that model
* **/db/User/new** - Creates a new instance of that model for editing
* **/db/User/_ObjectId_** - Displays the object with that ObjectId for editing

To add a layer of security, simply add a route handler to Mongoosey similar to a Connect app:

```
mongoosey.use(function(req,res,next) {
  // Authorization logic via HTTP authentication or session validation ...
});
```
