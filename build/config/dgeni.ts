import { BuildConfig } from './build';
let path: any = require('canonical-path');
let packagePath: string = __dirname;

let Package: any = require('dgeni').Package;

// dgeni packages
const jsdocPackage: any = require('dgeni-packages/jsdoc');
const nunjucksPackage: any = require('dgeni-packages/nunjucks');
const ngdocPackage: any = require('dgeni-packages/ngdoc');
const typescriptPackage: any = require('dgeni-packages/typescript');

const dgeniPackageDeps: any[] = [
  jsdocPackage,
  nunjucksPackage,
  ngdocPackage,
  typescriptPackage
];

const projectRootDir: string = path.resolve(__dirname, '../..');
const sourceDir: string = path.resolve(projectRootDir, BuildConfig.SOURCE);
const outputDir: string = path.resolve(projectRootDir, BuildConfig.DOCS_OUTPUT_PATH + '/api');
const templateDir: string = path.resolve(projectRootDir, BuildConfig.DOCS_CONFIG_PATH + '/templates');

const privateTagProcessor: string = path.resolve(projectRootDir, BuildConfig.DOCS_CONFIG_PATH + '/processors/docs-private-filter.js');

// create new Dgeni package with entire API doc gen config
module.exports = new Package('myDoc', dgeniPackageDeps)
  // set logging level
  .config((log) => {
    // log level: 'info' | 'debug'
    log.level = 'info';
  })

  // processor to filter OUT symbols that should not be included in docs
  // & configure custom jsdoc tags
  .processor(require(privateTagProcessor))
  .config(function (parseTagsProcessor: any): void {
    parseTagsProcessor.tagDefinitions = parseTagsProcessor.tagDefinitions.concat([
      // custom tag used to see what is included
      {
        docProperty: 'docsReferences',
        multi: true,
        name: 'docs-reference'
      },
      // flag indicating if should be included in primary nav
      {
        docProperty: 'docNavSection',
        name: 'docs-navSection'
      },
      // custom tag used by processor `docs-private-filter`
      { name: 'docs-private' },
      // these tags aren't supported by dgeni
      // full list of supported tags, see: /node_modules/dgeni-packages/jsdoc/tag-defs
      { name: 'extends' },
      { name: 'interface' },
      { name: 'enum' }
    ]);
  })

  // configure processor for finding nunjucks templates.
  .config((templateFinder, templateEngine) => {
    // specify where the templates are located
    templateFinder.templateFolders = [templateDir];

    // standard patterns for matching docs to templates
    templateFinder.templatePatterns = ['${ doc.docType }.template.nunjucks'];

    // dgeni disables autoescape by default, but we want this turned on.
    templateEngine.config.autoescape = false;

    // nunjucks and Angular conflict in their template bindings so change Nunjucks
    templateEngine.config.tags = {
      variableEnd: '$}',
      variableStart: '{$'
    };
  })

  // tell DGeni which files we want to process & where to output them
  .config((readFilesProcessor, writeFilesProcessor) => {
    // specify the base path used when resolving relative paths to source and output files
    readFilesProcessor.basePath = projectRootDir;

    // disable for now as we are using readTypeScriptModules
    readFilesProcessor.$enabled = false;

    // use the writeFilesProcessor to specify the output folder for the extracted files
    writeFilesProcessor.outputFolder = outputDir;
  })

  // setup how to convert source => doc types
  .config((computePathsProcessor, computeIdsProcessor) => {
    // configure the output path for written files (i.e., file names).
    computePathsProcessor.pathTemplates = [
      {
        docTypes: ['directive'],
        outputPathTemplate: '${docType}s/${name}.html',
        pathTemplate: '${name}'
      },
      {
        docTypes: ['module'],
        outputPathTemplate: '${docType}s/${name}.html',
        pathTemplate: '${name}'
      },
      {
        docTypes: ['interface', 'enum'],
        outputPathTemplate: '${name}.html',
        pathTemplate: '${name}'
      }
    ];

  })

  // configure the processor for understanding TypeScript.
  .config(function (readTypeScriptModules: any): void {
    readTypeScriptModules.basePath = sourceDir;
    readTypeScriptModules.ignoreExportsMatching = [/^_/];
    readTypeScriptModules.hidePrivateMembers = true;

    // entry points for docs generation. All publically exported symbols found through these
    // files will have docs generated.
    readTypeScriptModules.sourceFiles = [
      'components/button/index.ts'
    ];
  });

