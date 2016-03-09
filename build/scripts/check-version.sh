#!/bin/bash

ARG_DEFS=(
  "--srcwd=(.*)"
)

function run {
  echo $PWD
  echo $SRCWD

  # get version
  VERSION="$(readJsonProp "$SRCWD/package.json" "version")"


  # get last tag
  LAST_TAG=$(git describe --tags --abbrev=0 --always)

  echo "version= $VERSION"
  echo "lasttag= $LAST_TAG"

  # make sure version != last tag,
  # `if so, no release needed so abort
  if [ "$LAST_TAG" == "$VERSION" ]; then
    echo "INFO: not a new version; aborting release script"
    exit 1
  else
    echo "INFO: new version... latest tag is $LAST_TAG"
    exit 0
  fi
}

source $(dirname $0)/utils.inc
