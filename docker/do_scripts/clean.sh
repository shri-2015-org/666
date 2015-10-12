#!/bin/bash

rm -r /data/db
mkdir /data/db
chmod 777 /data/db
rm -r /data/logs
mkdir /data/logs
chmod 777 /data/logs
touch /data/logs/db.logs
touch /data/logs/node.logs
chmod 777 /data/logs/db.logs
chmod 777 /data/logs/node.logs

