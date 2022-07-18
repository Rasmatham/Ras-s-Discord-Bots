//#region imports
import {Message, TextChannel, WebhookClient, Client, MessageOptions, Webhook, BufferResolvable, User, IntentsBitField, NewsChannel, APIEmbedField, ClientUser, InteractionReplyOptions, CommandInteraction, CommandInteractionOption, EmbedBuilder} from "discord.js";
import * as os from "os";
//#endregion

//#region intent
export const intents:IntentsBitField = new IntentsBitField([
	`Guilds`,
	`GuildMembers`,
	`GuildBans`,
	`GuildEmojisAndStickers`,
	`GuildIntegrations`,
	`GuildWebhooks`,
	`GuildInvites`,
	`GuildVoiceStates`,
	`GuildPresences`,
	`GuildMessages`,
	`GuildMessageReactions`,
	`GuildMessageTyping`,
	`DirectMessages`,
	`DirectMessageReactions`,
	`DirectMessageTyping`,
	`MessageContent`,
	`GuildScheduledEvents`
]);
//#endregion

//#region Check amount
export const checkFor = (
	inObjs: {
		arr: string[],
		str: string,
		inline?:boolean
	}[]
):APIEmbedField[] => {
	const out:APIEmbedField[] = [];
	inObjs.forEach((inObj) => {
		if (inObj.arr.length > 0) {
			if (inObj.inline == null) {
				inObj.inline = true;
			}
			out.push({name: inObj.str, value: inObj.arr.length.toString(), inline:inObj.inline});
		}
	});
	return out;
};
//#endregion

