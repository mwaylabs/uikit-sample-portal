#!/usr/bin/env bash
cd ~/mw-uikit/app
pm2 start json-server.js -n www -f
