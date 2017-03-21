#!/usr/bin/env bash
set -e

cd json-server
zip -r latest *
cd ..
mkdir -p aws_upload
mv json-server/latest.zip aws_upload/latest.zip
