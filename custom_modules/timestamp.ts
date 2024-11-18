//#region imports
import { ActionRowBuilder, AttachmentBuilder, ButtonBuilder, ButtonInteraction, ButtonStyle, EmbedBuilder, Interaction, ModalBuilder, ModalMessageModalSubmitInteraction, ModalSubmitInteraction, TextInputBuilder, TextInputStyle, TimestampStylesString } from "discord.js";
import { ephemeral, genericCatch } from "./generalUse";
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "fs";
//#endregion

//#region setup
const setup = (inObj: { interaction: Interaction } ) => {
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
const toUTC = (dateString = new Date().toISOString(), tzIdentifier = `Etc/UTC`):Date => {
	const utcDate = new Date(dateString);
	return new Date((utcDate.getTime() << 1) - new Date(utcDate.toLocaleString(`en-US`, {
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
export const create = (inObjs: Array<{interaction: Interaction}>) => {
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
export const relativeButtonInteraction = (inObjs: Array<{interaction: ButtonInteraction}>) => {
	inObjs.forEach((inObj) => {
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
							.setPlaceholder(`YYYY-MM-DD | MM-DD | DD`)
							.setMaxLength(10)
							.setRequired(false)
					]),
				new ActionRowBuilder<TextInputBuilder>()
					.addComponents([
						new TextInputBuilder()
							.setCustomId(`short_time`)
							.setLabel(`Hours and minutes offset`)
							.setStyle(TextInputStyle.Short)
							.setPlaceholder(`HH:mm:ss | HH:mm | mm`)
							.setMaxLength(8)
							.setRequired(false)
					]),
				new ActionRowBuilder<TextInputBuilder>()
					.addComponents([
						new TextInputBuilder()
							.setCustomId(`negative`)
							.setLabel(`Is the timestamp in the past?`)
							.setStyle(TextInputStyle.Short)
							.setValue(`No`)
							.setPlaceholder(`Y/N | y/n | Yes/No | yes/no | true/false | 1/0`)
							.setMinLength(1)
							.setMaxLength(4)
							.setRequired(true)
					])
			]);

		inObj.interaction.showModal(modal).catch(genericCatch);
	});
};

// eslint-disable-next-line one-var
export const relativeModalInteraction = (inObjs: Array<{interaction: ModalMessageModalSubmitInteraction}>) => {
	inObjs.forEach((inObj) => {
		/* eslint-disable no-useless-assignment, sort-vars */
		let offset = 0,
		years = 0,
		months = 0,
		days = 0,
		hours = 0,
		minutes = 0,
		seconds = 0;
		/* eslint-enable no-useless-assignment, sort-vars */

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

			years = Number.parseInt(splitDate[0], 10);
			months = Number.parseInt(splitDate[1], 10);
			days = Number.parseInt(splitDate[2], 10);

		} else if (monthsDaysRegex.test(longTime)) {

			years = 0;
			months = Number.parseInt(splitDate[1], 10);
			days = Number.parseInt(splitDate[2], 10);

		} else if (daysRegex.test(longTime)) {

			years = 0;
			months = 0;
			days = Number.parseInt(longTime, 10);

		} else if (longTime.length === 0) {

			years = 0;
			months = 0;
			days = 0;

		} else {
			interaction.update({ components: [], content: `Error paring date`, embeds: [] }).catch(genericCatch);
			return;
		}

		if (hoursMinutesSecondsRegex.test(shortTime)) {

			hours = Number.parseInt(splitTime[0], 10);
			minutes = Number.parseInt(splitTime[1], 10);
			seconds = Number.parseInt(splitTime[2], 10);

		} else if (hoursMinutesRegex.test(shortTime)) {

			hours = Number.parseInt(splitTime[1], 10);
			minutes = Number.parseInt(splitTime[2], 10);
			seconds = 0;

		} else if (minutesRegex.test(shortTime)) {

			hours = 0;
			minutes = Number.parseInt(shortTime, 10);
			seconds = 0;

		} else if (shortTime.length === 0) {

			hours = 0;
			minutes = 0;
			seconds = 0;

		} else {
			interaction.update({ components: [], content: `Error paring time`, embeds: [] }).catch(genericCatch);
			return;
		}

		offset += years * 31536000;
		offset += months * 2592000;
		offset += days * 86400;
		offset += hours * 3600;
		offset += minutes * 60;
		offset += seconds;
		offset = [ `Y`,`y`,`Yes`,`yes`,`true`,`1` ].includes(negativeTime) ? 0 - offset : offset;

		// eslint-disable-next-line one-var
		const timestamp = (style: TimestampStylesString) => `<t:${(Math.floor(new Date().getTime()/1000) + offset).toString()}:${style}>`;

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
export const absoluteButtonInteraction = (inObjs: Array<{interaction: ButtonInteraction}>) => {
	inObjs.forEach((inObj) => {
		const path = `./${inObj.interaction.client.user.id}/userinfo/${inObj.interaction.user.id}/tz.txt`;
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
							.setPlaceholder(`YYYY-MM-DD`)
							.setMaxLength(10)
							.setRequired(false)
					]),
				new ActionRowBuilder<TextInputBuilder>()
					.addComponents([
						new TextInputBuilder()
							.setCustomId(`time`)
							.setLabel(`Time (00:00:00 if not specified)`)
							.setStyle(TextInputStyle.Short)
							.setPlaceholder(`HH:mm:ss | HH:mm`)
							.setMaxLength(8)
							.setRequired(false)
					]),
				new ActionRowBuilder<TextInputBuilder>()
					.addComponents([
						new TextInputBuilder()
						.setCustomId(`timezone`)
						.setLabel(`Which timezone are you using?`)
						.setStyle(TextInputStyle.Short)
						.setPlaceholder(existsSync(path) ? readFileSync(path, `utf8`) : `Europe/Oslo`)
						.setMinLength(Intl.supportedValuesOf(`timeZone`).reduce((a, b) => a.length < b.length ? a : b).length)
						.setMaxLength(Intl.supportedValuesOf(`timeZone`).reduce((a, b) => a.length > b.length ? a : b).length)
						.setRequired(true)
						.setValue(existsSync(path) ? readFileSync(path, `utf8`) : ``)
					])
			]);
		inObj.interaction.showModal(modal).catch(genericCatch);
	});
};

// eslint-disable-next-line one-var
export const absoluteModalInteraction = (inObjs: Array<{interaction: ModalMessageModalSubmitInteraction}>) => {
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

		/* eslint-disable no-useless-assignment, sort-vars */
		let year = 0,
		month = 0,
		day = 0,
		hour = 0,
		minute = 0,
		second = 0;
		/* eslint-enable no-useless-assignment, sort-vars */

		// eslint-disable-next-line one-var
		const hoursMinutesRegex = /^[0-9]{1,2}:[0-9]{1,2}$/u,
		hoursMinutesSecondsRegex = /^[0-9]{1,2}:[0-9]{1,2}:[0-9]{1,2}$/u,
		yearsMonthsDaysRegex = /^[0-9]{1,4}-[0-9]{1,2}-[0-9]{1,2}$/u;

		if (yearsMonthsDaysRegex.test(date)) {

			year = Number.parseInt(splitDate[0], 10);
			month = Number.parseInt(splitDate[1], 10);
			day = Number.parseInt(splitDate[2], 10);

		} else if (date.length === 0) {

			year = 1970;
			month = 1;
			day = 1;

		} else {
			interaction.update({ components: [], content: `Error paring date`, embeds: [] }).catch(genericCatch);
			return;
		}

		if (hoursMinutesSecondsRegex.test(time)) {

			hour = Number.parseInt(splitTime[0], 10);
			minute = Number.parseInt(splitTime[1], 10);
			second = Number.parseInt(splitTime[2], 10);

		} else if (hoursMinutesRegex.test(time)) {

			hour = Number.parseInt(splitTime[0], 10);
			minute = Number.parseInt(splitTime[1], 10);
			second = 0;

		} else if (time.length === 0) {

			hour = 0;
			minute = 0;
			second = 0;

		} else {
			interaction.update({ components: [], content: `Error paring time`, embeds: [] }).catch(genericCatch);
			return;
		}

		year = year < 100 ? 100 : year;
		month = month < 1 ? 1 : month;
		day = day < 1 ? 1 : day;
		hour = hour < 0 ? 0 : hour;
		minute = minute < 0 ? 0 : minute;
		second = second < 0 ? 0 : second;

		year = year > 9999 ? 9999 : year;
		month = month > 12 ? 12 : month;
		hour = hour > 23 ? 23 : hour;
		minute = minute > 59 ? 59 : minute;
		second = second > 59 ? 59 : second;

		switch (month) {
			case 2: {
				if (!(year % 4) && (year % 100 || !(year % 400))) {
					day = day > 29 ? 29 : day;
					break;
				}
				day = day > 28 ? 28 : day;
				break;
			}
			case 4:
			case 6:
			case 9:
			case 11: {
				day = day > 30 ? 30 : day;
				break;
			}
			case 1:
			case 3:
			case 5:
			case 7:
			case 8:
			case 10:
			case 12: {
				day = day > 31 ? 31 : day;
				break;
			}
			default: {
				break;
			}
		}
		
		// eslint-disable-next-line one-var
		const utcDate = toUTC(`${year.toString().padStart(4, `0`)}-${month.toString().padStart(2, `0`)}-${day.toString().padStart(2, `0`)}T${hour.toString().padStart(2, `0`)}:${minute.toString().padStart(2, `0`)}:${second.toString().padStart(2, `0`)}.000`, timezone);

		// eslint-disable-next-line one-var
		const timestamp = (style: TimestampStylesString) => `<t:${(Math.floor(utcDate.getTime()/1000)).toString()}:${style}>`;

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
export const saveTimezone = (inObjs: Array<{interaction: Interaction}>) => {
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
							.setMinLength(1)
							.setMaxLength(Intl.supportedValuesOf(`timeZone`).reduce((a, b) => a.length > b.length ? a : b).length)
					])
				]);
			inObj.interaction.showModal(modal).catch(genericCatch).catch(genericCatch);
		}
	});
};

// eslint-disable-next-line one-var
export const saveTimezoneModalResponse = (inObjs: Array<{interaction: ModalSubmitInteraction}>) => {
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