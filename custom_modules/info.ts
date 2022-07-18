//#region imports
import {CommandInteraction, EmbedBuilder, Guild, User, ColorResolvable, InteractionReplyOptions, MessageAttachment, CommandInteractionOption, GuildMember} from "discord.js";
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
	if (inObj.guild != null) {
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
	return {
		textChannels: `unknown`,
		voiceChannels: `unknown`,
		Categories: `unknown`,
		Unknown: `unknown`,
		all: `unknown`
	};
};
//#endregion

//#region userinfo
export const userInfo = async (
	inObj: {
		interaction: CommandInteraction
	}
):Promise<InteractionReplyOptions> => {
	const guild = inObj.interaction.guild as Guild;
	return {
		content: `test`,
		files: [
			new MessageAttachment(Buffer.from(JSON.stringify(await guild.members.fetch(inObj.interaction.user), null, 2)), `user.json`),
			new MessageAttachment(Buffer.from(JSON.stringify(await inObj.interaction.user.fetch(true), null, 2)), `member.json`)
		]
	} as InteractionReplyOptions;
};
//#endregion

//#region serverinfo
export const serverInfo = (
	inObjs: {
		interaction: CommandInteraction
	}[]
):void => {
	inObjs.forEach((inObj) => {
		const guild = inObj.interaction.guild as Guild;
		if (inObj.interaction.guild != null) {
			const textChannels:string[] = [];
			const voiceChannels:string[] = [];
			const categories:string[] = [];
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
						categories.push(channel.name);
						break;
					default:
						unknown.push(channel.name);
						break;
					}
				});
			})
				.then(():void => {
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
								value: guild.memberCount.toString(),
								inline: true
							},
						]
					).setThumbnail(guild.iconURL() as string)
						.setColor(`#0099FF`);
					inObj.interaction.reply({
						embeds: [embed]
					});
				})
				.catch(console.error);
		}
		else {
			if ((inObj.interaction.member as GuildMember).user.id == `588511925944582186`) {
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
	const empherealOption = inObj.interaction.options.get(`public`) as CommandInteractionOption;
	return {
		embeds: [
			embed
		],
		ephemeral: !empherealOption.value
	};
};
//#endregion