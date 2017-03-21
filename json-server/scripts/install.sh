#!/usr/bin/env bash
set -e

# update instance
echo "update instance"
sudo apt-get update

echo "installing essentials"
sudo apt-get install build-essential libssl-dev

# install nvm
echo "installing NVM"
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.1/install.sh | bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
source "$NVM_DIR/nvm.sh"

# save nvm env in bash rc
hasNvmEnv=`grep "export NVM_DIR" ~/.bash_profile | cat`
if [ -z "$hasNvmEnv" ]; then
  echo "export NVM_DIR='$HOME/.nvm'" >> ~/.bash_profile
  echo "[ -s '$NVM_DIR/nvm.sh' ] && \. '$NVM_DIR/nvm.sh'" >> ~/.bash_profile
  echo "source '$NVM_DIR/nvm.sh'" >> ~/.bash_profile
fi

# install node
echo "installing node"
nvm install node

# install pm2 module globaly
echo "installing pm2"
sudo npm install -g pm2
pm2 update
