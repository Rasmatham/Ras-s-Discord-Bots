const { Message, MessageAttachment, TextChannel, WebhookClient, Client, MessageEmbed } = require(`discord.js`);
//intents
{
	var intents = [`GUILDS`, `GUILD_MEMBERS`, `GUILD_BANS`, `GUILD_EMOJIS`, `GUILD_INTEGRATIONS`, `GUILD_WEBHOOKS`, `GUILD_INVITES`, `GUILD_VOICE_STATES`, `GUILD_PRESENCES`, `GUILD_MESSAGES`, `GUILD_MESSAGE_REACTIONS`, `GUILD_MESSAGE_TYPING`, `DIRECT_MESSAGES`, `DIRECT_MESSAGE_REACTIONS`, `DIRECT_MESSAGE_TYPING`];
}
//Message class
{
	/**
	* 
	* @param {string} text 
	* @param {MessageAttachment[]} files 
	* @param {MessageEmbed} embed 
	*/
	var messageFormat = (text = undefined, files = undefined, embed = undefined) => {
		return [text, {files, embed}];
	}
}
//Check amount
{
	/**
	* 
	* @param {String[]} arr 
	* @param {String} str 
	* @returns {String} Returns the string and the amount of elements in the array
	*/
	var checkFor = (arr, str) => {
		if (arr.length > 0) {
			return `${str} ${arr.length}\n`;
		} else {
			return ``;
		}
	}
}
//send as webhook
{
	/**
	* 
	* @param {Message} message Discord.js Message object
	* @param {TextChannel} sendTo Discord.js TextChannel object that a message should be sent to
	* @param {String} sendMessage The message that the webhook should send
	* @param {String} name The name the webhook should use for the message
	* @param {URL} PFP The image the webhook should use as a PFP for the message
	*/
	var sendAsWebHook = (message, sendTo, sendMessage, name, PFP) => {
		let webHookFunction = () => {
			sendTo.fetchWebhooks()
			.then((webHooks) => {
				if (webHooks.size <= 0) {
					sendTo.createWebhook(`${message.client.user.username}-Webhook`)
					.then(() => {
						webHookFunction(message.client)
					})
					.catch((err) => {
                        console.error(err)
						message.channel.send(`Something went wrong`)
                        .catch(console.error)
					})
				}
				let i = 0;
				for (webHook of webHooks.values()) {
					if (webHook.owner.id === message.client.user.id) {
						let myWebHook = new WebhookClient(webHook.id, webHook.token)
						myWebHook.edit({ name: name, avatar: PFP })
                        .catch(console.error)
						.then((editedWebHook) => {
							if(typeof sendMessage.content !== `string` || sendMessage.content === ``){
								sendMessage.content = ` `;
								editedWebHook.send(sendMessage)
								.catch(console.error)
							} else {
								editedWebHook.send(sendMessage)
								.catch(console.error)
							}
						})
                        .catch(console.error)
						break
					} else if (i >= webHooks.size - 1) {
						sendTo.createWebhook(`${message.client.user.username}-Webhook`)
						.then(() => {
							webHookFunction(message.client)
						})
						.catch((err) => {
							console.error(err)
							message.channel.send(`Something went wrong`)
							.catch(console.error)
						})
					};
					i++
				}
			})
			.catch(console.error)
		}
		webHookFunction(message.client)
	}
}
//Bot check
{
	/**
	* 
	* @param {Client[]} bots
	*/
	var botReady = (bots) => {
		bots.forEach((bot) => {
			bot.on(`ready`, () => {
				console.log(`${bot.user.username} is online`);
			})
		})
	}
}

var blackList = [`announcements`, `6-hour-cooldown`, `rules`, `polls`, `stalking-tips`, `rules-for-new-mods`, `serious`, `gif-only-conversation`, `love-advice`, `inspiration`];
module.exports = {intents, messageFormat, checkFor, sendAsWebHook, botReady, blackList};