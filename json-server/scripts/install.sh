#!/usr/bin/env bash
set -e

# update instance
sudo apt-get update

sudo apt-get install build-essential libssl-dev

# install nvm
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.1/install.sh | bash
source ~/.profile

# install node
nvm install node

# install pm2 module globaly
sudo npm install -g pm2
pm2 update
