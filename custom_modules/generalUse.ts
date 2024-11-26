//#region imports
import type { AnyThreadChannel, BufferResolvable, Client, CommandInteraction, EmbedField, GuildTextBasedChannel, InteractionReplyOptions, Message, MessageCreateOptions, Webhook } from "discord.js";
import { AttachmentBuilder, ChannelType, EmbedBuilder, Events, GatewayIntentBits, IntentsBitField, SlashCommandBuilder, TextChannel, TimestampStyles, User, WebhookClient, channelMention, formatEmoji, roleMention, time, userMention } from "discord.js";
import * as os from "os";
//#endregion

//#region common numbers

export enum ShiftBy {
	N10 = -10,
	N9 = -9,
	N8 = -8,
	N7 = -7,
	N6 = -6,
	N5 = -5,
	N4 = -4,
	N3 = -3,
	N2 = -2,
	N1 = -1,
	P1 = 1,
	P2 = 2,
	P3 = 3,
	P4 = 4,
	P5 = 5,
	P6 = 6,
	P7 = 7,
	P8 = 8,
	P9 = 9,
	P10 = 10
}

const base10Shift = 10, base16shift = 4;
// eslint-disable-next-line one-var
export const base10 = 10,
base16 = 16,
base2 = 2,
binaryShift = (num: number, shiftBy: ShiftBy): number => num<<shiftBy,
decimalShift = (num: number, shiftBy: ShiftBy): number => num*base10Shift**shiftBy,
hexaDecimalShift = (num: number, shiftBy: ShiftBy): number => num<<base16shift**shiftBy,
inc = 1,
msInS = 1000,
offByOne = 1,
zero = 0;

export enum Index {
	Last = -1,
	First = 0,
	Second = 1,
	Third = 2,
	Fourth = 3,
	Fifth = 4,
	Sixth = 5,
	Seventh = 6,
	Eighth = 7,
	Ninth = 8,
	Tenth = 9
}
//#endregion

//#region generic catch
// eslint-disable-next-line one-var
export const genericCatch = (err: unknown): void => {console.error(err);};
//#endregion

//#region ephemeral
// eslint-disable-next-line one-var
export const ephemeral = true;
//#endregion

//#region ephemeral
// eslint-disable-next-line one-var
export const toBigInt = (value?: string): `${bigint}` => {
	try {
		// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
		return `${BigInt(value ?? ``)}`;
	}
	catch (err) {
		console.error(err);
		// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
		return `${BigInt(``)}`;
	}
};
//#endregion

