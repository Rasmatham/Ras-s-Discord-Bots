//#region imports
import { BufferResolvable, ChannelType, Client, DMChannel, Message, NewsChannel, TextChannel, ThreadChannel } from "discord.js";
import { blackList, genericCatch, sendAsWebHook } from "./generalUse.js";
//#endregion

//#region forwarding
export const messageForwarding = (
	inObjs: {
		message: Message
	}[]
) => {
	inObjs.forEach((inObj) => {
		if (inObj.message.channel.type === ChannelType.DM) return;
		const bot:Client = inObj.message.client;
		if (inObj.message.author.bot) return;
		if (bot.user === null) return;
		if (inObj.message.member === null) return;
		if (inObj.message.content.startsWith(`<#`)) {
			if (inObj.message.channel.type !== ChannelType.GuildText) return;
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
					bot.channels.fetch(firstChannel?.id ?? ``).then((channel) => {
						if (!(channel instanceof TextChannel || channel instanceof DMChannel || channel instanceof NewsChannel || channel instanceof ThreadChannel)) return;
						channel.send({
							content: inObj.message.content.replace(firstChannel?.toString() ?? ``, ``).replace(/¤/gu, ``),
							files: inObj.message.attachments.map((value) => value)
						}).catch(genericCatch);
					}).catch(genericCatch);
				}
				else {
					inObj.message.channel.send(`Nice try`)
						.catch(genericCatch);
				}
			}
		}
		else if (inObj.message.content.startsWith(`<@`) && !inObj.message.content.startsWith(`<@&`) /*&& message.member.hasPermission(`ADMINISTRATOR`)*/) {
			if (inObj.message.channel.type !== ChannelType.GuildText) return;
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
			].includes(inObj.message.channel.name)) 
				inObj.message.channel.send(`This functionality is temporarily disabled`).catch(genericCatch);
			
		}
	});
};
//#endregion

//#region DM spy
// eslint-disable-next-line one-var
export const DMSpy = (
	inObjs: {
		message: Message,
		ChID: `${bigint}`
	}[]
) => {
	inObjs.forEach(inObj => {
		if (inObj.message.channel.type === ChannelType.DM && !inObj.message.author.bot /*&& message.author.id != process.env.RASID*/) {
			inObj.message.client.channels.fetch(inObj.ChID).then((channel) => {
				if (!(channel instanceof TextChannel || channel instanceof NewsChannel)) return;
				channel.send(`\`\`\`${
					inObj.message.author.tag
				} - <@${
					inObj.message.author.id
				}>\`\`\`\nsent:`).catch(genericCatch);
				sendAsWebHook([
					{
						message: inObj.message,
						name: inObj.message.author.username,
						pfp: inObj.message.author.avatarURL() as BufferResolvable,
						sendMessage: { content: inObj.message.content, files: inObj.message.attachments.map((value) => value) },
						sendTo: channel,
					}
				]);
				if (inObj.message.channel.type === ChannelType.GuildText)
					inObj.message.channel.send(`Your message was sent to a super secret channel in Everyone Sightings`).catch(genericCatch);
			}).catch(genericCatch);
		}
	});
};
//#endregion

//#region Channel link
// eslint-disable-next-line one-var
export const channelLink = (
	inObjs: {
		message: Message,
		ch1: `${bigint}`,
		ch2: `${bigint}`
	}[]
) => {
	inObjs.forEach((inObj) => {
		if (!inObj.message.author.bot && (inObj.message.channel.id === inObj.ch1 || inObj.message.channel.id === inObj.ch2)) {
			inObj.message.client.channels.fetch(inObj.ch1).then((ch1) => {
				if (!(ch1 instanceof TextChannel || ch1 instanceof NewsChannel)) return;
				inObj.message.client.channels.fetch(inObj.ch2).then((ch2) => {
					if (!(ch2 instanceof TextChannel || ch2 instanceof NewsChannel)) return;
					switch (inObj.message.channel.id) {
					case ch1.id:
						sendAsWebHook([
							{
								message: inObj.message,
								name: inObj.message.author.username,
								pfp: inObj.message.author.displayAvatarURL(),
								sendMessage: { content: inObj.message.content, files: inObj.message.attachments.map((value) => value) },
								sendTo: ch2
							}
						]);
						break;
					case ch2.id:
						sendAsWebHook([
							{
								message: inObj.message,
								name: inObj.message.author.username,
								pfp: inObj.message.author.displayAvatarURL(),
								sendMessage: { content: inObj.message.content, files: inObj.message.attachments.map((value) => value) },
								sendTo: ch1
							}
						]);
						break;
					default:
						break;
					}
				}).catch(genericCatch);
			}).catch(genericCatch);
		}
	});
};
//#endregion