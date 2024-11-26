// #region imports
import type { CommandInteraction, Guild, InteractionReplyOptions } from "discord.js";

import { ChannelType, EmbedBuilder, User } from "discord.js";

import { base2, checkFor, ephemeral, genericCatch, inc, zero } from "./generalUse.js";
// #endregion

// #region channelCount
export const channelCount = (inObj: { guild: Guild }): {
	all: number,
	announcementChannels: number,
	categories: number,
	forumChannels: number,
	mediaChannels: number,
	stageChannels: number,
	textChannels: number,
	threads: number,
	unknown: number,
	voiceChannels: number
} => {
	let announcementChannels: number, categories: number, forumChannels: number, mediaChannels: number, stageChannels: number, textChannels: number, threads: number, unknown: number, voiceChannels: number;
	announcementChannels = zero;
	categories = zero;
	forumChannels = zero;
	mediaChannels = zero;
	stageChannels = zero;
	textChannels = zero;
	threads = zero;
	unknown = zero;
	voiceChannels = zero;
	inObj.guild.channels.cache.forEach((channel) => {
		switch (channel.type) {
			case ChannelType.AnnouncementThread:
			case ChannelType.PrivateThread:
			case ChannelType.PublicThread:
				threads += inc;
				break;
			case ChannelType.GuildAnnouncement:
				announcementChannels += inc;
				break;
			case ChannelType.GuildCategory:
				categories += inc;
				break;
			case ChannelType.GuildForum:
				forumChannels += inc;
				break;
			case ChannelType.GuildMedia:
				mediaChannels += inc;
				break;
			case ChannelType.GuildStageVoice:
				stageChannels += inc;
				break;
			case ChannelType.GuildText:
				textChannels += inc;
				break;
			case ChannelType.GuildVoice:
				voiceChannels += inc;
				break;
			default:
				unknown += inc;
				break;
		}
	});
	return {
		all: announcementChannels + categories + forumChannels + mediaChannels + stageChannels + textChannels + unknown + voiceChannels,
		announcementChannels,
		categories,
		forumChannels,
		mediaChannels,
		stageChannels,
		textChannels,
		threads,
		unknown,
		voiceChannels
	};
};
// #endregion

// #region userinfo
// eslint-disable-next-line one-var
export const userInfo = async (
	inObj: {
		interaction: CommandInteraction
	}
): Promise<InteractionReplyOptions> => {
	const { guild } = inObj.interaction;
	return {
		content: `test`,
		files: [
			{
				attachment: Buffer.from(JSON.stringify(await guild?.members.fetch(inObj.interaction.user), null, base2)),
				name: `user.json`
			},
			{
				attachment: Buffer.from(JSON.stringify(await inObj.interaction.user.fetch(true), null, base2)),
				name: `member.json`
			}
		]
	} as InteractionReplyOptions;
};
// #endregion

// #region serverinfo
// eslint-disable-next-line one-var
export const serverInfo = (inObjs: Array<{ interaction: CommandInteraction }>): void => {
	inObjs.forEach((inObj) => {
		const { guild } = inObj.interaction;
		if (inObj.interaction.guild === null) {
			if (inObj.interaction.member?.user.id === `588511925944582186`) {
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
			let announcementChannels: number, categories: number, forumChannels: number, mediaChannels: number, stageChannels: number, textChannels: number, unknown: number, voiceChannels: number;
			announcementChannels = zero;
			categories = zero;
			forumChannels = zero;
			mediaChannels = zero;
			stageChannels = zero;
			textChannels = zero;
			unknown = zero;
			voiceChannels = zero;
			inObj.interaction.guild.channels.fetch().then((channels) => {
				channels.forEach((channel) => {
					if (channel === null) return;
					switch (channel.type) {
						case ChannelType.GuildAnnouncement:
							announcementChannels += inc;
							break;
						case ChannelType.GuildCategory:
							categories += inc;
							break;
						case ChannelType.GuildForum:
							forumChannels += inc;
							break;
						case ChannelType.GuildMedia:
							mediaChannels += inc;
							break;
						case ChannelType.GuildStageVoice:
							stageChannels += inc;
							break;
						case ChannelType.GuildText:
							textChannels += inc;
							break;
						case ChannelType.GuildVoice:
							voiceChannels += inc;
							break;
						default:
							unknown += inc;
							break;
					}
				});
			}).then(() => {
				const currentChannels = announcementChannels + categories + forumChannels + mediaChannels + stageChannels + textChannels + unknown + voiceChannels,
					inline = true,
					maxChannels = 500,
					snowflakeTimestampBitShift = 22,
					uniqueDefaultAvatars = 6;
				// eslint-disable-next-line one-var
				const embed = new EmbedBuilder().addFields(checkFor([
					{ channels: textChannels, inline, str: `Text channels` },
					{ channels: voiceChannels, inline, str: `Voice channels` },
					{ channels: categories, inline, str: `Categories` },
					{ channels: announcementChannels, inline, str: `Announcement channels` },
					{ channels: forumChannels, inline, str: `Forum channels` },
					{ channels: mediaChannels, inline, str: `Media channels` },
					{ channels: stageChannels, inline, str: `Stage channels` },
					{ channels: unknown, inline, str: `Unknown channels` }
				])).addFields([
					{ inline, name: `Total channels`, value: (currentChannels).toString() },
					{ inline, name: `Channels left`, value: (maxChannels - currentChannels).toString() },
					{ inline, name: `Members`, value: guild?.memberCount.toString() ?? `error` }
				]).setThumbnail(guild?.iconURL() ?? `https://cdn.discordapp.com/embed/avatars/${(Math.abs(Number.parseInt(guild?.id ?? `0`, 10) >> snowflakeTimestampBitShift) % uniqueDefaultAvatars).toString()}.png`)
					.setColor(`#0099FF`);
				inObj.interaction.reply({ embeds: [embed] }).catch(genericCatch);
			}).catch(genericCatch);
		}
	});
};
// #endregion

// #region join date
// eslint-disable-next-line one-var
export const joindate = (inObj: { interaction: CommandInteraction }): InteractionReplyOptions => {
	if (!(inObj.interaction.member?.user instanceof User))
		return { embeds: [new EmbedBuilder()], ephemeral };
	const date = new Date(inObj.interaction.member.user.createdTimestamp);
	// eslint-disable-next-line one-var
	const embed: EmbedBuilder = new EmbedBuilder()
		.setColor(`#FFFFFF`)
		.setTitle(`You joined:`)
		.setThumbnail(`https://cdn.discordapp.com/attachments/656164355381133332/715651846584270899/ezgif-3-ea387cdabbbe.gif`)
		.addFields([
			{
				name: `Date`,
				value: date.toLocaleDateString(`en-GB`, { timeZone: `utc` })
			},
			{
				name: `Time`,
				value: date.toLocaleTimeString(`en-GB`, { timeZone: `utc`, timeZoneName: `short` })
			}
		]);
	// eslint-disable-next-line one-var
	const empherealOption = inObj.interaction.options.get(`public`);
	if (typeof empherealOption?.value !== `boolean`)
		return {};
	return { embeds: [embed], ephemeral: !empherealOption.value };
};
// #endregion
