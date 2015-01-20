var mainBowerFiles = require('main-bower-files');
var _              = require('lodash');
var path           = require('path');
var jsonfile       = require('jsonfile');

module.exports = function(options) {
  options.replaces = options.replaces || [];
  
  var cwd = process.cwd();
  var browser = {};
  var modules = [];
  
  _(mainBowerFiles('**/*.js'))
    .map(function(modulePath) {
      var modName = _fixName(path.basename(modulePath, '.js'), options.replaces); // TODO: use module real name
      var modPath = '.' + modulePath.replace(cwd, '');
      return {
        modName: modName,
        modPath: modPath
      };
    })
    .sortBy(function(mod) {
      return mod.modName;
    })
    .each(function(mod) {
      modules.push(mod.modName);
      browser[mod.modName] = mod.modPath;
    });
    
  if (options.browserExternalFile) {
    var browserExternal = jsonfile.readFileSync(options.browserExternalFile);
    browser = _.assign(browser, browserExternal.browser);
  }
  
  var pkg = jsonfile.readFileSync('./package.json');
  pkg.browser = browser;
  jsonfile.writeFileSync('./package.json', pkg);
  
  return modules;
}

function _fixName(modName, replaces) {
  var obj = _.find(replaces, function(rep) {
    return rep.name === modName;
  });
  if (obj) {
    return obj.repName;
  }
  return modName;
}
