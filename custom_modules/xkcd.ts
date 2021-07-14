import { CommandInteraction, MessageEmbed } from "discord.js";
const xkcdModule = require(`xkcd`);

var xkcdFunct = (interaction: CommandInteraction) => {
    xkcdModule((xkcdObjOuter: {num: number}) => {
        let num = Math.ceil(Math.random() * (xkcdObjOuter.num + Math.random()))
        if(typeof interaction.options.get(`xkcd_number`) != `undefined`){
            num = interaction.options.get(`xkcd_number`).value as number
        }
        if (num > xkcdObjOuter.num || num <= 0) {
            interaction.reply({content: `Try a whole number from 1 to ${xkcdObjOuter.num}`, ephemeral: true})
            .catch(console.error);
        } else {
            xkcdModule(num, (xkcdObj: {title: string, num: number, alt: string, img: string}) => {
                const xkcdEmbed = new MessageEmbed()
                .setTitle(xkcdObj.title)
                .setURL(`https://xkcd.com/${xkcdObj.num}/`)
                .setDescription(xkcdObj.alt)
                .setImage(xkcdObj.img);
                interaction.reply({embeds: [xkcdEmbed]})
                .catch(console.error);
            });
        }
    });
}
module.exports = xkcdFunct;