let path: any = require('canonical-path');
let packagePath: string = __dirname;

let Package: any = require('dgeni').Package;

// dgeni packages
const jsdocPackage: any = require('dgeni-packages/jsdoc');
const nunjucksPackage: any = require('dgeni-packages/nunjucks');
const ngdocPackage: any = require('dgeni-packages/ngdoc');
const typescriptPackage: any = require('dgeni-packages/typescript');

const dgeniPackageDeps = [
  jsdocPackage,
  nunjucksPackage,
  ngdocPackage,
  typescriptPackage
];

const projectRootDir: string = path.resolve(__dirname, '../..');
const sourceDir: string = path.resolve(projectRootDir, 'src');
const outputDir: string = path.resolve(projectRootDir, 'dist/docs');
const templateDir: string = path.resolve(projectRootDir, 'build/config/docs/templates');

const processor: string = path.resolve(projectRootDir, 'build/config/docs/processors/docs-private-filter.js');
console.log(processor, 'processor');

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
  .processor(require(processor))

  // configure custom jsdoc tags
  .config(function (parseTagsProcessor) {
    parseTagsProcessor.tagDefinitions = parseTagsProcessor.tagDefinitions.concat([
      // make @doc-private a valid tag
      { name: 'docs-private' }
    ]);
  })

  // tell DGeni which files we want to process & where to output them
  .config((readFilesProcessor, writeFilesProcessor) => {
    // specify the base path used when resolving relative paths to source and output files
    readFilesProcessor.basePath = projectRootDir;

    // disable for now as we are using readTypeScriptModules
    // readFilesProcessor.$enabled = false;

    // specify our source files that we want to extract
    readFilesProcessor.sourceFiles = [
      // our static Markdown documents
      // we are specifying the path and telling Dgeni to use the ngdocFileReader
      // to parse the Markdown files to HTMLs
      {
        basePath: 'docs/content',
        fileReader: 'ngdocFileReader',
        include: 'docs/content/**/*.md'
      }
    ];
    // use the writeFilesProcessor to specify the output folder for the extracted files
    writeFilesProcessor.outputFolder = outputDir;
  })

  // configure the processor for understanding TypeScript.
  .config(function (readTypeScriptModules) {
    readTypeScriptModules.basePath = sourceDir;
    readTypeScriptModules.ignoreExportsMatching = [/^_/];
    readTypeScriptModules.hidePrivateMembers = true;

    // entry points for docs generation. All publically exported symbols found through these
    // files will have docs generated.
    readTypeScriptModules.sourceFiles = [
      'components/button/buttonDirective.ts',
      'components/icon/iconDirective.ts'
    ];
  })

  // where are templates located?
  .config((templateFinder) => {
    // specify where the templates are located
    //let templatePath: string = path.resolve(projectRootDir, 'docs/config/templates')
    console.log('templatePath', templateDir);
    templateFinder.templateFolders.unshift(templateDir);
  })

  // so far using default dgeni processors to specify how we want to process & then convert our source files...
  // now setup how we want to convert source => doc types
  .config((computePathsProcessor, computeIdsProcessor) => {
    // here we are defining what to output for our docType Module
    //
    // each angular module will be extracted to it's own partial
    // and will act as a container for the various Components, Controllers, Services in that Module
    // we are basically specifying where we want the output files to be located
    computePathsProcessor.pathTemplates.push({
      docTypes: ['module'],
      pathTemplate: '${area}/${name}',
      outputPathTemplate: 'partials/${area}/${name}.html'
    });

    // doing the same thing but for regular types like Services, Controllers, etc...
    // by default they are grouped in a componentGroup and processed
    // via the generateComponentGroupsProcessor internally in Dgeni
    computePathsProcessor.pathTemplates.push({
      docTypes: ['componentGroup'],
      pathTemplate: '${area}/${moduleName}/${groupType}',
      outputPathTemplate: 'partials/${area}/${moduleName}/${groupType}.html'
    });

    // setup the computePathsProcessor to output the files to HTML partials

    // create new compute for 'content' type doc
    // indexPage is something new we will be defining later
    computeIdsProcessor.idTemplates.push({
      docTypes: ['content', 'indexPage'],
      getId: function (doc) { return doc.fileInfo.baseName; },
      getAliases: function (doc) { return [doc.id]; }
    });

    // build custom paths and set the outputPaths for "content" pages
    computePathsProcessor.pathTemplates.push({
      docTypes: ['content'],
      getPath: function (doc) {
        var docPath = path.dirname(doc.fileInfo.relativePath);
        if (doc.fileInfo.baseName !== 'index') {
          docPath = path.join(docPath, doc.fileInfo.baseName);
        }
        return docPath;
      },
      outputPathTemplate: 'partials/${path}.html'
    });
  });

