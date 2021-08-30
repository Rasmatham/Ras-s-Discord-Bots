import { Message, MessageAttachment, TextChannel, WebhookClient, Client, MessageEmbed, MessageOptions, Webhook, BufferResolvable, User, Intents, NewsChannel, ThreadChannel } from "discord.js";
//intent
export var intents = new Intents([`GUILDS`, `GUILD_MEMBERS`, `GUILD_BANS`, `GUILD_EMOJIS_AND_STICKERS`, `GUILD_INTEGRATIONS`, `GUILD_WEBHOOKS`, `GUILD_INVITES`, `GUILD_VOICE_STATES`, `GUILD_PRESENCES`, `GUILD_MESSAGES`, `GUILD_MESSAGE_REACTIONS`, `GUILD_MESSAGE_TYPING`, `DIRECT_MESSAGES`, `DIRECT_MESSAGE_REACTIONS`, `DIRECT_MESSAGE_TYPING`]);

//Check amount
export var checkFor = (arr: string[], str: string): string => {
	if (arr.length > 0) {
		return `${str} ${arr.length}\n`;
	} else {
		return ``;
	}
}
//send as webhook
export var sendAsWebHook = (message: Message, sendTo: TextChannel | NewsChannel, sendMessage: MessageOptions, name: string, PFP: BufferResolvable):void => {
	let webHookFunction = () => {
		sendTo.fetchWebhooks()
		.then((webHooks) => {
			if (webHooks.size <= 0) {
				sendTo.createWebhook(`${message.client.user.username}-Webhook`)
				.then(() => {
					webHookFunction()
				})
				.catch((err) => {
					console.error(err)
					message.channel.send(`Something went wrong`)
					.catch(console.error)
				})
			}
			let i = 0;
			webHooks.map((webHook: Webhook) => {
				if(webHook.owner instanceof User){
					if (webHook.owner.id === message.client.user.id) {
						let myWebHook = new WebhookClient({id: webHook.id, token: webHook.token})
						myWebHook.edit({ name: name, avatar: PFP})
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
					} else if (i >= webHooks.size - 1) {
						sendTo.createWebhook(`${message.client.user.username}-Webhook`)
						.then(() => {
							webHookFunction()
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
		})
		.catch(console.error)
	}
	webHookFunction()
}
//Bot check
export var botReady = (bots: Client[]) => {
	bots.forEach((bot) => {
		/*bot.on('debug', console.log)
		.on('warn', console.log)*/
		bot.on(`ready`, () => {
			console.log(`${bot.user.username} is online`);
		})
	})
}

export var blackList:string[] = [`announcements`, `6-hour-cooldown`, `rules`, `polls`, `stalking-tips`, `rules-for-new-mods`, `serious`, `gif-only-conversation`, `love-advice`, `inspiration`];