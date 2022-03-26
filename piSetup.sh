if [$# -ge 1]; then
    sudo apt-get update
    sudo apt-get -y dist-upgrade
    sudo apt-get install -y git
    curl -sL https://deb.nodesource.com/setup_current.x | sudo -E bash -
    sudo apt-get install -y nodejs
    cd
    rm -rf Ras-s-Discord-Bots
    git clone https://github.com/Rasmatham/Ras-s-Discord-Bots.git
    cd
    cd Ras-s-Discord-Bots
    sudo npm i -g npm@latest
    sudo npm i -g typescript
    npm i
    tsc
    git clone https://Rasmatham:$1@github.com/Rasmatham/Discord-Bot-Tokens.git
    mv Discord-Bot-Tokens/.env .
    rm -rf Discord-Bot-Tokens
    node AllTheBots
fi