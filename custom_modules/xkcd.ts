//#region imports
import { ephemeral, genericCatch, zero } from "./generalUse";
import type { CommandInteraction } from "discord.js";
import { EmbedBuilder } from "discord.js";
import * as https from "https";
//#endregion

const domain = `https://xkcd.com/`,
path = `info.0.json`;

/* eslint-disable @typescript-eslint/naming-convention */
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
/* eslint-enable @typescript-eslint/naming-convention */

class Xkcd {
	public readonly num: number;
	public readonly link: string;
	public readonly news: string;
	public readonly safeTitle: string;
	public readonly transcript: string;
	public readonly alt: string;
	public readonly img: URL;
	public readonly title: string;
	public readonly extraParts?: unknown;
	public readonly date: Date;

	public constructor(rawJson: RawXkcdJson) {
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
const isRawXkcdJson = (obj: unknown): obj is RawXkcdJson  => {
	if (obj === null || typeof obj !== `object`) return false;
	return `month` in obj &&
	`num` in obj &&
	`link` in obj &&
	`year` in obj &&
	`news` in obj &&
	`safe_title` in obj &&
	`transcript` in obj &&
	`alt` in obj &&
	`img` in obj &&
	`title` in obj &&
	`day` in obj;
},
xkcdModule = (cb: (data:Error | Xkcd) => void, id?: number | string): void => {
	const idUrl = id ? `${id.toString()}/` : ``,
	url = domain + idUrl + path;
	https.get(url, (res) => {
		let body: string;
		body = ``;
		res.on(`data`, (chunk) => { body += typeof chunk === `string` ? chunk : ``; });
		res.on(`end`, () => {
			const data: unknown = JSON.parse(body);
			if (isRawXkcdJson(data))
				cb(new Xkcd(data));
			else throw Error(`Could not parse xkcd object`);
		});
	}).on(`error`, cb);
};

//#region send xkcd message
// eslint-disable-next-line one-var
export const xkcdFunct = (inObjs: Array<{interaction: CommandInteraction}>): void => {
	inObjs.forEach((inObj) => {
		xkcdModule((xkcdObjOuter) => {
			if (xkcdObjOuter instanceof Error) {
				console.error(xkcdObjOuter);
				return;
			}
			let num;
			num = Math.ceil(Math.random() * (xkcdObjOuter.num));
			const xkcdNumOption = inObj.interaction.options.get(`xkcd_number`);
			if (typeof xkcdNumOption?.value === `number`)
				num = xkcdNumOption.value;
			if (num > (xkcdObjOuter.num) || num <= zero)
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
