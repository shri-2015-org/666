#!/bin/bash

rm -r build;
mkdir -p build;
cp -r static build;
cp -r server build;
cp -r common build;
# rm -r build/server/mock;
find build -name "*.dev.js" -type f -delete;
find build -name "*.test.js" -type f -delete;

babel-node build.js

