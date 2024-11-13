//#region imports
import { ActionRowBuilder, AttachmentBuilder, ButtonBuilder, ButtonInteraction, ButtonStyle, EmbedBuilder, Interaction, ModalBuilder, ModalMessageModalSubmitInteraction, ModalSubmitInteraction, TextInputBuilder, TextInputStyle, TimestampStylesString } from "discord.js";
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "fs";
//#endregion

//#region setup
const setup = (
	inObj: {
		interaction: Interaction
	}
):void => {
	const clientId = inObj.interaction.client.user.id;
	const userId = inObj.interaction.user.id
	if (!existsSync(`./${clientId}`))
		mkdirSync(`./${clientId}`);
	if (!existsSync(`./${clientId}/userinfo`))
		mkdirSync(`./${clientId}/userinfo`);
	if (!existsSync(`./${clientId}/userinfo/${userId}`))
		mkdirSync(`./${clientId}/userinfo/${userId}`);
};
//#endregion

//#region utc converter
const toUTC = (dateString = new Date().toISOString(), tzIdentifier = `Etc/UTC`) => new Date(new Date(dateString).toLocaleString(`en-US`, { timeZone: tzIdentifier }));
//#endregion

//#region create timestamp
const validTimestamps = Intl.supportedValuesOf(`timeZone`).join(`\n`)

export const create = (inObjs: {interaction: Interaction}[]):void => {
	inObjs.forEach((inObj) => {
		if (inObj.interaction.isRepliable()) {
			const embed = new EmbedBuilder()
				.setTitle(`Realtive or absolute?`)
				.setColor(`#004b84`)
				.addFields(
					{ name: `Relative`, value: `Timestamp relative to when the timestamp was created. (e.g. in x minutes. Does not affect the timestamp style)` },
					{ name: `Absolute`, value: `Timesatmp based on the actual date and time. (e.g. At HH:mm. Does not affect the timestamp style)` }
				)
			const relativeButton = new ButtonBuilder()
				.setCustomId(`relative`)
				.setLabel(`Relative`)
				.setStyle(ButtonStyle.Primary)
			const absoluteButton = new ButtonBuilder()
				.setCustomId(`absolute`)
				.setLabel(`Absolute`)
				.setStyle(ButtonStyle.Primary)
			const row = new ActionRowBuilder<ButtonBuilder>()
				.addComponents(relativeButton, absoluteButton)
			void inObj.interaction.reply({ephemeral: true, embeds: [embed], components: [row]})
		}
	});
};

//#region relative
export const relativeButtonInteraction = (inObjs: {interaction: ButtonInteraction}[]):void => {
	inObjs.forEach((inObj) => {
		const longTime = new TextInputBuilder()
			.setCustomId(`long_time`)
			.setLabel(`Years, months, and days offset`)
			.setStyle(TextInputStyle.Short)
			.setPlaceholder(`YYYY-MM-DD | MM-DD | DD`)
			.setMaxLength(10)
			.setRequired(false)
		const shortTime = new TextInputBuilder()
			.setCustomId(`short_time`)
			.setLabel(`Hours and minutes offset`)
			.setStyle(TextInputStyle.Short)
			.setPlaceholder(`HH:mm:ss | HH:mm | mm`)
			.setMaxLength(8)
			.setRequired(false)
		const negativeTime = new TextInputBuilder()
			.setCustomId(`negative`)
			.setLabel(`Is the timestamp in the past?`)
			.setStyle(TextInputStyle.Short)
			.setValue(`No`)
			.setPlaceholder(`Y/N | y/n | Yes/No | yes/no | true/false | 1/0`)
			.setMinLength(1)
			.setMaxLength(4)
			.setRequired(true)
		const longTimeRow = new ActionRowBuilder<TextInputBuilder>()
			.addComponents(longTime)
		const shortTimeRow = new ActionRowBuilder<TextInputBuilder>()
			.addComponents(shortTime)
		const negativeRow = new ActionRowBuilder<TextInputBuilder>()
			.addComponents(negativeTime)
		const modal = new ModalBuilder()
			.setCustomId(`relative`)
			.setTitle(`Relative timestamp creation`)
			.addComponents(longTimeRow, shortTimeRow, negativeRow)

		void inObj.interaction.showModal(modal)
	})
}

