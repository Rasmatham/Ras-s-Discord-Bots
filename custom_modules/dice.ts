//#region imports
import {CommandInteraction, CommandInteractionOption, EmbedBuilder, InteractionReplyOptions} from "discord.js";
//#endregion

//#region die roller
export const dice = (inObjs: {interaction: CommandInteraction}[]):void => {
	inObjs.forEach(inobj => {
		console.log(inobj)
		inobj.interaction.reply({content: `test`, ephemeral: true} as InteractionReplyOptions)
	})
};
//#endregion