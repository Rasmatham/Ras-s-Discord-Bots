//#region imports
import {CommandInteraction, EmbedBuilder} from "discord.js";
import * as https from "https";
//#endregion

const DOMAIN = `https://xkcd.com/`;
const PATH = `info.0.json`;

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
	readonly num: number
	readonly link: string
	readonly news: string
	readonly safe_title: string
	readonly transcript: string
	readonly alt: string
	readonly img: URL
	readonly title: string
	readonly extra_parts?: unknown
	readonly date: Date

	constructor(rawJson: RawXkcdJson) {
		this.num = rawJson.num
		this.link = rawJson.link
		this.news = rawJson.news
		this.safe_title = rawJson.safe_title
		this.transcript = rawJson.transcript
		this.alt = rawJson.alt
		this.img = new URL(rawJson.img)
		this.title = rawJson.title
		this.extra_parts = rawJson.extra_parts
		this.date = new Date(Number.parseInt(rawJson.year), Number.parseInt(rawJson.month), Number.parseInt(rawJson.day))
	}

}

// Gets the current xkcd.
// @param id [String|Number] The id of the xkcd. Blank for current xkcd.
// @param cb [Function] The callback that passes (`err`, `data`)
// @example current(2, function(err, data){ console.log(data); });
const xkcdModule = (cb: (data?:Xkcd, err?: unknown) => void, id?: string | number) => {
	const idURL = id ? id.toString() + `/` : ``;
	const url = DOMAIN + idURL + PATH;

	https.get(url, (res) => {
		let body = ``;

	res.on(`data`, (chunk) => {
		body += chunk as string;
	});

	res.on(`end`, () => {
		const data = JSON.parse(body) as RawXkcdJson;
		cb(new Xkcd(data), undefined);
	});
	}).on(`error`, (err) => {
		cb(undefined, err);
	});
}

//#region send xkcd message
export const xkcdFunct = (inObjs: {interaction: CommandInteraction}[]):void => {
	inObjs.forEach((inObj) => {
		xkcdModule((xkcdObjOuter):void => {
			let num:number = Math.ceil(Math.random() * (xkcdObjOuter?.num ?? 1 + Math.random()));
			if (inObj.interaction.options.get(`xkcd_number`) != null) {
				num = inObj.interaction.options.get(`xkcd_number`)?.value as number;
			}
			if (num > (xkcdObjOuter?.num ?? 1) || num <= 0) {
				inObj.interaction.reply({
					content: `Try a whole number from 1 to ${
						xkcdObjOuter?.num.toString() ?? `error`
					}`,
					ephemeral: true
				})
					.catch((err: unknown) => {console.error(err)});
			}
			else {
				xkcdModule((xkcdObj):void => {
					const xkcdEmbed:EmbedBuilder = new EmbedBuilder()
						.setTitle(xkcdObj?.title ?? `error`)
						.setURL(`https://xkcd.com/${
							xkcdObj?.num.toString() ?? `1`
						}/`)
						.setDescription(xkcdObj?.alt ?? `error`)
						.setImage(xkcdObj?.img.toString() ?? `https://imgs.xkcd.com/comics/barrel_cropped_(1).jpg`);
					inObj.interaction.reply({
						embeds: [
							xkcdEmbed
						]
					})
						.catch((err: unknown) => {console.error(err)});
				}, num);
			}
		});
	});
};
//#endregion