export const relativeModalInteraction = (inObjs: {interaction: ModalMessageModalSubmitInteraction}[]):void => {
	inObjs.forEach((inObj) => {
		const interaction = inObj.interaction
		let offset = 0

		const longTime = interaction.fields.getTextInputValue(`long_time`);
		const shortTime = interaction.fields.getTextInputValue(`short_time`);
		const negativeTime = interaction.fields.getTextInputValue(`negative`);
		const splitDate = longTime.split(`-`)
		const splitTime = shortTime.split(`:`)

		let years = 0
		let months = 0
		let days = 0
		let hours = 0
		let minutes = 0
		let seconds = 0

		const yearsMonthsDaysRegex = new RegExp(`^([0-9]{1,4}-[0-9]{1,2}-[0-9]{1,2})$`)
		const monthsDaysRegex = new RegExp(`^([0-9]{1,2}-[0-9]{1,2})$`)
		const daysRegex = new RegExp(`^([0-9]{1,2})$`)
		const hoursMinutesSecondsRegex = new RegExp(`^([0-9]{1,2}:[0-9]{1,2}:[0-9]{1,2})$`)
		const hoursMinutesRegex = new RegExp(`^([0-9]{1,2}:[0-9]{1,2})$`)
		const minutesRegex = new RegExp(`^([0-9]{1,2})$`)

		if (yearsMonthsDaysRegex.test(longTime)) {

			years = Number.parseInt(splitDate[0], 10)
			months = Number.parseInt(splitDate[1], 10)
			days = Number.parseInt(splitDate[2], 10)

		} else if (monthsDaysRegex.test(longTime)) {

			years = 0
			months = Number.parseInt(splitDate[1], 10)
			days = Number.parseInt(splitDate[2], 10)

		} else if (daysRegex.test(longTime)) {

			years = 0
			months = 0
			days = Number.parseInt(longTime, 10)

		} else if (longTime.length === 0) {

			years = 0
			months = 0
			days = 0

		} else {
			void interaction.update({content: `Error paring date`, embeds: [], components: []})
			return;
		}

		if (hoursMinutesSecondsRegex.test(shortTime)) {

			hours = Number.parseInt(splitTime[0], 10)
			minutes = Number.parseInt(splitTime[1], 10)
			seconds = Number.parseInt(splitTime[2], 10)

		} else if (hoursMinutesRegex.test(shortTime)) {

			hours = Number.parseInt(splitTime[1], 10)
			minutes = Number.parseInt(splitTime[2], 10)
			seconds = 0

		} else if (minutesRegex.test(shortTime)) {

			hours = 0
			minutes = Number.parseInt(shortTime, 10)
			seconds = 0

		} else if (shortTime.length === 0) {

			hours = 0
			minutes = 0
			seconds = 0

		} else {
			void interaction.update({content: `Error paring time`, embeds: [], components: []})
			return;
		}

		offset += years * 31536000
		offset += months * 2592000
		offset += days * 86400
		offset += hours * 3600
		offset += minutes * 60
		offset += seconds * 1
		offset = [`Y`,`y`,`Yes`,`yes`,`true`,`1`].includes(negativeTime) ? 0 - offset : offset

		const timestamp = (style: TimestampStylesString) => `<t:${(Math.floor(new Date().getTime()/1000) + offset).toString()}:${style}>`

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
			)

			void inObj.interaction.update({embeds: [embed], components: []})
	})
}
//#endregion


