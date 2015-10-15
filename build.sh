#!/bin/bash

# copy needed files
rm -r build;
mkdir -p build;
cp -r server build;
cp -r common build;
cp -r config build;
cp docker/start.sh build;
rm -r build/server/mock;
find build -name "*.test.js" -type f -delete;

