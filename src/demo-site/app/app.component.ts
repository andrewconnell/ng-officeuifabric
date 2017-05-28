import * as angular from 'angular';

export class AppComponent implements angular.IComponentOptions {
  public static NAME: string = 'app';

  public template: string = '<h1>ngOfficeUIFabric: Angular v1 &amp; Fabric v2</h1><h2>from <code>AppComponent</code></h2>';

  constructor() {
    console.log('AppComponent');
  }
}