//#region absolute
export const absoluteButtonInteraction = (inObjs: {interaction: ButtonInteraction}[]):void => {
	inObjs.forEach((inObj) => {
		const date = new TextInputBuilder()
			.setCustomId(`date`)
			.setLabel(`Date (1979-01-01 if not specified)`)
			.setStyle(TextInputStyle.Short)
			.setPlaceholder(`YYYY-MM-DD`)
			.setMaxLength(10)
			.setRequired(false)
		const time = new TextInputBuilder()
			.setCustomId(`time`)
			.setLabel(`Time (00:00:00 if not specified)`)
			.setStyle(TextInputStyle.Short)
			.setPlaceholder(`HH:mm:ss | HH:mm`)
			.setMaxLength(8)
			.setRequired(false)
		const timezone = new TextInputBuilder()
			.setCustomId(`timezone`)
			.setLabel(`Which timezone are you using?`)
			.setStyle(TextInputStyle.Short)
			.setPlaceholder(`Europe/Oslo`)
			.setMinLength(Intl.supportedValuesOf(`timeZone`).reduce((a, b) => a.length < b.length ? a : b).length)
			.setMaxLength(Intl.supportedValuesOf(`timeZone`).reduce((a, b) => a.length > b.length ? a : b).length)
			.setRequired(true)
		const path = `./${inObj.interaction.client.user.id}/userinfo/${inObj.interaction.user.id}/tz.txt`
		if (existsSync(path)) {
			const tz = readFileSync(path, `utf8`)
			timezone.setValue(tz)
			timezone.setPlaceholder(tz)
		}

		const dateRow = new ActionRowBuilder<TextInputBuilder>()
			.addComponents(date)
		const timeRow = new ActionRowBuilder<TextInputBuilder>()
			.addComponents(time)
		const timezoneRow = new ActionRowBuilder<TextInputBuilder>()
			.addComponents(timezone)
		const modal = new ModalBuilder()
			.setCustomId(`absolute`)
			.setTitle(`Absolute timestamp creation`)
			.addComponents(dateRow, timeRow, timezoneRow)

		void inObj.interaction.showModal(modal)
	})
}

export const absoluteModalInteraction = (inObjs: {interaction: ModalMessageModalSubmitInteraction}[]):void => {
	inObjs.forEach((inObj) => {
		const interaction = inObj.interaction

		const date = interaction.fields.getTextInputValue(`date`);
		const time = interaction.fields.getTextInputValue(`time`);
		const timezone = interaction.fields.getTextInputValue(`timezone`);
		const splitDate = date.split(`-`)
		const splitTime = time.split(`:`)
		
		if (!Intl.supportedValuesOf(`timeZone`).includes(timezone)) {
			void interaction.reply({
				ephemeral: true,
				content: `Invalid timezone. The input is case sensitive.\n-# See [Wikipedia](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones) for more information. Specifically the "TZ identifier" collumn in the table.`,
				files: [new AttachmentBuilder(Buffer.from(validTimestamps)).setName(`valid_tz.txt`)]
			})
			return;
		}

		let year = 0
		let month = 0
		let day = 0
		let hour = 0
		let minute = 0
		let second = 0

		const yearsMonthsDaysRegex = new RegExp(`^([0-9]{1,4}-[0-9]{1,2}-[0-9]{1,2})$`)
		const hoursMinutesSecondsRegex = new RegExp(`^([0-9]{1,2}:[0-9]{1,2}:[0-9]{1,2})$`)
		const hoursMinutesRegex = new RegExp(`^([0-9]{1,2}:[0-9]{1,2})$`)

		if (yearsMonthsDaysRegex.test(date)) {

			year = Number.parseInt(splitDate[0], 10)
			month = Number.parseInt(splitDate[1], 10)
			day = Number.parseInt(splitDate[2], 10)

		} else if (date.length === 0) {

			year = 1970
			month = 1
			day = 1

		} else {
			void interaction.update({content: `Error paring date`, embeds: [], components: []})
			return;
		}

		if (hoursMinutesSecondsRegex.test(time)) {

			hour = Number.parseInt(splitTime[0], 10)
			minute = Number.parseInt(splitTime[1], 10)
			second = Number.parseInt(splitTime[2], 10)

		} else if (hoursMinutesRegex.test(time)) {

			hour = Number.parseInt(splitTime[0], 10)
			minute = Number.parseInt(splitTime[1], 10)
			second = 0

		} else if (time.length === 0) {

			hour = 0
			minute = 0
			second = 0

		} else {
			void interaction.update({content: `Error paring time`, embeds: [], components: []})
			return;
		}

		year = (year < 100 ? 100 : (year > 9999 ? 9999 : year))
		month = (month < 1 ? 1 : (month > 12 ? 12 : month))
		hour = (hour < 0 ? 0 : (hour > 23 ? 23 : hour))
		minute = (minute < 0 ? 0 : (minute > 59 ? 59 : minute))
		second = (second < 0 ? 0 : (second > 59 ? 59 : second))

		switch (month) {
			case 2: {
				if (!(year % 4) && (year % 100 || !(year % 400))) {
					day = (day < 1 ? 1 : (day > 29 ? 29 : day))
					break;
				}
				day = (day < 1 ? 1 : (day > 28 ? 28 : day))
				break;
			}
			case 4:
			case 6:
			case 9:
			case 11: {
				day = (day < 1 ? 1 : (day > 30 ? 30 : day))
				break;
			}
			case 1:
			case 3:
			case 5:
			case 7:
			case 8:
			case 10:
			case 12: {
				day = (day < 1 ? 1 : (day > 31 ? 31 : day))
				break;
			}
			default: {
				break;
			}
		}
		const utcDate = toUTC(`${year.toString().padStart(4, `0`)}-${month.toString().padStart(2, `0`)}-${day.toString().padStart(2, `0`)}T${hour.toString().padStart(2, `0`)}:${minute.toString().padStart(2, `0`)}:${second.toString().padStart(2, `0`)}.000`, timezone)

		const timestamp = (style: TimestampStylesString) => `<t:${(Math.floor(utcDate.getTime()/1000)).toString()}:${style}>`

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
			)

			void inObj.interaction.update({embeds: [embed], components: []})
	})
}
//#endregion


