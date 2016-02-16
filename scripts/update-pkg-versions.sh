#!/bin/bash

function init {
  # setup paths
  SRC_PATH=$PWD
  PKG_PATH="$HOME/dev/scratch/package-ngofficeuifabric"
}

function run {
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
  git clone https://github.com/andrewconnell/package-ngofficeuifabric \
    $PKG_PATH --depth=2


  # copy built library & changelog
  echo ".. copying built library & changelog"
  cp -Rf dist/*.js $PKG_PATH
  cp -Rf changelog.md $PKG_PATH/changelog.md


  # update versions & dependencies in package.json & bower.json
  echo ".. updating versions & dependencies in package.json & bower.json"
  node scripts/update-pkg-versions.js --src=$PWD --pkg=$PKG_PATH


  # update source repo
  echo ".. updating source repo ng-officeuifabric"
  cd $SRC_PATH

  echo ".. .. pushing origin master"
  git push -q origin master

  echo ".. .. adding tag for version $VERSION & pushing orign master"
  git tag -f $VERSION
  git push --tags


  # update packaging repo
  echo ".. updating packaging repo package-ngofficeuifabric"
  cd $PKG_PATH

  echo ".. .. adding & commiting changes to package repo"
  git add -A

  git commit -m "release(): $VERSION"
  echo ".. .. pushing origin master"
  git push -q origin master

  echo ".. .. adding tag for version $VERSION & pushing orign master"
  git tag -f $VERSION
  git push --tags
}

source $(dirname $0)/utils.inc
