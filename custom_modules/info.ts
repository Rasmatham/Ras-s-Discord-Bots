const { CommandInteraction, MessageEmbed, GuildChannelManager } = require(`discord.js`);
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
	* @param {CommandInteraction} interaction
	* @returns {Object} Discord codeblock with all information on a user as a string
	*/
	var userInfo = (interaction) => {
		return {content: `\`\`\`json\ninteraction.member.user\n${JSON.stringify(interaction.user, null, 2)
		}\n\ninteraction.member\n${JSON.stringify(interaction.member, null, 2)
		}\n\`\`\``, ephemeral: !interaction.options.get(`public`).value}
	}
}
//serverinfo
{
	/**
	* 
	* @param {CommandInteraction} interaction
	* @returns {String} List of all channels and categories on the server the message was sent
	*/
	var serverInfo = (interaction) => {
		if (interaction.guild !== null) {
			let textChannels = [];
			let voiceChannels = [];
			let Categories = [];
			let unknown = [];
			interaction.guild.channels.fetch().then((channels) => {
				channels.forEach((channel) => {
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
				})
			});
			textChannels.sort();
			voiceChannels.sort();
			unknown.sort();
			return {content: `\`\`\`\n${
				checkFor(textChannels, `Text channels:`)
			}${
				checkFor(voiceChannels, `Voice channels:`)
			}${
				checkFor(Categories, `Categories:`)
			}${
				checkFor(unknown, `Other channels:`)
			}Total channels: ${
				textChannels.length + voiceChannels.length + Categories.length + unknown.length
			}\nChannels left: ${
				500 - (textChannels.length + voiceChannels.length + Categories.length + unknown.length)
			}\nmembers: ${
				interaction.guild.memberCount
			}\n\`\`\``};
		} else {
			if (interaction.member.user.id === `588511925944582186`) {
				return {content: `stop tring to kill me, smh`};
			} else {
				return {content: `I'm sorry, Dave, but I'm afraid I can't let you do that`};
			}
		}
	}
}
//join date
{
	/**
	* 
	* @param {CommandInteraction} interaction
	* @returns {MessageEmbed} Embed containing information on when you joined the server and when you joined Discord
	*/
	var joindate = (interaction) => {
		var ms = interaction.member.user.createdTimestamp;
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
		return {embeds: [embed], ephemeral: !interaction.options.get(`public`).value};
	}
}
module.exports = { channelCount, userInfo, serverInfo, joindate }