const { Message, MessageEmbed } = require(`discord.js`);
/**
 * 
 * @param {Message} message Discord.js Message object
 * @param {String} prefix 
 * @returns 
 */
var dice = (message, prefix) => {
    if (message.content.toLowerCase() !== `${prefix}d`) {
        if (message.content.toLowerCase().startsWith(`${prefix}d`)) {
            if (isNaN(Number(message.content.toLowerCase().replace(`${prefix}d`, ``)))) {
                if (message.content.includes(`*`)) {
                    var multidice = message.content
                        .toLowerCase()
                        .replace(`${prefix}d`, ``)
                        .replace(`*`, ` `)
                        .split(` `);
                    var i;
                    if (isNaN(multidice[0])) {
                        return;
                    } else if (isNaN(multidice[1])) {
                        return;
                    } else if (multidice[1] >= 21) {
                        message.channel.send(`Sorry, but you can only do 20 at a time`);
                    } else {
                        if (multidice[0] === `10`) {
                            for (i = 0; i < multidice[1]; i++) {
                                var number10 = new MessageEmbed()
                                    .setColor(`#0099ff`)
                                    .setTitle(`Totally legit dice`)
                                    .addField(`You \"rolled\" a:`, Math.floor(Math.random() * 10), true)
                                    .addField(`\"roll\" number:`, `${i + 1}/${multidice[1]}`);
                                message.channel.send(number10);
                            }
                        } else if (multidice[0] === `100`) {
                            for (i = 0; i < multidice[1]; i++) {
                                var number100 = new MessageEmbed()
                                    .setColor(`#0099ff`)
                                    .setTitle(`Totally legit dice`)
                                    .addField(`You \"rolled\" a:`, Math.floor(Math.random() * 10) * 10, true)
                                    .addField(`\"roll\" number:`, `${i + 1}/${multidice[1]}`);
                                message.channel.send(number100);
                            }
                        } else {
                            for (i = 0; i < multidice[1]; i++) {
                                var numberN = new MessageEmbed()
                                    .setColor(`#0099ff`)
                                    .setTitle(`Totally legit dice`)
                                    .addField(`You \"rolled\" a:`, Math.ceil(Math.random() * Number(multidice[0])), true)
                                    .addField(`\"roll\" number:`, `${i + 1}/${multidice[1]}`);
                                message.channel.send(numberN);
                            }
                        }
                    }
                } else {
                    return;
                }
            } else if (message.content.toLowerCase().replace(`${prefix}d`, ``) === `10`) {
                var number10 = new MessageEmbed()
                    .setColor(`#0099ff`)
                    .setTitle(`Totally legit dice`)
                    .addField(`You \"rolled\" a:`,
                        Math.floor(Math.random() * 10), true);
                message.channel.send(number10);
            } else if (message.content.toLowerCase().replace(`${prefix}d`, ``) === `100`) {
                var number100 = new MessageEmbed()
                    .setColor(`#0099ff`)
                    .setTitle(`Totally legit dice`)
                    .addField(`You \"rolled\" a:`, Math.floor(Math.random() * 10) * 10, true);
                message.channel.send(number100);
            } else {
                var numberN = new MessageEmbed()
                    .setColor(`#0099ff`)
                    .setTitle(`Totally legit dice`)
                    .addField(`You \"rolled\" a:`,
                        Math.ceil(Math.random() *
                            Number(message.content.toLowerCase().replace(`${prefix}d`, ``))
                        ),
                        true
                    );
                message.channel.send(numberN);
            }
        }
    }
}
module.exports = dice;