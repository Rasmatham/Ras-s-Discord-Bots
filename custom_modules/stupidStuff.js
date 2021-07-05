const { Message, MessageActionRow, MessageButton } = require(`discord.js`);
const { messageFormat, blackList } = require(`./generalUse`);
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
//button grid
{
	/**
	* 
	* @param {Message} message 
	* @returns 
	*/
	var buttonGrid = (message) => {
		var unicodeEmoji = /^(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])$/gi;
		var discordEmoji = /^<(a?)?:.+?:\d+>$/gi;
		var discordEmojiNotExact = /<(a?)?:.+?:\d+>/gi;
		var splitMessage = message.content.split(` `);
		if(splitMessage.length > 1){
			if(splitMessage[1].length <= 80){
				if(splitMessage[1].match(unicodeEmoji) || splitMessage[1].match(discordEmoji)){
					const button = new MessageButton().setCustomID(`Dummy`).setEmoji(splitMessage[1]).setStyle(`SECONDARY`);
					const bar = new MessageActionRow().addComponents([button],[button],[button],[button],[button]);
					return {content: splitMessage[1], components: [bar, bar, bar, bar, bar]};
				} else if (splitMessage[1].match(discordEmojiNotExact)) {
					const button = new MessageButton().setCustomID(`Dummy`).setLabel(splitMessage[1].replace(discordEmojiNotExact, ``)).setStyle(`SECONDARY`);
					const bar = new MessageActionRow().addComponents([button],[button],[button],[button],[button]);
					return {content: splitMessage[1].replace(discordEmojiNotExact, ``), components: [bar, bar, bar, bar, bar]};
				}
				if(message.client.emojis.cache.has(splitMessage[1])){
					const button = new MessageButton().setCustomID(`Dummy`).setLabel(splitMessage[1]).setStyle(`SECONDARY`);
					const bar = new MessageActionRow().addComponents([button],[button],[button],[button],[button]);
					return {content: splitMessage[1], components: [bar, bar, bar, bar, bar]};
				}
			}
		}
		const button = new MessageButton().setCustomID(`Dummy`).setLabel(`🧰`).setStyle(`SECONDARY`);
		const bar = new MessageActionRow().addComponents([button],[button],[button],[button],[button]);
		return {content: `🧰`, components: [bar, bar, bar, bar, bar]};
	}
}
module.exports = { hencefortifier, userWordBan, espenBotReplacement, buttonGrid }