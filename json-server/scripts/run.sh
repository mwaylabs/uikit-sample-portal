#!/usr/bin/env bash
if [ ! -z "$DEPLOYMENT_GROUP_NAME" ]; then
 export NODE_ENV=$DEPLOYMENT_GROUP_NAME
fi

cd ~/mw-uikit/app
pm2 start bin/www -n www -i 0
