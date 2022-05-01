#!/bin/bash

# cd to app root
CWD=$(dirname $0)
if [[ `basename $(pwd)` = 'scripts' ]]; then
    cd ../
else
    cd `dirname $CWD`
fi

rm -rf dist
docker build -t fc-local-build .
docker rm -f fc-local-build
docker run --name fc-local-build fc-local-build bash
docker cp fc-local-build:/code/dist .