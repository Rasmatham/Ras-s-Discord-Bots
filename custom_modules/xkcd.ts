//#region imports
import { ephemeral, genericCatch } from "./generalUse";
import type { CommandInteraction } from "discord.js";
import { EmbedBuilder } from "discord.js";
import * as https from "https";
//#endregion

const DOMAIN = `https://xkcd.com/`,
PATH = `info.0.json`;

interface RawXkcdJson {
	month: string,
	num: number,
	link: string,
	year: string,
	news: string,
	safe_title: string,
	transcript: string,
	alt: string,
	img: string,
	title: string,
	extra_parts?: unknown,
	day: string
}

class Xkcd {
	readonly num: number;
	readonly link: string;
	readonly news: string;
	readonly safeTitle: string;
	readonly transcript: string;
	readonly alt: string;
	readonly img: URL;
	readonly title: string;
	readonly extraParts?: unknown;
	readonly date: Date;

	constructor(rawJson: RawXkcdJson) {
		this.num = rawJson.num;
		this.link = rawJson.link;
		this.news = rawJson.news;
		this.safeTitle = rawJson.safe_title;
		this.transcript = rawJson.transcript;
		this.alt = rawJson.alt;
		this.img = new URL(rawJson.img);
		this.title = rawJson.title;
		this.extraParts = rawJson.extra_parts;
		this.date = new Date(Number.parseInt(rawJson.year, 10), Number.parseInt(rawJson.month, 10), Number.parseInt(rawJson.day, 10));
	}

}

// Gets the current xkcd.
// @param id [String|Number] The id of the xkcd. Blank for current xkcd.
// @param cb [Function] The callback that passes (`err`, `data`)
// @example current(2, function(err, data){ console.log(data); });
// eslint-disable-next-line one-var
const xkcdModule = (cb: (data:Xkcd | Error) => void, id?: string | number) => {
	const idURL = id ? `${id.toString()}/` : ``,
	url = DOMAIN + idURL + PATH;
	https.get(url, (res) => {
		let body = ``;
		res.on(`data`, (chunk) => { body += chunk as string; });
		res.on(`end`, () => {
			const data = JSON.parse(body) as RawXkcdJson;
			cb(new Xkcd(data));
		});
	}).on(`error`, cb);
};

//#region send xkcd message
// eslint-disable-next-line one-var
export const xkcdFunct = (inObjs: Array<{interaction: CommandInteraction}>) => {
	inObjs.forEach((inObj) => {
		xkcdModule((xkcdObjOuter) => {
			if (xkcdObjOuter instanceof Error) {
				console.error(xkcdObjOuter);
				return;
			}
			let num = Math.ceil(Math.random() * (xkcdObjOuter.num));
			if (inObj.interaction.options.get(`xkcd_number`) !== null)
				num = inObj.interaction.options.get(`xkcd_number`)?.value as number;
			if (num > (xkcdObjOuter.num) || num <= 0) 
				inObj.interaction.reply({ content: `Try a whole number from 1 to ${xkcdObjOuter.num.toString()}`, ephemeral }).catch(genericCatch);
			else {
				xkcdModule((xkcdObj) => {
					if (xkcdObj instanceof Error) {
						console.error(xkcdObj);
						return;
					}
					const xkcdEmbed = new EmbedBuilder()
						.setTitle(xkcdObj.title)
						.setURL(`https://xkcd.com/${xkcdObj.num.toString()}/`)
						.setDescription(xkcdObj.alt)
						.setImage(xkcdObj.img.toString());
					inObj.interaction.reply({ embeds: [xkcdEmbed] }).catch(genericCatch);
				}, num);
			}
		});
	});
};
//#endregion
