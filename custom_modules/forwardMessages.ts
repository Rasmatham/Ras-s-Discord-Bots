//#region imports
import {Client, DMChannel, Message, NewsChannel, TextChannel, ThreadChannel} from "discord.js";
import {sendAsWebHook, blackList} from "./generalUse.js";
//#endregion

//#region forwarding
export const messageForwarding = (
	inObjs: {
		message: Message
	}[]
):void => {
	inObjs.forEach((inObj) => {
		if (inObj.message.channel.type == `DM`) {
			return;
		}
		const bot:Client = inObj.message.client;
		if (!inObj.message.author.bot) {
			if (inObj.message.content.startsWith(`<#`)) {
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
					if (!blackList.includes(inObj.message.channel.name) /*|| message.member.id === process.env.RASID*/ || inObj.message.member.permissions.has(`ADMINISTRATOR`)) {
						bot.channels.fetch(inObj.message.mentions.channels.first().id).then((channel):void => {
							if (!(channel instanceof TextChannel || channel instanceof DMChannel || channel instanceof NewsChannel || channel instanceof ThreadChannel)) {
								return;
							}
							channel.send({
								content: inObj.message.content.replace(inObj.message.mentions.channels.first().toString(), ``).replace(/¤/g, ``),
								files: inObj.message.attachments.map((value) => value)
							}).catch(console.error);
						});
					}
					else {
						inObj.message.channel.send(`Nice try`)
							.catch(console.error);
					}
				}
			}
			else if (inObj.message.content.startsWith(`<@`) && !inObj.message.content.startsWith(`<@&`) /*&& message.member.hasPermission(`ADMINISTRATOR`)*/) {
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
					inObj.message.channel.send(`This functionality is temporarily disabled`);
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
		if (inObj.message.channel.type == `DM` && !inObj.message.author.bot /*&& message.author.id !== process.env.RASID*/) {
			inObj.message.client.channels.fetch(inObj.ChID).then((channel):void => {
				if (!(channel instanceof TextChannel || channel instanceof NewsChannel)) {
					return;
				}
				channel.send(`\`\`\`${
					inObj.message.author.tag
				} - <@${
					inObj.message.author.id
				}>\`\`\`\nsent:`)
					.catch(console.error);
				sendAsWebHook([
					{
						message: inObj.message,
						sendTo: channel,
						sendMessage: {
							content: inObj.message.content,
							files: inObj.message.attachments.map((value) => value)
						},
						name: inObj.message.author.username,
						PFP: inObj.message.author.avatarURL()
					}
				]);
				inObj.message.channel.send(`Your message was sent to a super secret channel in Everyone Sightings`)
					.catch(console.error);
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
			inObj.message.client.channels.fetch(inObj.ch1).then((ch1):void => {
				if (!(ch1 instanceof TextChannel || ch1 instanceof NewsChannel)) {
					return;
				}
				inObj.message.client.channels.fetch(inObj.ch2).then((ch2):void => {
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
								PFP: inObj.message.author.displayAvatarURL({
									format: `png`,
									dynamic: true
								})
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
								PFP: inObj.message.author.displayAvatarURL({
									format: `png`,
									dynamic: true
								})
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