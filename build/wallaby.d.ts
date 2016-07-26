declare module 'wallaby' {
  namespace wallaby {
    /**
     * WallabyJS configuration settings.
     *
     * @typedef WallabyConfig
     * @type {Object}
     * @property {string[]}   files - Specifies an array of source files or file name patterns.
     * @property {string[]}   tests - Specifies an array of test files or test file name patterns.
     * @property {Object=}     compilers - File patterns as keys and compiler functions as values.
     * @prooperty {IWallabyEnvironment=} env - Specify a different test runner or change the runner settings.
     * @property {IWallabyWorkers=} workers - Degree of parallelism used to run your tests and controls the way wallaby.js re-uses workers.
     * @property {string=}  testFramework - Specifies the name and version of the testing framework you are using for your tests.
     *
     * @see {@link https://wallabyjs.com/docs/config/overview.html} for details
     */
    interface IWallabyConfig {
      files: string[];
      tests: string[];
      comilers?: any;
      env?: IWallabyEnvironment;
      workers?: IWallabyWorkers;
      testFramework?: string;
    }

    /**
     * Wallaby environment configuration.
     *
     * @typedef WallabyEnvironment
     * @type {object}
     *
     * @property  {string=}  type - Specify a different test runner or change the runner settings.
     *
     * @see {@link https://wallabyjs.com/docs/config/runner.html} for details
     */
    interface IWallabyEnvironment {
      type?: string;
    }

    /**
     * Wallaby worker configuration.
     *
     * @typedef WallabyWorkers
     * @type {object}
     *
     * @property  {boolean=}  recycle - Specifies the degree of parallelism used to run your tests and
     *                                  controls the way wallaby.js re-uses workers.
     *
     * @see {@link https://wallabyjs.com/docs/config/workers.html} for details.
     */
    interface IWallabyWorkers {
      recycle?: boolean;
    }

  }
  export = wallaby;
}
