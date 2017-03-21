#!/usr/bin/env bash
set -e

# update instance
echo "update instance"
sudo apt-get update

echo "installing essentials"
sudo apt-get install build-essential libssl-dev npm
