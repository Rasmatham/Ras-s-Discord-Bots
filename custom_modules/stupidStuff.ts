//#region imports
import { ActionRowBuilder, ButtonBuilder, ButtonStyle, ChannelType, CommandInteraction, EmojiIdentifierResolvable, InteractionReplyOptions, Message, MessageCreateOptions, StringSelectMenuBuilder } from "discord.js";
import { blackList, genericCatch } from "./generalUse.js";
//#endregion

//#region Frick that one rule
export const hencefortifier = (inObjs: { message: Message }[]) => {
	inObjs.forEach((inObj) => {
		if (inObj.message.author.id !== inObj.message.client.user.id && inObj.message.guild !== null && inObj.message.content.toLowerCase().includes(`from now on`)) {
			if (inObj.message.guild.id === `646155122992480266`) {
				const textChannels:`${bigint}`[] = [];
				inObj.message.guild.channels.cache.forEach((channel) => {
					if (channel.type === ChannelType.GuildText) {
						blackList.forEach((bannedChannel:string) => {
							if (channel.name !== bannedChannel)
								textChannels.push(channel.id as `${bigint}`);
						});
					}
				});
				inObj.message.client.channels.fetch(textChannels[Math.floor(Math.random() * (textChannels.length - 1))]).then((channel) => {
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
export const userWordBan = (inObjs: { message: Message, word: string, userID: `${bigint}` }[]) => {
	inObjs.forEach((inObj) => {
		if (inObj.message.author.id === inObj.userID) {
			if (inObj.message.content.toLowerCase().includes(inObj.word))
				inObj.message.delete().catch(genericCatch);
		}
	});
};
//#endregion

//#region smh, Espen bot doesn't work
/* eslint-disable @typescript-eslint/no-shadow */
export enum EBTypes {
	Message,
	React
}
/* eslint-enable @typescript-eslint/no-shadow */

// eslint-disable-next-line one-var
export const espenBotReplacement = (inObjs: { type: EBTypes, message: Message, chance: number, victim: `${bigint}`, out: MessageCreateOptions | EmojiIdentifierResolvable}[]) => {
	inObjs.forEach((inObj) => {
		if (inObj.message.author.id === inObj.victim && Math.floor(Math.random() * 100) <= inObj.chance) {
			switch (inObj.type) {
				case EBTypes.Message:
					if (inObj.message.channel.type === ChannelType.GuildText)
						inObj.message.channel.send(inObj.out as MessageCreateOptions).catch(genericCatch);
					break;
				case EBTypes.React:
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
	unicodeEmoji = /^\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff]$/gui
	if (buttonContent.length <= 80) {
		if (buttonContent.match(unicodeEmoji) || buttonContent.match(discordEmoji)) {
			const button = (id:string) => new ButtonBuilder().setCustomId(id).setEmoji(buttonContent).setStyle(ButtonStyle.Secondary);
			// eslint-disable-next-line one-var
			const bar = (rowNumber:string) => new ActionRowBuilder<ButtonBuilder>().addComponents([
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
			const bar = (rowNumber:string) => new ActionRowBuilder<ButtonBuilder>().addComponents([
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
		const bar = (rowNumber:string) => new ActionRowBuilder<ButtonBuilder>().addComponents([
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
	const bar = (rowNumber:string) => new ActionRowBuilder<ButtonBuilder>().addComponents(
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
		components: [ bar ],
		content: `sample menus:`
	};
};
//#endregion