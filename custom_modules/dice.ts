//#region imports
import type { CommandInteraction } from "discord.js";

import { EmbedBuilder } from "discord.js";

import { ShiftBy, decimalShift, genericCatch, inc, offByOne } from "./generalUse";
//#endregion

//#region die roller
export const dice = (inObjs: Array<{ interaction: CommandInteraction }>): void => {
	inObjs.forEach((inObj) => {
		const defaultDie = { count: 1, sides: 6 };
		let diceCount, dieSides;
		diceCount = defaultDie.count;
		dieSides = defaultDie.sides;
		if (inObj.interaction.options.get(`die_sides`) !== null) {
			const dieSidesOption = inObj.interaction.options.get(`die_sides`);
			dieSides = typeof dieSidesOption?.value === `number` ? dieSidesOption.value : defaultDie.sides;
		}
		if (inObj.interaction.options.get(`dice_count`) !== null) {
			const diceCountOption = inObj.interaction.options.get(`dice_count`);
			diceCount = typeof diceCountOption?.value === `number` ? diceCountOption.value : defaultDie.count;
		}
		inObj.interaction.reply(`Rolling ${
			diceCount.toString()
		} D${
			dieSides.toString()
		}`).then(() => {
			const maxDice = 20;
			if (diceCount > maxDice) 
				inObj.interaction.editReply(`Sorry, but you can only roll 20 dice at a time`).catch(genericCatch);
			else {
				const specialDice = { d10: 10, d100: 100 };
				switch (dieSides) {
					case specialDice.d10: {
						for (let i = 0; i < diceCount; i += inc) {
							const number10:EmbedBuilder = new EmbedBuilder()
								.setColor(`#0099ff`)
								.setTitle(`Totally legit dice`)
								.addFields([
									{
										inline: true,
										name: `You "rolled" a:`,
										value: Math.floor(decimalShift(Math.random(), ShiftBy.P1)).toString()
									},
									{
										name: `"roll" number:`,
										value: `${(i + offByOne).toString()}/${diceCount.toString()}`
									}
								]);
							inObj.interaction.followUp({
								embeds: [number10]
							}).catch(genericCatch);
						}
						break;
					}
					case specialDice.d100: {
						for (let i = 0; i < diceCount; i += inc) {
							const number100:EmbedBuilder = new EmbedBuilder()
								.setColor(`#0099ff`)
								.setTitle(`Totally legit dice`)
								.addFields([
									{
										inline: true,
										name: `You "rolled" a:`,
										value: (decimalShift(Math.floor(decimalShift(Math.random(), ShiftBy.P1)), ShiftBy.P1)).toString()
									},
									{
										name: `"roll" number:`,
										value: `${(i + offByOne).toString()}/${diceCount.toString()}`
									}
								]);
							inObj.interaction.followUp({ embeds: [number100] }).catch(genericCatch);
						}
						break;
					}
					default: {
						for (let i = 0; i < diceCount; i += inc) {
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
										value:`${(i + offByOne).toString()}/${diceCount.toString()}`
									}
								]);
							inObj.interaction.followUp({ embeds: [numberN] }).catch(genericCatch);
						}
						break;
					}
				}
			}
		}).catch(genericCatch);
	});
};
//#endregion