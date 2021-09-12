import {CommandInteraction, EmojiIdentifierResolvable, InteractionReplyOptions, Message, MessageActionRow, MessageButton, MessageOptions, MessageSelectMenu, TextChannel} from "discord.js";
import {blackList} from "./generalUse.js";
//Frick that one rule
export const hencefortifier = (
	inObjs: {
		message: Message
	}[]
):void => {
	inObjs.forEach((inObj) => {
		if (inObj.message.author.id !== inObj.message.client.user.id && inObj.message.guild !== null && inObj.message.content.toLowerCase().includes(`from now on`)) {
			if (inObj.message.guild.id == `646155122992480266`) {
				const textChannels:`${bigint}`[] = [];
				inObj.message.guild.channels.cache.map((channel):void => {
					if (channel.type === `GUILD_TEXT`) {
						blackList.forEach((bannedChannel:string):void => {
							if (channel.name !== bannedChannel) {
								textChannels.push(channel.id as `${bigint}`);
							}
						});
					}
				});
				inObj.message.client.channels.fetch(textChannels[Math.floor(Math.random() * (textChannels.length - 1))])
					.then((channel: TextChannel):void => {
						channel.send(`<@${
							inObj.message.author.id
						}>, you did an oopsie`)
							.catch(console.error);
					});
			}
		}
	});
};
//Flit no lasting! Flit no lasting! Flit no lasting!
export const userWordBan = (
	inObjs: {
		message: Message,
		word: string,
		userID: `${bigint}`
	}[]
):void => {
	inObjs.forEach((inObj) => {
		if (inObj.message.author.id === inObj.userID) {
			if (inObj.message.content.toLowerCase().includes(inObj.word)) {
				inObj.message.delete()
					.catch(console.error);
			}
		}
	});
};
//smh, Espen bot doesn't work
export const espenBotReplacement = (
	inObjs: {
		type: `message` | `react`,
		message: Message,
		chance: number,
		victim: `${bigint}`,
		out: MessageOptions | EmojiIdentifierResolvable
	}[]
):void => {
	inObjs.forEach((inObj) => {
		if (inObj.message.author.id === inObj.victim && Math.floor(Math.random() * 100) <= inObj.chance) {
			switch(inObj.type) {
			case `message`:
				inObj.message.channel.send(inObj.out as MessageOptions)
					.catch(console.error);
				break;
			case `react`:
				inObj.message.react(inObj.out as EmojiIdentifierResolvable)
					.catch(console.error);
				break;
			}
		}
	});
};
//button grid
export const buttonGrid = (
	inObj: {
		interaction: CommandInteraction
	}
):InteractionReplyOptions => {
	const unicodeEmoji = /^(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])$/gi;
	const discordEmoji = /^<(a?)?:.+?:\d+>$/gi;
	const discordEmojiNotExact = /<(a?)?:.+?:\d+>/gi;
	const buttonContent:string = inObj.interaction.options.get(`button_content`).value as string;
	if (buttonContent.length <= 80) {
		if (buttonContent.match(unicodeEmoji) || buttonContent.match(discordEmoji)) {
			const button:MessageButton = new MessageButton().setCustomId(`Dummy`).setEmoji(buttonContent).setStyle(`SECONDARY`);
			const bar:MessageActionRow = new MessageActionRow().addComponents([
				button
			],
			[
				button
			],
			[
				button
			],
			[
				button
			],
			[
				button
			]);
			return {
				content: buttonContent,
				components: [
					bar,
					bar,
					bar,
					bar,
					bar
				]
			};
		}
		else if (buttonContent.match(discordEmojiNotExact)) {
			const button:MessageButton = new MessageButton().setCustomId(`Dummy`).setLabel(buttonContent.replace(discordEmojiNotExact, ``)).setStyle(`SECONDARY`);
			const bar:MessageActionRow = new MessageActionRow().addComponents([
				button
			],
			[
				button
			],
			[
				button
			],
			[
				button
			],
			[
				button
			]);
			return {
				content: buttonContent.replace(discordEmojiNotExact, ``),
				components: [
					bar,
					bar,
					bar,
					bar,
					bar
				]
			};
		}
		const button:MessageButton = new MessageButton().setCustomId(`Dummy`).setLabel(buttonContent).setStyle(`SECONDARY`);
		const bar:MessageActionRow = new MessageActionRow().addComponents([
			button
		],
		[
			button
		],
		[
			button
		],
		[
			button
		],
		[
			button
		]);
		return {
			content: buttonContent,
			components: [
				bar,
				bar,
				bar,
				bar,
				bar
			]
		};
	}
};
export const selectMenu = ():InteractionReplyOptions => {
	const menu:MessageSelectMenu = new MessageSelectMenu().setCustomId(`Dummy`).setPlaceholder(`Choose wisely`).addOptions([
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
	const bar:MessageActionRow = new MessageActionRow().addComponents([
		menu
	]);
	return {
		content: `sample menus:`,
		components: [
			bar
		]
	};
};