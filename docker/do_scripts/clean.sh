#!/bin/bash

rm -r data

mkdir data
mkdir data/db
mkdir data/logs
touch data/logs/db.logs
touch data/logs/node.logs

chmod 777 data/db
chmod 777 data/logs
chmod 777 data/logs/db.logs
chmod 777 data/logs/node.logs

