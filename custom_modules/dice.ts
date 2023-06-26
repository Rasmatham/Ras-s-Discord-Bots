//#region imports
import {ActionRowBuilder, AttachmentBuilder, ButtonBuilder, ButtonStyle, CommandInteraction} from "discord.js";
//#endregion

//#region die roller
export const dice = (inObjs: {interaction: CommandInteraction}[]):void => {
	inObjs.forEach(inobj => {
		const dieTypes = [`d4`, `d6`, `d8`, `d10`, `d12`, `d20`, `d10x10`];
		const options = Object.fromEntries(dieTypes.map((x) => {
			//[x, inobj.interaction.options.get(x)?.value]
			const opt = inobj.interaction.options.get(x);
			if (opt) {
				if (typeof opt.value === `number`) {
					return [x, opt.value];
				}
				return [x, 0];
			}
			return [x, 0];
		}));

		const objectFromArray = <V>(keys: (string | number | symbol)[], value: V): Record<string | number | symbol, V> => Object.fromEntries(keys.map((x) => [x, value]));

		const results = {
			d4: objectFromArray([1, 2, 3, 4], 0),
			d6: objectFromArray([1, 2, 3, 4, 5, 6], 0),
			d8: objectFromArray([1, 2, 3, 4, 5, 6, 7, 8], 0),
			d10: objectFromArray([0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 0),
			d12: objectFromArray([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], 0),
			d20: objectFromArray([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20], 0),
			d10x10: objectFromArray([0, 10, 20, 30, 40, 50, 60, 70, 80, 90], 0)
		};
		const raw: Record<string, number[]> = Object.fromEntries(dieTypes.map((x) => [x, []]));
		const min = 0, max = 10000;
		let wrongNumber = 0;
		if (Object.values(options).every((x) => x === 0)) {
			void inobj.interaction.reply({
				content: `Please specify at least one type of dice`,
				ephemeral: true
			});
			return;
		}
		if (Object.values(options).some((x) => x < min)) {
			wrongNumber += 1;
		}
		if (Object.values(options).some((x) => x > max)) {
			wrongNumber += 2;
		}
		switch (wrongNumber) {
		case 1:
			void inobj.interaction.reply({
				content: `I cannot roll less than **${max}** dice. Please choose a number between **${min}** to **${max}** (both inclusive)`,
				ephemeral: true
			});
			return;
		case 2:
			void inobj.interaction.reply({
				content: `I cannot roll more than **${max}** dice. Please choose a number between **${min}** to **${max}** (both inclusive)`,
				ephemeral: true
			});
			return;
		case 3:
			void inobj.interaction.reply({
				content: `I cannot roll less than **${min}** or more than **${max}** dice. Please choose a number between **${min}** to **${max}** (both inclusive)`,
				ephemeral: true
			});
			return;
		default:
			break;
		}
		for(let i = 0; i < options.d4; i++) {
			const rng = Math.ceil(Math.random() * 4)  as 1|2|3|4;
			raw.d4.push(rng);
			results.d4[rng]++;
		}
		for(let i = 0; i < options.d6; i++) {
			const rng = Math.ceil(Math.random() * 6) as 1|2|3|4|5|6;
			raw.d6.push(rng);
			results.d6[rng]++;
		}
		for(let i = 0; i < options.d8; i++) {
			const rng = Math.ceil(Math.random() * 8) as 1|2|3|4|5|6|7|8;
			raw.d8.push(rng);
			results.d8[rng]++;
		}
		for(let i = 0; i < options.d10; i++) {
			const rng = Math.floor(Math.random() * 10) as 0|1|2|3|4|5|6|7|8|9;
			raw.d10.push(rng);
			results.d10[rng]++;
		}
		for(let i = 0; i < options.d12; i++) {
			const rng = Math.ceil(Math.random() * 12) as 1|2|3|4|5|6|7|8|9|10|11|12;
			raw.d12.push(rng);
			results.d12[rng]++;
		}
		for(let i = 0; i < options.d20; i++) {
			const rng = Math.ceil(Math.random() * 20) as 1|2|3|4|5|6|7|8|9|10|11|12|13|14|15|16|17|18|19|20;
			raw.d20.push(rng);
			results.d20[rng]++;
		}
		for(let i = 0; i < options.d10x10; i++) {
			const rng = (Math.floor(Math.random() * 10) * 10) as 0|10|20|30|40|50|60|70|80|90;
			raw.d10x10.push(rng);
			results.d10x10[rng]++;
		}
		//plz ignore how ugly the line below this. It just filters out all the 0's and unrolled die types. There are probably ~1 billion better ways to do this.
		const refinedResults = Object.fromEntries(Object.entries(Object.fromEntries(Object.entries(results).map((x) => [x[0], Object.fromEntries(Object.entries(x[1]).filter((y) => y[1] > 0))]))).filter((x) => Object.entries(x[1]).length > 0));

		const filteredRaw = Object.fromEntries(Object.entries(raw).filter((x) => x[1].length > 0));
		const refinedRaw = `${Object.entries(filteredRaw).map((x) => {
			const dieType = x[0].toUpperCase(), rolls = x[1];

			return `${dieType}, ${rolls.join(`, `)}`;
		}).join(`\n`)}`;

		const niceMessage = `# <@${inobj.interaction.user.id}> rolled:\n\n${Object.entries(refinedResults).map((die) => {
			const rolls = Object.entries(die[1]);

			const pluralNumbers = [`zeros`,`ones`,`twos`,`threes`,`fours`,`fives`,`sixes`,`sevens`,`eights`,`nines`,`tens`,`elevens`,`twelves`,`thirteens`,`fourteens`,`fifteens`,`sixteens`,`seventeens`,`eighteens`,`nineteens`,`twenties`];
			pluralNumbers[30] = `thirties`;
			pluralNumbers[40] = `forties`;
			pluralNumbers[50] = `fifties`;
			pluralNumbers[60] = `sixties`;
			pluralNumbers[70] = `seventies`;
			pluralNumbers[80] = `eighties`;
			pluralNumbers[90] = `nineties`;

			const singularNumbers = [`zero`,`one`,`two`,`three`,`four`,`five`,`six`,`seven`,`eight`,`nine`,`ten`,`eleven`,`twelve`,`thirteen`,`fourteen`,`fifteen`,`sixteen`,`seventeen`,`eighteen`,`nineteen`,`twenty`];
			pluralNumbers[30] = `thirty`;
			pluralNumbers[40] = `forty`;
			pluralNumbers[50] = `fifty`;
			pluralNumbers[60] = `sixty`;
			pluralNumbers[70] = `seventy`;
			pluralNumbers[80] = `eighty`;
			pluralNumbers[90] = `ninety`;

			const rollStrings = rolls.map((x) => `- **${x[1]}** ${x[1] === 1 ? singularNumbers[Number(x[0])] : pluralNumbers[Number(x[0])]}`);

			const average = (rolls.map((x) => Number(x[0]) * x[1]).reduce((a, b) => a + b, 0)/rolls.map((x) => x[1]).reduce((a, b) => a + b, 0)).toFixed(2);
			const min = Math.min(...rolls.map((x) => Number(x[0])));
			const max = Math.max(...rolls.map((x) => Number(x[0])));
			const sum = rolls.map((x) => Number(x[0]) * x[1]).reduce((a, b) => a + b, 0);

			return `## ${die[0].toUpperCase()}:\n${rollStrings.join(`\n`)}\naverage: **${average}**\nmin: **${min}**\nmax: **${max}**\nsum: **${sum}**`;
		}).join(`\n\n`)}`;
		
		void inobj.interaction.reply({
			content: niceMessage,
			ephemeral: true,
			components: [
				new ActionRowBuilder<ButtonBuilder>()
					.addComponents(new ButtonBuilder()
						.setLabel(`set public`)
						.setCustomId(`publish`)
						.setStyle(ButtonStyle.Primary))
			],
			files: [
				new AttachmentBuilder(Buffer.from(refinedRaw, `utf-8`)).setName(`Roll Sequence.csv`)
			]
		});
	});
};
//#endregion