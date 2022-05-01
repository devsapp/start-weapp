#!/bin/bash

# cd to app root
CWD=$(dirname $0)
if [[ `basename $(pwd)` = 'scripts' ]]; then
    cd ../
else
    cd `dirname $CWD`
fi

./scripts/build-local.sh

s deploy --type config --use-remote -n
if [[ $? -eq 0 ]]; then
    s deploy --type code --use-local -n
else
    s deploy --use-local -n
fi

rm -rf ./dist