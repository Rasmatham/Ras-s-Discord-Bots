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
mv bots.service /lib/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable bots.service 
sudo systemctl start bots.service
sudo systemctl status bots.service 

#reboot
sudo reboot now