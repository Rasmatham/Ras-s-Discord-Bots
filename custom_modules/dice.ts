//#region imports
import {APIActionRowComponent, APIModalActionRowComponent, ActionRowBuilder, CommandInteraction, CommandInteractionOption, ComponentBuilder, EmbedBuilder, InteractionReplyOptions, ModalActionRowComponentBuilder, ModalBuilder, TextInputBuilder, TextInputStyle} from "discord.js";
//#endregion

//#region die roller
export const dice = (inObjs: {interaction: CommandInteraction}[]):void => {
	inObjs.forEach(inobj => {
		console.log(inobj)
		
		const ar = new ActionRowBuilder<ModalActionRowComponentBuilder>()
		.addComponents(new TextInputBuilder().setCustomId(`d4`).setStyle(TextInputStyle.Short).setLabel(`4`))
		.addComponents(new TextInputBuilder().setCustomId(`d6`).setStyle(TextInputStyle.Short).setLabel(`6`))
		.addComponents(new TextInputBuilder().setCustomId(`8`).setStyle(TextInputStyle.Short).setLabel(`8`))
		.addComponents(new TextInputBuilder().setCustomId(`12`).setStyle(TextInputStyle.Short).setLabel(`12`))
		.addComponents(new TextInputBuilder().setCustomId(`10`).setStyle(TextInputStyle.Short).setLabel(`10`))
		.addComponents(new TextInputBuilder().setCustomId(`100`).setStyle(TextInputStyle.Short).setLabel(`100`))
		.addComponents(new TextInputBuilder().setCustomId(`20`).setStyle(TextInputStyle.Short).setLabel(`20`))
		const modal = new ModalBuilder()
			.setTitle(`dicetitle`)
			.setCustomId(`diceid`)
			.addComponents(ar)
		inobj.interaction.showModal(modal)
	})
};
//#endregion