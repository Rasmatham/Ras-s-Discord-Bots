import { Message, TextChannel, WebhookClient, Client, MessageOptions, Webhook, BufferResolvable, User, Intents, NewsChannel } from "discord.js";
//intent
export const intents:Intents = new Intents([`GUILDS`, `GUILD_MEMBERS`, `GUILD_BANS`, `GUILD_EMOJIS_AND_STICKERS`, `GUILD_INTEGRATIONS`, `GUILD_WEBHOOKS`, `GUILD_INVITES`, `GUILD_VOICE_STATES`, `GUILD_PRESENCES`, `GUILD_MESSAGES`, `GUILD_MESSAGE_REACTIONS`, `GUILD_MESSAGE_TYPING`, `DIRECT_MESSAGES`, `DIRECT_MESSAGE_REACTIONS`, `DIRECT_MESSAGE_TYPING`]);

//Check amount
export const checkFor = (arr: string[], str: string): string => {
	if (arr.length > 0) {
		return `${str} ${arr.length}\n`;
	} else {
		return ``;
	}
};
//send as webhook
export const sendAsWebHook = (message: Message, sendTo: TextChannel | NewsChannel, sendMessage: MessageOptions, name: string, PFP: BufferResolvable):void => {
	const webHookFunction = ():void => {
		sendTo.fetchWebhooks()
			.then((webHooks):void => {
				if (webHooks.size <= 0) {
					sendTo.createWebhook(`${message.client.user.username}-Webhook`)
						.then(():void => {
							webHookFunction();
						})
						.catch((err):void => {
							console.error(err);
							message.channel.send(`Something went wrong`)
								.catch(console.error);
						});
				}
				let i = 0;
				webHooks.map((webHook: Webhook):void => {
					if(webHook.owner instanceof User){
						if (webHook.owner.id === message.client.user.id) {
							const myWebHook:WebhookClient = new WebhookClient({id: webHook.id, token: webHook.token});
							myWebHook.edit({ name: name, avatar: PFP})
								.then((editedWebHook):void => {
									if(typeof sendMessage.content !== `string` || sendMessage.content === ``){
										sendMessage.content = ` `;
										editedWebHook.send(sendMessage)
											.catch(console.error);
									} else {
										editedWebHook.send(sendMessage)
											.catch(console.error);
									}
								})
								.catch(console.error);
						} else if (i >= webHooks.size - 1) {
							sendTo.createWebhook(`${message.client.user.username}-Webhook`)
								.then(():void => {
									webHookFunction();
								})
								.catch((err):void => {
									console.error(err);
									message.channel.send(`Something went wrong`)
										.catch(console.error);
								});
						}
						i++;
					}
				});
			})
			.catch(console.error);
	};
	webHookFunction();
};
//Bot check
export const botReady = (bots: Client[]):void => {
	bots.forEach((bot):void => {
		/*bot.on('debug', console.log)
		.on('warn', console.log)*/
		bot.on(`ready`, ():void => {
			console.log(`${bot.user.username} is online`);
		});
	});
};
//bool to int
export const boolToInt = (bool:boolean):0|1 => {
	if(bool){
		return 1;
	} else {
		return 0;
	}
};

export const blackList:string[] = [`announcements`, `6-hour-cooldown`, `rules`, `polls`, `stalking-tips`, `rules-for-new-mods`, `serious`, `gif-only-conversation`, `love-advice`, `inspiration`];