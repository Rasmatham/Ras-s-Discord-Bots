# make sure everything is up to date bfore starting
sudo apt-get update
sudo apt-get -y dist-upgrade

#install necessary things
sudo apt-get install -y git
curl -sL https://deb.nodesource.com/setup_current.x | sudo -E bash -
sudo apt-get install -y nodejs
sudo npm i -g npm@latest
sudo npm i -g typescript

#make sure there will be no conflicts
cd
rm -rf Ras-s-Discord-Bots

#clone bot code and go to directory
git clone https://github.com/Rasmatham/Ras-s-Discord-Bots.git
cd Ras-s-Discord-Bots

#remove potentially confusing files
rm piSetup.sh Bots.bat ActivateCommands.bat

#install missing modules
npm i

#compile
tsc

#get bot tokens
git clone https://Rasmatham:$1@github.com/Rasmatham/Discord-Bot-Tokens.git
mv Discord-Bot-Tokens/.env .
rm -rf Discord-Bot-Tokens

#set autorun script
sed -i "s/ABC/$1/" Bots.sh
mv temp.sh /etc/init.d/Bots.sh

#run bots
node AllTheBots.js