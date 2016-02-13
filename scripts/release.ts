'use strict';

import {Utils} from './utils';
import * as fs from 'fs';
import * as yargs from 'yargs';

// verify required params passed in
if (!yargs.argv.src || !yargs.argv.pkg) {
  console.error('must specify the path to \'--src\' & \'--pkg\'');
  process.exit();
}

// get library version & dependencies
let libraryVersion: string = Utils.getLibraryVersion(yargs.argv.src);
let deps: ILibraryDependencies = Utils.getDependencies(yargs.argv.src);

// update bower
let bowerManifest: any = require(yargs.argv.pkg + '/bower.json');
bowerManifest.version = libraryVersion;
bowerManifest.dependencies = {
  'angular': deps.angularLib,
  'office-ui-fabric': deps.officeUiFabricLib
};
// write bower file back
fs.writeFileSync(yargs.argv.pkg + '/bower.json', JSON.stringify(bowerManifest, null, 2));


// update package
let packageManifest: any = require(yargs.argv.pkg + '/package.json');
packageManifest.version = libraryVersion;
packageManifest.dependencies = {
  'angular': deps.angularLib,
  'office-ui-fabric': deps.officeUiFabricLib
};
// write bower file back
fs.writeFileSync(yargs.argv.pkg + '/package.json', JSON.stringify(packageManifest, null, 2));
