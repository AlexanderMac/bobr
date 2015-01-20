# bobr

Update `browser` property in `package.json` for use [bower](https://github.com/bower/bower) components in [browserify](https://github.com/substack/node-browserify) by their names.

Currently, browserify can resolves paths only packages installed via `npm`, to use components installed via `bower`, you should manually update `browser` property in `package.json`, or use relative paths in `require()`. Or you can use `bobr`, which will automaticly update `browser` property in `package.json`. 

## Installation

```
npm i -D bobr
```


## Usage

`bobr` should be used in task runners, such as Gulp or Grant. Below, the example of gulp task which run `bobr`:
``` js
var gulp = require('gulp);
var bobr = require('bobr');

bobr.run(options);
```


# Options

* bowerConfig - a path to `bower` configuration file, default is `./bower.json`.
* browserExternalFile - a path to a file with your own modules, concatenates with result `bower` modules, after run `bobr`.


## License
This code available under the MIT License.
See License.md for details.  


## Authors
**Alexander Mac** ([amatsibarov@gmail.com](mailto:amatsibarov@gmail.com))
