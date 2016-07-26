import { IWallabyConfig, IWallabyEnvironment } from 'wallaby';
import { BuildConfig } from './build/config/build';

class WallabyConfig implements IWallabyConfig {

  /**
   * @property  {string[]}  files - Collection of files to include when Wallaby
   *                                copies to it's local cache.
   */
  public files: any = [
    { instrument: false, pattern: BuildConfig.NODE_MODULES + '/angular/angular.js'},
    { instrument: false, pattern: BuildConfig.NODE_MODULES + '/angular-mocks/angular-mocks.js'},
    { instrument: false, pattern: BuildConfig.NODE_MODULES + '/jquery/dist/jquery.min.js'},
    { instrument: false, pattern: BuildConfig.NODE_MODULES + '/pickadate/lib/picker.js'},
    { instrument: false, pattern: BuildConfig.NODE_MODULES + '/pickadate/lib/picker.date.js'},
    { instrument: false, pattern: BuildConfig.NODE_MODULES + '/jasmine-jquery/lib/jasmine-jquery.js'},
    { instrument: false, pattern: 'src/core/jquery.phantomjs.fix.js'},
    {pattern: 'src/**/*.ts', load: false},
    '!src/**/*.spec.ts'
  ];

  /**
   * @property  {string[]}  tests - Collection of files that include tests.
   */
  public tests: any[] = [
    {pattern: 'src/**/*.spec.ts', load: false}
  ];

  public env: IWallabyEnvironment = <IWallabyEnvironment>{
    params: { runner: '--web-security=false' },
    runner: require('phantomjs2-ext').path
  };

  public debug: boolean = true;

  /**
   * @property  {Object}  compilers - List of compilers and matching file patter.
   */
  public compilers: any = {
    'src/**/*.ts': this.wallaby.compilers.typeScript()
  };

  public postprocessor: any = require('wallaby-webpack')({
    entryPatterns: [
      'src/core/components.js',
      'src/core/core.js',
      'src/**/*.spec.js'
    ],
    externals: {
      'angular': 'angular'
    },
    resolve: {
      extensions: ['', '.js', '.ts'],
      root: './src'
    }
  });

  public setup: any = function () {
    // required to trigger test loading
    window['__moduleBundler'].loadTests();
  };

  constructor(private wallaby: any) { }
}

module.exports = (wallaby: any) => {
  return new WallabyConfig(wallaby);
};
