import {CommandInteraction, MessageEmbed, Guild, User, ColorResolvable, GuildMember} from "discord.js";
import {checkFor} from "./generalUse.js";
import {writeFile, unlink} from "fs";
//channelCount
export const channelCount = (guild: Guild):{
	textChannels: number,
	voiceChannels: number,
	Categories: number,
	Unknown: number,
	all: number
} => {
	if (guild !== null) {
		const TC:string[] = [];
		const VC:string[] = [];
		const Cat:string[] = [];
		const UK:string[] = [];
		guild.channels.cache.map((channel):void => {
			switch (channel.type) {
			case `GUILD_TEXT`:
				TC.push(channel.name);
				break;
			case `GUILD_VOICE`:
				VC.push(channel.name);
				break;
			case `GUILD_CATEGORY`:
				Cat.push(channel.name);
				break;
			default:
				UK.push(channel.name);
				break;
			}
		});
		return {
			textChannels: TC.length,
			voiceChannels: VC.length,
			Categories: Cat.length,
			Unknown: UK.length,
			all: TC.length+VC.length+Cat.length+UK.length
		};
	}
};
//userinfo
export const userInfo = (interaction: CommandInteraction):void => {
	writeFile(`${
		interaction.client.user.username
	}/userinfo/userinfo.json`, `"interaction.user":{\n${
		JSON.stringify(interaction.user, null, 2)
	}\n},\n"interaction.member":{\n${
		JSON.stringify(interaction.member, null, 2)
	}\n}`, ():void => {
		if (interaction.options.get(`public`).value as boolean) {
			interaction.reply({
				files: [
					`${
						interaction.client.user.username
					}/userinfo/userinfo.json`
				]
			})
				.then(():void => {
					unlink(`${
						interaction.client.user.username
					}/userinfo/userinfo.json`, console.error);
				})
				.catch(console.error);
		}
		else {
			if (!(interaction.member instanceof GuildMember)) {
				return;
			}
			interaction.member.send({
				files: [
					`${
						interaction.client.user.username
					}/userinfo/userinfo.json`
				]})
				.then(():void => {
					unlink(`${
						interaction.client.user.username
					}/userinfo/userinfo.json`, console.error);
				})
				.catch(console.error)
				.then(():void => {
					interaction.reply({
						content: `You have [1] more DM!`,
						ephemeral: true
					})
						.catch(console.error);
				});
		}
	});
};
//serverinfo
export const serverInfo = (interaction: CommandInteraction):void => {
	if (interaction.guild !== null) {
		const textChannels:string[] = [];
		const voiceChannels:string[] = [];
		const Categories:string[] = [];
		const unknown:string[] = [];
		interaction.guild.channels.fetch().then((channels):void => {
			channels.forEach((channel):void => {
				switch (channel.type) {
				case `GUILD_TEXT`:
					textChannels.push(channel.name);
					break;
				case `GUILD_VOICE`:
					voiceChannels.push(channel.name);
					break;
				case `GUILD_CATEGORY`:
					Categories.push(channel.name);
					break;
				default:
					unknown.push(channel.name);
					break;
				}
			});
		})
			.then(():void => {
				interaction.reply({
					content: `\`\`\`\n${
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
					}\n\`\`\``
				});
			})
			.catch(console.error);
	}
	else {
		if (interaction.member.user.id === `588511925944582186`) {
			interaction.reply({
				content: `stop tring to kill me, smh`
			});
		}
		else {
			interaction.reply({
				content: `I'm sorry, Dave, but I'm afraid I can't let you do that`
			});
		}
	}
};
//join date
export const joindate = (interaction: CommandInteraction):{
	embeds: MessageEmbed[],
	ephemeral: boolean
} => {
	if (!(interaction.member.user instanceof User)) {
		return;
	}
	const ms:number = interaction.member.user.createdTimestamp;
	const date:Date = new Date(ms);
	const embed:MessageEmbed = new MessageEmbed()
		.setColor(`FFFFFF` as ColorResolvable)
		.setTitle(`You joined:`)
		.setThumbnail(`https://cdn.discordapp.com/attachments/656164355381133332/715651846584270899/ezgif-3-ea387cdabbbe.gif`)
		.addFields({
			name: `Date`,
			value: date.toLocaleDateString(`en-GB`, {
				timeZone: `utc` 
			}),
		},
		{
			name: `Time`,
			value: date.toLocaleTimeString(`en-GB`, {
				timeZone: `utc`,
				timeZoneName: `short`,
			}),
		}
		);
	return {
		embeds: [
			embed
		],
		ephemeral: !interaction.options.get(`public`).value
	};
};