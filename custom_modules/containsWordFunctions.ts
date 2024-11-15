//#region imports
import {ChannelType, Message, MessageCreateOptions} from "discord.js";
//#endregion

//#region reply

//function int
const reply = (
	inObjs: {
		message: Message,
		chance?: number,
		reply: MessageCreateOptions
	}[]
):void => {
	inObjs.forEach((inObj) => {
		if (typeof inObj.chance == `undefined`) {
			inObj.chance = 100;
		}
		if (Math.random() * 100 <= inObj.chance) {
			if (inObj.message.channel.type === ChannelType.GuildText)
				inObj.message.channel.sendTyping()
					.finally(():void => {
						if (inObj.message.channel.type === ChannelType.GuildText)
							void inObj.message.channel.send(inObj.reply);
					})
					.catch((err: unknown) => {console.error(err)});
		}
	});
};

//function ext
export const replyThing = (
	inObjs: {
		message: Message,
		type: `anywhere` | `exact` | `mention`,
		chance?: number,
		reply: MessageCreateOptions,
		triggers: string[] | `${bigint}`[]
	}[]
):void => {
	inObjs.forEach((inObj) => {
		if (typeof inObj.chance == `undefined`) {
			inObj.chance = 100;
		}
		if (!inObj.message.author.bot) {
			if (inObj.type.toString() == `anywhere`) {
				inObj.triggers.forEach((trigger):void => {
					if (inObj.message.content.toLowerCase().includes(trigger)) {
						reply([
							{
								message: inObj.message,
								chance: inObj.chance,
								reply: inObj.reply
							}
						]);
					}
				});
			}
			else if (inObj.type.toString() == `exact`) {
				inObj.message.content.split(` `).forEach((word):void => {
					inObj.triggers.forEach((trigger):void => {
						if (word == trigger) {
							reply([
								{
									message: inObj.message,
									chance: inObj.chance,
									reply: inObj.reply
								}
							]);
						}
					});
				});
			}
			else if (inObj.type.toString() == `mention`) {
				inObj.triggers.forEach((trigger):void => {
					if (inObj.message.mentions.users.has(trigger as `${bigint}`)) {
						reply([
							{
								message: inObj.message,
								chance: inObj.chance,
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
	
//function int
const react = (
	inObjs: {
		message: Message,
		chance?: number,
		emotes: string[]
	}[]
):void => {
	inObjs.forEach((inObj) => {
		if (typeof inObj.chance == `undefined`) {
			inObj.chance = 100;
		}
		if (Math.random() * 100 <= inObj.chance) {
			inObj.emotes.forEach(emote => {
				void inObj.message.react(emote);
			});
		}
	});
};
	//Function ext
export const reactThing = (
	inObjs: {
		message: Message,
		type: `anywhere` | `exact` | `mention`,
		chance?: number, emotes: string[],
		triggers: string[] | `${bigint}`[]
	}[]
):void => {
	inObjs.forEach((inObj) => {
		if (typeof inObj.chance == `undefined`) {
			inObj.chance = 100;
		}
		if (!inObj.message.author.bot) {
			const chance = inObj.chance;
			if (inObj.type.toString() == `anywhere`) {
				inObj.triggers.forEach((trigger):void => {
					if (inObj.message.content.toLowerCase().includes(trigger) && Math.random() * 100 <= chance) {
						react([
							{
								message: inObj.message,
								chance: inObj.chance,
								emotes: inObj.emotes
							}
						]);
					}
				});
			}
			else if (inObj.type.toString() == `exact`) {
				inObj.message.content.split(` `).forEach((word):void => {
					inObj.triggers.forEach((trigger):void => {
						if (word == trigger) {
							react([
								{
									message: inObj.message,
									chance: inObj.chance,
									emotes: inObj.emotes
								}
							]);
						}
					});
				});
			}
			else if (inObj.type.toString() == `mention`) {
				inObj.triggers.forEach((trigger):void => {
					if (inObj.message.mentions.users.has(trigger as `${bigint}`) && Math.random() * 100 <= chance) {
						react([
							{
								message: inObj.message,
								chance: inObj.chance,
								emotes: inObj.emotes
							}
						]);
					}
				});
			}
		}
	});
};

//#endregion