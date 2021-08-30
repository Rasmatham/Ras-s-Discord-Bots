import { ChannelResolvable, DMChannel, Message, NewsChannel, TextBasedChannels, TextChannel, ThreadChannel, VoiceChannel } from "discord.js";
const { sendAsWebHook, blackList } = require("./generalUse.js");
//forwarding
export var messageForwarding = (message: Message) => {
    if(message.channel.type == `DM`) {return}
    let bot = message.client;
    if (!message.author.bot) {
        if (message.content.startsWith(`<#`)) {
            if ([`talk-as-${bot.user.username.toLowerCase()}`, `talk-and-dm-as-${bot.user.username.toLowerCase()}`, `dm-and-talk-as-${bot.user.username.toLowerCase()}`].includes(message.channel.name)) {
                if (!blackList.includes(message.channel.name) /*|| message.member.id === process.env.RASID*/ || message.member.permissions.has(`ADMINISTRATOR`)) {
                    bot.channels.fetch(message.mentions.channels.first().id).then((channel) => {
                        if(!(channel instanceof TextChannel || channel instanceof DMChannel || channel instanceof NewsChannel || channel instanceof ThreadChannel)) {return}
                        channel.send({content: message.content.replace(message.mentions.channels.first().toString(), ``).replace(/¤/g, ``), files: message.attachments.map((value) => value)})
                        .catch(console.error);
                    })
                } else {
                    message.channel.send(`Nice try`)
                    .catch(console.error);
                }
            }
        } else if (message.content.startsWith(`<@`) && !message.content.startsWith(`<@&`) /*&& message.member.hasPermission(`ADMINISTRATOR`)*/) {
            if ([`dm-as-${bot.user.username.toLowerCase()}`, `talk-and-dm-as-${bot.user.username.toLowerCase()}`, `dm-and-talk-as-${bot.user.username.toLowerCase()}`].includes(message.channel.name)) {
                /*bot.users.cache
                .get(message.mentions.users.first().id)
                .send(message.content.replace(message.mentions.users.first().id, ``)
                .replace(`<@>`, ``)
                .replace(`<@!>`, ``)
                .replace(/¤/g, ``), { files: message.attachments.array() })
                .then(() => {
                    //message.channel.send(`Message sent to ${message.mentions.users.first().tag}`)
                })
                .catch((err) => {
                    //message.channel.send(`Sorry, but ${message.mentions.users.first().tag} has blocked me or they blocked DM's from this server`)
                });*/
                message.channel.send(`This functionality is temporarily disabled`)
            }
        }
    }
}
//DM spy
export var DMSpy = (message: Message, ChID: `${bigint}`) => {
    if (message.channel.type == "DM" && !message.author.bot /*&& message.author.id !== process.env.RASID*/) {
        message.client.channels.fetch(ChID).then((channel) => {
            if(!(channel instanceof TextChannel || channel instanceof NewsChannel)) {return}
            channel.send(`\`\`\`${message.author.tag} - <@${message.author.id}>\`\`\`\nsent:`)
            .catch(console.error);
            sendAsWebHook(message, channel, {content: message.content,files: message.attachments.map((value) => value)}, message.author.username , message.author.avatarURL());
            message.channel.send(`Your message was sent to a super secret channel in Everyone Sightings`)
            .catch(console.error);
        })
    }
}
//Channel link
export var channelLink = (message: Message, ch1: `${bigint}`, ch2: `${bigint}`) => {
    if (!message.author.bot && (message.channel.id == ch1 || message.channel.id == ch2)) {
        message.client.channels.fetch(ch1).then((ch1) => {
            if(!(ch1 instanceof TextChannel || ch1 instanceof NewsChannel)) {return}
            message.client.channels.fetch(ch2).then((ch2) => {
                if(!(ch2 instanceof TextChannel || ch2 instanceof NewsChannel)) {return}
                switch (message.channel.id) {
                    case ch1.id:
                    sendAsWebHook(message, ch2, {content: message.content,files: message.attachments.map((value) => value)}, message.author.username, message.author.displayAvatarURL({ format: `png`, dynamic: true }));
                    break;
                    case ch2.id:
                    sendAsWebHook(message, ch1, {content: message.content,files: message.attachments.map((value) => value)}, message.author.username, message.author.displayAvatarURL({ format: `png`, dynamic: true }));
                    break;
                    default:
                    break;
                }
            })
        })
    }
}