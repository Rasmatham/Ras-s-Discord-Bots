const { CommandInteraction, MessageEmbed } = require(`discord.js`);
const xkcd = require(`xkcd`);

/**
* 
* @param {CommandInteraction} interaction
*/
var xkcdFunct = (interaction) => {
    xkcd((xkcdObjOuter) => {
        let num = Math.ceil(Math.random() * (xkcdObjOuter.num + Math.random()))
        if(typeof interaction.options.get(`xkcd_number`) != `undefined`){
            num = interaction.options.get(`xkcd_number`).value
        }
        if (num > xkcdObjOuter.num || num <= 0) {
            interaction.reply({content: `Try a whole number from 1 to ${xkcdObjOuter.num}`, ephemeral: true});
        } else {
            xkcd(num, (xkcdObj) => {
                const xkcdEmbed = new MessageEmbed()
                .setTitle(xkcdObj.title)
                .setURL(`https://xkcd.com/${xkcdObj.num}/`)
                .setDescription(xkcdObj.alt)
                .setImage(xkcdObj.img);
                interaction.reply({embeds: [xkcdEmbed]});
            });
        }
    });
}
module.exports = xkcdFunct;