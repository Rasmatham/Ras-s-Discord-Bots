//#region imports
import type { MessageReplyOptions } from "discord.js";

import { EmbedBuilder } from "discord.js";

import type { PokeObjType } from "../Pokebot/PokeDB.js";

import { pokemon, trainerList } from "../Pokebot/PokeDB.js";
import { Index, offByOne, zero } from "./generalUse.js";
//#endregion

//#region trainers
export const trainers = trainerList;
//#endregion

//#endregion

//#region dex embed
// eslint-disable-next-line one-var
export const natDex = (inObj: {query: number | string}):MessageReplyOptions => {
	let dexNumber: number;
	dexNumber = zero;
	if (!isNaN(Number(inObj.query)))
		inObj.query = Number(inObj.query);
	switch (typeof inObj.query) {
		case `number`:
			if (inObj.query <= pokemon.length-offByOne && inObj.query > zero) {
				dexNumber = inObj.query;
				break;
			}
			else break;
		case `string`:
			Object.keys(pokemon).forEach(i => {
				const pokeObj:PokeObjType = pokemon[Number.parseInt(i, 10)];
				if (inObj.query === pokeObj.name.toLowerCase()) 
					dexNumber = Number.parseInt(pokeObj.nat, 10);
			});
			break;
		case `bigint`:
		case `boolean`:
		case `symbol`:
		case `undefined`:
		case `object`:
		case `function`:
  		default:
			break;
	}
	const attachment = { attachment: `./Pokebot/Pokemon/1-151/250px-${pokemon[dexNumber].nat}${pokemon[dexNumber].name}.png` },
	secType = ():string => {
		const [ , secondaryType ] = pokemon[dexNumber].types;
		if (typeof secondaryType === `undefined`) 
			return `None`;
		return secondaryType.name;
	};
	// eslint-disable-next-line one-var
	const embed:EmbedBuilder = new EmbedBuilder()
		.setColor(pokemon[dexNumber].types[Index.First].color)
		.setTitle(pokemon[dexNumber].name)
		.addFields([
			{ name: `National dex number:`, value: pokemon[dexNumber].nat },
			{ name: `Regional dex nunber:`, value: pokemon[dexNumber].reg },
			{ name: `Primary type`, value: pokemon[dexNumber].types[Index.First].name },
			{ name: `Secondary type`, value: secType() }
		])
		.setImage(`attachment://250px-${pokemon[dexNumber].nat}${pokemon[dexNumber].name}.png`);
	return { embeds: [embed], files: [attachment] };
};
//#endregion