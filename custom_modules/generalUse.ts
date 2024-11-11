//#region imports
import {Message, TextChannel, WebhookClient, Client, MessageCreateOptions, Webhook, BufferResolvable, User, IntentsBitField, NewsChannel, EmbedField, InteractionReplyOptions, CommandInteraction, EmbedBuilder, ChannelType, GatewayIntentBits} from "discord.js";
import * as os from "os";
//#endregion

//#region intent
export const intents:IntentsBitField = new IntentsBitField([
	GatewayIntentBits.Guilds,
	GatewayIntentBits.GuildMembers,
	GatewayIntentBits.GuildModeration,
	GatewayIntentBits.GuildEmojisAndStickers,
	GatewayIntentBits.GuildIntegrations,
	GatewayIntentBits.GuildWebhooks,
	GatewayIntentBits.GuildInvites,
	GatewayIntentBits.GuildVoiceStates,
	GatewayIntentBits.GuildPresences,
	GatewayIntentBits.GuildMessages,
	GatewayIntentBits.GuildMessageReactions,
	GatewayIntentBits.GuildMessageTyping,
	GatewayIntentBits.DirectMessages,
	GatewayIntentBits.DirectMessageReactions,
	GatewayIntentBits.DirectMessageTyping,
	GatewayIntentBits.MessageContent,
	GatewayIntentBits.GuildScheduledEvents,
	GatewayIntentBits.AutoModerationConfiguration,
	GatewayIntentBits.AutoModerationExecution,
	GatewayIntentBits.GuildMessagePolls,
	GatewayIntentBits.DirectMessagePolls
]);
//#endregion

//#region Check amount
export const checkFor = (
	inObjs: {
		arr: string[],
		str: string,
		inline?:boolean
	}[]
):EmbedField[] => {
	const out:EmbedField[] = [];
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
		sendMessage: MessageCreateOptions,
		name: string,
		PFP: BufferResolvable
	}[]
):void => {
	inObjs.forEach((inObj) => {
		const webHookFunction = ():void => {
			inObj.sendTo.fetchWebhooks()
				.then((webHooks):void => {
					const user = inObj.message.client.user;
					if (webHooks.size <= 0) {
						inObj.sendTo.createWebhook({
							name: `${
								user.username
							}-Webhook`
						})
							.then(():void => {
								webHookFunction();
							})
							.catch((err: unknown):void => {
								console.error(err);
								if (inObj.message.channel.type === ChannelType.GuildText)
									inObj.message.channel.send(`Something went wrong`)
										.catch((err: unknown) => {console.error(err)});
							});
					}
					let i = 0;
					webHooks.map((webHook: Webhook):void => {
						if (webHook.owner instanceof User) {
							if (webHook.owner.id == user.id) {
								const myWebHook:WebhookClient = new WebhookClient({
									id: webHook.id,
									token: webHook.token ?? ``
								});
								myWebHook.edit({
									name: inObj.name,
									avatar: inObj.PFP
								})
									.then((editedWebHook):void => {
										if (typeof inObj.sendMessage.content != `string` || inObj.sendMessage.content == ``) {
											inObj.sendMessage.content = ` `;
											editedWebHook.send(inObj.sendMessage)
												.catch((err: unknown) => {console.error(err)});
										}
										else {
											editedWebHook.send(inObj.sendMessage)
												.catch((err: unknown) => {console.error(err)});
										}
									}).catch((err: unknown) => {console.error(err)});
							}
							else if (i >= webHooks.size - 1) {
								inObj.sendTo.createWebhook({
									name: `${
										user.username
									}-Webhook`
								})
									.then(():void => {
										webHookFunction();
									})
									.catch((err: unknown):void => {
										console.error(err);
										if (inObj.message.channel.type === ChannelType.GuildText)
											inObj.message.channel.send(`Something went wrong`)
												.catch((err: unknown) => {console.error(err)});
									});
							}
							i++;
						}
					});
				}).catch((err: unknown) => {console.error(err)});
		};
		webHookFunction();
	});
};
//#endregion

//#region list guild things
export const listThings = async (interaction:CommandInteraction):Promise<InteractionReplyOptions[]> => {
	const thing = interaction.options.get(`thing`)?.value as `channels`|`emojis`|`roles`;
	if (interaction.guild == null) {return [{content: `How am I supposed to do that?`}]; }
	switch (thing) {
	case `channels`:
		return await interaction.guild.channels.fetch().then((channels) => {
			const channelsFormated = channels.map((channel) => `<#${channel?.id ?? `error`}> (${channel?.type != null ? ChannelType[channel.type].toString() : `error`}) <t:${Math.round(channel?.createdTimestamp ? channel.createdTimestamp : 0/1000).toString()}:D> at <t:${Math.round(channel?.createdTimestamp ? channel.createdTimestamp : 0/1000).toString()}:T>`);
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
				y.forEach((a, j) => {
					z.addFields({
						name: `${((i*50)+((j*14)+1)).toString()}-${((i*50)+(j+1)*14).toString()}`,
						value: a.join(`\n`)
					})
				});
				embeds.push({embeds: [z]});
			});
			return embeds;
		});
	case `emojis`:
		return await interaction.guild.emojis.fetch().then((emojis) => {
			const emojisFormated = emojis.map((emoji) => `<${emoji.animated? `a`:``}:${emoji.name ?? `unknown_emoji`}:${emoji.id}> (<@${emoji.author?.id ?? `unknown_user_id`}>) <t:${Math.round(emoji.createdTimestamp/1000).toString()}:D> at <t:${Math.round(emoji.createdTimestamp/1000).toString()}:T>`);
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
				y.forEach((a, j) => {
					z.addFields({
						name: `${((i*50)+((j*5)+1)).toString()}-${((i*50)+(j+1)*5).toString()}`,
						value: a.join(`\n`)
					})
				});
				embeds.push({embeds: [z]});
			});
			return embeds;
		});
	case `roles`:
		return await interaction.guild.roles.fetch().then((roles) => {
			const rolesFormated = roles.map((role) => `<@&${role.id}> ${role.hexColor != `#000000`? `(${role.hexColor}) `:` `}<t:${Math.round(role.createdTimestamp/1000).toString()}:D> at <t:${Math.round(role.createdTimestamp/1000).toString()}:T>`);
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
				y.forEach((a, j) => {
					z.addFields({
						name: `${((i*50)+((j*10)+1)).toString()}-${((i*50)+(j+1)*10).toString()}`,
						value: a.join(`\n`)
					})
				});
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
				void bot.channels.fetch(`957886578154430494`).then((channel) => {
					if (channel instanceof TextChannel) {
						void channel.send({content: `online as \n\`\`\`json\n${JSON.stringify(Object.values(os.networkInterfaces()).map((x) =>{
							return x?.filter((y) => !y.internal)
						}).flat(), null, 2)}\n\`\`\``});
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
		void bots[0].channels.fetch(`957886578154430494`).then((channel) => {
			if (channel instanceof TextChannel) {
				void channel.send({
					content: `offline from: ${JSON.stringify(os.networkInterfaces())}`
				});
				void bots[0].destroy();
			}
		});
	};
	process.on(`beforeExit`, () => { exitSequence(); });
	process.on(`uncaughtException`, () => { exitSequence(); });
};

//#endregion