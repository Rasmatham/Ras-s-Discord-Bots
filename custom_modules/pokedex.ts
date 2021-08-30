import { MessageEmbed, MessageAttachment } from "discord.js";
export var DB = require(`../Pokebot/PokeDB.js`);
//dex embed
export var natDex = (Query: any) => {
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
    var attachment = new MessageAttachment(`./Pokèbot/Pokemon/1-151/250px-${DB.pokemon[dexNumber].nat}${DB.pokemon[dexNumber].name}.png`);
    var embed = new MessageEmbed()
    .setColor(DB.pokemon[dexNumber].types[0].color)
    .setTitle(DB.pokemon[dexNumber].name)
    .addFields({ name: `National dex number:`, value: DB.pokemon[dexNumber].nat },
    { name: `Regional dex nunber:`, value: DB.pokemon[dexNumber].reg },
    { name: `Primary type`, value: DB.pokemon[dexNumber].types[0].name },
    { name: `Secondary type`, value: secType() }
    )
    .setImage(`attachment://250px-${DB.pokemon[dexNumber].nat}${DB.pokemon[dexNumber].name}.png`);
    return {embeds: [embed], files: [attachment] };
}