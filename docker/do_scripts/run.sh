#!/bin/bash

sh stop.sh;

docker run -id \
  -p 80:80 \
  -p 3000:3000 \
  -v ~/data/db:/data/db \
  -v ~/data/logs:/data/logs \
  -t anonym/main;

