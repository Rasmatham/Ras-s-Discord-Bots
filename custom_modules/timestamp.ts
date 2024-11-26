//#region imports
import type { ButtonInteraction, Interaction, ModalMessageModalSubmitInteraction, ModalSubmitInteraction, TimestampStylesString } from "discord.js";

import { ActionRowBuilder, AttachmentBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } from "discord.js";
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "fs";

import { binaryShift, ephemeral, genericCatch, Index, msInS, ShiftBy, zero } from "./generalUse";
//#endregion

//#region setup
const setup = (inObj: { interaction: Interaction } ): void => {
	const clientId = inObj.interaction.client.user.id,
	userId = inObj.interaction.user.id;
	if (!existsSync(`./${clientId}`))
		mkdirSync(`./${clientId}`);
	if (!existsSync(`./${clientId}/userinfo`))
		mkdirSync(`./${clientId}/userinfo`);
	if (!existsSync(`./${clientId}/userinfo/${userId}`))
		mkdirSync(`./${clientId}/userinfo/${userId}`);
};
//#endregion

//#region utc converter
// eslint-disable-next-line one-var
const toUtc = (dateString = new Date().toISOString(), tzIdentifier = `Etc/UTC`):Date => {
	const utcDate = new Date(dateString);
	return new Date(binaryShift(utcDate.getTime(), ShiftBy.P1) - new Date(utcDate.toLocaleString(`en-US`, {
		day: `2-digit`,
		fractionalSecondDigits: 3,
		hour: `2-digit`,
		minute: `2-digit`,
		month: `2-digit`,
		second: `2-digit`,
		timeZone: tzIdentifier,
		year: `numeric`
	})).getTime());
};
//#endregion

//#region create timestamp
// eslint-disable-next-line one-var
const validTimestamps = Intl.supportedValuesOf(`timeZone`).join(`\n`);

// eslint-disable-next-line one-var
export const create = (inObjs: Array<{interaction: Interaction}>): void => {
	inObjs.forEach((inObj) => {
		if (inObj.interaction.isRepliable()) {
			const absoluteButton = new ButtonBuilder()
				.setCustomId(`absolute`)
				.setLabel(`Absolute`)
				.setStyle(ButtonStyle.Primary),
			embed = new EmbedBuilder()
				.setTitle(`Realtive or absolute?`)
				.setColor(`#004b84`)
				.addFields(
					{ name: `Relative`, value: `Timestamp relative to when the timestamp was created. (e.g. in x minutes. Does not affect the timestamp style)` },
					{ name: `Absolute`, value: `Timesatmp based on the actual date and time. (e.g. At HH:mm. Does not affect the timestamp style)` }
				),
			relativeButton = new ButtonBuilder()
				.setCustomId(`relative`)
				.setLabel(`Relative`)
				.setStyle(ButtonStyle.Primary),
			row = new ActionRowBuilder<ButtonBuilder>()
				.addComponents(relativeButton, absoluteButton);
			inObj.interaction.reply({ components: [row], embeds: [embed], ephemeral }).catch(genericCatch);
		}
	});
};

//#region relative
// eslint-disable-next-line one-var
export const relativeButtonInteraction = (inObjs: Array<{interaction: ButtonInteraction}>): void => {
	inObjs.forEach((inObj) => {
		const dateFormats = [ `YYYY-MM-DD`, `MM-DD`, `DD` ],
		negativeFormats = [ `Y/N`, `y/n`, `Yes/No`, `yes/no`, `true/false`, `1/0` ],
		timeFormats = [ `HH:mm:ss`, `HH:mm`, `mm` ];
		// eslint-disable-next-line one-var
		const modal = new ModalBuilder()
			.setCustomId(`relative`)
			.setTitle(`Relative timestamp creation`)
			.addComponents([
				new ActionRowBuilder<TextInputBuilder>()
					.addComponents([
						new TextInputBuilder()
							.setCustomId(`long_time`)
							.setLabel(`Years, months, and days offset`)
							.setStyle(TextInputStyle.Short)
							.setPlaceholder(dateFormats.join(` | `))
							.setMaxLength(Math.max(...dateFormats.map((x) => x.length)))
							.setRequired(false)
					]),
				new ActionRowBuilder<TextInputBuilder>()
					.addComponents([
						new TextInputBuilder()
							.setCustomId(`short_time`)
							.setLabel(`Hours and minutes offset`)
							.setStyle(TextInputStyle.Short)
							.setPlaceholder(timeFormats.join(` | `))
							.setMaxLength(Math.max(...timeFormats.map((x) => x.length)))
							.setRequired(false)
					]),
				new ActionRowBuilder<TextInputBuilder>()
					.addComponents([
						new TextInputBuilder()
							.setCustomId(`negative`)
							.setLabel(`Is the timestamp in the past?`)
							.setStyle(TextInputStyle.Short)
							.setValue(`No`)
							.setPlaceholder(negativeFormats.join(` | `))
							.setMinLength(Math.min(...negativeFormats.map((a) => Math.min(...a.split(`/`).map((b) => b.length)))))
							.setMaxLength(Math.max(...negativeFormats.map((a) => Math.max(...a.split(`/`).map((b) => b.length)))))
							.setRequired(true)
					])
			]);

		inObj.interaction.showModal(modal).catch(genericCatch);
	});
};

