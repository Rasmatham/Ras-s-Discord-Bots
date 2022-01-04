//#region imports
import {Message} from "discord.js";
import req from "node-fetch";
//#endregion

//#region fetches inspirobot URI
export const getURI = ():Promise<string | void> => {
	return req(`https://inspirobot.me/api?generate=true`)
		.then((res):Promise<string> => {
			return res.text();
		})
		.catch(console.error);
};
//#endregion

//#region Sends a Discord mesage
export const sendMessage = (
	inObjs: {
		message: Message
	}[]
):void => {
	inObjs.forEach((inObj) => {
		if (!inObj.message.author.bot && (inObj.message.content.toLowerCase().includes(`inspire`) || inObj.message.content.toLowerCase().includes(`inspiration`) || inObj.message.content.toLowerCase().includes(`inspiring`))) {
			getURI().then((url):void => {
				inObj.message.channel.send(url as string)
					.catch(console.error);
			});
		}
	});
};
//#endregion