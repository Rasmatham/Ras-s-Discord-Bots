import {Message} from "discord.js";
import req from "node-fetch";
export const getURL = ():Promise<string | void> => {
	return req(`https://inspirobot.me/api?generate=true`)
		.then((res):Promise<string> => {
			return res.text();
		})
		.catch(console.error);
};
export const sendMessage = (message: Message):void => {
	if (!message.author.bot && (message.content.toLowerCase().includes(`inspire`) || message.content.toLowerCase().includes(`inspiration`) || message.content.toLowerCase().includes(`inspiring`))) {
		getURL().then((url: string):void => {
			message.channel.send(url)
				.catch(console.error);
		});
	}
};