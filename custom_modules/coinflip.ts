//#region imports
import { ShiftBy, decimalShift, genericCatch, offByOne } from "./generalUse";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import type { CommandInteraction } from "discord.js";
import { EmbedBuilder } from "discord.js";
//#endregion

//#region setup
const setup = (inObj: { interaction: CommandInteraction }): void => {
	const clientId = inObj.interaction.client.user.id,
	userId = inObj.interaction.user.id;
	if (!existsSync(`./${clientId}`))
		mkdirSync(`./${clientId}`);
	if (!existsSync(`./${clientId}/userinfo`))
		mkdirSync(`./${clientId}/userinfo`);
	if (!existsSync(`./${clientId}/userinfo/${userId}`))
		mkdirSync(`./${clientId}/userinfo/${userId}`);
	if (!existsSync(`./${clientId}/userinfo/${userId}/coinflip`))
		mkdirSync(`./${clientId}/userinfo/${userId}/coinflip`);
	if (!existsSync(`./${clientId}/userinfo/${userId}/coinflip/wins.log`))
		writeFileSync(`./${clientId}/userinfo/${userId}/coinflip/wins.log`, `0`);
	if (!existsSync(`./${clientId}/userinfo/${userId}/coinflip/losses.log`))
		writeFileSync(`./${clientId}/userinfo/${userId}/coinflip/losses.log`, `0`);
};
//#endregion

//#region game code
// eslint-disable-next-line one-var
export const flip = (inObjs: Array<{ interaction: CommandInteraction }>): void => {
	inObjs.forEach((inObj) => {
		if (inObj.interaction.options.get(`side`) !== null) {
			const coinPath = `./${inObj.interaction.client.user.id}/userinfo/${inObj.interaction.user.id}/coinflip`,
			coinfilel = `${coinPath}/losses.log`,
			coinfilew = `${coinPath}/wins.log`,
			fiftyPercent = 50,
			side = inObj.interaction.options.get(`side`)?.value;
			setup(inObj);
			if (side === `heads`) {
				if (decimalShift(Math.random(), ShiftBy.P2) < fiftyPercent) {
					const losecount:string = readFileSync(coinfilel, `utf8`),
					wincount:string = readFileSync(coinfilew, `utf8`);
					writeFileSync(coinfilew, (parseInt(wincount, 10) + offByOne).toString());
					// eslint-disable-next-line one-var
					const embed:EmbedBuilder = new EmbedBuilder()
						.setColor(`#00FF00`)
						.setTitle(`You won!`)
						.setThumbnail(`https://cdn.discordapp.com/attachments/656164355381133332/715662587471331359/ezgif-3-b3ae702d4205.gif`)
						.addFields({
							name: `The coin landed on heads`,
							value: `You won!`
						},
						{
							name: `Wins`,
							value: (parseInt(wincount, 10) + offByOne).toString()
						},
						{
							name: `Losses`,
							value: losecount
						});
					inObj.interaction.reply({
						embeds: [
							embed
						]
					}).catch(genericCatch);
				}
				else {
					const losecount:string = readFileSync(coinfilel, `utf8`),
					wincount:string = readFileSync(coinfilew, `utf8`);
					writeFileSync(coinfilel, (parseInt(losecount, 10) + offByOne).toString());
					// eslint-disable-next-line one-var
					const embed:EmbedBuilder = new EmbedBuilder()
						.setColor(`#FF0000`)
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
							value: (parseInt(losecount, 10) + offByOne).toString()
						});
					inObj.interaction.reply({
						embeds: [
							embed
						]
					}).catch(genericCatch);
				}
			}
			if (side === `tails`) {
				if (decimalShift(Math.random(), ShiftBy.P2) < fiftyPercent) {
					const losecount:string = readFileSync(coinfilel, `utf8`),
					wincount:string = readFileSync(coinfilew, `utf8`);
					writeFileSync(coinfilew, (parseInt(losecount, 10) + offByOne).toString());
					// eslint-disable-next-line one-var
					const embed:EmbedBuilder = new EmbedBuilder()
						.setColor(`#00FF00`)
						.setTitle(`You won!`)
						.setThumbnail(`https://cdn.discordapp.com/attachments/656164355381133332/715669285128634368/ezgif-3-b8913657fa57.gif`)
						.addFields({
							name: `The coin landed on tails`,
							value: `You won!`
						},
						{
							name: `Wins`,
							value: (parseInt(wincount, 10) + offByOne).toString()
						},
						{
							name: `Losses`,
							value: losecount
						});
					inObj.interaction.reply({
						embeds: [
							embed
						]
					}).catch(genericCatch);
				}
				else {
					const losecount:string = readFileSync(coinfilel, `utf8`),
					wincount:string = readFileSync(coinfilew, `utf8`);
					writeFileSync(coinfilel, (parseInt(losecount, 10) + offByOne).toString());
					// eslint-disable-next-line one-var
					const embed:EmbedBuilder = new EmbedBuilder()
						.setColor(`#FF0000`)
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
							value: (parseInt(losecount, 10) + offByOne).toString()
						});
					inObj.interaction.reply({
						embeds: [
							embed
						]
					}).catch(genericCatch);
				}
			}
		}
	});
};
//#endregion