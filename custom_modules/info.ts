import {CommandInteraction, MessageEmbed, Guild, User, ColorResolvable, GuildMember} from "discord.js";
import {checkFor} from "./generalUse.js";
import {writeFile, unlink} from "fs";
//channelCount
export const channelCount = (
	inObj: {
		guild: Guild
	}
):{
	textChannels: number,
	voiceChannels: number,
	Categories: number,
	Unknown: number,
	all: number
} => {
	if (inObj.guild !== null) {
		const TC:string[] = [];
		const VC:string[] = [];
		const Cat:string[] = [];
		const UK:string[] = [];
		inObj.guild.channels.cache.map((channel):void => {
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
export const userInfo = (
	inObjs: {
		interaction: CommandInteraction
	}[]
):void => {
	inObjs.forEach((inObj) => {
		writeFile(`${
			inObj.interaction.client.user.username
		}/userinfo/userinfo.json`, `"interaction.user":{\n${
			JSON.stringify(inObj.interaction.user, null, 2)
		}\n},\n"interaction.member":{\n${
			JSON.stringify(inObj.interaction.member, null, 2)
		}\n}`, ():void => {
			if (inObj.interaction.options.get(`public`).value as boolean) {
				inObj.interaction.reply({
					files: [
						`${
							inObj.interaction.client.user.username
						}/userinfo/userinfo.json`
					]
				})
					.then(():void => {
						unlink(`${
							inObj.interaction.client.user.username
						}/userinfo/userinfo.json`, console.error);
					})
					.catch(console.error);
			}
			else {
				if (!(inObj.interaction.member instanceof GuildMember)) {
					return;
				}
				inObj.interaction.member.send({
					files: [
						`${
							inObj.interaction.client.user.username
						}/userinfo/userinfo.json`
					]})
					.then(():void => {
						unlink(`${
							inObj.interaction.client.user.username
						}/userinfo/userinfo.json`, console.error);
					})
					.catch(console.error)
					.then(():void => {
						inObj.interaction.reply({
							content: `You have [1] more DM!`,
							ephemeral: true
						})
							.catch(console.error);
					});
			}
		});
	});
};
//serverinfo
export const serverInfo = (
	inObjs: {
		interaction: CommandInteraction
	}[]
):void => {
	inObjs.forEach((inObj) => {
		if (inObj.interaction.guild !== null) {
			const textChannels:string[] = [];
			const voiceChannels:string[] = [];
			const Categories:string[] = [];
			const unknown:string[] = [];
			inObj.interaction.guild.channels.fetch().then((channels):void => {
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
					inObj.interaction.reply({
						content: `\`\`\`\n${
							checkFor({arr: textChannels, str: `Text channels:`})
						}${
							checkFor({arr:voiceChannels, str: `Voice channels:`})
						}${
							checkFor({arr: Categories, str: `Categories:`})
						}${
							checkFor({arr: unknown, str: `Other channels:`})
						}Total channels: ${
							textChannels.length + voiceChannels.length + Categories.length + unknown.length
						}\nChannels left: ${
							500 - (textChannels.length + voiceChannels.length + Categories.length + unknown.length)
						}\nmembers: ${
							inObj.interaction.guild.memberCount
						}\n\`\`\``
					});
				})
				.catch(console.error);
		}
		else {
			if (inObj.interaction.member.user.id === `588511925944582186`) {
				inObj.interaction.reply({
					content: `stop tring to kill me, smh`
				});
			}
			else {
				inObj.interaction.reply({
					content: `I'm sorry, Dave, but I'm afraid I can't let you do that`
				});
			}
		}
	});
};
//join date
export const joindate = (
	inObj: {
		interaction: CommandInteraction
	}
):{
	embeds: MessageEmbed[],
	ephemeral: boolean
} => {
	if (!(inObj.interaction.member.user instanceof User)) {
		return;
	}
	const ms:number = inObj.interaction.member.user.createdTimestamp;
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
		ephemeral: !inObj.interaction.options.get(`public`).value
	};
};