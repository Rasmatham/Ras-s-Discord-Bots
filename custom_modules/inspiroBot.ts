//#region imports
import { ActionRowBuilder, ButtonBuilder, ButtonInteraction, ButtonStyle, ChannelType, Message } from "discord.js";
import type { Response } from "node-fetch";
import { genericCatch } from "./generalUse";
import req from "node-fetch";
//#endregion

//#region fetches inspirobot URI
export const getUrl = async (): Promise<URL> => req(`https://inspirobot.me/api?generate=true`).then(async (res:Response):Promise<string> => res.text()).then((x:string) => new URL(x)).catch((err: unknown) => {
	genericCatch(err);
	return new URL(`https://generated.inspirobot.me/a/1QJxwgY3ez.jpg`);
});
//#endregion

//#region Sends a Discord mesage
// eslint-disable-next-line one-var
export const sendMessage = (inObjs: Array<{ message: ButtonInteraction | Message }>): void => {
	inObjs.forEach((inObj: {message: ButtonInteraction | Message}) => {
		if(inObj.message instanceof ButtonInteraction){
			if(inObj.message.message instanceof Message){
				getUrl().then((url) => {
					inObj.message.reply({
						components: [new ActionRowBuilder<ButtonBuilder>().setComponents(new ButtonBuilder().setLabel(`inspire`).setCustomId(`inspirobot`).setStyle(ButtonStyle.Secondary))],
						content: url.href
					}).catch(genericCatch);
				}).catch(genericCatch);
			}
		} else if (!inObj.message.author.bot && (inObj.message.content.toLowerCase().includes(`inspire`) || inObj.message.content.toLowerCase().includes(`inspiration`) || inObj.message.content.toLowerCase().includes(`inspiring`))) {
				getUrl().then((url) => {
					if(inObj.message instanceof Message){
						if (inObj.message.channel.type === ChannelType.GuildText) {
							inObj.message.channel.send({
								components: [new ActionRowBuilder<ButtonBuilder>().setComponents(new ButtonBuilder().setLabel(`inspire`).setCustomId(`inspirobot`).setStyle(ButtonStyle.Secondary))],
								content: url.href
							}).catch(genericCatch);
						}
					}
				}).catch(genericCatch);
			}
	});
};
//#endregion