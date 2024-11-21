//#region imports
import { ActionRowBuilder, ButtonBuilder, ButtonStyle, ChannelType, StringSelectMenuBuilder } from "discord.js";
import type { CommandInteraction, EmojiIdentifierResolvable, InteractionReplyOptions, Message, MessageCreateOptions } from "discord.js";
import { ShiftBy, blackList, decimalShift, genericCatch, offByOne } from "./generalUse.js";
//#endregion

//#region Frick that one rule
export const hencefortifier = (inObjs: Array<{ message: Message }>): void => {
	inObjs.forEach((inObj) => {
		if (inObj.message.author.id !== inObj.message.client.user.id && inObj.message.guild !== null && inObj.message.content.toLowerCase().includes(`from now on`)) {
			if (inObj.message.guild.id === `646155122992480266`) {
				const textChannels:Array<`${bigint}`> = [];
				inObj.message.guild.channels.cache.forEach((channel) => {
					if (channel.type === ChannelType.GuildText) {
						blackList.forEach((bannedChannel:string) => {
							if (channel.name !== bannedChannel)
								textChannels.push(channel.id as `${bigint}`);
						});
					}
				});
				inObj.message.client.channels.fetch(textChannels[Math.floor(Math.random() * (textChannels.length - offByOne))]).then((channel) => {
					if (channel?.isSendable())
						channel.send(`<@${inObj.message.author.id}>, you did an oopsie`).catch(genericCatch);
				}).catch(genericCatch);
			}
		}
	});
};
//#endregion

//#region Flit no lasting! Flit no lasting! Flit no lasting!
// eslint-disable-next-line one-var
export const userWordBan = (inObjs: Array<{ message: Message, word: string, userId: `${bigint}` }>): void => {
	inObjs.forEach((inObj) => {
		if (inObj.message.author.id === inObj.userId) {
			if (inObj.message.content.toLowerCase().includes(inObj.word))
				inObj.message.delete().catch(genericCatch);
		}
	});
};
//#endregion

//#region smh, Espen bot doesn't work
export enum ReactionTypes {
	Message,
	React
}

// eslint-disable-next-line one-var
export const espenBotReplacement = (inObjs: Array<{ type: ReactionTypes, message: Message, chance: number, victim: `${bigint}`, out: MessageCreateOptions | EmojiIdentifierResolvable}>): void => {
	inObjs.forEach((inObj) => {
		if (inObj.message.author.id === inObj.victim && Math.floor(decimalShift(Math.random(), ShiftBy.P2)) <= inObj.chance) {
			switch (inObj.type) {
				case ReactionTypes.Message:
					if (inObj.message.channel.type === ChannelType.GuildText)
						inObj.message.channel.send(inObj.out as MessageCreateOptions).catch(genericCatch);
					break;
				case ReactionTypes.React:
					inObj.message.react(inObj.out as EmojiIdentifierResolvable).catch(genericCatch);
					break;
				default: {
					break;
				}
			}
		}
	});
};
//#endregion

