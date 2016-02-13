/// <reference path='./release.d.ts'/>

'use strict';

export class Utils {
  /**
   * Gets the version of the library from the package.json file unless
   * the version is specified as the enviroment variable VERSION.
   * 
   * @returns string
   */
  public static getLibraryVersion(): string {
    if (process.env.VERSION === undefined) {
      return require('./../package.json').version;
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
  public static getDependencies(): ILibraryDependencies {
    // get the dependencies
    let libDeps: any = require('./../package.json').dependencies;

    // create new dep object & export
    let deps: ILibraryDependencies = {
      angularLib: libDeps.angular,
      officeUiFabricLib: libDeps['office-ui-fabric']
    };

    return deps;
  }

  public static gitExec(gitcmd: string): void {
    console.log("$ %s", gitcmd);
  }
}
