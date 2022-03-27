#make sure there will be no conflicts
cd
rm -rf Ras-s-Discord-Bots

# make sure everything is up to date bfore starting
sudo apt-get update
sudo apt-get -y dist-upgrade

#install necessary things
sudo apt-get install -y git
curl -sL https://deb.nodesource.com/setup_current.x | sudo -E bash -
sudo apt-get install -y nodejs
sudo npm i -g npm@latest
sudo npm i -g typescript

#set autorun script
sed -i "s/ABC/$1/" Bots.sh
sudo mv Bots.sh /etc/init.d/
sudo chmod +x /etc/init.d/Bots.sh
sudo update-rc.d /etc/init.d/Bots.sh defaults

#reboot
sudo reboot now