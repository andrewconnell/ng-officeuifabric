import * as angular from 'angular';
import { APP_MODULE_NAME } from './app/app.module';

console.log('bootstrapping app', APP_MODULE_NAME);
angular.bootstrap(document, [APP_MODULE_NAME]);
