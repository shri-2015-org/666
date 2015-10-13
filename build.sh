#!/bin/bash

# copy needed files
rm -r build;
mkdir -p build;
cp -r server build;
cp -r common build;
cp -r config build;
rm -r build/server/mock;
find build -name "*.test.js" -type f -delete;

# build frontend files
babel-node build.js;

# check this docker console
docker info || exit 1;

cp docker/start.sh build/;

# check anonym/mongodb exist
docker images | grep anonym/mongodb;
if [ $? -ne 0 ]; then
  ( cd docker && cd mongodb && docker build -t anonym/mongodb . ) || exit 1;
fi

# check anonym/dependensy need update
DIFF=$( diff build/package.json docker/dependensy/data/package.json );
if [ "$DIFF" != "" ]; then
  cp build/package.json docker/dependensy/data/package.json;
  ( cd docker && cd dependensy && docker build -t anonym/dependensy . ) || exit 1;
fi

# check anonym/dependensy exist
docker images | grep anonym/dependensy;
if [ $? -ne 0 ]; then
  ( cd docker && cd dependensy && docker build -t anonym/dependensy . ) || exit 1;
fi

# build main container
cp docker/Dockerfile ./;
docker build -t anonym/main .;
rm Dockerfile;