//#endregion

//#region save timezone
export const saveTimezone = (inObjs: {interaction: Interaction}[]):void => {
	inObjs.forEach((inObj) => {
		if (!inObj.interaction.isAutocomplete() && !inObj.interaction.isModalSubmit()) {
			const modal = new ModalBuilder()
				.setCustomId(`setTz`)
				.setTitle(`Set Timezone`)

			const ti = new TextInputBuilder()
				.setCustomId(`tz`)
				.setLabel(`Enter your timezone (leave empty to remove):`)
				.setStyle(TextInputStyle.Short)
				.setPlaceholder(`Europe/Oslo`)
				.setRequired(false)
				.setMinLength(1)
				.setMaxLength(Intl.supportedValuesOf(`timeZone`).reduce((a, b) => a.length > b.length ? a : b).length)

			const ar = new ActionRowBuilder<TextInputBuilder>().addComponents(ti)

			modal.addComponents(ar)

			void inObj.interaction.showModal(modal).catch((err: unknown) => {console.error(err)})
		}
	});
};

export const saveTimezoneModalResponse = (inObjs: {interaction: ModalSubmitInteraction}[]):void => {
	inObjs.forEach((inObj) => {
		const interaction = inObj.interaction
		if (interaction.customId !== `setTz`) return;
			const timezone = interaction.fields.getTextInputValue(`tz`);
			if (!timezone.length) {
				void interaction.reply({ephemeral: true, content: `Removing timezone`}).then(() => {
					if (!existsSync(`./${inObj.interaction.client.user.id}/userinfo/${inObj.interaction.user.id}/tz.txt`)) {
						void interaction.editReply({content: `You have not set a timezone`})
						return;
					}
					rmSync(`./${inObj.interaction.client.user.id}/userinfo/${inObj.interaction.user.id}/tz.txt`)
					void interaction.editReply({content: `Timezone removed`})
				})
				return;
			}
			if (!Intl.supportedValuesOf(`timeZone`).includes(timezone)) {
				void interaction.reply({
					ephemeral: true,
					content: `Invalid timezone. The input is case sensitive.\n-# See [Wikipedia](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones) for more information. Specifically the "TZ identifier" collumn in the table.`,
					components: [new ActionRowBuilder<ButtonBuilder>().addComponents(new ButtonBuilder().setCustomId(`setTz`).setLabel(`Try again?`).setStyle(ButtonStyle.Primary))],
					files: [new AttachmentBuilder(Buffer.from(validTimestamps)).setName(`valid_tz.txt`)]
				})
				return;
			}
			setup(inObj)
			void interaction.reply({ephemeral: true, content: `Setting timezone to: ${timezone}`}).then(() => {
				writeFileSync(`./${interaction.client.user.id}/userinfo/${interaction.user.id}/tz.txt`, timezone);
				void interaction.editReply({content: `Timezone set to: ${timezone}`})
			})
	});
}
//#endregion