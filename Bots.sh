#make sure there will be no conflicts
cd
rm -rf Ras-s-Discord-Bots

#clone bot code and go to directory
git clone https://github.com/Rasmatham/Ras-s-Discord-Bots.git
cd Ras-s-Discord-Bots

#remove potentially confusing files
rm piSetup.sh Bots.bat ActivateCommands.bat Bots.sh

#install missing modules
npm i

#compile
tsc

#get bot tokens
git clone https://Rasmatham:ABC@github.com/Rasmatham/Discord-Bot-Tokens.git
mv Discord-Bot-Tokens/.env .
rm -rf Discord-Bot-Tokens
node AllTheBots.js