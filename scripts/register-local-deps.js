'use strict';
/* eslint-disable no-console */

const packageJson = require('../package.json');
const exec = require('child_process').exec;

const dependencies = Object.keys(packageJson.customDependencies);
console.log('*** Creting Symbolic links for custom dependencies into node_modules ***');
console.log(dependencies);
exec('mkdir -p node_modules', function (error, stdout, stderr) {
  if (error) { throw error; }

  const dependencies = Object.keys(packageJson.customDependencies);
  dependencies.forEach(function (depName) {
    const filePath = '.' + packageJson.customDependencies[depName];
    exec(`ln -svnf ${filePath} ./node_modules/${depName}`, function (error, stdout, stderr) {
      if (error) { throw error; }
      console.log(`Symlinked: ${filePath} -> ./node_modules/${depName}`);
    });
  });
});
