#!/usr/bin/env bash
set -e

mpm install
npm run build
./publish-portal.sh
