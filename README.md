# bobr

The module goal is to update `browser` property in `package.json` and use [bower](https://github.com/bower/bower) components in [browserify](https://github.com/substack/node-browserify) by their names.

Currently, browserify can resolves paths only packages installed via `npm`, to use components installed via bower, you should manually update `browser` property in `package.json`, or use relative paths in `require()`. Bobr updates `browser` property in `package.json`, allows you use bower modules by name in `require()`.

```js
// package.json
browser: [ // updated by bobr
  "jquery": "./bower_components/jquery/dist/jquery.js",
  ...
]

// in your module
var $ = require('jquery');
```

## Install
```
npm i -D bobr
```


## Usage
Bobr should be used in task runners, such as Gulp or Grunt. Below, the example of gulp task which run Bobr:
```js
var gulp       = require('gulp');
var bobr       = require('bobr');
var browserify = require('browserify');

// Update browser property
gulp.task('bobr', function() {
  bobr.run({
    overrides: [
      {
        name: 'jquery'
        newName: 'jqueryModule'
      }
    ],
    browserExternalFile: './config/browser-external.json',
  });
});

// Browserify modules, will be run, after bobr will be finished
gulp.task('browserify', ['bobr'], function(cb) {
  // create bundles
}
```


## Options
* `overrides` - an array of objects to override module names. By default, module name is a js file name without extension, use this option to override this.
* `browserExternalFile` - a path to a json file with your own modules, which you want to browserify. Bobr concatenate these modules with bower modules.


## License
This code available under the MIT License.
See License.md for details.  


## Authors
**Alexander Mac** ([amatsibarov@gmail.com](mailto:amatsibarov@gmail.com))
