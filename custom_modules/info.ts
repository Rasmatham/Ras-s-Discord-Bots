//#region imports
import {CommandInteraction, EmbedBuilder, Guild, User, ColorResolvable, InteractionReplyOptions, GuildMember, ChannelType} from "discord.js";
import {checkFor} from "./generalUse.js";
//#endregion

//#region channelCount
export const channelCount = (
	inObj: {
		guild: Guild
	}
):{
	textChannels: number | `unknown`,
	voiceChannels: number | `unknown`,
	Categories: number | `unknown`,
	Unknown: number | `unknown`,
	all: number | `unknown`
} => {
	const TC:string[] = [];
	const VC:string[] = [];
	const Cat:string[] = [];
	const UK:string[] = [];
	inObj.guild.channels.cache.map((channel) => {
		switch (channel.type) {
		case ChannelType.GuildText:
			TC.push(channel.name);
			break;
		case ChannelType.GuildVoice:
			VC.push(channel.name);
			break;
		case ChannelType.GuildCategory:
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
};
//#endregion

//#region userinfo
export const userInfo = async (
	inObj: {
		interaction: CommandInteraction
	}
):Promise<InteractionReplyOptions> => {
	const guild = inObj.interaction.guild;
	return {
		content: `test`,
		files: [
			{
				attachment: Buffer.from(JSON.stringify(await guild?.members.fetch(inObj.interaction.user), null, 2)),
				name:`user.json`
			},
			{
				attachment: Buffer.from(JSON.stringify(await inObj.interaction.user.fetch(true), null, 2)),
				name: `member.json`
			}
		]
	} as InteractionReplyOptions;
};
//#endregion

//#region serverinfo
export const serverInfo = (
	inObjs: {
		interaction: CommandInteraction
	}[]
) => {
	inObjs.forEach((inObj) => {
		const guild = inObj.interaction.guild;
		if (inObj.interaction.guild != null) {
			const textChannels:string[] = [];
			const voiceChannels:string[] = [];
			const categories:string[] = [];
			const unknown:string[] = [];
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
			})
				.then(() => {
					const embed = new EmbedBuilder().addFields(checkFor(
						[
							{
								arr: textChannels,
								str: `Text channels`,
								inline: true
							},
							{
								arr: voiceChannels,
								str: `Voice channels`,
								inline: true
							},
							{
								arr: categories,
								str: `Categories`,
								inline: true
							},
							{
								arr: unknown,
								str: `Other channels`,
								inline: true
							},
						]
					)).addFields(
						[
							{
								name: `Total channels`,
								value: (textChannels.length + voiceChannels.length + categories.length + unknown.length).toString(),
								inline: true
							},
							{
								name: `Channels left`,
								value: (500 - (textChannels.length + voiceChannels.length + categories.length + unknown.length)).toString(),
								inline: true
							},
							{
								name: `Members`,
								value: guild?.memberCount.toString() ?? `error`,
								inline: true
							},
						]
					).setThumbnail(guild?.iconURL() ?? `https://cdn.discordapp.com/embed/avatars/${(Math.abs(Number.parseInt(guild?.id ?? `0`) >> 22) % 6).toString()}.png`)
						.setColor(`#0099FF`);
					inObj.interaction.reply({
						embeds: [embed]
					}).catch((err: unknown) => {console.error(err)});
				})
				.catch((err: unknown) => {console.error(err)});
		}
		else {
			if ((inObj.interaction.member as GuildMember).user.id == `588511925944582186`) {
				inObj.interaction.reply({
					content: `stop tring to kill me, smh`
				}).catch((err: unknown) => {console.error(err)});
			}
			else {
				inObj.interaction.reply({
					content: `I'm sorry, Dave, but I'm afraid I can't let you do that`
				}).catch((err: unknown) => {console.error(err)});
			}
		}
	});
};
//#endregion

//#region join date
export const joindate = (
	inObj: {
		interaction: CommandInteraction
	}
):{
	embeds: EmbedBuilder[],
	ephemeral: boolean
} => {
	if (!((inObj.interaction.member as GuildMember).user instanceof User)) {
		return {embeds: [new EmbedBuilder], ephemeral: true};
	}
	const ms:number = (inObj.interaction.member as GuildMember).user.createdTimestamp;
	const date:Date = new Date(ms);
	const embed:EmbedBuilder = new EmbedBuilder()
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
	const empherealOption = inObj.interaction.options.get(`public`);
	return {
		embeds: [
			embed
		],
		ephemeral: !empherealOption?.value
	};
};
//#endregion