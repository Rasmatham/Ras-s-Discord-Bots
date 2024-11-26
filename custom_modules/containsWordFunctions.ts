//#region imports
import type { Message, MessageCreateOptions } from "discord.js";

import { ChannelType } from "discord.js";

import { decimalShift, genericCatch, ShiftBy, toBigInt } from "./generalUse";
//#endregion

//#region reply

// Function int
const reply = (inObjs: Array<{ message: Message, chance?: number, reply: MessageCreateOptions }>): void => {
	inObjs.forEach((inObj) => {
		if (typeof inObj.chance === `undefined`) 
			inObj.chance = 100;
		if (decimalShift(Math.random(), ShiftBy.P2) <= inObj.chance) {
			if (inObj.message.channel.type === ChannelType.GuildText) {
				inObj.message.channel.sendTyping().finally(() => {
					if (inObj.message.channel.type === ChannelType.GuildText)
						inObj.message.channel.send(inObj.reply).catch(genericCatch);
				}).catch(genericCatch);
			}
		}
	});
};

// Function ext
// eslint-disable-next-line one-var
export const replyThing = (inObjs: Array<{ message: Message,type: `anywhere` | `exact` | `mention`,chance?: number,reply: MessageCreateOptions,triggers: Array<`${bigint}`> | string[] }>): void => {
	inObjs.forEach((inObj) => {
		if (typeof inObj.chance === `undefined`) 
			inObj.chance = 100;
		if (!inObj.message.author.bot) {
			if (inObj.type.toString() === `anywhere`) {
				inObj.triggers.forEach((trigger) => {
					if (inObj.message.content.toLowerCase().includes(trigger)) {
						reply([
							{
								chance: inObj.chance,
								message: inObj.message,
								reply: inObj.reply
							}
						]);
					}
				});
			}
			else if (inObj.type.toString() === `exact`) {
				inObj.message.content.split(` `).forEach((word) => {
					inObj.triggers.forEach((trigger) => {
						if (word === trigger) {
							reply([
								{
									chance: inObj.chance,
									message: inObj.message,
									reply: inObj.reply
								}
							]);
						}
					});
				});
			}
			else if (inObj.type.toString() === `mention`) {
				inObj.triggers.forEach((trigger) => {
					if (inObj.message.mentions.users.has(toBigInt(trigger))) {
						reply([
							{
								chance: inObj.chance,
								message: inObj.message,
								reply: inObj.reply
							}
						]);
					}
				});
			}
		}
	});
};

//#endregion

//#region react
	
// Function int
// eslint-disable-next-line one-var
const react = (inObjs: Array<{ message: Message, chance?: number, emotes: string[] }>): void => {
	inObjs.forEach((inObj) => {
		if (typeof inObj.chance === `undefined`) 
			inObj.chance = 100;
		if (decimalShift(Math.random(), ShiftBy.P2) <= inObj.chance) {
			inObj.emotes.forEach(emote => {
				inObj.message.react(emote).catch(genericCatch);
			});
		}
	});
};
// Function ext
// eslint-disable-next-line one-var
export const reactThing = (inObjs: Array<{ message: Message, type: `anywhere` | `exact` | `mention`, chance?: number, emotes: string[], triggers: Array<`${bigint}`> | string[] }>): void => {
	inObjs.forEach((inObj) => {
		if (typeof inObj.chance === `undefined`) 
			inObj.chance = 100;
		if (!inObj.message.author.bot) {
			const { chance } = inObj;
			if (inObj.type.toString() === `anywhere`) {
				inObj.triggers.forEach((trigger) => {
					if (inObj.message.content.toLowerCase().includes(trigger) && decimalShift(Math.random(), ShiftBy.P2) <= chance) {
						react([
							{
								chance: inObj.chance,
								emotes: inObj.emotes,
								message: inObj.message
							}
						]);
					}
				});
			}
			else if (inObj.type.toString() === `exact`) {
				inObj.message.content.split(` `).forEach((word) => {
					inObj.triggers.forEach((trigger) => {
						if (word === trigger) {
							react([
								{
									chance: inObj.chance,
									emotes: inObj.emotes,
									message: inObj.message
								}
							]);
						}
					});
				});
			}
			else if (inObj.type.toString() === `mention`) {
				inObj.triggers.forEach((trigger) => {
					if (inObj.message.mentions.users.has(toBigInt(trigger)) && decimalShift(Math.random(), ShiftBy.P2) <= chance) {
						react([
							{
								chance: inObj.chance,
								emotes: inObj.emotes,
								message: inObj.message
							}
						]);
					}
				});
			}
		}
	});
};

//#endregion