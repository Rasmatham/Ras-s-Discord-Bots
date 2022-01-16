//#region imports
import {Message, TextChannel, WebhookClient, Client, MessageOptions, Webhook, BufferResolvable, User, Intents, NewsChannel, EmbedFieldData, ClientUser, InteractionReplyOptions, CommandInteraction, CommandInteractionOption, MessageEmbed} from "discord.js";
//#endregion

//#region intent
export const intents:Intents = new Intents([
	`GUILDS`,
	`GUILD_MEMBERS`,
	`GUILD_BANS`,
	`GUILD_EMOJIS_AND_STICKERS`,
	`GUILD_INTEGRATIONS`,
	`GUILD_WEBHOOKS`,
	`GUILD_INVITES`,
	`GUILD_VOICE_STATES`,
	`GUILD_PRESENCES`,
	`GUILD_MESSAGES`,
	`GUILD_MESSAGE_REACTIONS`,
	`GUILD_MESSAGE_TYPING`,
	`DIRECT_MESSAGES`,
	`DIRECT_MESSAGE_REACTIONS`,
	`DIRECT_MESSAGE_TYPING`
]);
//#endregion

//#region Check amount
export const checkFor = (
	inObjs: {
		arr: string[],
		str: string,
		inline?:boolean
	}[]
):EmbedFieldData[] => {
	const out:EmbedFieldData[] = [];
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
							if (webHook.owner.id === user.id) {
								const myWebHook:WebhookClient = new WebhookClient({
									id: webHook.id,
									token: webHook.token as string
								});
								myWebHook.edit({
									name: inObj.name,
									avatar: inObj.PFP
								})
									.then((editedWebHook):void => {
										if (typeof inObj.sendMessage.content !== `string` || inObj.sendMessage.content === ``) {
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
	const thing = (interaction.options.get(`thing`) as CommandInteractionOption).value as `channels`|`emojis`|`members`|`roles`|`stickers`;
	if(interaction.guild == null && thing == `members`){return [{embeds: [new MessageEmbed().addField(`members`, `${interaction.user.username}\n${interaction.client.user?.username}`)]}]; }
	if(interaction.guild == null){return [{content: `How am I supposed to do that?`}]; }
	switch (thing) {
	case `channels`:
		return await interaction.guild.channels.fetch().then((channels) => {
			const channelsFormated = channels.map((channel) =>
				`<#${
					channel.id
				}> (${
					channel.type.toLowerCase().split(`_`).map((x) => `${
						x[0].toUpperCase()
					}${
						x.slice(1)
					}`)[1]
				}) <t:${
					Math.round(channel.createdTimestamp/1000)
				}:D> <t:${
					Math.round(channel.createdTimestamp/1000)
				}:T>`
			);
			const x:string[][] = [];
			for (let i = 0; i < channelsFormated.length; i += 14) {
				x.push(channelsFormated.slice(i, i + 14));
			}
			const y:string[][][] = [];
			for (let i = 0; i < x.length; i += 5) {
				y.push(x.slice(i, i + 5));
			}
			const embeds:InteractionReplyOptions[] = [];
			y.forEach((y) => {
				const z = new MessageEmbed();
				y.forEach((a) => z.addField(`test`, a.join(`\n`)));
				embeds.push({embeds: [z]});
			});
			console.log(JSON.stringify(embeds).length);
			return embeds;
		});
	case `emojis`:
		interaction.guild.emojis.fetch().then((emojis) => {
			emojis.forEach((emoji) => {
				console.log(emoji.name);
			});
		});
		return [
			{
				content: `emojis`
			}
		];
	case `members`:
		interaction.guild.members.fetch().then((members) => {
			members.forEach((member) => {
				console.log(member.displayName);
			});
		});
		return [
			{
				content: `members`
			}
		];
	case `roles`:
		interaction.guild.roles.fetch().then((roles) => {
			roles.forEach((role) => {
				console.log(role.name);
			});
		});
		return [
			{
				content: `roles`
			}
		];
	case `stickers`:
		interaction.guild.stickers.fetch().then((stickers) => {
			stickers.forEach((sticker) => {
				console.log(sticker.name);
			});
		});
		return [
			{
				content: `stickers`
			}
		];
	}
};

//#endregion

//#region Bot check
export const botReady = (
	inObjs: {
		bots: Client[]
	}[]
):void => {
	inObjs.forEach((inObj) => {
		inObj.bots.forEach((bot):void => {
		/*bot.on('debug', console.log)
		.on('warn', console.log)*/
			bot.on(`ready`, ():void => {
				console.log(`${
					bot.user != null ? bot.user.username : `unknown bot/user`
				} is online`);
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