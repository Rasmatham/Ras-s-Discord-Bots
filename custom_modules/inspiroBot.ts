//#region imports
import {ActionRowBuilder, APIActionRowComponent, APIButtonComponent, ButtonBuilder, ButtonInteraction, ButtonStyle, ChannelType, Message} from "discord.js";
import req, { Response } from "node-fetch";
//#endregion

//#region fetches inspirobot URI
export const getURI = () => {
	return req(`https://inspirobot.me/api?generate=true`)
		.then((res:Response):Promise<string> => {
			return res.text();
		})
		.catch((err: unknown) => {console.error(err)});
};
//#endregion

//#region Sends a Discord mesage
export const sendMessage = (
	inObjs: {
		message: Message | ButtonInteraction
	}[]
) => {
	inObjs.forEach((inObj: {message: Message | ButtonInteraction}) => {
		if(inObj.message instanceof ButtonInteraction){
			if(inObj.message.message instanceof Message){
				getURI().then((url) => {
					inObj.message.reply({
						content: url?url:`error`,
						components: [
							new ActionRowBuilder().setComponents(new ButtonBuilder().setLabel(`inspire`).setCustomId(`inspirobot`).setStyle(ButtonStyle.Secondary))
						].map(x => x.toJSON() as APIActionRowComponent<APIButtonComponent>)
					})
						.catch((err: unknown) => {console.error(err)});
						
				}).catch((err: unknown) => {console.error(err)});
			}
		} else {
			if (!inObj.message.author.bot && (inObj.message.content.toLowerCase().includes(`inspire`) || inObj.message.content.toLowerCase().includes(`inspiration`) || inObj.message.content.toLowerCase().includes(`inspiring`))) {
				getURI().then((url) => {
					if(inObj.message instanceof Message){
						if (inObj.message.channel.type === ChannelType.GuildText)
							inObj.message.channel.send({
								content: url?url:`error`,
								components: [
									new ActionRowBuilder().setComponents(new ButtonBuilder().setLabel(`inspire`).setCustomId(`inspirobot`).setStyle(ButtonStyle.Secondary))
								].map(x => x.toJSON() as APIActionRowComponent<APIButtonComponent>)
							})
								.catch((err: unknown) => {console.error(err)});
					}
				}).catch((err: unknown) => {console.error(err)});
			}
		}
	});
};
//#endregion