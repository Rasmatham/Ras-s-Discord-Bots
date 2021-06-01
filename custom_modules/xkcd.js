const { Message, MessageEmbed } = require(`discord.js`);
const xkcd = require(`xkcd`);

var xkcdFunct = (message, numRaw) => {
    let num = Math.ceil(Math.abs(numRaw));
    xkcd((xkcdObjOuter) => {
        if (num > xkcdObjOuter.num || num <= 0) {
            message.channel.send(`Try a whole number from 1 to ${xkcdObjOuter.num}`);
        } else {
            let xkcdRand = Math.ceil(Math.random() * (xkcdObjOuter.num + Math.random()));
            xkcd(num || xkcdRand, (xkcdObj) => {
                const xkcdEmbed = new MessageEmbed()
                    .setTitle(xkcdObj.title)
                    .setURL(`https://xkcd.com/${xkcdObj.num}/`)
                    .setDescription(xkcdObj.alt)
                    .setImage(xkcdObj.img);
                message.channel.send({ embed: xkcdEmbed });
            });
        }
    });
}
/**
 * 
 * @param {Message} message 
 * @param {String} prefix 
 */
var sendEmbed = (message, prefix) => {
    if (message.content.toLowerCase().startsWith(`${prefix}xkcd`)) {
        if (!isNaN(message.content.toLowerCase().replace(`${prefix}xkcd`, ``))) {
            xkcdFunct(message, message.content.toLowerCase().replace(`${prefix}xkcd `, ``));
        } else {
            xkcdFunct(message);
        }
    }
}
module.exports = sendEmbed;