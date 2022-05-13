#!/bin/sh

DIR=`dirname $0`

docker-compose -f $DIR/docker/docker-compose.yml up
