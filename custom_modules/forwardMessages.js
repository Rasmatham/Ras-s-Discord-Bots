const { Message } = require(`discord.js`);
const { sendAsWebHook, blackList } = require(`./generalUse.js`);
//forwarding
{
    /**
     * 
     * @param {Message} message
     */
    var messageForwarding = (message) => {
        let bot = message.client;
            if (!message.author.bot) {
                if (message.content.startsWith(`<#`)) {
                    if ([`talk-as-${bot.user.username.toLowerCase()}`, `talk-and-dm-as-${bot.user.username.toLowerCase()}`, `dm-and-talk-as-${bot.user.username.toLowerCase()}`].includes(message.channel.name)) {
                        if (!blackList.includes(message.channel.name) || message.member.id === process.env.RASID || message.member.hasPermission(`ADMINISTRATOR`)) {
                            bot.channels.cache
                                .get(message.mentions.channels.first().id)
                                .send(message.content.replace(message.mentions.channels.first(), ``)
                                    .replace(/¤/g, ``), { files: message.attachments.array() }
                                );
                        } else {
                            message.channel.send(`Nice try`);
                        }
                    }
                } else if (message.content.startsWith(`<@`) && !message.content.startsWith(`<@&`) /*&& message.member.hasPermission(`ADMINISTRATOR`)*/) {
                    if ([`dm-as-${bot.user.username.toLowerCase()}`, `talk-and-dm-as-${bot.user.username.toLowerCase()}`, `dm-and-talk-as-${bot.user.username.toLowerCase()}`].includes(message.channel.name)) {
                        bot.users.cache
                            .get(message.mentions.users.first().id)
                            .send(message.content.replace(message.mentions.users.first().id, ``)
                                .replace(`<@>`, ``)
                                .replace(`<@!>`, ``)
                                .replace(/¤/g, ``), { files: message.attachments.array() })
                            .then(() => {
                                message.channel.send(`Message sent to ${message.mentions.users.first().tag}`)
                            })
                            .catch((err) => {
                                message.channel.send(`Sorry, but ${message.mentions.users.first().tag} has blocked me or they blocked DM's from this server`)
                            });
                    }
                }
            }
    }
}
//DM spy
{
    /**
     * 
     * @param {Message} message Discord.js Message object
     * @param {String|Number} ChID Channel ID for the channel the DM should be sent to
     */
    var DMSpy = (message, ChID) => {
        if (message.guild === null && !message.author.bot && message.author.id !== process.env.RASID) {
            message.client.channels.cache.get(ChID).send(`\`\`\`${message.author.tag} - <@${message.author.id}>\`\`\`\nsent:`);
            sendAsWebHook(message, message.client.channels.cache.get(ChID), message, { files: message.attachments.array() }, message.author.username, message.author.displayAvatarURL({ format: `png`, dynamic: true }));
            message.channel.send(`Your message was sent to a super secret channel in Everyone Sightings`);
        }
    }
}
//Channel link
{
    /**
     * 
     * @param {Message} message Discord.js Message object
     * @param {String|Number} ch1 ID for one of the channels that should be linked
     * @param {String|Number} ch2 ID for the other channel that should be linked
     */
    var channelLink = (message, ch1, ch2) => {
        if (!message.author.bot) {
            switch (message.channel.id) {
                case ch1:
                    sendAsWebHook(message, message.client.channels.cache.get(ch2), message, { files: message.attachments.array() }, message.author.username, message.author.displayAvatarURL({ format: `png`, dynamic: true }));
                    break;
                case ch2:
                    sendAsWebHook(message, message.client.channels.cache.get(ch1), message, { files: message.attachments.array() }, message.author.username, message.author.displayAvatarURL({ format: `png`, dynamic: true }));
                    break;
                default:
                    break;
            }
        }
    }
}
module.exports = {messageForwarding, DMSpy, channelLink}