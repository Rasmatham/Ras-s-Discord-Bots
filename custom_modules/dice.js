const { CommandInteraction, MessageEmbed } = require(`discord.js`);
/**
* 
* @param {CommandInteraction} interaction
* @returns 
*/
var dice = (interaction) => {
    let dieSides = 6
    let diceCount = 1
    if(typeof interaction.options.get(`die_sides`) != `undefined`){
        dieSides = interaction.options.get(`die_sides`).value
    }
    if(typeof interaction.options.get(`dice_count`) != `undefined`){
        diceCount = interaction.options.get(`dice_count`).value
    }
    interaction.reply(`Rolling ${diceCount} D${dieSides}`).then(() => {
        if (diceCount > 20) {
            interaction.editReply(`Sorry, but you can only roll 20 dice at a time`);
        } else {
            if (dieSides === `10`) {
                for (i = 0; i < diceCount; i++) {
                    var number10 = new MessageEmbed()
                    .setColor(`#0099ff`)
                    .setTitle(`Totally legit dice`)
                    .addField(`You \"rolled\" a:`, `${Math.floor(Math.random() * 10)}`, true)
                    .addField(`\"roll\" number:`, `${i + 1}/${diceCount}`);
                    interaction.followUp({embeds: [number10]});
                }
            } else if (dieSides === `100`) {
                for (i = 0; i < diceCount; i++) {
                    var number100 = new MessageEmbed()
                    .setColor(`#0099ff`)
                    .setTitle(`Totally legit dice`)
                    .addField(`You \"rolled\" a:`, `${Math.floor(Math.random() * 10) * 10}`, true)
                    .addField(`\"roll\" number:`, `${i + 1}/${diceCount}`);
                    interaction.followUp({embeds: [number100]});
                }
            } else {
                for (i = 0; i < diceCount; i++) {
                    var numberN = new MessageEmbed()
                    .setColor(`#0099ff`)
                    .setTitle(`Totally legit dice`)
                    .addField(`You \"rolled\" a:`, `${Math.ceil(Math.random() * Number(dieSides))}`, true)
                    .addField(`\"roll\" number:`, `${i + 1}/${diceCount}`);
                    interaction.followUp({embeds: [numberN]});
                }
            }
        }
    })
}
module.exports = dice;