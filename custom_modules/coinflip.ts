//#region imports
import { ColorResolvable, CommandInteraction, EmbedBuilder } from "discord.js";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import { genericCatch } from "./generalUse";
//#endregion

//#region setup
const setup = (inObj: { interaction: CommandInteraction }) => {
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
export const flip = (inObjs: Array<{ interaction: CommandInteraction }>) => {
	inObjs.forEach((inObj) => {
		if (inObj.interaction.options.get(`side`) !== null) {
			const coinPath = `./${inObj.interaction.client.user.id}/userinfo/${inObj.interaction.user.id}/coinflip`,
			coinfilel = `${coinPath}/losses.log`,
			coinfilew = `${coinPath}/wins.log`,
			side = inObj.interaction.options.get(`side`)?.value as `${`heads` | `tails`}`;
			setup(inObj);
			if (side === `heads`) {
				if ((Math.random() * 10) < 5) {
					const losecount:string = readFileSync(coinfilel, `utf8`),
					wincount:string = readFileSync(coinfilew, `utf8`);
					writeFileSync(coinfilew, (parseInt(wincount, 10) + 1).toString());
					// eslint-disable-next-line one-var
					const embed:EmbedBuilder = new EmbedBuilder()
						.setColor(`00FF00` as ColorResolvable)
						.setTitle(`You won!`)
						.setThumbnail(`https://cdn.discordapp.com/attachments/656164355381133332/715662587471331359/ezgif-3-b3ae702d4205.gif`)
						.addFields({
							name: `The coin landed on heads`,
							value: `You won!`
						},
						{
							name: `Wins`,
							value: (parseInt(wincount, 10) + 1).toString()
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
					writeFileSync(coinfilel, (parseInt(losecount, 10) + 1).toString());
					// eslint-disable-next-line one-var
					const embed:EmbedBuilder = new EmbedBuilder()
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
							value: (parseInt(losecount, 10) + 1).toString()
						});
					inObj.interaction.reply({
						embeds: [
							embed
						]
					}).catch(genericCatch);
				}
			}
			if (side === `tails`) {
				if ((Math.random() * 10) < 5) {
					const losecount:string = readFileSync(coinfilel, `utf8`),
					wincount:string = readFileSync(coinfilew, `utf8`);
					writeFileSync(coinfilew, (parseInt(losecount, 10) + 1).toString());
					// eslint-disable-next-line one-var
					const embed:EmbedBuilder = new EmbedBuilder()
						.setColor(`00FF00` as ColorResolvable)
						.setTitle(`You won!`)
						.setThumbnail(`https://cdn.discordapp.com/attachments/656164355381133332/715669285128634368/ezgif-3-b8913657fa57.gif`)
						.addFields({
							name: `The coin landed on tails`,
							value: `You won!`
						},
						{
							name: `Wins`,
							value: (parseInt(wincount, 10) + 1).toString()
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
					writeFileSync(coinfilel, (parseInt(losecount, 10) + 1).toString());
					// eslint-disable-next-line one-var
					const embed:EmbedBuilder = new EmbedBuilder()
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
							value: (parseInt(losecount, 10) + 1).toString()
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