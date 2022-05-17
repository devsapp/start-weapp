#!/bin/bash

# cd to app root
CWD=$(dirname $0)
if [[ `basename $(pwd)` = 'scripts' ]]; then
    cd ../
else
    cd `dirname $CWD`
fi

rm -rf layer
docker build  -t fc-local-build .
docker rm -f fc-local-build
docker run --name fc-local-build fc-local-build bash
mkdir -p layer/nodejs
docker cp fc-local-build:/code/layer/node_modules ./layer/nodejs

s layer publish --layer-name weapp-server-node-modules --code ./layer --compatible-runtime nodejs14

rm -rf layer