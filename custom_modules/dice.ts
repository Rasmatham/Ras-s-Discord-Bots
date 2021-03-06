//#region imports
import {CommandInteraction, CommandInteractionOption, EmbedBuilder} from "discord.js";
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
			const dieSidesOption = inObj.interaction.options.get(`die_sides`) as CommandInteractionOption;
			dieSides = dieSidesOption.value as number;
		}
		if (inObj.interaction.options.get(`dice_count`) != null) {
			const diceCountOption = inObj.interaction.options.get(`dice_count`) as CommandInteractionOption;
			diceCount = diceCountOption.value as number;
		}
		inObj.interaction.reply(`Rolling ${
			diceCount
		} D${
			dieSides
		}`).then(():void => {
			if (diceCount > 20) {
				inObj.interaction.editReply(`Sorry, but you can only roll 20 dice at a time`)
					.catch(console.error);
			}
			else {
				if (dieSides == 10) {
					for (let i = 0; i < diceCount; i++) {
						const number10:EmbedBuilder = new EmbedBuilder()
							.setColor(`#0099ff`)
							.setTitle(`Totally legit dice`)
							.addFields({
								name: `You "rolled" a:`,
								value: `${
									Math.floor(Math.random() * 10)
								}`,
								inline: true
							},
							{
								name: `"roll" number:`,
								value: `${
									i + 1
								}/${
									diceCount
								}`
							});
						inObj.interaction.followUp({
							embeds: [
								number10
							]
						})
							.catch(console.error);
					}
				}
				else if (dieSides == 100) {
					for (let i = 0; i < diceCount; i++) {
						const number100:EmbedBuilder = new EmbedBuilder()
							.setColor(`#0099ff`)
							.setTitle(`Totally legit dice`)
							.addFields({
								name: `You "rolled" a:`,
								value: `${
									Math.floor(Math.random() * 10) * 10
								}`,
								inline: true
							},
							{
								name: `"roll" number:`,
								value: `${
									i + 1
								}/${
									diceCount
								}`
							});
						inObj.interaction.followUp({
							embeds: [
								number100
							]
						})
							.catch(console.error);
					}
				}
				else {
					for (let i = 0; i < diceCount; i++) {
						const numberN:EmbedBuilder = new EmbedBuilder()
							.setColor(`#0099ff`)
							.setTitle(`Totally legit dice`)
							.addFields({
								name: `You "rolled" a:`,
								value: `${
									Math.ceil(Math.random() * Number(dieSides))
								}`,
								inline: true
							},
							{
								name: `"roll" number:`,
								value:`${
									i + 1
								}/${
									diceCount
								}`
							});
						inObj.interaction.followUp({
							embeds: [
								numberN
							]
						})
							.catch(console.error);
					}
				}
			}
		})
			.catch(console.error);
	});
};
//#endregion