//#region interaction tests
// eslint-disable-next-line one-var
export const buttonGrid = (inObj: {interaction: CommandInteraction}):InteractionReplyOptions => {
	const buttonContent:string = inObj.interaction.options.get(`button_content`)?.value as string,
	discordEmoji = /^<(?:a?)?:.+?:\d+>$/gui,
	discordEmojiNotExact = /<(?:a?)?:.+?:\d+>/giu,
	maxLabelLength = 80,
	unicodeEmoji = /^\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff]$/gui;
	if (buttonContent.length <= maxLabelLength) {
		if (buttonContent.match(unicodeEmoji) || buttonContent.match(discordEmoji)) {
			const button = (id:string): ButtonBuilder => new ButtonBuilder().setCustomId(id).setEmoji(buttonContent).setStyle(ButtonStyle.Secondary);
			// eslint-disable-next-line one-var
			const bar = (rowNumber:string): ActionRowBuilder<ButtonBuilder> => new ActionRowBuilder<ButtonBuilder>().addComponents([
				button(`Dummy: ${rowNumber}-1`),
				button(`Dummy: ${rowNumber}-2`),
				button(`Dummy: ${rowNumber}-3`),
				button(`Dummy: ${rowNumber}-4`),
				button(`Dummy: ${rowNumber}-5`)
			]);
			return {
				components: [
					bar(`1`),
					bar(`2`),
					bar(`3`),
					bar(`4`),
					bar(`5`)
				],
				content: buttonContent
			};
		}
		else if (buttonContent.match(discordEmojiNotExact)) {
			const button = (id:string):ButtonBuilder => new ButtonBuilder().setCustomId(id).setLabel(buttonContent.replace(discordEmojiNotExact, ``)).setStyle(ButtonStyle.Secondary);
			// eslint-disable-next-line one-var
			const bar = (rowNumber:string): ActionRowBuilder<ButtonBuilder> => new ActionRowBuilder<ButtonBuilder>().addComponents([
				button(`Dummy: ${rowNumber}-1`),
				button(`Dummy: ${rowNumber}-2`),
				button(`Dummy: ${rowNumber}-3`),
				button(`Dummy: ${rowNumber}-4`),
				button(`Dummy: ${rowNumber}-5`)
			]);
			return {
				components: [
					bar(`1`),
					bar(`2`),
					bar(`3`),
					bar(`4`),
					bar(`5`)
				],
				content: buttonContent.replace(discordEmojiNotExact, ``)
			};
		}
		const button = (id:string):ButtonBuilder => new ButtonBuilder().setCustomId(id).setLabel(buttonContent).setStyle(ButtonStyle.Secondary);
		// eslint-disable-next-line one-var
		const bar = (rowNumber:string): ActionRowBuilder<ButtonBuilder> => new ActionRowBuilder<ButtonBuilder>().addComponents([
			button(`Dummy: ${rowNumber}-1`),
			button(`Dummy: ${rowNumber}-2`),
			button(`Dummy: ${rowNumber}-3`),
			button(`Dummy: ${rowNumber}-4`),
			button(`Dummy: ${rowNumber}-5`)
		]);
		return {
			components: [
				bar(`1`),
				bar(`2`),
				bar(`3`),
				bar(`4`),
				bar(`5`)
			],
			content: buttonContent
		};
	}
	// eslint-disable-next-line one-var
	const button = (id:string):ButtonBuilder => new ButtonBuilder().setCustomId(id).setLabel(`error`).setStyle(ButtonStyle.Secondary);
	// eslint-disable-next-line one-var
	const bar = (rowNumber:string): ActionRowBuilder<ButtonBuilder> => new ActionRowBuilder<ButtonBuilder>().addComponents(
			button(`Dummy: ${rowNumber}-1`),
			button(`Dummy: ${rowNumber}-2`),
			button(`Dummy: ${rowNumber}-3`),
			button(`Dummy: ${rowNumber}-4`),
			button(`Dummy: ${rowNumber}-5`)
		);
	return {
		components: [
			bar(`1`),
			bar(`2`),
			bar(`3`),
			bar(`4`),
			bar(`5`)
		],
		content: buttonContent.replace(discordEmojiNotExact, ``)
	};
};

// eslint-disable-next-line one-var
export const selectMenu = ():InteractionReplyOptions => {
	const bar = new ActionRowBuilder<StringSelectMenuBuilder>()
		.addComponents([
			new StringSelectMenuBuilder()
				.setCustomId(`Dummy`)
				.setPlaceholder(`Choose wisely`)
				.addOptions([
					{
						description: `This is the wrong answer`,
						label: `Ras is cool`,
						value: `first_option`,
					},
					{
						description: `Don't deny it`,
						label: `Ras is cooler than cool`,
						value: `second_option`,
					},
				])
		]);
	return {
		components: [bar],
		content: `sample menus:`
	};
};
//#endregion