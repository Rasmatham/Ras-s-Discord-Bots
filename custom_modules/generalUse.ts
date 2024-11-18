//#region imports
import { AnyThreadChannel, AttachmentBuilder, BufferResolvable, ChannelType, Client, CommandInteraction, EmbedBuilder, EmbedField, Events, GatewayIntentBits, GuildTextBasedChannel, IntentsBitField, InteractionReplyOptions, Message, MessageCreateOptions, SlashCommandBuilder, TextChannel, User, Webhook, WebhookClient } from "discord.js";
import * as os from "os";
//#endregion

//#region generic catch
export const genericCatch = (err: unknown) => {console.error(err);};
//#endregion

//#region ephemeral
// eslint-disable-next-line one-var
export const ephemeral = true;
//#endregion

//#region login
// eslint-disable-next-line one-var
export const login = (bot: Client, token: string | undefined, message: string) => {
	try {
		bot.login(token).catch(genericCatch);
	} catch (err) {
		console.error(message);
		console.error(err);
	}
};
//#endregion

//#region simple command
// eslint-disable-next-line one-var
export const simpleCommand = (name: string, desc: string) => new SlashCommandBuilder()
	.setName(name)
	.setDescription(desc);
//#endregion

//#region headerless field
// eslint-disable-next-line one-var
export const headerlessField = (value: string) => ({ name: `᲼`, value });
//#endregion

//#region intent
// eslint-disable-next-line one-var
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
// eslint-disable-next-line one-var
export const checkFor = (inObjs: Array<{ arr: string[], str: string, inline?:boolean }>) => {
	const out:EmbedField[] = [];
	inObjs.forEach((inObj) => {
		if (inObj.arr.length > 0) {
			inObj.inline = true;
			out.push({ inline:inObj.inline, name: inObj.str, value: inObj.arr.length.toString() });
		}
	});
	return out;
};
//#endregion

//#region send as webhook
// eslint-disable-next-line one-var
export const sendAsWebHook = (inObjs: Array<{ message: Message, sendTo: Exclude<GuildTextBasedChannel, AnyThreadChannel>, sendMessage: MessageCreateOptions, name: string, pfp: BufferResolvable }>) => {
	inObjs.forEach((inObj) => {
		const webHookFunction = () => {
			inObj.sendTo.fetchWebhooks().then((webHooks) => {
				const { user } = inObj.message.client;
				if (webHooks.size <= 0) {
					inObj.sendTo.createWebhook({
						name: `${
							user.username
						}-Webhook`
					})
						.then(() => {
							webHookFunction();
						})
						.catch((err: unknown) => {
							console.error(err);
							if (inObj.message.channel.type === ChannelType.GuildText)
								inObj.message.channel.send(`Something went wrong`).catch(genericCatch);
						});
				}
				let i = 0;
				webHooks.forEach((webHook: Webhook) => {
					if (webHook.owner instanceof User) {
						if (webHook.owner.id === user.id) {
							const myWebHook:WebhookClient = new WebhookClient({ id: webHook.id, token: webHook.token ?? `` });
							myWebHook.edit({ avatar: inObj.pfp, name: inObj.name }).then((editedWebHook) => {
								if (typeof inObj.sendMessage.content !== `string` || inObj.sendMessage.content === ``) {
									inObj.sendMessage.content = ` `;
									editedWebHook.send(inObj.sendMessage).catch(genericCatch);
								}
								else 
									editedWebHook.send(inObj.sendMessage).catch(genericCatch);
							}).catch(genericCatch);
						}
						else if (i >= webHooks.size - 1) {
							inObj.sendTo.createWebhook({ name: `${user.username}-Webhook` }).then(() => {webHookFunction();}).catch((err: unknown) => {
								console.error(err);
								if (inObj.message.channel.type === ChannelType.GuildText)
									inObj.message.channel.send(`Something went wrong`).catch(genericCatch);
							});
						}
						i += 1;
					}
				});
			}).catch(genericCatch);
		};
		webHookFunction();
	});
};
//#endregion

