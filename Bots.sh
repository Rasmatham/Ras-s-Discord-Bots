#!/bin/bash

#make sure there will be no conflicts
cd /
sudo rm -rf Ras-s-Discord-Bots

#clone bot code and go to directory
sudo git clone --depth=1 https://github.com/Rasmatham/Ras-s-Discord-Bots.git
cd Ras-s-Discord-Bots

#remove potentially confusing files
sudo rm piSetup.sh Bots.bat ActivateCommands.bat

#install missing modules
sudo npm i

#compile
sudo tsc

#get bot tokens
sudo git clone --depth=1 https://Rasmatham:ABC@github.com/Rasmatham/Discord-Bot-Tokens.git
sudo mv Discord-Bot-Tokens/.env .
sudo rm -rf Discord-Bot-Tokens

#run bots
sudo node AllTheBots.js