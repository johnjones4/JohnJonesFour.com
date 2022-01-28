---
layout: post
title: "Using Webpack to Build Browser Extensions"
description: "This tutorial covers the basic file structure of the project, the Webpack configuration, and how to build the project."
---

The broader Javascript packaging ecosystem has evolved greatly in the
past several years. Tools like Grunt, Gulp, and others have fallen by
the wayside in favor of newer, more robust tools like Webpack and Babel.
Because of that, there exist many a *create-X* toolchains like
[create-react-app](https://reactjs.org/docs/create-a-new-react-app.html) 
and [Vue CLI](https://cli.vuejs.org/) that deliver to user/developers 
easy starting points for using these packaging tools. Yet, there does
not yet seem to be good tooling, or even good examples out there for
how to use Webpack and Babel to build a browser extension. Because of
that, I've compiled a short tutorial outlining how I structure my
browser extension, 
[Standard Notes Web Clipper](https://github.com/johnjones4/Standard-Notes-Clipper).
This tutorial covers the basic file structure of the project, the Webpack
configuration, and how to build the project.

Note that to follow this tutorial, you should have a cursory
understanding of 
[how browser extensions work](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Build_a_cross_browser_extension)
and Webpack. Also, to see all of this in a working example, check out
the link to my extension.

## Project Structure:

When building browser extensions, there are three sets of files that
control the various parts of the extension. Those are:

-   **Background Scripts:** One or more JS files that run in the
    background.
-   **Content Scripts:** One or more JS files that execute in the
    context of a browser tab and can access the DOM.
-   **Configuration:** Usually an HTML file plus one or more JS files to 
    present a user configuration interface.

![Preview of my code](/images/code.png)

Therefore, we structure our project so that each of these three areas of
concerns have their own directory. In addition, we have a `manifest.json`
file that browsers read to configure the extension, and there's also a 
`static` folder for static assets such as images and html files.

```
* src
  * background
    * lib (All imports for background.js)
    * background.js
  * content
    * lib (All imports for content.js)
    * content.css
    * content.js
  * settings
    * lib (All imports for settings.js)
    * settings.css
    * settings.js
  * manifest.json
* static
  * icon16.png
  * icon48.png
  * icon128.png
  * settings
    * index.html
```

Our `manifest.json` files looks something like this:

```json
{
  "manifest_version": 2,
  "name": "",
  "permissions": [
    "activeTab",
    "storage",
    "contextMenus"
  ],
  "icons": {
    "16": "icon16.png",
    "48": "icon48.png",
    "128": "icon128.png"
  },
  "background": {
    "scripts": [
      "background/background.js"
    ],
    "persistent": true
  },
  "content_security_policy": "script-src 'self'; object-src 'self'",
  "content_scripts": [
    {
      "matches": ["http://*/*", "https://*/*"],
      "js": [
        "content/content.js"
      ]
    }
  ],
  "browser_action": {
    "default_title": ""
  },
  "web_accessible_resources": [
    "content/content.css"
  ],
  "options_ui": {
    "page": "settings/index.html",
    "open_in_tab": true
  }
}
```

## Webpack Configuration:

To use this configuration, we need to install the following Node
modules. Note that I've also included a JSX transformer here because my extension's settings use JSX.

`babel-eslint` 
`babel-loader`
`clean-webpack-plugin`
`copy-webpack-plugin`
`css-loader`
`eslint`
`eslint-config-standard`
`eslint-config-standard-preact`
`eslint-plugin-import`
`eslint-plugin-node`
`eslint-plugin-promise`
`eslint-plugin-react`
`eslint-plugin-standard`
`extract-text-webpack-plugin`
`html-webpack-plugin`
`node-sass`
`postcss-loader`
`source-map-loader`
`style-loader`
`transform-json-webpack-plugin`
`web-ext`
`webpack`

In the case of a general Webpack build, there's usually one starting
source file like `index.js` that includes necessary image, CSS, and JS
files, and Webpack outputs a condensed set of files that cover
everything included. However in our case, we need to output three
different classes of files for background, content, and configuration
and all of those classes of files have different source files because
they handle different parts of the extension. All of this is done in a
file titled `webpack.config.js`.

To do this, first we need to set up `webpack.config.js`. (See the final [webpack.config.js file](https://github.com/johnjones4/Standard-Notes-Clipper/blob/master/webpack.config.js).) Now, let's set up some standard resolvers and modules we
can reuse for all the configurations we'll make

```js
const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const TransformJson = require('transform-json-webpack-plugin')
const package = require('./package.json')

const _resolve = {
  extensions: ['.jsx', '.js'],
  modules: [
    path.resolve(__dirname, 'node_modules'),
    'node_modules'
  ]
}

const _module = {
  rules: [
    {
      test: /\.jsx?$/,
      exclude: path.resolve(__dirname, 'src'),
      enforce: 'pre',
      use: 'source-map-loader'
    },
    {
      test: /\.jsx?$/,
      exclude: /node_modules/,
      use: 'babel-loader'
    },
    {
      test: /\.css$/,
      use: [{
        loader: 'style-loader'
      }, {
        loader: 'css-loader'
      }]
    }
  ]
}
```

Now that we have that we can start defining all the Webpack
configurations we'll need. First will be the background scripts. Note
that this also includes plugins to copy anything inside a `static`
directory to the final build and to output a `manifest.json` file to
the final build. We do some special processing to `manifest.json` to
copy some info from our `package.json` before outputting. Other than that,
this file processes our `background.js` file and outputs everything to
`build/background`:

```js
module.exports = [
  {
    devtool: 'source-map',
    entry: [
      path.resolve(__dirname, 'src', 'background', 'background.js')
    ],
    output: {
      path: path.resolve(__dirname, 'build'),
      filename: path.join('background', 'background.js')
    },
    plugins: [
      new CopyWebpackPlugin([
        {
          from: path.resolve(__dirname, 'static', '**', '*'),
          to: './',
          context: 'static/'
        }
      ]),
      new TransformJson({
        source: path.resolve(__dirname, 'src', 'manifest.json'),
        filename: 'manifest.json',
        object: {
          description: package.description,
          version: package.version
        }
      })
    ],
    resolve: _resolve,
    module: _module
  },
  ...
```

Next we include a rule to process `settings.js` and output everything
to `build/settings`:

```js
  ...
  {
    devtool: 'source-map',
    entry: [
      path.resolve(__dirname, 'src', 'settings', 'settings.js')
    ],
    output: {
      path: path.resolve(__dirname, 'build'),
      filename: path.join('settings', 'settings.js')
    },
    resolve: _resolve,
    module: _module
  },
  ...
```

Finally, we have two rules for content scripts. The do this
because we have to lazy-load our CSS when we render our in-tab UI using the
[shadow DOM](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_shadow_DOM). Because of that, our `settings.js` file does not import the CSS and therefore Webpack doesn’t see it by default.

```js
  ...
  {
    devtool: 'source-map',
    entry: [
      path.resolve(__dirname, 'src', 'content', 'content.js')
    ],
    output: {
      path: path.resolve(__dirname, 'build'),
      filename: path.join('content', 'content.js')
    },
    resolve: _resolve,
    module: _module
  },
  {
    devtool: 'source-map',
    entry: [
      path.resolve(__dirname, 'src', 'content', 'content.css')
    ],
    output: {
      path: path.resolve(__dirname, 'build'),
      filename: path.join('content', 'content.css')
    },
    module: _module
  }
]
```

Also note we have a `.babelrc` with the following contents:

```json
{
  "sourceMaps": true,
  "presets": [
    "@babel/preset-env"
  ],
  "plugins": [
    ["@babel/plugin-transform-react-jsx", { "pragma": "h" }]
  ]
}
```

## Building

To build this project, use the standard Webpack commands. Usually, these
are included in the `scripts` portion of a `package.json` file.

* **Build:** `webpack --config webpack.config.js`
* **Watch:** `webpack --watch --progress --config webpack.config.js`

## Next Steps

With the project now compiling properly, we can start coding the browser extension in a much more organized fashion now that we can separate out our source files using imports and be able to easily include third-party modules.
