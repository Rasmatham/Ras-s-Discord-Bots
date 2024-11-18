//#region imports
import { ActionRowBuilder, ButtonBuilder, ButtonInteraction, ButtonStyle, ChannelType, Message } from "discord.js";
import req, { Response } from "node-fetch";
import { genericCatch } from "./generalUse";
//#endregion

//#region fetches inspirobot URI
export const getURI = () => req(`https://inspirobot.me/api?generate=true`).then((res:Response):Promise<string> => res.text()).catch(genericCatch);
//#endregion

//#region Sends a Discord mesage
// eslint-disable-next-line one-var
export const sendMessage = (inObjs: { message: Message | ButtonInteraction }[]) => {
	inObjs.forEach((inObj: {message: Message | ButtonInteraction}) => {
		if(inObj.message instanceof ButtonInteraction){
			if(inObj.message.message instanceof Message){
				getURI().then((url) => {
					inObj.message.reply({
						components: [new ActionRowBuilder<ButtonBuilder>().setComponents(new ButtonBuilder().setLabel(`inspire`).setCustomId(`inspirobot`).setStyle(ButtonStyle.Secondary))],
						content: url?url:`error`
					}).catch(genericCatch);
				}).catch(genericCatch);
			}
		} else if (!inObj.message.author.bot && (inObj.message.content.toLowerCase().includes(`inspire`) || inObj.message.content.toLowerCase().includes(`inspiration`) || inObj.message.content.toLowerCase().includes(`inspiring`))) {
				getURI().then((url) => {
					if(inObj.message instanceof Message){
						if (inObj.message.channel.type === ChannelType.GuildText) {
							inObj.message.channel.send({
								components: [new ActionRowBuilder<ButtonBuilder>().setComponents(new ButtonBuilder().setLabel(`inspire`).setCustomId(`inspirobot`).setStyle(ButtonStyle.Secondary))],
								content: url?url:`error`
							}).catch(genericCatch);
						}
					}
				}).catch(genericCatch);
			}
	});
};
//#endregion