// eslint-disable-next-line one-var
export const relativeModalInteraction = (inObjs: Array<{interaction: ModalMessageModalSubmitInteraction}>): void => {
	inObjs.forEach((inObj) => {
		let days, hours, minutes, months, offset, seconds, years;
		/* eslint-disable no-useless-assignment */
		offset = zero;
		years = zero;
		months = zero;
		days = zero;
		hours = zero;
		minutes = zero;
		seconds = zero;
		/* eslint-enable no-useless-assignment */

		const { interaction } = inObj,
		longTime = interaction.fields.getTextInputValue(`long_time`),
		negativeTime = interaction.fields.getTextInputValue(`negative`),
		shortTime = interaction.fields.getTextInputValue(`short_time`),
		splitDate = longTime.split(`-`),
		splitTime = shortTime.split(`:`);

		// eslint-disable-next-line one-var
		const 
		daysRegex = /^[0-9]{1,2}$/u,
		hoursMinutesRegex = /^[0-9]{1,2}:[0-9]{1,2}$/u,
		hoursMinutesSecondsRegex = /^[0-9]{1,2}:[0-9]{1,2}:[0-9]{1,2}$/u,
		minutesRegex = /^[0-9]{1,2}$/u,
		monthsDaysRegex = /^[0-9]{1,2}-[0-9]{1,2}$/u,
		yearsMonthsDaysRegex = /^[0-9]{1,4}-[0-9]{1,2}-[0-9]{1,2}$/u;

		if (yearsMonthsDaysRegex.test(longTime)) {

			years = Number.parseInt(splitDate[Index.First], 10);
			months = Number.parseInt(splitDate[Index.Second], 10);
			days = Number.parseInt(splitDate[Index.Third], 10);

		} else if (monthsDaysRegex.test(longTime)) {

			years = zero;
			months = Number.parseInt(splitDate[Index.First], 10);
			days = Number.parseInt(splitDate[Index.Second], 10);

		} else if (daysRegex.test(longTime)) {

			years = zero;
			months = zero;
			days = Number.parseInt(longTime, 10);

		} else if (longTime.length === zero) {

			years = zero;
			months = zero;
			days = zero;

		} else {
			interaction.update({ components: [], content: `Error paring date`, embeds: [] }).catch(genericCatch);
			return;
		}

		if (hoursMinutesSecondsRegex.test(shortTime)) {

			hours = Number.parseInt(splitTime[Index.First], 10);
			minutes = Number.parseInt(splitTime[Index.Second], 10);
			seconds = Number.parseInt(splitTime[Index.Third], 10);

		} else if (hoursMinutesRegex.test(shortTime)) {

			hours = Number.parseInt(splitTime[Index.Second], 10);
			minutes = Number.parseInt(splitTime[Index.Third], 10);
			seconds = zero;

		} else if (minutesRegex.test(shortTime)) {

			hours = zero;
			minutes = Number.parseInt(shortTime, 10);
			seconds = zero;

		} else if (shortTime.length === zero) {

			hours = zero;
			minutes = zero;
			seconds = zero;

		} else {
			interaction.update({ components: [], content: `Error paring time`, embeds: [] }).catch(genericCatch);
			return;
		}
		/* eslint-disable perfectionist/sort-variable-declarations */
		// eslint-disable-next-line one-var
		const minutesPerHour = 60,
		hoursPerDay = 24,
		daysPerMonth = 30,
		daysPerYear = 365,
		secondsPerMinute = 60,
		secondsPerHour = minutesPerHour * secondsPerMinute,
		secondsPerDay = hoursPerDay * secondsPerHour,
		secondsPerMonth = daysPerMonth * secondsPerDay,
		secondsPerYear = daysPerYear * secondsPerDay;
		/* eslint-enable perfectionist/sort-variable-declarations */

		offset += years * secondsPerYear;
		offset += months * secondsPerMonth;
		offset += days * secondsPerDay;
		offset += hours * secondsPerHour;
		offset += minutes * secondsPerMinute;
		offset += seconds;
		offset = [ `1`,`true`,`Y`,`y`,`Yes`,`yes` ].includes(negativeTime) ? -offset : offset;

		// eslint-disable-next-line one-var
		const timestamp = (style: TimestampStylesString): `<t:${string}:${TimestampStylesString}>` => `<t:${(Math.floor(new Date().getTime()/msInS) + offset).toString()}:${style}>`;

		// eslint-disable-next-line one-var
		const embed = new EmbedBuilder()
			.setTitle(`Timestamps`)
			.setColor(`#004b84`)
			.addFields(
				{ name: `Short Time (${timestamp(`t`)})`, value: `\`${timestamp(`t`)}\`` },
				{ name: `Long Time (${timestamp(`T`)})`, value: `\`${timestamp(`T`)}\`` },
				{ name: `Short Date (${timestamp(`d`)})`, value: `\`${timestamp(`d`)}\`` },
				{ name: `Long Date (${timestamp(`D`)})`, value: `\`${timestamp(`D`)}\`` },
				{ name: `Short Date/Time (${timestamp(`f`)})`, value: `\`${timestamp(`f`)}\`` },
				{ name: `Long Date/Time (${timestamp(`F`)})`, value: `\`${timestamp(`F`)}\`` },
				{ name: `Relative Time (${timestamp(`R`)})`, value: `\`${timestamp(`R`)}\`` }
			);

			inObj.interaction.update({ components: [], embeds: [embed] }).catch(genericCatch);
	});
};
//#endregion