//#region login
// eslint-disable-next-line one-var
export const login = (bot: Client, token: string | undefined, message: string): void => {
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
export const simpleCommand = (name: string, desc: string): SlashCommandBuilder => new SlashCommandBuilder()
	.setName(name)
	.setDescription(desc);
//#endregion

//#region headerless field
// eslint-disable-next-line one-var
export const headerlessField = (value: string): EmbedField => ({ inline: false, name: `᲼`, value });
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
export const checkFor = (inObjs: Array<{ channels: number, str: string, inline?:boolean }>): EmbedField[] => {
	const out:EmbedField[] = [];
	inObjs.forEach((inObj) => {
		if (inObj.channels > zero) {
			inObj.inline = true;
			out.push({ inline:inObj.inline, name: inObj.str, value: inObj.channels.toString() });
		}
	});
	return out;
};
//#endregion

//#region send as webhook
// eslint-disable-next-line one-var
export const sendAsWebHook = (inObjs: Array<{ message: Message, sendTo: Exclude<GuildTextBasedChannel, AnyThreadChannel>, sendMessage: MessageCreateOptions, name: string, pfp: BufferResolvable }>): void => {
	inObjs.forEach((inObj) => {
		const webHookFunction = (): void => {
			inObj.sendTo.fetchWebhooks().then((webHooks) => {
				const { user } = inObj.message.client;
				if (webHooks.size <= zero) {
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
				let i: number;
				i = zero;
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
						else if (i >= webHooks.size - offByOne) {
							inObj.sendTo.createWebhook({ name: `${user.username}-Webhook` }).then(() => {webHookFunction();}).catch((err: unknown) => {
								console.error(err);
								if (inObj.message.channel.type === ChannelType.GuildText)
									inObj.message.channel.send(`Something went wrong`).catch(genericCatch);
							});
						}
						i += inc;
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
	const thing = interaction.options.get(`thing`)?.value;
	if (typeof thing !== `string`) return [];
	if (interaction.guild === null) 
		return [{ content: `How am I supposed to do that?` }];
	switch (thing) {
		case `channels`:
			return await interaction.guild.channels.fetch().then((channels) => {
				const channelsFormated = channels.map((channel) => {
					const channelData = {
						createdDate: time(Math.round((channel?.createdTimestamp ?? zero)/msInS), TimestampStyles.LongDate),
						createdTime: time(Math.round((channel?.createdTimestamp ?? zero)/msInS), TimestampStyles.LongTime),
						mention: channelMention(channel?.id ?? `error`),
						type: channel === null ? `error` : ChannelType[channel.type].toString()
					};
					return `${channelData.mention} (${channelData.type}) ${channelData.createdDate} at ${channelData.createdTime}`;
				});
				//<#00000000000000000000> (00000000) <t:0000000000000:D> at <t:0000000000000:T> = 77
				// eslint-disable-next-line one-var
				const channelList:string[][] = [],
				channelsPerField = 10,
				fieldsPerEmbed = 5;
				// eslint-disable-next-line one-var
				const channnelsPerEmbed = channelsPerField * fieldsPerEmbed;
				for (let i = 0; i < channelsFormated.length; i += channelsPerField) 
					channelList.push(channelsFormated.slice(i, i + channelsPerField));
				// eslint-disable-next-line one-var
				const fieldList:string[][][] = [];
				for (let i = 0; i < channelList.length; i += fieldsPerEmbed) 
					fieldList.push(channelList.slice(i, i + fieldsPerEmbed));
				// eslint-disable-next-line one-var
				const embeds:InteractionReplyOptions[] = [];
				fieldList.forEach((field, i) => {
					const embed = new EmbedBuilder();
					field.forEach((channel, j) => {
						embed.addFields({
							name: `${((i*channnelsPerEmbed)+((j*channelsPerField)+offByOne)).toString()}-${((i*channnelsPerEmbed)+(j+offByOne)*channelsPerField).toString()}`,
							value: channel.join(`\n`)
						});
					});
					embeds.push({ embeds: [embed] });
				});
				return embeds;
			});
		case `emojis`:
			return await interaction.guild.emojis.fetch().then((emojis) => {
				const emojisFormated = emojis.map((emoji) => {
					const emojiData = {
						createdDate: time(Math.round(emoji.createdTimestamp/msInS), TimestampStyles.LongDate),
						createdTime: time(Math.round(emoji.createdTimestamp/msInS), TimestampStyles.LongTime),
						creator: userMention(emoji.author?.id ?? `unknown_user_id`),
						emoji: formatEmoji(emoji.id, emoji.animated ?? false)
					};
					return `<${emojiData.emoji}> (${emojiData.creator}) <t:${emojiData.createdDate}:D> at <t:${emojiData.createdTime}:T>`;
				});
				//<a:00000000000000000000000000000000:00000000000000000000> (<@00000000000000000000>) <t:0000000000000:D> at <t:0000000000000:T> = 125
				// eslint-disable-next-line one-var
				const emojiList:string[][] = [],
				emojisPerField = 5,
				fieldsPerEmbed = 5;
				// eslint-disable-next-line one-var
				const emojisPerEmbed = emojisPerField * fieldsPerEmbed;
				for (let i = 0; i < emojisFormated.length; i += emojisPerField) 
					emojiList.push(emojisFormated.slice(i, i + emojisPerField));
				// eslint-disable-next-line one-var
				const fieldList:string[][][] = [];
				for (let i = 0; i < emojiList.length; i += fieldsPerEmbed) 
					fieldList.push(emojiList.slice(i, i + fieldsPerEmbed));
				// eslint-disable-next-line one-var
				const embeds:InteractionReplyOptions[] = [];
				fieldList.forEach((field, i) => {
					const embed = new EmbedBuilder();
					field.forEach((emoji, j) => {
						embed.addFields({
							name: `${((i*emojisPerEmbed)+((j*emojisPerField)+offByOne)).toString()}-${((i*emojisPerEmbed)+(j+offByOne)*emojisPerField).toString()}`,
							value: emoji.join(`\n`)
						});
					});
					embeds.push({ embeds: [embed] });
				});
				return embeds;
			});
		case `roles`:
			return await interaction.guild.roles.fetch().then((roles) => {
				const rolesFormated = roles.map((role) => {
					const roleData = {
						color: role.hexColor === `#000000`? ` ` : `(\`${role.hexColor}\`) `,
						createdDate: time(Math.round(role.createdTimestamp/msInS), TimestampStyles.LongDate),
						createdTime: time(Math.round(role.createdTimestamp/msInS), TimestampStyles.LongTime),
						mention: roleMention(role.id),
					};
					return `<${roleData.mention} ${roleData.color}${roleData.createdDate} at ${roleData.createdTime}`;
				});
				//<@&00000000000000000000> (#000000) <t:0000000000000:D> at <t:0000000000000:T> = 77
				// eslint-disable-next-line one-var
				const fieldsPerEmbed = 5,
				roleList:string[][] = [],
				rolesPerField = 10;
				// eslint-disable-next-line one-var
				const rolesPerEmbed = rolesPerField * fieldsPerEmbed;
				for (let i = 0; i < rolesFormated.length; i += rolesPerField) 
					roleList.push(rolesFormated.slice(i, i + rolesPerField));
				// eslint-disable-next-line one-var
				const fieldList:string[][][] = [];
				for (let i = 0; i < roleList.length; i += fieldsPerEmbed) 
					fieldList.push(roleList.slice(i, i + fieldsPerEmbed));
				// eslint-disable-next-line one-var
				const embeds:InteractionReplyOptions[] = [];
				fieldList.forEach((field, i) => {
					const embed = new EmbedBuilder();
					field.forEach((role, j) => {
						embed.addFields({
							name: `${((i*rolesPerEmbed)+((j*rolesPerField)+offByOne)).toString()}-${((i*rolesPerEmbed)+(j+offByOne)*rolesPerField).toString()}`,
							value: role.join(`\n`)
						});
					});
					embeds.push({ embeds: [embed] });
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
export const botReady = (inObjs: Array<{ bots: Client[] }>, testMode?: boolean): void => {
	inObjs.forEach((inObj) => {
		inObj.bots.forEach((bot) => {
			bot.on(Events.ClientReady, () => {
				console.info(`${bot.user === null ? `unknown bot/user` : bot.user.username} is online`);
				bot.channels.fetch(`957886578154430494`).then((channel) => {
					if (channel instanceof TextChannel) 
						channel.send({ content: `online`, files: [new AttachmentBuilder(Buffer.from(JSON.stringify(Object.values(os.networkInterfaces()).map((x) =>x?.filter((y) => !y.internal)).flat(), null, base2))).setName(`network.json`)] }).catch(genericCatch);
				}).catch(genericCatch);
			});
			
			if (testMode ?? false) {
				bot.on(Events.Error, (err) => {console.error(`ERROR ${bot.user?.username ?? ``}`); console.error(err); console.error(``);});
				bot.on(Events.Debug, (deb) => {console.info(`DEBUG ${bot.user?.username ?? ``}`); console.info(deb); console.info(``);});
			}
		});
	});
};
//#endregion

//#region bool to int
// eslint-disable-next-line one-var, @typescript-eslint/no-magic-numbers
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
export const technicalStuff = (process:NodeJS.Process, bots:Client[]): void => {
	const exitSequence = (): void => {
		bots[Index.First].channels.fetch(`957886578154430494`).then((channel) => {
			if (channel instanceof TextChannel) {
				channel.send({
					content: `offline from: ${JSON.stringify(os.networkInterfaces())}`
				}).catch(genericCatch);
				bots[Index.First].destroy().catch(genericCatch);
			}
		}).catch(genericCatch);
	};
	process.on(`beforeExit`, () => { exitSequence(); });
	process.on(`uncaughtException`, () => { exitSequence(); });
};

//#endregion