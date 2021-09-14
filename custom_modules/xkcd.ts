//#region imports
import {CommandInteraction, MessageEmbed} from "discord.js";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const xkcdModule = require(`xkcd`);
//#endregion

//#region send xkcd message
export const xkcdFunct = (inObjs: {interaction: CommandInteraction}[]):void => {
	inObjs.forEach((inObj) => {
		xkcdModule((xkcdObjOuter: {
		num: number
	}):void => {
			let num:number = Math.ceil(Math.random() * (xkcdObjOuter.num + Math.random()));
			if (typeof inObj.interaction.options.get(`xkcd_number`) != `undefined`) {
				num = inObj.interaction.options.get(`xkcd_number`).value as number;
			}
			if (num > xkcdObjOuter.num || num <= 0) {
				inObj.interaction.reply({
					content: `Try a whole number from 1 to ${
						xkcdObjOuter.num
					}`,
					ephemeral: true
				})
					.catch(console.error);
			}
			else {
				xkcdModule(num, (xkcdObj: {
				title: string,
				num: number,
				alt: string,
				img: string
			}):void => {
					const xkcdEmbed:MessageEmbed = new MessageEmbed()
						.setTitle(xkcdObj.title)
						.setURL(`https://xkcd.com/${
							xkcdObj.num
						}/`)
						.setDescription(xkcdObj.alt)
						.setImage(xkcdObj.img);
					inObj.interaction.reply({
						embeds: [
							xkcdEmbed
						]
					})
						.catch(console.error);
				});
			}
		});
	});
};
//#endregion