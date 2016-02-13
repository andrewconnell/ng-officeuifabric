#!/bin/bash

function run {
  # setup paths
  SRC_PATH=$PWD
  PKG_PATH="$HOME/dev/scratch/package-ngofficeuifabric"

  cd ..

  # pre cleaning
  echo ".. pre cleaning"
  rm -Rf dist
  rm -Rf $PKG_PATH

  # get version
  VERSION="$(readJsonProp "package.json" "version")"

  # compile production & debug library
  echo ".. compiling prod & debug library"
  gulp build-lib
  gulp build-lib --dev

  # clone packaging repo
  echo ".. clone packaging repo"
  git clone https://github.com/ngOfficeUiFabric/package-ngofficeuifabric \
    $PKG_PATH --depth=2
  
  # copy built library & changelog
  echo ".. copying built library & changelog"
  cp -Rf dist/*.js $PKG_PATH
  cp -Rf changelog.md $PKG_PATH/changelog.md
  
  # update versions & dependencies in package.json & bower.json
  echo ".. updating versions & dependencies in package.json & bower.json"
  node scripts/release.js --src=$PWD --pkg=$PKG_PATH

  # update source repo
  echo ".. updating source repo with new tag"
  cd $SRC_PATH
#TODO: ADD TAG & REMOVE DRY DRUN
  #git tag -f $VERSION
  git push -q origin master --tags --dry-run

  # update packaging repo
  echo ".. updating packaging repo"
  cd $PKG_PATH
  git add -A
  git commit -m "release(): $VERSION"
  git tag -f $VERSION
#TODO: ADD TAG & REMOVE DRY DRUN
  git push -q origin master --tags --dry-run

  #
}

source $(dirname $0)/utils.inc
