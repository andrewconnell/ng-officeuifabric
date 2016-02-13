/// <reference path='./release.d.ts'/>

'use strict';

export class Utils {
  /**
   * Gets the version of the library from the package.json file unless
   * the version is specified as the enviroment variable VERSION.
   * 
   * @returns string
   */
  public static getLibraryVersion(sourcePath: string): string {
    if (process.env.VERSION === undefined) {
      return require(sourcePath + '/package.json').version;
    } else {
      return process.env.VERSION;
    }
  }
  /**
   * Gets the library dependencies in the current library from the
   * package.json.
   * 
   * @returns ILibraryDependencies
   */
  public static getDependencies(sourcePath: string): ILibraryDependencies {
    // get the dependencies
    let libDeps: any = require(sourcePath + '/package.json').dependencies;

    // create new dep object & export
    let deps: ILibraryDependencies = {
      angularLib: libDeps.angular,
      officeUiFabricLib: libDeps['office-ui-fabric']
    };

    return deps;
  }
}
