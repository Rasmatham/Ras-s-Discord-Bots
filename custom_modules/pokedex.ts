import {MessageEmbed, MessageAttachment, ReplyMessageOptions, ColorResolvable} from "discord.js";
import {pokemon, trainerList} from "../Pokebot/PokeDB.js";
export const trainers = trainerList;
type pokeRange = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 20 | 31 | 32 | 33 | 34 | 35 | 36 | 37 | 38 | 39 | 40 | 41 | 42 | 43 | 44 | 45 | 46 | 47 | 48 | 49 | 50 | 51 | 52 | 53 | 54 | 55 | 56 | 57 | 58 | 59 | 60 | 61 | 62 | 63 | 64 | 65 | 66 | 67 | 68 | 69 | 70 | 71 | 72 | 73 | 74 | 75 | 76 | 77 | 78 | 79 | 80 | 81 | 82 | 83 | 84 | 85 | 86 | 87 | 88 | 89 | 90 | 91 | 92 | 93 | 94 | 95 | 96 | 97 | 98 | 99 | 100 | 101 | 102 | 103 | 104 | 105 | 106 | 107 | 108 | 109 | 110 | 111 | 112 | 113 | 114 | 115 | 116 | 117 | 118 | 119 | 120 | 121 | 122 | 123 | 124 | 125 | 126 | 127 | 128 | 129 | 130 | 131 | 132 | 133 | 134 | 135 | 136 | 137 | 138 | 139 | 140 | 141 | 142 | 143 | 144 | 145 | 146 | 147 | 148 | 149 | 150 | 151
type pokeObjType = {
	name: string,
	nat: string,
	types: [
		{
			name: string,
			color: string
		},
		{
			name: string,
			color: string
		}
	] | [
		{
			name: string,
			color: string
		}
	]
}
//dex embed
export const natDex = (inObj: {query: string | number}):ReplyMessageOptions => {
	let dexNumber = 0 as pokeRange;
	if (!isNaN(Number(inObj.query))) {
		inObj.query = Number(inObj.query);
	}
	switch (typeof inObj.query) {
	case `number`:
		if (Number(inObj.query) <= 151 && Number(inObj.query) > 0) {
			dexNumber = Number(inObj.query) as pokeRange;
			break;
		}
		else {
			break;
		}
	case `string`:
		Object.keys(pokemon).forEach(i => {
			const pokeObj:pokeObjType = pokemon[Number(i) as pokeRange] as pokeObjType;
			if (inObj.query === pokeObj.name.toLowerCase()) {
				dexNumber = Number(pokeObj.nat) as pokeRange;
			}
		});
		break;
	default:
		break;
	}
	const secType = ():string => {
		if (typeof pokemon[dexNumber].types[1] !== `undefined`) {
			return pokemon[dexNumber].types[1].name;
		}
		else {
			return `None`;
		}
	};
	const attachment:MessageAttachment = new MessageAttachment(`./Pokèbot/Pokemon/1-151/250px-${
		pokemon[dexNumber].nat
	}${
		pokemon[dexNumber].name
	}.png`);
	const embed:MessageEmbed = new MessageEmbed()
		.setColor(pokemon[dexNumber].types[0].color as ColorResolvable)
		.setTitle(pokemon[dexNumber].name)
		.addFields({
			name: `National dex number:`,
			value: pokemon[dexNumber].nat
		},
		{
			name: `Regional dex nunber:`,
			value: pokemon[dexNumber].reg
		},
		{
			name: `Primary type`,
			value: pokemon[dexNumber].types[0].name
		},
		{
			name: `Secondary type`,
			value: secType()
		}
		)
		.setImage(`attachment://250px-${
			pokemon[dexNumber].nat
		}${
			pokemon[dexNumber].name
		}.png`);
	return {
		embeds: [
			embed
		],
		files: [
			attachment
		]
	};
};