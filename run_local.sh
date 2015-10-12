#!/bin/bash

rm -r logs
mkdir logs
touch logs/db.logs
touch logs/node.logs
chmod 777 logs
chmod 777 logs/db.logs
chmod 777 logs/node.logs

docker stop $(docker ps | tail -1 | awk '{ print $1 }');

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

docker run -i \
  -p 80:80 \
  -p 3000:3000 \
  -v data/db:/data/db \
  -v $DIR/logs:/data/logs \
  -t anonym/main;