//#region absolute
// eslint-disable-next-line one-var
export const absoluteButtonInteraction = (inObjs: Array<{interaction: ButtonInteraction}>): void => {
	inObjs.forEach((inObj) => {
		const path = `./${inObj.interaction.client.user.id}/userinfo/${inObj.interaction.user.id}/tz.txt`;
		// eslint-disable-next-line one-var
		const dateFormats = [`YYYY-MM-DD`],
		timeFormats = [ `HH:mm:ss`, `HH:mm` ];
		// eslint-disable-next-line one-var
		const modal = new ModalBuilder()
			.setCustomId(`absolute`)
			.setTitle(`Absolute timestamp creation`)
			.addComponents([
				new ActionRowBuilder<TextInputBuilder>()
					.addComponents([
						new TextInputBuilder()
							.setCustomId(`date`)
							.setLabel(`Date (1979-01-01 if not specified)`)
							.setStyle(TextInputStyle.Short)
							.setPlaceholder(dateFormats.join(` | `))
							.setMaxLength(Math.max(...dateFormats.map((a) => a.length)))
							.setRequired(false)
					]),
				new ActionRowBuilder<TextInputBuilder>()
					.addComponents([
						new TextInputBuilder()
							.setCustomId(`time`)
							.setLabel(`Time (00:00:00 if not specified)`)
							.setStyle(TextInputStyle.Short)
							.setPlaceholder(timeFormats.join(` | `))
							.setMaxLength(Math.max(...timeFormats.map((a) => a.length)))
							.setRequired(false)
					]),
				new ActionRowBuilder<TextInputBuilder>()
					.addComponents([
						new TextInputBuilder()
						.setCustomId(`timezone`)
						.setLabel(`Which timezone are you using?`)
						.setStyle(TextInputStyle.Short)
						.setPlaceholder(existsSync(path) ? readFileSync(path, `utf8`) : `Europe/Oslo`)
						.setMinLength(Math.min(...Intl.supportedValuesOf(`timeZone`).map((a) => a.length)))
						.setMaxLength(Math.max(...Intl.supportedValuesOf(`timeZone`).map((a) => a.length)))
						.setRequired(true)
						.setValue(existsSync(path) ? readFileSync(path, `utf8`) : ``)
					])
			]);
		inObj.interaction.showModal(modal).catch(genericCatch);
	});
};

