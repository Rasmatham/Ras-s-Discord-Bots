//#region imports
import {CommandInteraction, EmbedBuilder} from "discord.js";
import { genericCatch } from "./generalUse";
//#endregion

//#region die roller
export const dice = (inObjs: { interaction: CommandInteraction }[]) => {
	inObjs.forEach((inObj) => {
		let diceCount = 1, dieSides = 6;
		if (inObj.interaction.options.get(`die_sides`) !== null) {
			const dieSidesOption = inObj.interaction.options.get(`die_sides`);
			dieSides = dieSidesOption?.value as number;
		}
		if (inObj.interaction.options.get(`dice_count`) !== null) {
			const diceCountOption = inObj.interaction.options.get(`dice_count`);
			diceCount = diceCountOption?.value as number;
		}
		inObj.interaction.reply(`Rolling ${
			diceCount.toString()
		} D${
			dieSides.toString()
		}`).then(() => {
			if (diceCount > 20) 
				inObj.interaction.editReply(`Sorry, but you can only roll 20 dice at a time`).catch(genericCatch);
			else if (dieSides === 10) {
				for (let i = 0; i < diceCount; i += 1) {
					const number10:EmbedBuilder = new EmbedBuilder()
						.setColor(`#0099ff`)
						.setTitle(`Totally legit dice`)
						.addFields([
							{
								inline: true,
								name: `You "rolled" a:`,
								value: Math.floor(Math.random() * 10).toString()
							},
							{
								name: `"roll" number:`,
								value: `${(i + 1).toString()}/${diceCount.toString()}`
							}
						]);
					inObj.interaction.followUp({
						embeds: [ number10 ]
					}).catch(genericCatch);
				}
			}
				else if (dieSides === 100) {
					for (let i = 0; i < diceCount; i += 1) {
						const number100:EmbedBuilder = new EmbedBuilder()
							.setColor(`#0099ff`)
							.setTitle(`Totally legit dice`)
							.addFields([
								{
									inline: true,
									name: `You "rolled" a:`,
									value: (Math.floor(Math.random() * 10) * 10).toString()
								},
								{
									name: `"roll" number:`,
									value: `${(i + 1).toString()}/${diceCount.toString()}`
								}
							]);
						inObj.interaction.followUp({ embeds: [ number100 ] }).catch(genericCatch);
					}
				}
				else {
					for (let i = 0; i < diceCount; i += 1) {
						const numberN:EmbedBuilder = new EmbedBuilder()
							.setColor(`#0099ff`)
							.setTitle(`Totally legit dice`)
							.addFields([
								{
									inline: true,
									name: `You "rolled" a:`,
									value: (Math.ceil(Math.random() * Number(dieSides))).toString()
								},
								{
									name: `"roll" number:`,
									value:`${(i + 1).toString()}/${diceCount.toString()}`
								}
							]);
						inObj.interaction.followUp({ embeds: [ numberN ] }).catch(genericCatch);
					}
				}
		}).catch(genericCatch);
	});
};
//#endregion