const { CommandInteraction, Message, MessageActionRow, MessageButton, MessageSelectMenu, TextChannel } = require(`discord.js`);
const {interactionFormat, blackList } = require(`./generalUse`);
//Frick that one rule
{
	/**
	* 
	* @param {Message} message 
	*/
	var hencefortifier = (message) => {
		if (message.author.id !== message.client.user.id && message.guild !== null &&message.content.toLowerCase().includes(`from now on`)) {
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
				message.client.channels.fetch(textChannels[Math.floor(Math.random() * (textChannels.length - 1))])
				.then((channel) => {
					/** @type {TextChannel} */
					const textChannel = channel
					textChannel.send(`<@${message.author.id}>, you did an oopsie`)
					.catch(console.error)
				});
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
				message.delete()
				.catch(console.error);
			}
		}
	}
}
//smh, Espen bot doesn't work
{
	/**
	* @param {String} type
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
				message.channel.send(out[0], out[1])
				.catch(console.error);
				break;
				case `react`:
				message.react(out)
				.catch(console.error);
				break;
			}
		}
	}
}
//button grid
{
	/**
	* 
	* @param {CommandInteraction} interaction 
	* @returns 
	*/
	var buttonGrid = (interaction) => {
		var unicodeEmoji = /^(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])$/gi;
		var discordEmoji = /^<(a?)?:.+?:\d+>$/gi;
		var discordEmojiNotExact = /<(a?)?:.+?:\d+>/gi;
		let buttonContent = interaction.options.get(`button_content`).value;
		if(buttonContent.length <= 80){
			if(buttonContent.match(unicodeEmoji) || buttonContent.match(discordEmoji)){
				const button = new MessageButton().setCustomID(`Dummy`).setEmoji(buttonContent).setStyle(`SECONDARY`);
				const bar = new MessageActionRow().addComponents([button],[button],[button],[button],[button]);
				return {content: buttonContent, components: [bar, bar, bar, bar, bar]};
			} else if (buttonContent.match(discordEmojiNotExact)) {
				const button = new MessageButton().setCustomID(`Dummy`).setLabel(buttonContent.replace(discordEmojiNotExact, ``)).setStyle(`SECONDARY`);
				const bar = new MessageActionRow().addComponents([button],[button],[button],[button],[button]);
				return {content: buttonContent.replace(discordEmojiNotExact, ``), components: [bar, bar, bar, bar, bar]};
			}
			const button = new MessageButton().setCustomID(`Dummy`).setLabel(buttonContent).setStyle(`SECONDARY`);
			const bar = new MessageActionRow().addComponents([button],[button],[button],[button],[button]);
			return {content: buttonContent, components: [bar, bar, bar, bar, bar]};
		}
	}
	/**
	* 
	* @param {CommandInteraction} interaction 
	* @returns 
	*/
	var selectMenu = () => {
		const menu = new MessageSelectMenu().setCustomID(`Dummy`).setPlaceholder(`Choose wisely`).addOptions([
			{
				label: 'Ras is cool',
				description: 'This is the wrong answer',
				value: 'first_option',
			},
			{
				label: 'Ras is cooler than cool',
				description: 'Don\'t deny it',
				value: 'second_option',
			},
		]);
		const bar = new MessageActionRow().addComponents([menu]);
		return {content: `sample menus:`, components: [bar]};
	}
}
module.exports = { hencefortifier, userWordBan, espenBotReplacement, buttonGrid, selectMenu }