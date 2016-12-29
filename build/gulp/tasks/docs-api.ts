import { BaseGulpTask } from '../BaseGulpTask';
import { BuildConfig } from '../../config/build';
import * as gulp from 'gulp';
import * as runSequence from 'run-sequence';
let dgeni: any = require('dgeni');

/**
 * Creates API documentation for directives.
 *
 * @class
 */
export class GulpTask extends BaseGulpTask {

  /**
   * @property  {string}  description   - Help description for the task.
   */
  public static description: string = 'Creates API documentation for directives';

  /**
   * @property  {string[]}  aliases   - Different options to run the task.
   */
  public static aliases: string[] = [];

  /**
   * @property  {Object}  options   - Any command line flags that can be passed to the task.
   */
  public static options: any = {};

  /**
   * @property  {string[]}  dependencies  - Array of all tasks that should be run before this one.
   */
  public static dependencies: string[] = [];

  /** @constructor */
  constructor(done: gulp.TaskCallback) {
    super();

    // todo: delete prior generated docs

    // create instance of generator and create docs
    let dg: any = new dgeni([require('../../config/dgeni.js')]);
    return dg.generate().then();

  }

}
