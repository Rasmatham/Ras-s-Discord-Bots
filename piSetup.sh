#make sure there will be no conflicts
cd /
rm -rf Ras-s-Discord-Bots

#install necessary things
sudo apt-get install -y git
curl -sL https://deb.nodesource.com/setup_current.x -O
sudo -E bash setup_current.x
sudo apt-get install -y nodejs
sudo npm i -g npm@latest
sudo npm i -g typescript

#clone bot code and go to directory
git clone --depth=1 https://github.com/Rasmatham/Ras-s-Discord-Bots.git
cd Ras-s-Discord-Bots

#set autorun script
sed -i "s/ABC/$1/" Bots.sh
sudo chmod +x Bots.sh 
sudo mv bots.service /lib/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable bots.service 
sudo systemctl start bots.service

#go back to root
cd /