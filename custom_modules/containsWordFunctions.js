const { Message, MessageAdditions, MessageOptions } = require("discord.js");
//reply
{
	//function int
	{
		/**
		 * 
		 * @param {Message} message 
		 * @param {Number} chance 
		 * @param {MessageOptions} rply 
		 */
		var reply = async (message, chance, rply) => {
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
		/**
		 * 
		 * @param {Message} message Discord.js message object
		 * @param {String} type Anywhere, exact or mention
		 * @param {Number} chance A number between 0 and 100 that decides the percentage of times the function should send a message
		 * @param {MessageAdditions} fileorembed Discord.js messageAdditions object (could probably also ba a messageOptions object)
		 * @param {String} rply Message that the bot should send back
		 * @param {String[]} triggerArr An array of trigger strings
		 */
		var replyThing = (message, type, chance, rply, triggerArr) => {
			if (!message.author.bot) {
				if (type === `anywhere`) {
					triggerArr.forEach((trigger) => {
						if (message.content.toLowerCase().includes(trigger)) {
							reply(message, chance, rply);
						}
					});
				} else if (type === `exact`) {
					editedMessage = message.content
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
						if (message.mentions.users.has(trigger)) {
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
		var react = (message, chance, emoteArr) => {
			if (Math.random() * 100 <= chance) {
				emoteArr.forEach(emote => {
					message.react(emote);
				})
			}
		}
	}
	//Function ext
	{
		/**
		 * 
		 * @param {Message} message Discord.js message object
		 * @param {String} type Anywhere, exact or mention
		 * @param {Number} chance A number between 0 and 100 that decides the percentage of times the function should send a message
		 * @param {String} emoteArr An array of emotes (the number part of the ID or 😃)
		 * @param {String[]} triggerArr An array of trigger strings
		 */
		var reactThing = (message, type, chance, emoteArr, triggerArr) => {
			if (!message.author.bot) {
				if (type === `anywhere`) {
					triggerArr.forEach((trigger) => {
						if (message.content.toLowerCase().includes(trigger) && Math.random() * 100 <= chance) {
							react(message, chance, emoteArr);
						}
					});
				} else if (type === `exact`) {
					editedMessage = message.content
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
						if (message.mentions.users.has(trigger) && Math.random() * 100 <= chance) {
							react(message, chance, emoteArr);
						}
					});
				}
			}
		}
	}
}
module.exports = {replyThing, reactThing};