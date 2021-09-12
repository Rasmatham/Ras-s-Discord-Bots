import {CommandInteraction, MessageEmbed} from "discord.js";

export const dice = (interaction: CommandInteraction):void => {
	let dieSides = 6;
	let diceCount = 1;
	if (typeof interaction.options.get(`die_sides`) != `undefined`) {
		dieSides = interaction.options.get(`die_sides`).value as number;
	}
	if (typeof interaction.options.get(`dice_count`) != `undefined`) {
		diceCount = interaction.options.get(`dice_count`).value as number;
	}
	interaction.reply(`Rolling ${
		diceCount
	} D${
		dieSides
	}`).then(():void => {
		if (diceCount > 20) {
			interaction.editReply(`Sorry, but you can only roll 20 dice at a time`)
				.catch(console.error);
		}
		else {
			if (dieSides === 10) {
				for (let i = 0; i < diceCount; i++) {
					const number10:MessageEmbed = new MessageEmbed()
						.setColor(`#0099ff`)
						.setTitle(`Totally legit dice`)
						.addField(`You "rolled" a:`, `${
							Math.floor(Math.random() * 10)
						}`, true)
						.addField(`"roll" number:`, `${
							i + 1
						}/${
							diceCount
						}`);
					interaction.followUp({
						embeds: [
							number10
						]
					})
						.catch(console.error);
				}
			}
			else if (dieSides === 100) {
				for (let i = 0; i < diceCount; i++) {
					const number100:MessageEmbed = new MessageEmbed()
						.setColor(`#0099ff`)
						.setTitle(`Totally legit dice`)
						.addField(`You "rolled" a:`, `${
							Math.floor(Math.random() * 10) * 10
						}`, true)
						.addField(`"roll" number:`, `${
							i + 1
						}/${
							diceCount
						}`);
					interaction.followUp({
						embeds: [
							number100
						]
					})
						.catch(console.error);
				}
			}
			else {
				for (let i = 0; i < diceCount; i++) {
					const numberN:MessageEmbed = new MessageEmbed()
						.setColor(`#0099ff`)
						.setTitle(`Totally legit dice`)
						.addField(`You "rolled" a:`, `${
							Math.ceil(Math.random() * Number(dieSides))
						}`, true)
						.addField(`"roll" number:`, `${
							i + 1
						}/${
							diceCount
						}`);
					interaction.followUp({
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
};