import * as angular from 'angular';
import { AppComponent } from './app.component';

export const APP_MODULE_NAME: string = 'ngofficeuifabric-demosite';

const APP_MODULE_DEPENDENCIES: string[] = [];

// create the module & inject dependencies
angular.module(APP_MODULE_NAME)
  // load the root component
  .component(AppComponent.NAME, new AppComponent());

console.log('this getting hit?');
