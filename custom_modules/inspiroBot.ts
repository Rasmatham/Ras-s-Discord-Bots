import {Message} from "discord.js";
import req from "node-fetch";
export const getURL = ():Promise<string | void> => {
	return req(`https://inspirobot.me/api?generate=true`)
		.then((res):Promise<string> => {
			return res.text();
		})
		.catch(console.error);
};
export const sendMessage = (
	inObjs: {
		message: Message
	}[]
):void => {
	inObjs.forEach((inObj) => {
		if (!inObj.message.author.bot && (inObj.message.content.toLowerCase().includes(`inspire`) || inObj.message.content.toLowerCase().includes(`inspiration`) || inObj.message.content.toLowerCase().includes(`inspiring`))) {
			getURL().then((url: string):void => {
				inObj.message.channel.send(url)
					.catch(console.error);
			});
		}
	});
};