// eslint-disable-next-line one-var
export const absoluteModalInteraction = (inObjs: Array<{interaction: ModalMessageModalSubmitInteraction}>): void => {
	inObjs.forEach((inObj) => {
		const { interaction } = inObj,
		date = interaction.fields.getTextInputValue(`date`),
		time = interaction.fields.getTextInputValue(`time`),
		timezone = interaction.fields.getTextInputValue(`timezone`);
		// eslint-disable-next-line one-var
		const splitDate = date.split(`-`),
		splitTime = time.split(`:`);
		
		if (!Intl.supportedValuesOf(`timeZone`).includes(timezone)) {
			interaction.reply({
				content: `Invalid timezone. The input is case sensitive.\n-# See [Wikipedia](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones) for more information. Specifically the "TZ identifier" collumn in the table.`,
				ephemeral,
				files: [new AttachmentBuilder(Buffer.from(validTimestamps)).setName(`valid_tz.txt`)]
			}).catch(genericCatch);
			return;
		}

		enum Months {
			January = 1,
			February = 2,
			March = 3,
			April = 4,
			May = 5,
			June = 6,
			July = 7,
			August = 8,
			September = 9,
			October = 10,
			November = 11,
			December = 12
		}



		let day, hour, minute, month: Months, second, year;
		/* eslint-disable no-useless-assignment */
		year = zero;
		month = Months.January;
		day = zero;
		hour = zero;
		minute = zero;
		second = zero;
		/* eslint-enable no-useless-assignment */

		// eslint-disable-next-line one-var
		const hoursMinutesRegex = /^[0-9]{1,2}:[0-9]{1,2}$/u,
		hoursMinutesSecondsRegex = /^[0-9]{1,2}:[0-9]{1,2}:[0-9]{1,2}$/u,
		yearsMonthsDaysRegex = /^[0-9]{1,4}-[0-9]{1,2}-[0-9]{1,2}$/u;

		if (yearsMonthsDaysRegex.test(date)) {

			year = Number.parseInt(splitDate[Index.First], 10);
			month = Number.parseInt(splitDate[Index.Second], 10);
			day = Number.parseInt(splitDate[Index.Third], 10);

		} else if (date.length === zero) {

			const unix = new Date(zero);
			year = unix.getUTCFullYear();
			month = unix.getUTCMonth();
			day = unix.getUTCDate();

		} else {
			interaction.update({ components: [], content: `Error paring date`, embeds: [] }).catch(genericCatch);
			return;
		}

		if (hoursMinutesSecondsRegex.test(time)) {

			hour = Number.parseInt(splitTime[Index.First], 10);
			minute = Number.parseInt(splitTime[Index.Second], 10);
			second = Number.parseInt(splitTime[Index.Third], 10);

		} else if (hoursMinutesRegex.test(time)) {

			hour = Number.parseInt(splitTime[Index.First], 10);
			minute = Number.parseInt(splitTime[Index.Second], 10);
			second = zero;

		} else if (time.length === zero) {

			hour = zero;
			minute = zero;
			second = zero;

		} else {
			interaction.update({ components: [], content: `Error paring time`, embeds: [] }).catch(genericCatch);
			return;
		}

		// eslint-disable-next-line one-var
		const maxValues = {
			feb: 28,
			hour: 23,
			leapFeb: 29,
			longMonth: 31,
			minute: 59,
			month: Months.December,
			second: 59,
			shotMonth: 30,
			year: 9999
		},
		minValues = {
			day: 1,
			hour: 0,
			minute: 0,
			month: Months.January,
			second: 0,
			year: 100
		};

		year = Math.max(minValues.year, year);
		month = Math.max(minValues.month, month);
		day = Math.max(minValues.day, day);
		hour = Math.max(minValues.hour, hour);
		minute = Math.max(minValues.minute, minute);
		second = Math.max(minValues.second, second);
		
		year = Math.min(maxValues.year, year);
		month = Math.min(maxValues.month, month);
		hour = Math.min(maxValues.hour, hour);
		minute = Math.min(maxValues.minute, minute);
		second = Math.min(maxValues.second, second);

		switch (month) {
			case Months.April:
			case Months.June:
			case Months.November:
			case Months.September: {
				day = Math.min(maxValues.shotMonth, day);
				break;
			}
			case Months.August:
			case Months.December:
			case Months.January:
			case Months.July:
			case Months.March:
			case Months.May:
			case Months.October: {
				day = Math.min(maxValues.longMonth, day);
				break;
			}
			case Months.February: {
				// eslint-disable-next-line @typescript-eslint/no-magic-numbers
				if (!(year % 4) && (year % 100 || !(year % 400))) {
					day = Math.min(maxValues.leapFeb, day);
					break;
				}
				day = Math.min(maxValues.feb, day);
				break;
			}
			default: {
				break;
			}
		}
		
		// eslint-disable-next-line one-var
		const utcDate = toUtc(`${year.toString().padStart(maxValues.year.toString().length, `0`)}-${month.toString().padStart(maxValues.month.toString().length, `0`)}-${day.toString().padStart(maxValues.longMonth.toString().length, `0`)}T${hour.toString().padStart(maxValues.hour.toString().length, `0`)}:${minute.toString().padStart(maxValues.minute.toString().length, `0`)}:${second.toString().padStart(maxValues.second.toString().length, `0`)}.000`, timezone);

		// eslint-disable-next-line one-var
		const timestamp = (style: TimestampStylesString): `<t:${string}:${TimestampStylesString}>`  => `<t:${(Math.floor(utcDate.getTime()/msInS)).toString()}:${style}>`;

		// eslint-disable-next-line one-var
		const embed = new EmbedBuilder()
			.setTitle(`Timestamps`)
			.setColor(`#004b84`)
			.addFields([
				{ name: `Short Time (${timestamp(`t`)})`, value: `\`${timestamp(`t`)}\`` },
				{ name: `Long Time (${timestamp(`T`)})`, value: `\`${timestamp(`T`)}\`` },
				{ name: `Short Date (${timestamp(`d`)})`, value: `\`${timestamp(`d`)}\`` },
				{ name: `Long Date (${timestamp(`D`)})`, value: `\`${timestamp(`D`)}\`` },
				{ name: `Short Date/Time (${timestamp(`f`)})`, value: `\`${timestamp(`f`)}\`` },
				{ name: `Long Date/Time (${timestamp(`F`)})`, value: `\`${timestamp(`F`)}\`` },
				{ name: `Relative Time (${timestamp(`R`)})`, value: `\`${timestamp(`R`)}\`` }
			]);

			inObj.interaction.update({ components: [], embeds: [embed] }).catch(genericCatch);
	});
};
//#endregion


