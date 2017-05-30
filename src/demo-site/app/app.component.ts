import * as angular from 'angular';

export class AppComponent implements angular.IComponentOptions {
  public static NAME: string = 'app';
  public templateUrl: string = 'app/app.component.html';

  constructor() { }
}
