const { Message } = require(`discord.js`);
//Frick that one rule
{
    /**
    * 
    * @param {Message} message 
    */
    var hencefortifier = (message) => {
        if (message.author.id !== message.client.user.id && message.guild !== null && message.content.toLowerCase().includes(`from now on`)) {
            if(message.guild.id == `646155122992480266`){
                let textChannels = [];
                message.guild.channels.cache.map((channel) => {
                    if (channel.type === `text`) {
                        blackList.forEach((bannedChannel) => {
                            if (channel.name !== bannedChannel) {
                                textChannels.push(channel.id);
                            }
                        });
                    }
                });
                message.client.channels.cache
                .get(textChannels[Math.floor(Math.random() * (textChannels.length - 1))])
                .send(`<@${message.author.id}>, you did an oopsie`);
            }
        }
    }
}
//Flit no lasting! Flit no lasting! Flit no lasting!
{
    /**
    * 
    * @param {Message} message 
    * @param {String|Number} userID
    */
    var userWordBan = (message, word, userID) => {
        if (message.author.id === userID) {
            if (message.content.toLowerCase().includes(word)) {
                message.delete;
            }
        }
    }
}
//smh, Espen bot doesn't work
{
    /**
    * 
    * @param {Message} message 
    */
    var espenBotReplacement = (message) => {
        if (message.author.id === process.env.RASID && Math.floor(Math.random() * 100) <= 0 && message.guild.id === `646155122992480266`) {
            message.channel.send(`https://cdn.discordapp.com/attachments/735213241860620308/781189544103247922/unknown.png`);
        }
    }
}
module.exports = { hencefortifier, userWordBan, espenBotReplacement }