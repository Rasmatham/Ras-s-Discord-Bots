//#region imports
import {CommandInteraction, EmojiIdentifierResolvable, InteractionReplyOptions, Message, ActionRowBuilder, ButtonBuilder, MessageCreateOptions, TextChannel, ButtonStyle, APIActionRowComponent, APIButtonComponent, APISelectMenuComponent, ChannelType, StringSelectMenuBuilder} from "discord.js";
import {blackList} from "./generalUse.js";
//#endregion

//#region Frick that one rule
export const hencefortifier = (
	inObjs: {
		message: Message
	}[]
):void => {
	inObjs.forEach((inObj) => {
		if (inObj.message.author.id != inObj.message.client.user.id && inObj.message.guild != null && inObj.message.content.toLowerCase().includes(`from now on`)) {
			if (inObj.message.guild.id == `646155122992480266`) {
				const textChannels:`${bigint}`[] = [];
				inObj.message.guild.channels.cache.map((channel):void => {
					if (channel.type == ChannelType.GuildText) {
						blackList.forEach((bannedChannel:string):void => {
							if (channel.name != bannedChannel) {
								textChannels.push(channel.id as `${bigint}`);
							}
						});
					}
				});
				void inObj.message.client.channels.fetch(textChannels[Math.floor(Math.random() * (textChannels.length - 1))])
					.then((channel):void => {
						if (channel != null) {
							channel = channel as TextChannel;
							channel.send(`<@${
								inObj.message.author.id
							}>, you did an oopsie`)
								.catch((err: unknown) => {console.error(err)});
						}
					});
			}
		}
	});
};
//#endregion

//#region Flit no lasting! Flit no lasting! Flit no lasting!
export const userWordBan = (
	inObjs: {
		message: Message,
		word: string,
		userID: `${bigint}`
	}[]
):void => {
	inObjs.forEach((inObj) => {
		if (inObj.message.author.id == inObj.userID) {
			if (inObj.message.content.toLowerCase().includes(inObj.word)) {
				inObj.message.delete()
					.catch((err: unknown) => {console.error(err)});
			}
		}
	});
};
//#endregion

//#region smh, Espen bot doesn't work
export const espenBotReplacement = (
	inObjs: {
		type: `message` | `react`,
		message: Message,
		chance: number,
		victim: `${bigint}`,
		out: MessageCreateOptions | EmojiIdentifierResolvable
	}[]
):void => {
	inObjs.forEach((inObj) => {
		if (inObj.message.author.id == inObj.victim && Math.floor(Math.random() * 100) <= inObj.chance) {
			switch (inObj.type.toString()) {
			case `message`:
				if (inObj.message.channel.type === ChannelType.GuildText)
					inObj.message.channel.send(inObj.out as MessageCreateOptions)
						.catch((err: unknown) => {console.error(err)});
				break;
			case `react`:
				inObj.message.react(inObj.out as EmojiIdentifierResolvable)
					.catch((err: unknown) => {console.error(err)});
				break;
			}
		}
	});
};
//#endregion

