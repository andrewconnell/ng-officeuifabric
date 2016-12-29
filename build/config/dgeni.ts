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
const sourceDir: string = path.resolve(projectRootDir, 'src');
const outputDir: string = path.resolve(projectRootDir, 'dist/docs');
const templateDir: string = path.resolve(projectRootDir, 'build/config/docs/templates');

const privateTagProcessor: string = path.resolve(projectRootDir, 'build/config/docs/processors/docs-private-filter.js');

// create and export a new Dgeni package
// we will use Gulp later on to generate that package
// think of packages as containers, our 'myDoc' package contains other packages
// which themselves include processors, services, templates...
module.exports = new Package('myDoc', dgeniPackageDeps)
  // set logging level
  .config((log) => {
    // set the log level to 'info', switch to 'debug' when troubleshooting
    log.level = 'info';
  })

  // processor to filter OUT symbols that should not be included in docs
  // & configure custom jsdoc tags
  .processor(require(privateTagProcessor))
  .config(function (parseTagsProcessor: any): void {
    parseTagsProcessor.tagDefinitions = parseTagsProcessor.tagDefinitions.concat([
      // custom tag used to see what is included
      {
        docProperty: 'docs-include',
        multi: true,
        name: 'docs-include'
      },
      // flag indicating if should be included in primary nav
      { name: 'docs-navSection' },
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
    console.log('templateFinder.templateFolders', templateFinder.templateFolders);

    // standard patterns for matching docs to templates
    templateFinder.templatePatterns = [
      '${ doc.template }',
      '${ doc.id }.${ doc.docType }.template.html',
      '${ doc.id }.template.html',
      '${ doc.docType }.template.html',
      'common.template.html'
    ];

    // dgeni disables autoescape by default, but we want this turned on.
    templateEngine.config.autoescape = true;

    // Nunjucks and Angular conflict in their template bindings so change Nunjucks
    // templateEngine.config.tags = {
    //   variableEnd: '$}',
    //   variableStart: '{$'
    // };
  })

  // tell DGeni which files we want to process & where to output them
  .config((readFilesProcessor, writeFilesProcessor) => {
    // specify the base path used when resolving relative paths to source and output files
    readFilesProcessor.basePath = projectRootDir;

    // disable for now as we are using readTypeScriptModules
    readFilesProcessor.$enabled = false;

    // // specify our source files that we want to extract
    // readFilesProcessor.sourceFiles = [
    //   // our static Markdown documents
    //   // we are specifying the path and telling Dgeni to use the ngdocFileReader
    //   // to parse the Markdown files to HTMLs
    //   {
    //     basePath: 'docs/content',
    //     fileReader: 'ngdocFileReader',
    //     include: 'docs/content/**/*.md'
    //   }
    // ];
    // use the writeFilesProcessor to specify the output folder for the extracted files
    writeFilesProcessor.outputFolder = outputDir;
  })

  // so far using default dgeni processors to specify how we want to process & then convert our source files...
  // now setup how we want to convert source => doc types
  .config((computePathsProcessor, computeIdsProcessor) => {
    // here we are defining what to output for our docType Module

    // configure the output path for written files (i.e., file names).
    computePathsProcessor.pathTemplates = [{
      docTypes: ['directive', 'interface', 'enum'],
      outputPathTemplate: '${docType}s/${name}.html',
      pathTemplate: '${name}'
    }];

    // setup the computePathsProcessor to output the files to HTML partials

    // create new compute for 'content' type doc
    // indexPage is something new we will be defining later
    // computeIdsProcessor.idTemplates.push({
    //   docTypes: ['content', 'indexPage'],
    //   getAliases: function (doc: any): string[] { return [doc.id]; },
    //   getId: function (doc: any): string { return doc.fileInfo.baseName; }
    // });

    // build custom paths and set the outputPaths for "content" pages
    // computePathsProcessor.pathTemplates.push({
    //   docTypes: ['content'],
    //   getPath: function (doc) {
    //     var docPath = path.dirname(doc.fileInfo.relativePath);
    //     if (doc.fileInfo.baseName !== 'index') {
    //       docPath = path.join(docPath, doc.fileInfo.baseName);
    //     }
    //     return docPath;
    //   },
    //   outputPathTemplate: 'partials/${path}.html'
    // });
  })

  // configure the processor for understanding TypeScript.
  .config(function (readTypeScriptModules: any): void {
    console.log('sourceDir', sourceDir);
    readTypeScriptModules.basePath = sourceDir;
    readTypeScriptModules.ignoreExportsMatching = [/^_/];
    readTypeScriptModules.hidePrivateMembers = true;

    // entry points for docs generation. All publically exported symbols found through these
    // files will have docs generated.
    readTypeScriptModules.sourceFiles = [
      'components/button/index.ts'
    ];
  });

