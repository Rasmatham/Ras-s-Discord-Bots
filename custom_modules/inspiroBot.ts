//#region imports
import {ActionRowBuilder, APIActionRowComponent, APIButtonComponent, ButtonBuilder, ButtonInteraction, ButtonStyle, ComponentType, Message} from "discord.js";
import req, { Response } from "node-fetch";
//#endregion

//#region fetches inspirobot URI
export const getURI:()=>Promise<string|void> = ():Promise<string | void> => {
	return req(`https://inspirobot.me/api?generate=true`)
		.then((res:Response):Promise<string> => {
			return res.text();
		})
		.catch(console.error);
};
//#endregion

//#region Sends a Discord mesage
export const sendMessage: (inObjs: {message: Message | ButtonInteraction}[]) => void = (
	inObjs: {
		message: Message | ButtonInteraction
	}[]
):void => {
	inObjs.forEach((inObj: {message: Message | ButtonInteraction}): void => {
		if(inObj.message instanceof ButtonInteraction){
			if(inObj.message.message instanceof Message){
				getURI().then((url:string|void):void => {
					inObj.message.reply({
						content: url?url:`error`,
						components: [
							new ActionRowBuilder().setComponents(new ButtonBuilder().setLabel(`inspire`).setCustomId(`inspirobot`).setStyle(ButtonStyle.Secondary))
						].map(x => x.toJSON() as APIActionRowComponent<APIButtonComponent>)
					})
						.catch(console.error);
						
				});
			}
		} else {
			if (!inObj.message.author.bot && (inObj.message.content.toLowerCase().includes(`inspire`) || inObj.message.content.toLowerCase().includes(`inspiration`) || inObj.message.content.toLowerCase().includes(`inspiring`))) {
				getURI().then((url:string|void):void => {
					if(inObj.message instanceof Message){
						inObj.message.channel.send({
							content: url?url:`error`,
							components: [
								new ActionRowBuilder().setComponents(new ButtonBuilder().setLabel(`inspire`).setCustomId(`inspirobot`).setStyle(ButtonStyle.Secondary))
							].map(x => x.toJSON() as APIActionRowComponent<APIButtonComponent>)
						})
							.catch(console.error);
					}
				});
			}
		}
	});
};
//#endregion