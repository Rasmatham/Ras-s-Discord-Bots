//reply
{
	//function int
	{
		var reply = async (message, chance, fileorembed, rply) => {
			if (Math.random() * 100 <= chance) {
				message.channel.startTyping(3);
				message.channel.send(rply, fileorembed);
				message.channel.stopTyping(true);
			}
		}
	}
	//function ext
	{
		/**
		 * 
		 * @param {object} message Discord.js message object
		 * @param {string} type Anywhere, exact or mention
		 * @param {number} chance A number between 0 and 100 that decides the percentage of times the function should send a message
		 * @param {object} fileorembed Discord.js messageAdditions object (could probably also ba a messageOptions object)
		 * @param {string} rply Message that the bot should send back
		 * @param {string[]} triggerArr An array of trigger strings
		 */
		var replyThing = (message, type, chance, fileorembed, rply, triggerArr) => {
			if (!message.author.bot) {
				if (type === `anywhere`) {
					triggerArr.forEach((trigger) => {
						if (message.content.toLowerCase().includes(trigger)) {
							reply(message, chance, fileorembed, rply);
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
								reply(message, chance, fileorembed, rply);
							}
						});
					});
				} else if (type === `mention`) {
					triggerArr.forEach((trigger) => {
						if (message.mentions.users.has(trigger)) {
							reply(message, chance, fileorembed, rply);
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
		 * @param {object} message Discord.js message object
		 * @param {string} type Anywhere, exact or mention
		 * @param {number} chance A number between 0 and 100 that decides the percentage of times the function should send a message
		 * @param {string} emoteArr An array of emotes (the number part of the ID or 😃)
		 * @param {string[]} triggerArr An array of trigger strings
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