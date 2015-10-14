#!/bin/bash

mongod >> /data/logs/db.logs 2>&1 &
NODE_ENV=production babel-node server/index.js >> /data/logs/node.logs 2>&1 &