//#region send as webhook
export const sendAsWebHook = (
	inObjs: {
		message: Message,
		sendTo: TextChannel | NewsChannel,
		sendMessage: MessageOptions,
		name: string,
		PFP: BufferResolvable
	}[]
):void => {
	inObjs.forEach((inObj) => {
		const webHookFunction = ():void => {
			inObj.sendTo.fetchWebhooks()
				.then((webHooks):void => {
					const user = inObj.message.client.user as ClientUser;
					if (webHooks.size <= 0) {
						inObj.sendTo.createWebhook(`${
							user.username
						}-Webhook`)
							.then(():void => {
								webHookFunction();
							})
							.catch((err):void => {
								console.error(err);
								inObj.message.channel.send(`Something went wrong`)
									.catch(console.error);
							});
					}
					let i = 0;
					webHooks.map((webHook: Webhook):void => {
						if (webHook.owner instanceof User) {
							if (webHook.owner.id == user.id) {
								const myWebHook:WebhookClient = new WebhookClient({
									id: webHook.id,
									token: webHook.token as string
								});
								myWebHook.edit({
									name: inObj.name,
									avatar: inObj.PFP
								})
									.then((editedWebHook):void => {
										if (typeof inObj.sendMessage.content != `string` || inObj.sendMessage.content == ``) {
											inObj.sendMessage.content = ` `;
											editedWebHook.send(inObj.sendMessage)
												.catch(console.error);
										}
										else {
											editedWebHook.send(inObj.sendMessage)
												.catch(console.error);
										}
									})
									.catch(console.error);
							}
							else if (i >= webHooks.size - 1) {
								inObj.sendTo.createWebhook(`${
									user.username
								}-Webhook`)
									.then(():void => {
										webHookFunction();
									})
									.catch((err):void => {
										console.error(err);
										inObj.message.channel.send(`Something went wrong`)
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
	});
};
//#endregion

//#region list guild things
export const listThings = async (interaction:CommandInteraction):Promise<InteractionReplyOptions[]> => {
	const thing = (interaction.options.get(`thing`) as CommandInteractionOption).value as `channels`|`emojis`|`roles`;
	if (interaction.guild == null) {return [{content: `How am I supposed to do that?`}]; }
	switch (thing) {
	case `channels`:
		return await interaction.guild.channels.fetch().then((channels) => {
			const channelsFormated = channels.map((channel) => `<#${channel.id}> (${channel.type.toLowerCase().split(`_`).map((x) => `${x[0].toUpperCase()}${x.slice(1)}`)[1]}) <t:${Math.round(channel.createdTimestamp/1000)}:D> at <t:${Math.round(channel.createdTimestamp/1000)}:T>`);
			//<#00000000000000000000> (00000000) <t:0000000000000:D> at <t:0000000000000:T> = 77
			const x:string[][] = [];
			for (let i = 0; i < channelsFormated.length; i += 10) {
				x.push(channelsFormated.slice(i, i + 10));
			}
			const y:string[][][] = [];
			for (let i = 0; i < x.length; i += 5) {
				y.push(x.slice(i, i + 5));
			}
			const embeds:InteractionReplyOptions[] = [];
			y.forEach((y, i) => {
				const z = new EmbedBuilder();
				y.forEach((a, j) => z.addField(`${(i*50)+((j*14)+1)}-${(i*50)+(j+1)*14}`, a.join(`\n`)));
				embeds.push({embeds: [z]});
			});
			return embeds;
		});
	case `emojis`:
		return await interaction.guild.emojis.fetch().then((emojis) => {
			const emojisFormated = emojis.map((emoji) => `<${emoji.animated? `a`:``}:${emoji.name}:${emoji.id}> (<@${emoji.author?.id}>) <t:${Math.round(emoji.createdTimestamp/1000)}:D> at <t:${Math.round(emoji.createdTimestamp/1000)}:T>`);
			//<a:00000000000000000000000000000000:00000000000000000000> (<@00000000000000000000>) <t:0000000000000:D> at <t:0000000000000:T> = 125
			const x:string[][] = [];
			for (let i = 0; i < emojisFormated.length; i += 5) {
				x.push(emojisFormated.slice(i, i + 5));
			}
			const y:string[][][] = [];
			for (let i = 0; i < x.length; i += 5) {
				y.push(x.slice(i, i + 5));
			}
			const embeds:InteractionReplyOptions[] = [];
			y.forEach((y, i) => {
				const z = new EmbedBuilder();
				y.forEach((a, j) => z.addField(`${(i*50)+((j*5)+1)}-${(i*50)+(j+1)*5}`, a.join(`\n`)));
				embeds.push({embeds: [z]});
			});
			return embeds;
		});
	case `roles`:
		return await interaction.guild.roles.fetch().then((roles) => {
			const rolesFormated = roles.map((role) => `<@&${role.id}> ${role.hexColor != `#000000`? `(${role.hexColor}) `:` `}<t:${Math.round(role.createdTimestamp/1000)}:D> at <t:${Math.round(role.createdTimestamp/1000)}:T>`);
			//<@&00000000000000000000> (#000000) <t:0000000000000:D> at <t:0000000000000:T> = 77
			const x:string[][] = [];
			for (let i = 0; i < rolesFormated.length; i += 10) {
				x.push(rolesFormated.slice(i, i + 10));
			}
			const y:string[][][] = [];
			for (let i = 0; i < x.length; i += 5) {
				y.push(x.slice(i, i + 5));
			}
			const embeds:InteractionReplyOptions[] = [];
			y.forEach((y, i) => {
				const z = new EmbedBuilder();
				y.forEach((a, j) => z.addField(`${(i*50)+((j*10)+1)}-${(i*50)+(j+1)*10}`, a.join(`\n`)));
				embeds.push({embeds: [z]});
			});
			return embeds;
		});
	}
};

//#endregion

//#region Bot check
export const botReady = (inObjs: { bots: Client[] }[]
):void => {
	inObjs.forEach((inObj) => {
		inObj.bots.forEach((bot):void => {
		/*bot.on('debug', console.log)
		.on('warn', console.log)*/
			bot.on(`ready`, ():void => {
				console.log(`${
					bot.user != null ? bot.user.username : `unknown bot/user`
				} is online`);
				bot.channels.fetch(`957886578154430494`).then((channel) => {
					if (channel instanceof TextChannel) {
						channel.send({content: `online`});
					}
				});
			});
		});
	});
};
//#endregion

//#region bool to int
export const boolToInt = (
	inObj: {
		bool:boolean
	}
):0|1 => {
	if (inObj.bool) {
		return 1;
	}
	else {
		return 0;
	}
};
//#endregion

//#region blacklist
export const blackList:string[] = [
	`announcements`,
	`6-hour-cooldown`,
	`rules`,
	`polls`,
	`stalking-tips`,
	`rules-for-new-mods`,
	`serious`,
	`gif-only-conversation`,
	`love-advice`,
	`inspiration`
];
//#endregion

//#region general stuff for the process
export const process = (process:NodeJS.Process, bots:Client[]):void => {
	const exitSequence = () => {
		bots[0].channels.fetch(`957886578154430494`).then((channel) => {
			if (channel instanceof TextChannel) {
				channel.send({
					content: `offline from: ${JSON.stringify(os.networkInterfaces())}`
				});
				bots[0].destroy();
			}
		});
	};
	process.on(`beforeExit`, () => exitSequence());
	process.on(`uncaughtException`, () => exitSequence());
};

//#endregion