#!/bin/bash

if [ -z "$FC_CONTAINER_ID" ]
then
    echo "Skip as this is local env ..."
    exit 0
else
    echo "Building in cloud ...."
fi

# cd to app root
CWD=$(dirname $0)
if [[ `basename $(pwd)` = 'scripts' ]]; then
    cd ../
else
    cd `dirname $CWD`
fi

npm install
npm run build
cp ./package.json ./dist/package.json
cd ./dist
npm install --only=prod