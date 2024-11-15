//#region imports
import {BufferResolvable, ChannelType, Client, DMChannel, Message, NewsChannel, TextChannel, ThreadChannel} from "discord.js";
import {sendAsWebHook, blackList} from "./generalUse.js";
//#endregion

//#region forwarding
export const messageForwarding = (
	inObjs: {
		message: Message
	}[]
):void => {
	inObjs.forEach((inObj) => {
		if (inObj.message.channel.type == ChannelType.DM) {
			return;
		}
		const bot:Client = inObj.message.client;
		if (!inObj.message.author.bot) {
			if (bot.user != null) {
				if (inObj.message.member != null) {
					if (inObj.message.content.startsWith(`<#`)) {
						if (inObj.message.channel.type === ChannelType.GuildText)
						if ([
							`talk-as-${
								bot.user.username.toLowerCase()
							}`,
							`talk-and-dm-as-${
								bot.user.username.toLowerCase()
							}`,
							`dm-and-talk-as-${
								bot.user.username.toLowerCase()
							}`
						].includes(inObj.message.channel.name)) {
							const firstChannel = inObj.message.mentions.channels.first();
							if (!blackList.includes(inObj.message.channel.name) /*|| message.member.id == process.env.RASID*/ || inObj.message.member.permissions.has(`Administrator`)) {
								void bot.channels.fetch(firstChannel?.id ?? ``).then((channel):void => {
									if (!(channel instanceof TextChannel || channel instanceof DMChannel || channel instanceof NewsChannel || channel instanceof ThreadChannel)) {
										return;
									}
									channel.send({
										content: inObj.message.content.replace(firstChannel?.toString() ?? ``, ``).replace(/¤/g, ``),
										files: inObj.message.attachments.map((value) => value)
									}).catch((err: unknown) => {console.error(err)});
								});
							}
							else {
								inObj.message.channel.send(`Nice try`)
									.catch((err: unknown) => {console.error(err)});
							}
						}
					}
					else if (inObj.message.content.startsWith(`<@`) && !inObj.message.content.startsWith(`<@&`) /*&& message.member.hasPermission(`ADMINISTRATOR`)*/) {
						if (inObj.message.channel.type === ChannelType.GuildText)
							if ([
								`dm-as-${
									bot.user.username.toLowerCase()
								}`,
								`talk-and-dm-as-${
									bot.user.username.toLowerCase()
								}`,
								`dm-and-talk-as-${
									bot.user.username.toLowerCase()
								}`
							].includes(inObj.message.channel.name)) {
							/*bot.users.cache
								.get(message.mentions.users.first().id)
								.send(message.content.replace(message.mentions.users.first().id, ``)
								.replace(`<@>`, ``)
								.replace(`<@!>`, ``)
								.replace(/¤/g, ``),
								{
									files: message.attachments.array()
								})
								.then(():void => {
									//message.channel.send(`Message sent to ${
										message.mentions.users.first().tag
									}`)
								})
								.catch((err):void => {
									//message.channel.send(`Sorry, but ${
										message.mentions.users.first().tag
									} has blocked me or they blocked DM's from this server`)
								});*/
							void inObj.message.channel.send(`This functionality is temporarily disabled`);
							}
					}
				}
			}
		}
	});
};
//#endregion

//#region DM spy
export const DMSpy = (
	inObjs: {
		message: Message,
		ChID: `${bigint}`
	}[]
):void => {
	inObjs.forEach(inObj => {
		if (inObj.message.channel.type == ChannelType.DM && !inObj.message.author.bot /*&& message.author.id != process.env.RASID*/) {
			void inObj.message.client.channels.fetch(inObj.ChID).then((channel):void => {
				if (!(channel instanceof TextChannel || channel instanceof NewsChannel)) {
					return;
				}
				channel.send(`\`\`\`${
					inObj.message.author.tag
				} - <@${
					inObj.message.author.id
				}>\`\`\`\nsent:`)
					.catch((err: unknown) => {console.error(err)});
				sendAsWebHook([
					{
						message: inObj.message,
						sendTo: channel,
						sendMessage: {
							content: inObj.message.content,
							files: inObj.message.attachments.map((value) => value)
						},
						name: inObj.message.author.username,
						PFP: inObj.message.author.avatarURL() as BufferResolvable
					}
				]);
				if (inObj.message.channel.type === ChannelType.GuildText)
					inObj.message.channel.send(`Your message was sent to a super secret channel in Everyone Sightings`)
						.catch((err: unknown) => {console.error(err)});
			});
		}
	});
};
//#endregion

//#region Channel link
export const channelLink = (
	inObjs: {
		message: Message,
		ch1: `${bigint}`,
		ch2: `${bigint}`
	}[]
):void => {
	inObjs.forEach((inObj) => {
		if (!inObj.message.author.bot && (inObj.message.channel.id == inObj.ch1 || inObj.message.channel.id == inObj.ch2)) {
			void inObj.message.client.channels.fetch(inObj.ch1).then((ch1):void => {
				if (!(ch1 instanceof TextChannel || ch1 instanceof NewsChannel)) {
					return;
				}
				void inObj.message.client.channels.fetch(inObj.ch2).then((ch2):void => {
					if (!(ch2 instanceof TextChannel || ch2 instanceof NewsChannel)) {
						return;
					}
					switch (inObj.message.channel.id) {
					case ch1.id:
						sendAsWebHook([
							{
								message: inObj.message,
								sendTo: ch2,
								sendMessage: {
									content: inObj.message.content,
									files: inObj.message.attachments.map((value) => value)
								},
								name: inObj.message.author.username,
								PFP: inObj.message.author.displayAvatarURL()
							}
						]);
						break;
					case ch2.id:
						sendAsWebHook([
							{
								message: inObj.message,
								sendTo: ch1,
								sendMessage: {
									content: inObj.message.content,
									files: inObj.message.attachments.map((value) => value)
								},
								name: inObj.message.author.username,
								PFP: inObj.message.author.displayAvatarURL()
							}
						]);
						break;
					default:
						break;
					}
				});
			});
		}
	});
};
//#endregion