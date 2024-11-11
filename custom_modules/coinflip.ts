//#region imports
import {ColorResolvable, CommandInteraction, EmbedBuilder} from "discord.js";
import {mkdirSync, existsSync, readFileSync, writeFileSync} from "fs";
//#endregion

//#region setup
const setup = (
	inObjs: {
		interaction: CommandInteraction
	}[]
):void => {
	inObjs.forEach((inObj) => {
		mkdirSync(`./${
			inObj.interaction.client.user.username
		}/userinfo/${
			inObj.interaction.user.id
		}`);
		mkdirSync(`./${
			inObj.interaction.client.user.username
		}/userinfo/${
			inObj.interaction.user.id
		}/coinflip/`);
		writeFileSync(`./${
			inObj.interaction.client.user.username
		}/userinfo/${
			inObj.interaction.user.id
		}/coinflip/wins.log`, `0`);
		writeFileSync(`./${
			inObj.interaction.client.user.username
		}/userinfo/${
			inObj.interaction.user.id
		}/coinflip/losses.log`, `0`);
	});
};
//#endregion

//#region game code
export const flip = (
	inObjs: {
		interaction: CommandInteraction
	}[]
):void => {
	inObjs.forEach((inObj) => {
		if (inObj.interaction.options.get(`side`) != null) {
			const option = inObj.interaction.options.get(`side`);
			const side = option?.value as `${`heads` | `tails`}`;
			const coinflippath = `./${
				inObj.interaction.client.user.username
			}/userinfo/${
				inObj.interaction.user.id
			}/coinflip/`;
			const coinfilew = `./${
				inObj.interaction.client.user.username
			}/userinfo/${
				inObj.interaction.user.id
			}/coinflip/wins.log`;
			const coinfilel = `./${
				inObj.interaction.client.user.username
			}/userinfo/${
				inObj.interaction.user.id
			}/coinflip/losses.log`;
			if (existsSync(coinflippath)) {
				if (side == `heads`) {
					if ((Math.random() * 10) < 5) {
						const wincount:string = readFileSync(coinfilew, `utf8`);
						const losecount:string = readFileSync(coinfilel, `utf8`);
						writeFileSync(coinfilew, (parseInt(wincount) + 1).toString());
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
								value: (parseInt(wincount) + 1).toString()
							},
							{
								name: `Losses`,
								value: losecount
							});
						inObj.interaction.reply({
							embeds: [
								embed
							]
						}).catch((err: unknown) => {console.error(err)});
					}
					else {
						const wincount:string = readFileSync(coinfilew, `utf8`);
						const losecount:string = readFileSync(coinfilel, `utf8`);
						writeFileSync(coinfilel, (parseInt(losecount) + 1).toString());
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
								value: (parseInt(losecount) + 1).toString()
							});
						inObj.interaction.reply({
							embeds: [
								embed
							]
						}).catch((err: unknown) => {console.error(err)});
					}
				}
				if (side == `tails`) {
					if ((Math.random() * 10) < 5) {
						const wincount:string = readFileSync(coinfilew, `utf8`);
						const losecount:string = readFileSync(coinfilel, `utf8`);
						writeFileSync(coinfilew, (parseInt(losecount) + 1).toString());
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
								value: (parseInt(wincount) + 1).toString()
							},
							{
								name: `Losses`,
								value: losecount
							});
						inObj.interaction.reply({
							embeds: [
								embed
							]
						}).catch((err: unknown) => {console.error(err)});
					}
					else {
						const wincount:string = readFileSync(coinfilew, `utf8`);
						const losecount:string = readFileSync(coinfilel, `utf8`);
						writeFileSync(coinfilel, (parseInt(losecount) + 1).toString());
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
								value: (parseInt(losecount) + 1).toString()
							});
						inObj.interaction.reply({
							embeds: [
								embed
							]
						}).catch((err: unknown) => {console.error(err)});
					}
				}
			}
			else {
				setup([{interaction: inObj.interaction}]);
				flip([{interaction: inObj.interaction}]);
			}
		}
	});
};
//#endregion