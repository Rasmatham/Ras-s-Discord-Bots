import { CommandInteraction, MessageEmbed, GuildChannelManager, Guild, User, ColorResolvable, GuildMember } from "discord.js";
import { checkFor } from "./generalUse.js";
import { writeFile, unlink } from "fs"
//channelCount
{
	var channelCount = (guild: Guild) => {
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
	var userInfo = (interaction: CommandInteraction) => {
		writeFile(`${interaction.client.user.username}/userinfo/userinfo.json`, `"interaction.user":{\n${JSON.stringify(interaction.user, null, 2)}\n},\n"interaction.member":{\n${JSON.stringify(interaction.member, null, 2)}\n}`, () => {
			if (interaction.options.get(`public`).value as boolean) {
				interaction.reply({files: [`${interaction.client.user.username}/userinfo/userinfo.json`]})
				.then(() => {
					unlink(`${interaction.client.user.username}/userinfo/userinfo.json`, () => {
					})
				})
				.catch(console.error)
			} else {
				if(!(interaction.member instanceof GuildMember)){return}
				interaction.member.send({files: [`${interaction.client.user.username}/userinfo/userinfo.json`]})
				.then(() => {
					unlink(`${interaction.client.user.username}/userinfo/userinfo.json`, () => {
					})
				})
				.catch(console.error)
				.then(() => {
					interaction.reply({content: `You have [1] more DM!`, ephemeral: true})
					.catch(console.error)
				})
			}
		})
	}
}
//serverinfo
{
	var serverInfo = (interaction: CommandInteraction) => {
		if (interaction.guild !== null) {
			let textChannels: string[] = [];
			let voiceChannels: string[] = [];
			let Categories: string[] = [];
			let unknown: string[] = [] = [];
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
	var joindate = (interaction: CommandInteraction) => {
		if(!(interaction.member.user instanceof User)){return}
		var ms = interaction.member.user.createdTimestamp;
		var date = new Date(ms);
		var embed = new MessageEmbed()
		.setColor(`FFFFFF` as ColorResolvable)
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