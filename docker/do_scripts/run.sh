#!/bin/bash

docker pull anonym/main;

docker stop $(docker ps | tail -1 | awk '{ print $1 }');

docker run -id \
  -p 80:80 \
  -p 3000:3000 \
  -v data/db:/data/db \
  -v data/logs:/data/logs \
  -t anonym/main;

