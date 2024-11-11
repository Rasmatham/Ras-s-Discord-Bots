//#region imports
import {CommandInteraction, EmbedBuilder} from "discord.js";
//#endregion

//#region die roller
export const dice = (
	inObjs: {
		interaction: CommandInteraction
	}[]
):void => {
	inObjs.forEach((inObj) => {
		let dieSides = 6;
		let diceCount = 1;
		if (inObj.interaction.options.get(`die_sides`) != null) {
			const dieSidesOption = inObj.interaction.options.get(`die_sides`);
			dieSides = dieSidesOption?.value as number;
		}
		if (inObj.interaction.options.get(`dice_count`) != null) {
			const diceCountOption = inObj.interaction.options.get(`dice_count`);
			diceCount = diceCountOption?.value as number;
		}
		inObj.interaction.reply(`Rolling ${
			diceCount.toString()
		} D${
			dieSides.toString()
		}`).then(():void => {
			if (diceCount > 20) {
				inObj.interaction.editReply(`Sorry, but you can only roll 20 dice at a time`)
					.catch((err: unknown) => {console.error(err)});
			}
			else {
				if (dieSides == 10) {
					for (let i = 0; i < diceCount; i++) {
						const number10:EmbedBuilder = new EmbedBuilder()
							.setColor(`#0099ff`)
							.setTitle(`Totally legit dice`)
							.addFields({
								name: `You "rolled" a:`,
								value: Math.floor(Math.random() * 10).toString(),
								inline: true
							},
							{
								name: `"roll" number:`,
								value: `${
									(i + 1).toString()
								}/${
									diceCount.toString()
								}`
							});
						inObj.interaction.followUp({
							embeds: [
								number10
							]
						})
						.catch((err: unknown) => {console.error(err)});
					}
				}
				else if (dieSides == 100) {
					for (let i = 0; i < diceCount; i++) {
						const number100:EmbedBuilder = new EmbedBuilder()
							.setColor(`#0099ff`)
							.setTitle(`Totally legit dice`)
							.addFields({
								name: `You "rolled" a:`,
								value: (Math.floor(Math.random() * 10) * 10).toString(),
								inline: true
							},
							{
								name: `"roll" number:`,
								value: `${
									(i + 1).toString()
								}/${
									diceCount.toString()
								}`
							});
						inObj.interaction.followUp({
							embeds: [
								number100
							]
						})
							.catch((err: unknown) => {console.error(err)});
					}
				}
				else {
					for (let i = 0; i < diceCount; i++) {
						const numberN:EmbedBuilder = new EmbedBuilder()
							.setColor(`#0099ff`)
							.setTitle(`Totally legit dice`)
							.addFields({
								name: `You "rolled" a:`,
								value: (Math.ceil(Math.random() * Number(dieSides))).toString(),
								inline: true
							},
							{
								name: `"roll" number:`,
								value:`${
									(i + 1).toString()
								}/${
									diceCount.toString()
								}`
							});
						inObj.interaction.followUp({
							embeds: [
								numberN
							]
						})
							.catch((err: unknown) => {console.error(err)});
					}
				}
			}
		})
			.catch((err: unknown) => {console.error(err)});
	});
};
//#endregion