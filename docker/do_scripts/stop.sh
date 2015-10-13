#!/bin/bash

docker stop $(docker ps | tail -1 | awk '{ print $1 }');

