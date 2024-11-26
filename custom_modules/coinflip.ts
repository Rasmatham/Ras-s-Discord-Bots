// #region imports
import type { CommandInteraction } from "discord.js";

import { EmbedBuilder } from "discord.js";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";

import { decimalShift, genericCatch, inc, offByOne, ShiftBy } from "./generalUse";
// #endregion

// #region setup
const setup = (inObj: { interaction: CommandInteraction }): void => {
	const clientId = inObj.interaction.client.user.id,
		userId = inObj.interaction.user.id,
		path = `./${clientId}/userinfo/${userId}/coinflip`;
	if (!existsSync(path))
		mkdirSync(path, { recursive: true });
	if (!existsSync(`${path}/wins.log`))
		writeFileSync(`${path}/wins.log`, `0`);
	if (!existsSync(`${path}/losses.log`))
		writeFileSync(`${path}/losses.log`, `0`);
};
// #endregion

// #region game code
// eslint-disable-next-line one-var
export const flip = (inObjs: Array<{ interaction: CommandInteraction }>): void => {
	inObjs.forEach((inObj) => {
		if (inObj.interaction.options.get(`side`) !== null) {
			const coinPath = `./${inObj.interaction.client.user.id}/userinfo/${inObj.interaction.user.id}/coinflip`,
				coinfilel = `${coinPath}/losses.log`,
				coinfilew = `${coinPath}/wins.log`,
				discordUrl = (path: string): string => `https://cdn.discordapp.com/attachments/656164355381133332/${path}.gif`,
				fiftyPercent = 50,
				losecount = readFileSync(coinfilel, `utf8`),
				side = inObj.interaction.options.get(`side`)?.value,
				wincount = readFileSync(coinfilew, `utf8`),
				winState = (decimalShift(Math.random(), ShiftBy.P2) < fiftyPercent);
			if (typeof side !== `string`) return;
			setup(inObj);
			writeFileSync(winState ? coinfilew : coinfilel, (parseInt(wincount, 10) + offByOne).toString());
			// eslint-disable-next-line one-var
			const embed: EmbedBuilder = new EmbedBuilder()
				.setColor(`#00FF00`)
				.setTitle(winState ? `You won!` : `You lost!`)
				.setThumbnail(side === `heads` ?
					discordUrl(`715662587471331359/ezgif-3-b3ae702d4205`) :
					discordUrl(`715669285128634368/ezgif-3-b8913657fa57`)
				)
				.addFields([
					{ name: `The coin landed on ${side}`, value: winState ? `You won!` : `You lost!` },
					{ name: `Wins`, value: winState ? (parseInt(wincount, 10) + inc).toString() : wincount },
					{ name: `Losses`, value: winState ? losecount : (parseInt(losecount, 10) + inc).toString() }
				]);
			inObj.interaction.reply({ embeds: [embed] }).catch(genericCatch);
		}
	});
};
// #endregion
