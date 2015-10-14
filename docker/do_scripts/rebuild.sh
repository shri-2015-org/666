#!/bin/bash

DEFOLT="develop"
BRANCH=${1:-$DEFOLT}
DIR=${PWD}

echo "-------------------- 1"
echo "Local folder is $DIR"

echo "-------------------- 4"
docker run -i \
  -v $DIR/src:/src \
  -t anonym/build-$BRANCH;

echo "-------------------- 5"
cd $DIR/src && sh build_container.sh

echo "-------------------- 6"
sh run.sh

