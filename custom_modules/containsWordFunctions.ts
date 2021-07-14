import { Message, MessageAdditions, MessageOptions, User } from "discord.js";
//reply
{
	//function int
	{
		var reply = async (message: Message, chance: number, rply: MessageOptions) => {
			if (Math.random() * 100 <= chance) {
				message.channel.startTyping(3)
				.then(() => {message.channel.send(rply)})
				.catch(console.error)
				.then(() => {message.channel.stopTyping(true)})
				.catch(console.error)
			}
		}
	}
	//function ext
	{
		var replyThing = (message: Message, type: `anywhere` | `exact` | `mention`, chance: number, rply: MessageOptions, triggerArr: string[] | `${bigint}`[]) => {
			if (!message.author.bot) {
				if (type === `anywhere`) {
					triggerArr.forEach((trigger) => {
						if (message.content.toLowerCase().includes(trigger as string)) {
							reply(message, chance, rply);
						}
					});
				} else if (type === `exact`) {
					const editedMessage = message.content
					.replace(`.`, ``)
					.replace(`,`, ``)
					.replace(`!`, ``)
					.replace(`?`, ``)
					.replace(`:`, ``);
					message.content.split(` `).forEach((word) => {
						triggerArr.forEach((trigger) => {
							if (word === trigger) {
								reply(message, chance, rply);
							}
						});
					});
				} else if (type === `mention`) {
					triggerArr.forEach((trigger) => {
						if (message.mentions.users.has(trigger as `${bigint}`)) {
							reply(message, chance, rply);
						}
					});
				}
			}
		}
	}
}
//react
{
	//function int
	{
		var react = (message: Message, chance: number, emoteArr: string[]) => {
			if (Math.random() * 100 <= chance) {
				emoteArr.forEach(emote => {
					message.react(emote);
				})
			}
		}
	}
	//Function ext
	{
		var reactThing = (message: Message, type: `anywhere` | `exact` | `mention`, chance: number, emoteArr: string[], triggerArr: string[] | `${bigint}`[]) => {
			if (!message.author.bot) {
				if (type === `anywhere`) {
					triggerArr.forEach((trigger) => {
						if (message.content.toLowerCase().includes(trigger) && Math.random() * 100 <= chance) {
							react(message, chance, emoteArr);
						}
					});
				} else if (type === `exact`) {
					const editedMessage = message.content
					.replace(`.`, ``)
					.replace(`,`, ``)
					.replace(`!`, ``)
					.replace(`?`, ``)
					.replace(`:`, ``);
					message.content.split(` `).forEach((word) => {
						triggerArr.forEach((trigger) => {
							if (word === trigger) {
								react(message, chance, emoteArr);
							}
						});
					});
				} else if (type === `mention`) {
					triggerArr.forEach((trigger) => {
						if (message.mentions.users.has(trigger as `${bigint}`) && Math.random() * 100 <= chance) {
							react(message, chance, emoteArr);
						}
					});
				}
			}
		}
	}
}
module.exports = {replyThing, reactThing};