/**
 * Dgeni processor that filters _OUT_ any symbols that should not be visible in the docs.
 *
 * Any symbol with @docs-private wil be excluded.
 */
module.exports = function docsPrivateFilter(): any {
  return {
    $process: (docs: any) => {
      return docs.filter(doc => !hasDocsPrivateTag(doc));
    },
    $runBefore: ['docs-processed']
  };
};

function hasDocsPrivateTag(doc: any): boolean {
  let tags: any = doc.tags && doc.tags.tags;
  return tags ? tags.find(d => d.tagName === 'docs-private') : false;
}
