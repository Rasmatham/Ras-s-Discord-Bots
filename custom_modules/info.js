const { Message, MessageEmbed, GuildChannelManager } = require(`discord.js`);
const { checkFor } = require(`./generalUse.js`);
//channelCount
{
	/**
	* @typedef {Object} ChannelCounts
	* @property {number} textChannels
	* @property {number} voiceChannels
	* @property {number} categories
	* @property {number} unknown
	* @property {number} all
	*/
	/**
	* 
	* @param {GuildChannelManager} guild 
	* @returns {ChannelCounts}
	*/
	var channelCount = (guild) => {
		if (guild !== null) {
			let TC = [];
			let VC = [];
			let Cat = [];
			let UK = [];
			guild.channels.cache.map((channel) => {
				switch (channel.type) {
					case `text`:
					TC.push(channel.name);
					break;
					case `voice`:
					VC.push(channel.name);
					break;
					case `category`:
					Cat.push(channel.name);
					break;
					default:
					UK.push(channel.name);
					break;
				}
			})
			return {textChannels: TC.length, voiceChannels: VC.length, Categories: Cat.length, Unknown: UK.length, all: TC.length+VC.length+Cat.length+UK.length}
		}
	}
}
//userinfo
{
	/**
	* 
	* @param {Message} message Discord.js Message object
	* @returns {String} Discord codeblock with all information on a user as a string
	*/
	var userInfo = (message) => {
		return `\`\`\`json\nmessage.author\n${JSON.stringify(message.author, null, 2)
		}\n\nmessage.member\n${JSON.stringify(message.member, null, 2)
		}\n\`\`\``
	}
}
//serverinfo
{
	/**
	* 
	* @param {Message} message Discord.js Message object
	* @returns {String} List of all channels and categories on the server the message was sent
	*/
	var serverInfo = (message) => {
		if (message.guild !== null) {
			let textChannels = [];
			let voiceChannels = [];
			let Categories = [];
			let unknown = [];
			message.guild.channels.cache.map((channel) => {
				switch (channel.type) {
					case `text`:
					textChannels.push(channel.name);
					break;
					case `voice`:
					voiceChannels.push(channel.name);
					break;
					case `category`:
					Categories.push(channel.name);
					break;
					default:
					unknown.push(channel.name);
					break;
				}
			});
			textChannels.sort();
			voiceChannels.sort();
			unknown.sort();
			return `\`\`\`\n${checkFor(textChannels, `Text channels:`)
		}${checkFor(voiceChannels, `Voice channels:`)
	}${checkFor(Categories, `Categories:`)
}${checkFor(unknown, `Other channels:`)
}Total channels: ${textChannels.length + voiceChannels.length + Categories.length + unknown.length
}\nChannels left: ${500 - (textChannels.length + voiceChannels.length + Categories.length + unknown.length)
}\nmembers: ${message.guild.memberCount
}\n\`\`\``;
} else {
	if (message.author.id === `588511925944582186`) {
		return `stop tring to kill me, smh`;
	} else {
		return `I'm sorry, Dave, but I'm afraid I can't let you do that`;
	}
}
}
}
//join date
{
	/**
	* 
	* @param {Message} message 
	* @returns {MessageEmbed} Embed containing information on when you joined the server and when you joined Discord
	*/
	var joindate = (message, prefix) => {
		var ms = message.author.createdTimestamp;
		var date = new Date(ms);
		var embed = new MessageEmbed()
		.setColor(`FFFFFF`)
		.setTitle(`You joined:`)
		.setThumbnail(`https://cdn.discordapp.com/attachments/656164355381133332/715651846584270899/ezgif-3-ea387cdabbbe.gif`)
		.addFields({
			name: `Date`,
			value: date.toLocaleDateString(`en-GB`, { timeZone: `utc` }),
		},
		{
			name: `Time`,
			value: date.toLocaleTimeString(`en-GB`, {
				timeZone: `utc`,
				timeZoneName: `short`,
			}),
		}
		);
		return embed;
	}
}
module.exports = { channelCount, userInfo, serverInfo, joindate }