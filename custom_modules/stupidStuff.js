const { Message } = require(`discord.js`);
const { messageFormat } = require(`./generalUse`);
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
	* @param {Number} chance
	* @param {String|Number} victim
	* @param {[]} out
	* 
	*/
	var espenBotReplacement = (type, message, chance, victim, out) => {
		if (message.author.id === victim && Math.floor(Math.random() * 100) <= chance) {
			switch(type){
				case `message`:
				message.channel.send(out[0], out[1]);
				break;
				case `react`:
				message.react(out);
				break;
			}
		}
	}
}
module.exports = { hencefortifier, userWordBan, espenBotReplacement }