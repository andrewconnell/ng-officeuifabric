import { BaseGulpTask } from '../BaseGulpTask';
import { BuildConfig } from '../../config/build';
import { Utils } from '../utils';
import * as gulp from 'gulp';
import * as yargs from 'yargs';
import * as webpack from 'webpack';
import * as webpackConfig from '../../config/webpack.demo';
let webpackStream: any = require('webpack-stream');

/**
 * Builds files to be distributed as a library release.
 *
 * @class
 */
export class GulpTask extends BaseGulpTask {

  /**
   * @property  {string}  description   - Help description for the task.
   */
  public static description: string = 'Builds ngOfficeUiFabric demo site';

  /**
   * @property  {string[]}  dependencies  - Array of all tasks that should be run before this one.
   */
  public static dependencies: string[] = [];

  /**
   * @property  {string[]}  aliases   - Different options to run the task.
   */
  public static aliases: string[] = [];

  /**
   * @property  {Object}  options   - Any command line flags that can be passed to the task.
   */
  public static options: any = {
    'verbose': 'Output all TypeScript files being compiled & JavaScript files included in the external library',
    'version': 'Version number to set build library (if omitted, version from package.json is used)'
  };

  /**
   * @property  {ICommandLineArgs}  args  - Command line arguments;
   */
  private _args: ICommandLineArgs = yargs.argv;

  /** @constructor */
  constructor(done: gulp.TaskCallback) {
    super();
    Utils.log('Packaging demo site using webpack');

    // load webpack config settings
    let config: webpack.Configuration = new webpackConfig.WebPackConfig();

    let rootSource: string = BuildConfig.DEMO_SITE_SOURCE;

    // build webpack bundle
    console.log('rootSource', rootSource);
    return gulp.src([rootSource + '/bootstrap.ts'])
      .pipe(webpackStream(config))
      .pipe(gulp.dest(BuildConfig.DEMO_SITE_SOURCE + '/scripts'));
  }
}
