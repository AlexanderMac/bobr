var mainBowerFiles = require('main-bower-files');
var _              = require('lodash');
var path           = require('path');
var jsonfile       = require('jsonfile');

module.exports = function(options) {
  options.overrides = options.overrides || [];
  
  var cwd = process.cwd();
  var browser = {};
  
  _(mainBowerFiles('**/*.js'))
    .map(function(modFullPath) {
      var modBaseName = path.basename(modFullPath, '.js');
      var modName = _overrideName(modBaseName, options.overrides);
      var modRelativePath = '.' + modFullPath.replace(cwd, '');
      return {
        modName: modName,
        modPath: modRelativePath
      };
    })
    .sortBy(function(mod) {
      return mod.modName;
    })
    .each(function(mod) {
      browser[mod.modName] = mod.modPath;
    });
    
  if (options.browserExternalFile) {
    browser = _addExternalModules(browser, options.browserExternalFile);
  }
  
  _updatePackageFile(browser);
  
  return _.keys(browser);
};

function _overrideName(modName, overrides) {
  var obj = _.find(overrides, function(ov) {
    return ov.name === modName;
  });
  
  return obj ? obj.newName : modName;
}

function _addExternalModules(browser, browserExternalFile) {
  var browserExternal = jsonfile.readFileSync(browserExternalFile);
  return _.assign(browser, browserExternal.browser);
}

function _updatePackageFile(browser) {
  var pkgConf = jsonfile.readFileSync('./package.json');
  pkgConf.browser = browser;
  jsonfile.writeFileSync('./package.json', pkgConf);
}
