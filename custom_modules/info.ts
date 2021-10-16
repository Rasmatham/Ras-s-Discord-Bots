//#region imports
import {CommandInteraction, MessageEmbed, Guild, User, ColorResolvable, InteractionReplyOptions, MessageAttachment} from "discord.js";
import {checkFor} from "./generalUse.js";
//#endregion

//#region channelCount
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
//#endregion

//#region userinfo
export const userInfo = async (
	inObj: {
		interaction: CommandInteraction
	}
):Promise<InteractionReplyOptions> => {
	return {
		content: `test`,
		files: [
			new MessageAttachment(Buffer.from(JSON.stringify(await inObj.interaction.guild.members.fetch(inObj.interaction.user), null, 2)), `user.json`),
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
		if (inObj.interaction.guild !== null) {
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
					const embed = new MessageEmbed().addFields(checkFor(
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
								value: inObj.interaction.guild.memberCount.toString(),
								inline: true
							},
						]
					).setThumbnail(inObj.interaction.guild.iconURL())
						.setColor(`#0099FF`);
					inObj.interaction.reply({
						embeds: [embed]
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
//#endregion

//#region join date
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
//#endregion