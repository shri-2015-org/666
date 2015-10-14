#!/bin/bash

DEFOLT="develop"
BRANCH=${1:-$DEFOLT}
DIR=${PWD}

echo "-------------------- 1"
echo "Local folder is $DIR"

echo "-------------------- 2"
echo "FROM node:0.12.7-slim" > $DIR/Dockerfile
echo "RUN apt-get update && apt-get install -y git && apt-get install -y python" >> $DIR/Dockerfile
echo "WORKDIR /src" >> $DIR/Dockerfile
echo "CMD (git clone -b $BRANCH https://github.com/shri-2015-org/666.git . || git pull) && npm install -verbose; npm install node-sass; npm run build" >> $DIR/Dockerfile
cat $DIR/Dockerfile

echo "-------------------- 3"
docker build -t anonym/build-$BRANCH . || exit 1
rm $DIR/Dockerfile

echo "-------------------- 4"
rm -r $DIR/src
mkdir $DIR/src
chmod 777 $DIR/src

docker run -i \
  -v $DIR/src:/src \
  -t anonym/build-$BRANCH;

echo "-------------------- 5"
cp -r $DIR/src/docker/do_scripts/* .
(cd $DIR/src && sh build_container.sh)

echo "-------------------- 6"
sh run.sh

