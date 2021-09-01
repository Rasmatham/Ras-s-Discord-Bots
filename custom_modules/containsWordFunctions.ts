import { Message, MessageOptions } from "discord.js";
//reply

//function int
const reply = async (message: Message, chance: number, rply: MessageOptions):Promise<void> => {
	if (Math.random() * 100 <= chance) {
		message.channel.sendTyping()
			.finally(():void => {message.channel.send(rply);})
			.catch(console.error);
	}
};
//function ext
export const replyThing = (message: Message, type: `anywhere` | `exact` | `mention`, chance: number, rply: MessageOptions, triggerArr: string[] | `${bigint}`[]):void => {
	if (!message.author.bot) {
		if (type === `anywhere`) {
			triggerArr.forEach((trigger):void => {
				if (message.content.toLowerCase().includes(trigger as string)) {
					reply(message, chance, rply);
				}
			});
		} else if (type === `exact`) {
			message.content.split(` `).forEach((word):void => {
				triggerArr.forEach((trigger):void => {
					if (word === trigger) {
						reply(message, chance, rply);
					}
				});
			});
		} else if (type === `mention`) {
			triggerArr.forEach((trigger):void => {
				if (message.mentions.users.has(trigger as `${bigint}`)) {
					reply(message, chance, rply);
				}
			});
		}
	}
};
//react

//function int
const react = (message: Message, chance: number, emoteArr: string[]):void => {
	if (Math.random() * 100 <= chance) {
		emoteArr.forEach(emote => {
			message.react(emote);
		});
	}
};
//Function ext
export const reactThing = (message: Message, type: `anywhere` | `exact` | `mention`, chance: number, emoteArr: string[], triggerArr: string[] | `${bigint}`[]):void => {
	if (!message.author.bot) {
		if (type === `anywhere`) {
			triggerArr.forEach((trigger):void => {
				if (message.content.toLowerCase().includes(trigger) && Math.random() * 100 <= chance) {
					react(message, chance, emoteArr);
				}
			});
		} else if (type === `exact`) {
			message.content.split(` `).forEach((word):void => {
				triggerArr.forEach((trigger):void => {
					if (word === trigger) {
						react(message, chance, emoteArr);
					}
				});
			});
		} else if (type === `mention`) {
			triggerArr.forEach((trigger):void => {
				if (message.mentions.users.has(trigger as `${bigint}`) && Math.random() * 100 <= chance) {
					react(message, chance, emoteArr);
				}
			});
		}
	}
};