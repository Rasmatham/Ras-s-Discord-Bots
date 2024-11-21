//#region imports
import { ChannelType, EmbedBuilder, User } from "discord.js";
import type { ColorResolvable, CommandInteraction, Guild, GuildMember, InteractionReplyOptions } from "discord.js";
import { base2, checkFor, ephemeral, genericCatch } from "./generalUse.js";
//#endregion

//#region channelCount
export const channelCount = (inObj: { guild: Guild }):{
	textChannels: number | `unknown`,
	voiceChannels: number | `unknown`,
	categories: number | `unknown`,
	unknown: number | `unknown`,
	all: number | `unknown`
} => {
	const categories:string[] = [],
	textChannels:string[] = [],
	unknown:string[] = [],
	voiceChannels:string[] = [];
	inObj.guild.channels.cache.forEach((channel) => {
		switch (channel.type) {
		case ChannelType.GuildText:
			textChannels.push(channel.name);
			break;
		case ChannelType.GuildVoice:
			voiceChannels.push(channel.name);
			break;
		case ChannelType.GuildCategory:
			categories.push(channel.name);
			break;
		default:
			unknown.push(channel.name);
			break;
		}
	});
	return {
		all: textChannels.length+voiceChannels.length+categories.length+unknown.length,
		categories: categories.length,
		textChannels: textChannels.length,
		unknown: unknown.length,
		voiceChannels: voiceChannels.length,
	};
};
//#endregion

//#region userinfo
// eslint-disable-next-line one-var
export const userInfo = async (
	inObj: {
		interaction: CommandInteraction
	}
):Promise<InteractionReplyOptions> => {
	const { guild } = inObj.interaction;
	return {
		content: `test`,
		files: [
			{
				attachment: Buffer.from(JSON.stringify(await guild?.members.fetch(inObj.interaction.user), null, base2)),
				name:`user.json`
			},
			{
				attachment: Buffer.from(JSON.stringify(await inObj.interaction.user.fetch(true), null, base2)),
				name: `member.json`
			}
		]
	} as InteractionReplyOptions;
};
//#endregion

//#region serverinfo
// eslint-disable-next-line one-var
export const serverInfo = (inObjs: Array<{interaction: CommandInteraction}>): void => {
	inObjs.forEach((inObj) => {
		const { guild } = inObj.interaction;
		if (inObj.interaction.guild === null) {
			if ((inObj.interaction.member as GuildMember).user.id === `588511925944582186`) {
				inObj.interaction.reply({
					content: `stop tring to kill me, smh`
				}).catch(genericCatch);
			}
			else {
				inObj.interaction.reply({
					content: `I'm sorry, Dave, but I'm afraid I can't let you do that`
				}).catch(genericCatch);
			}
		}
		else {
			const 
			categories:string[] = [],
			textChannels:string[] = [],
			unknown:string[] = [],
			voiceChannels:string[] = [];
			inObj.interaction.guild.channels.fetch().then((channels) => {
				channels.forEach((channel) => {
					switch (channel?.type) {
					case ChannelType.GuildText:
						textChannels.push(channel.name);
						break;
					case ChannelType.GuildVoice:
						voiceChannels.push(channel.name);
						break;
					case ChannelType.GuildCategory:
						categories.push(channel.name);
						break;
					default:
						unknown.push(channel?.name ? channel.name : ``);
						break;
					}
				});
			}).then(() => {
				const maxChannels = 500,
				snowflakeTimestampBitShift = 22,
				uniqueDefaultAvatars = 6;
				// eslint-disable-next-line one-var
				const embed = new EmbedBuilder().addFields(checkFor([
					{ arr: textChannels, inline: true, str: `Text channels` },
					{ arr: voiceChannels, inline: true, str: `Voice channels` },
					{ arr: categories, inline: true, str: `Categories` },
					{ arr: unknown, inline: true, str: `Other channels` }
				])).addFields([
					{ inline: true, name: `Total channels`, value: (textChannels.length + voiceChannels.length + categories.length + unknown.length).toString() },
					{ inline: true, name: `Channels left`, value: (maxChannels - (textChannels.length + voiceChannels.length + categories.length + unknown.length)).toString() },
					{ inline: true, name: `Members`, value: guild?.memberCount.toString() ?? `error` }
				]).setThumbnail(guild?.iconURL() ?? `https://cdn.discordapp.com/embed/avatars/${(Math.abs(Number.parseInt(guild?.id ?? `0`, 10) >> snowflakeTimestampBitShift) % uniqueDefaultAvatars).toString()}.png`)
					.setColor(`#0099FF`);
					inObj.interaction.reply({ embeds: [embed] }).catch(genericCatch);
				}).catch(genericCatch);
		}
	});
};
//#endregion

//#region join date
// eslint-disable-next-line one-var
export const joindate = (inObj: { interaction: CommandInteraction }):{ embeds: EmbedBuilder[], ephemeral: boolean } => {
	if (!((inObj.interaction.member as GuildMember).user instanceof User)) 
		return { embeds: [new EmbedBuilder], ephemeral };
	const date = new Date((inObj.interaction.member as GuildMember).user.createdTimestamp);
	// eslint-disable-next-line one-var
	const embed:EmbedBuilder = new EmbedBuilder()
		.setColor(`FFFFFF` as ColorResolvable)
		.setTitle(`You joined:`)
		.setThumbnail(`https://cdn.discordapp.com/attachments/656164355381133332/715651846584270899/ezgif-3-ea387cdabbbe.gif`)
		.addFields([
			{
				name: `Date`,
				value: date.toLocaleDateString(`en-GB`, { timeZone: `utc` }),
			},
			{
				name: `Time`,
				value: date.toLocaleTimeString(`en-GB`, { timeZone: `utc`, timeZoneName: `short` }),
			}
		]);
	// eslint-disable-next-line one-var
	const empherealOption = inObj.interaction.options.get(`public`);
	return { embeds: [embed], ephemeral: !empherealOption?.value };
};
//#endregion