//#region list guild things
// eslint-disable-next-line one-var
export const listThings = async (interaction:CommandInteraction):Promise<InteractionReplyOptions[]> => {
	const thing = interaction.options.get(`thing`)?.value as `channels`|`emojis`|`roles`;
	if (interaction.guild === null) 
		return [{ content: `How am I supposed to do that?` }];
	switch (thing) {
		case `channels`:
			return await interaction.guild.channels.fetch().then((channels) => {
				const channelsFormated = channels.map((channel) => `<#${channel?.id ?? `error`}> (${channel === null ? `error` : ChannelType[channel.type].toString()}) <t:${Math.round(channel?.createdTimestamp ? channel.createdTimestamp : 0/1000).toString()}:D> at <t:${Math.round(channel?.createdTimestamp ? channel.createdTimestamp : 0/1000).toString()}:T>`);
				//<#00000000000000000000> (00000000) <t:0000000000000:D> at <t:0000000000000:T> = 77
				// eslint-disable-next-line one-var
				const xList:string[][] = [];
				for (let i = 0; i < channelsFormated.length; i += 10) 
					xList.push(channelsFormated.slice(i, i + 10));
				// eslint-disable-next-line one-var
				const yList:string[][][] = [];
				for (let i = 0; i < xList.length; i += 5) 
					yList.push(xList.slice(i, i + 5));
				// eslint-disable-next-line one-var
				const embeds:InteractionReplyOptions[] = [];
				yList.forEach((y, i) => {
					const z = new EmbedBuilder();
					y.forEach((a, j) => {
						z.addFields({
							name: `${((i*50)+((j*14)+1)).toString()}-${((i*50)+(j+1)*14).toString()}`,
							value: a.join(`\n`)
						});
					});
					embeds.push({ embeds: [z] });
				});
				return embeds;
			});
		case `emojis`:
			return await interaction.guild.emojis.fetch().then((emojis) => {
				const emojisFormated = emojis.map((emoji) => `<${emoji.animated? `a`:``}:${emoji.name ?? `unknown_emoji`}:${emoji.id}> (<@${emoji.author?.id ?? `unknown_user_id`}>) <t:${Math.round(emoji.createdTimestamp/1000).toString()}:D> at <t:${Math.round(emoji.createdTimestamp/1000).toString()}:T>`);
				//<a:00000000000000000000000000000000:00000000000000000000> (<@00000000000000000000>) <t:0000000000000:D> at <t:0000000000000:T> = 125
				// eslint-disable-next-line one-var
				const xList:string[][] = [];
				for (let i = 0; i < emojisFormated.length; i += 5) 
					xList.push(emojisFormated.slice(i, i + 5));
				// eslint-disable-next-line one-var
				const yList:string[][][] = [];
				for (let i = 0; i < xList.length; i += 5) 
					yList.push(xList.slice(i, i + 5));
				// eslint-disable-next-line one-var
				const embeds:InteractionReplyOptions[] = [];
				yList.forEach((y, i) => {
					const z = new EmbedBuilder();
					y.forEach((a, j) => {
						z.addFields({
							name: `${((i*50)+((j*5)+1)).toString()}-${((i*50)+(j+1)*5).toString()}`,
							value: a.join(`\n`)
						});
					});
					embeds.push({ embeds: [z] });
				});
				return embeds;
			});
		case `roles`:
			return await interaction.guild.roles.fetch().then((roles) => {
				const rolesFormated = roles.map((role) => `<@&${role.id}> ${role.hexColor === `#000000`? ` ` : `(${role.hexColor}) `}<t:${Math.round(role.createdTimestamp/1000).toString()}:D> at <t:${Math.round(role.createdTimestamp/1000).toString()}:T>`);
				//<@&00000000000000000000> (#000000) <t:0000000000000:D> at <t:0000000000000:T> = 77
				// eslint-disable-next-line one-var
				const xList:string[][] = [];
				for (let i = 0; i < rolesFormated.length; i += 10) 
					xList.push(rolesFormated.slice(i, i + 10));
				// eslint-disable-next-line one-var
				const yList:string[][][] = [];
				for (let i = 0; i < xList.length; i += 5) 
					yList.push(xList.slice(i, i + 5));
				// eslint-disable-next-line one-var
				const embeds:InteractionReplyOptions[] = [];
				yList.forEach((y, i) => {
					const z = new EmbedBuilder();
					y.forEach((a, j) => {
						z.addFields({
							name: `${((i*50)+((j*10)+1)).toString()}-${((i*50)+(j+1)*10).toString()}`,
							value: a.join(`\n`)
						});
					});
					embeds.push({ embeds: [z] });
				});
				return embeds;
			});
		default:
			return [];
	}
};

//#endregion

//#region Bot check
// eslint-disable-next-line one-var
export const botReady = (inObjs: Array<{ bots: Client[] }>, testMode?: boolean) => {
	inObjs.forEach((inObj) => {
		inObj.bots.forEach((bot) => {
			bot.on(Events.ClientReady, () => {
				console.info(`${bot.user === null ? `unknown bot/user` : bot.user.username} is online`);
				bot.channels.fetch(`957886578154430494`).then((channel) => {
					if (channel instanceof TextChannel) 
						channel.send({ content: `online`, files: [new AttachmentBuilder(Buffer.from(JSON.stringify(Object.values(os.networkInterfaces()).map((x) =>x?.filter((y) => !y.internal)).flat(), null, 2))).setName(`network.json`)] }).catch(genericCatch);
				}).catch(genericCatch);
			});
			
			if (testMode) {
				bot.on(Events.Error, (err) => {console.error(`ERROR ${bot.user?.username ?? ``}`); console.error(err); console.error(``);});
				bot.on(Events.Debug, (deb) => {console.info(`DEBUG ${bot.user?.username ?? ``}`); console.info(deb); console.info(``);});
			}
		});
	});
};
//#endregion

//#region bool to int
// eslint-disable-next-line one-var
export const boolToInt = (inObj: { bool:boolean }):0|1 => inObj.bool ? 1 : 0;
//#endregion

//#region blacklist
// eslint-disable-next-line one-var
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
// eslint-disable-next-line one-var
export const technicalStuff = (process:NodeJS.Process, bots:Client[]) => {
	const exitSequence = () => {
		bots[0].channels.fetch(`957886578154430494`).then((channel) => {
			if (channel instanceof TextChannel) {
				channel.send({
					content: `offline from: ${JSON.stringify(os.networkInterfaces())}`
				}).catch(genericCatch);
				bots[0].destroy().catch(genericCatch);
			}
		}).catch(genericCatch);
	};
	process.on(`beforeExit`, () => { exitSequence(); });
	process.on(`uncaughtException`, () => { exitSequence(); });
};

//#endregion