//#endregion

//#region save timezone
// eslint-disable-next-line one-var
export const saveTimezone = (inObjs: Array<{interaction: Interaction}>): void => {
	inObjs.forEach((inObj) => {
		if (!inObj.interaction.isAutocomplete() && !inObj.interaction.isModalSubmit()) {
			const modal = new ModalBuilder()
				.setCustomId(`setTz`)
				.setTitle(`Set Timezone`)
				.addComponents([
					new ActionRowBuilder<TextInputBuilder>().addComponents([
						new TextInputBuilder()
							.setCustomId(`tz`)
							.setLabel(`Enter your timezone (leave empty to remove):`)
							.setStyle(TextInputStyle.Short)
							.setPlaceholder(`Europe/Oslo`)
							.setRequired(false)
							.setMaxLength(Intl.supportedValuesOf(`timeZone`).reduce((a, b) => a.length > b.length ? a : b).length)
					])
				]);
			inObj.interaction.showModal(modal).catch(genericCatch).catch(genericCatch);
		}
	});
};

// eslint-disable-next-line one-var
export const saveTimezoneModalResponse = (inObjs: Array<{interaction: ModalSubmitInteraction}>): void => {
	inObjs.forEach((inObj) => {
		const { interaction } = inObj;
		if (interaction.customId !== `setTz`) return;
		// eslint-disable-next-line one-var
		const timezone = interaction.fields.getTextInputValue(`tz`);
		if (!timezone.length) {
			interaction.reply({ content: `Removing timezone`, ephemeral }).then(() => {
				if (!existsSync(`./${inObj.interaction.client.user.id}/userinfo/${inObj.interaction.user.id}/tz.txt`)) {
					interaction.editReply({ content: `You have not set a timezone` }).catch(genericCatch);
					return;
				}
				rmSync(`./${inObj.interaction.client.user.id}/userinfo/${inObj.interaction.user.id}/tz.txt`);
				interaction.editReply({ content: `Timezone removed` }).catch(genericCatch);
			}).catch(genericCatch);
			return;
		}
		if (!Intl.supportedValuesOf(`timeZone`).includes(timezone)) {
			interaction.reply({
				components: [new ActionRowBuilder<ButtonBuilder>().addComponents(new ButtonBuilder().setCustomId(`setTz`).setLabel(`Try again?`).setStyle(ButtonStyle.Primary))],
				content: `Invalid timezone. The input is case sensitive.\n-# See [Wikipedia](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones) for more information. Specifically the "TZ identifier" collumn in the table.`,
				ephemeral,
				files: [new AttachmentBuilder(Buffer.from(validTimestamps)).setName(`valid_tz.txt`)]
			}).catch(genericCatch);
			return;
		}
		setup(inObj);
		interaction.reply({ content: `Setting timezone to: ${timezone}`, ephemeral }).then(() => {
			writeFileSync(`./${interaction.client.user.id}/userinfo/${interaction.user.id}/tz.txt`, timezone);
			interaction.editReply({ content: `Timezone set to: ${timezone}` }).catch(genericCatch);
		}).catch(genericCatch);
	});
};
//#endregion