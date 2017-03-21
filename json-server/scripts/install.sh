#!/usr/bin/env bash
set -e

# update instance
echo "update instance"
sudo apt-get update

echo "installing essentials"
sudo apt-get install build-essential libssl-dev

# install nvm
echo "installing NVM"
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.1/install.sh | bash > /dev/null 2>&1
source ~/.profile

# install node
echo "installing node"
nvm install node

# install pm2 module globaly
echo "installing pm2"
sudo npm install -g pm2
pm2 update