//#region interaction tests
export const buttonGrid = (
	inObj: {
		interaction: CommandInteraction
	}
):InteractionReplyOptions => {
	const unicodeEmoji = /^(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])$/gi;
	const discordEmoji = /^<(a?)?:.+?:\d+>$/gi;
	const discordEmojiNotExact = /<(a?)?:.+?:\d+>/gi;
	const buttonContentOption = inObj.interaction.options.get(`button_content`);
	const buttonContent:string = buttonContentOption?.value as string;
	if (buttonContent.length <= 80) {
		if (buttonContent.match(unicodeEmoji) || buttonContent.match(discordEmoji)) {
			const button = (id:string):ButtonBuilder => {
				return new ButtonBuilder().setCustomId(id).setEmoji(buttonContent).setStyle(ButtonStyle.Secondary);
			};
			const bar = (rowNumber:string) => {
				return new ActionRowBuilder().addComponents(
					button(`Dummy: ` + rowNumber + `-1`),
					button(`Dummy: ` + rowNumber + `-2`),
					button(`Dummy: ` + rowNumber + `-3`),
					button(`Dummy: ` + rowNumber + `-4`),
					button(`Dummy: ` + rowNumber + `-5`)
				).toJSON() as APIActionRowComponent<APIButtonComponent>;
			};
			return {
				content: buttonContent,
				components: [
					bar(`1`),
					bar(`2`),
					bar(`3`),
					bar(`4`),
					bar(`5`)
				]
			};
		}
		else if (buttonContent.match(discordEmojiNotExact)) {
			const button = (id:string):ButtonBuilder => {
				return new ButtonBuilder().setCustomId(id).setLabel(buttonContent.replace(discordEmojiNotExact, ``)).setStyle(ButtonStyle.Secondary);
			};
			const bar = (rowNumber:string) => {
				return new ActionRowBuilder().addComponents(
					button(`Dummy: ` + rowNumber + `-1`),
					button(`Dummy: ` + rowNumber + `-2`),
					button(`Dummy: ` + rowNumber + `-3`),
					button(`Dummy: ` + rowNumber + `-4`),
					button(`Dummy: ` + rowNumber + `-5`)
				).toJSON() as APIActionRowComponent<APIButtonComponent>;
			};
			return {
				content: buttonContent.replace(discordEmojiNotExact, ``),
				components: [
					bar(`1`),
					bar(`2`),
					bar(`3`),
					bar(`4`),
					bar(`5`)
				]
			};
		}
		const button = (id:string):ButtonBuilder => {
			return new ButtonBuilder().setCustomId(id).setLabel(buttonContent).setStyle(ButtonStyle.Secondary);
		};
		const bar = (rowNumber:string) => {
			return new ActionRowBuilder().addComponents(
				button(`Dummy: ` + rowNumber + `-1`),
				button(`Dummy: ` + rowNumber + `-2`),
				button(`Dummy: ` + rowNumber + `-3`),
				button(`Dummy: ` + rowNumber + `-4`),
				button(`Dummy: ` + rowNumber + `-5`)
			).toJSON() as APIActionRowComponent<APIButtonComponent>;
		};
		return {
			content: buttonContent,
			components: [
				bar(`1`),
				bar(`2`),
				bar(`3`),
				bar(`4`),
				bar(`5`)
			]
		};
	}
	const button = (id:string):ButtonBuilder => {
		return new ButtonBuilder().setCustomId(id).setLabel(`error`).setStyle(ButtonStyle.Secondary);
	};
	const bar = (rowNumber:string) => {
		return new ActionRowBuilder().addComponents(
			button(`Dummy: ` + rowNumber + `-1`),
			button(`Dummy: ` + rowNumber + `-2`),
			button(`Dummy: ` + rowNumber + `-3`),
			button(`Dummy: ` + rowNumber + `-4`),
			button(`Dummy: ` + rowNumber + `-5`)
		).toJSON() as APIActionRowComponent<APIButtonComponent>;
	};
	return {
		content: buttonContent.replace(discordEmojiNotExact, ``),
		components: [
			bar(`1`),
			bar(`2`),
			bar(`3`),
			bar(`4`),
			bar(`5`)
		]
	};
};
export const selectMenu = ():InteractionReplyOptions => {
	const menu:StringSelectMenuBuilder = new StringSelectMenuBuilder().setCustomId(`Dummy`).setPlaceholder(`Choose wisely`).addOptions([
		{
			label: `Ras is cool`,
			description: `This is the wrong answer`,
			value: `first_option`,
		},
		{
			label: `Ras is cooler than cool`,
			description: `Don't deny it`,
			value: `second_option`,
		},
	]);
	const bar = new ActionRowBuilder().addComponents(
		menu
	).toJSON() as APIActionRowComponent<APISelectMenuComponent>;
	return {
		content: `sample menus:`,
		components: [
			bar
		]
	};
};
//#endregion