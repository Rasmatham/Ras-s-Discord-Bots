import { MessageEmbed, MessageAttachment, ReplyMessageOptions } from "discord.js";
export var DB = require(`../Pokebot/PokeDB.js`);
//dex embed
export var natDex = (Query: any):ReplyMessageOptions => {
	let dexNumber:number = 0;
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
			let pokeObj:{
				name: string, 
				reg:`${number}`, 
				nat:`${number}`, 
				rarity:number, 
				types:[{
					name: string, 
					color: string, 
					weakTo: string[], 
					strongTo: string[], 
					NoDamageTo: string[]
				}, 
				{
					name: string, 
					color: string, 
					weakTo: string[], 
					strongTo: string[], 
					NoDamageTo: string[]
				}?], 
				height:[string, string], 
				weight:[string, string], 
				dexEntries:{
					re:string, 
					bl:string, 
					yr:string, 
					go:string, 
					si:string, 
					cr:string, 
					ru:string, 
					sa:string, 
					em:string, 
					fr:string, 
					lg:string, 
					di:string, 
					pe:string, 
					pl:string, 
					hg:string, 
					ss:string, 
					wh:string, 
					b2:string, 
					w2:string, 
					x:string, 
					y:string, 
					or:string, 
					as:string, 
					su:string, 
					mo:string, 
					us:string, 
					um:string, 
					lgp:string, 
					lge:string, 
					sw:string, 
					sh:string
				}
			} = DB.pokemon[i];
			if (Query === pokeObj.name.toLowerCase()) {
				dexNumber = Number(pokeObj.nat);
			}
		})
		break;
		default:
		break;
	}
	var secType = ():string => {
		if (typeof DB.pokemon[dexNumber].types[1] !== `undefined`) {
			return DB.pokemon[dexNumber].types[1].name
		} else {
			return `None`
		}
	}
	var attachment:MessageAttachment = new MessageAttachment(`./Pokèbot/Pokemon/1-151/250px-${DB.pokemon[dexNumber].nat}${DB.pokemon[dexNumber].name}.png`);
	var embed:MessageEmbed = new MessageEmbed()
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