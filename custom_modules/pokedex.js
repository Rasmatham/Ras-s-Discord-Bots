const { MessageEmbed } = require(`discord.js`);
var DB = require(`../Pokèbot/PokeDB.js`);
//dex embed
{
    /**
     * 
     * @param {Number} Query A valid entry number in teh national dex
     * @returns {MessageEmbed}
     */
    var natDex = (Query) => {
        let dexNumber = 0;
        if (!isNaN(Query)) { Query = Number(Query) }
        switch (typeof Query) {
            case `number`:
                if (Number(Query) <= 151 && Number(Query) > 0) {
                    dexNumber = Number(Query);
                    break;
                } else {
                    break;
                }
            case `string`:
                Object.keys(DB.pokemon).forEach(i => {
                    let pokeObj = DB.pokemon[i];
                    if (Query === pokeObj.name.toLowerCase()) {
                        dexNumber = Number(pokeObj.nat);
                    }
                })
                break;
            default:
                break;
        }
        var secType = () => {
            if (typeof DB.pokemon[dexNumber].types[1] !== `undefined`) {
                return DB.pokemon[dexNumber].types[1].name
            } else {
                return `None`
            }
        }
        var embed = new MessageEmbed()
            .setColor(DB.pokemon[dexNumber].types[0].color)
            .setTitle(DB.pokemon[dexNumber].name)
            .addFields({ name: `National dex number:`, value: DB.pokemon[dexNumber].nat },
                { name: `Regional dex nunber:`, value: DB.pokemon[dexNumber].reg },
                { name: `Primary type`, value: DB.pokemon[dexNumber].types[0].name },
                { name: `Secondary type`, value: secType() }
            )
            .attachFiles([`./Pokèbot/Pokemon/1-151/250px-${DB.pokemon[dexNumber].nat}${DB.pokemon[dexNumber].name}.png`])
            .setImage(`attachment://250px-${DB.pokemon[dexNumber].nat}${DB.pokemon[dexNumber].name.replace(`'`, ``)}.png`);
        return embed;
    }
}
module.exports = {natDex, DB};