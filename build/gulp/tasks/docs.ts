import { BaseGulpTask } from '../BaseGulpTask';
import { BuildConfig } from '../../config/build';
import * as gulp from 'gulp';
import * as runSequence from 'run-sequence';
let $: any = require('gulp-load-plugins')({ lazy: true });
const hljs: any = require('highlight.js');

/**
 * Creates documentation for directives from markdown files
 *
 * @class
 */
export class GulpTask extends BaseGulpTask {

  /**
   * @property  {string}  description   - Help description for the task.
   */
  public static description: string = 'Creates documentation for directives from markdown files';

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

    return gulp.src(['src/core/**/*.md', 'src/components/**/*.md', 'content/guide/*.md'])
      .pipe($.markdown({
        // add syntax highlight using highlight.js
        highlight: (code: string, language: string) => {
          if (language) {
            // highlight.js expects "typescript" written out, while Github supports "ts".
            let lang: string = language.toLowerCase() === 'ts' ? 'typescript' : language;
            return hljs.highlight(lang, code).value;
          }

          return code;
        }
      }))
      .pipe(gulp.dest('dist/docs'));
  }

}
