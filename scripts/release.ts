'use strict';

import {Utils} from './utils';
import * as childProcess from 'child_process';
import * as tmp from 'tmp';
import * as colors from 'colors';

// get the version number
console.log('library version', Utils.getLibraryVersion());

// get dependencies
let deps: ILibraryDependencies = Utils.getDependencies();
console.log('angularv', deps.angularLib);
console.log('fabricv', deps.officeUiFabricLib);

// tag the current version
let libraryVersion: string = Utils.getLibraryVersion();
console.log(colors.white('Tagging library as version %s ...'), libraryVersion);
Utils.gitExec('git tag -f ' + libraryVersion);

// push current release to origin
console.log(colors.white('Pushing repo to origin ...'));
Utils.gitExec('git push -q origin master');

// build libraries
console.log(colors.white('Building library in release & debug mode...'));
childProcess.execSync('gulp build-lib');
childProcess.execSync('gulp build-lib --dev');

// create temp folder
let buildFolder: tmp.SynchrounousResult = tmp.dirSync({ prefix: 'ngouif_'});
console.log('.. temp working folder: %s', buildFolder.name);

// clone packageing repo
console.log(colors.white('Cloning packaging repo...'));
childProcess.execSync('git clone https://github.com/ngOfficeUiFabric/package-ngofficeuifabric ' + buildFolder.name);

// copy built files
console.log(colors.white('Updating packaging repo...'));
childProcess.execSync('cp dist/* ' + buildFolder.name);
childProcess.execSync('cp changelog.md ' + buildFolder.name + '/changelog.md');
