import {ColorResolvable, CommandInteraction, MessageEmbed} from "discord.js";
import {mkdirSync, existsSync, readFileSync, writeFileSync} from "fs";
const setup = (interaction: CommandInteraction):void => {
	mkdirSync(`./${
		interaction.client.user.username
	}/userinfo/${
		interaction.user.id
	}`);
	mkdirSync(`./${
		interaction.client.user.username
	}/userinfo/${
		interaction.user.id
	}/coinflip/`);
	writeFileSync(`./${
		interaction.client.user.username
	}/userinfo/${
		interaction.user.id
	}/coinflip/wins.log`, `0`);
	writeFileSync(`./${
		interaction.client.user.username
	}/userinfo/${
		interaction.user.id
	}/coinflip/losses.log`, `0`);
};
export const flip = (interaction: CommandInteraction):void => {
	const side = interaction.options.get(`side`).value as `${
		`heads` | `tails`
	}`;
	const coinflippath = `./${
		interaction.client.user.username
	}/userinfo/${
		interaction.user.id
	}/coinflip/`;
	const coinfilew = `./${
		interaction.client.user.username
	}/userinfo/${
		interaction.user.id
	}/coinflip/wins.log`;
	const coinfilel = `./${
		interaction.client.user.username
	}/userinfo/${
		interaction.user.id
	}/coinflip/losses.log`;
	if (existsSync(coinflippath)) {
		if (side == `heads`) {
			if ((Math.random() * 10) < 5 === true) {
				const wincount:string = readFileSync(coinfilew, `utf8`);
				const losecount:string = readFileSync(coinfilel, `utf8`);
				writeFileSync(coinfilew, (parseInt(wincount) + 1).toString());
				const embed:MessageEmbed = new MessageEmbed()
					.setColor(`00FF00` as ColorResolvable)
					.setTitle(`You won!`)
					.setThumbnail(`https://cdn.discordapp.com/attachments/656164355381133332/715662587471331359/ezgif-3-b3ae702d4205.gif`)
					.addFields({
						name: `The coin landed on heads`,
						value: `You won!`
					},
					{
						name: `Wins`,
						value: (parseInt(wincount) + 1).toString()
					},
					{
						name: `Losses`,
						value: losecount
					});
				interaction.reply({
					embeds: [
						embed
					]
				})
					.catch(console.error);
			}
			else {
				const wincount:string = readFileSync(coinfilew, `utf8`);
				const losecount:string = readFileSync(coinfilel, `utf8`);
				writeFileSync(coinfilel, (parseInt(losecount) + 1).toString());
				const embed:MessageEmbed = new MessageEmbed()
					.setColor(`FF0000` as ColorResolvable)
					.setTitle(`You lost!`)
					.setThumbnail(`https://cdn.discordapp.com/attachments/656164355381133332/715669285128634368/ezgif-3-b8913657fa57.gif`)
					.addFields({
						name: `The coin landed on tails`,
						value: `You lost!`
					},
					{
						name: `Wins`,
						value: wincount
					},
					{
						name: `Losses`,
						value: (parseInt(losecount) + 1).toString()
					});
				interaction.reply({
					embeds: [
						embed
					]
				})
					.catch(console.error);
			}
		}
		if (side == `tails`) {
			if ((Math.random() * 10) < 5 === true) {
				const wincount:string = readFileSync(coinfilew, `utf8`);
				const losecount:string = readFileSync(coinfilel, `utf8`);
				writeFileSync(coinfilew, (parseInt(losecount) + 1).toString());
				const embed:MessageEmbed = new MessageEmbed()
					.setColor(`00FF00` as ColorResolvable)
					.setTitle(`You won!`)
					.setThumbnail(`https://cdn.discordapp.com/attachments/656164355381133332/715669285128634368/ezgif-3-b8913657fa57.gif`)
					.addFields({
						name: `The coin landed on tails`,
						value: `You won!`
					},
					{
						name: `Wins`,
						value: (parseInt(wincount) + 1).toString()
					},
					{
						name: `Losses`,
						value: losecount
					});
				interaction.reply({
					embeds: [
						embed
					]
				})
					.catch(console.error);
			}
			else {
				const wincount:string = readFileSync(coinfilew, `utf8`);
				const losecount:string = readFileSync(coinfilel, `utf8`);
				writeFileSync(coinfilel, (parseInt(losecount) + 1).toString());
				const embed:MessageEmbed = new MessageEmbed()
					.setColor(`FF0000` as ColorResolvable)
					.setTitle(`You lost!`)
					.setThumbnail(`https://cdn.discordapp.com/attachments/656164355381133332/715662587471331359/ezgif-3-b3ae702d4205.gif`)
					.addFields({
						name: `The coin landed on heads`,
						value: `You lost!`
					},
					{
						name: `Wins`,
						value: wincount
					},
					{
						name: `Losses`,
						value: (parseInt(losecount) + 1).toString()
					});
				interaction.reply({
					embeds: [
						embed
					]
				})
					.catch(console.error);
			}
		}
	}
	else {
		setup(interaction);
		flip(interaction);
	}
};