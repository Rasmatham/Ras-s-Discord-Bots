const { CommandInteraction, User, MessageButton, MessageActionRow, ButtonInteraction, Message  } = require(`discord.js`);
/** @param {CommandInteraction} interaction */
const ticTacToe = (interaction) => {
	interaction.guild.members.fetch(interaction.options.get(`playertwo`).value).then((playerTwo) => {
		/** @type {Boolean} */
		const movePieces = interaction.options.get(`movepieces`).value;
		const choices = new MessageActionRow()
		.addComponents([
			new MessageButton()
			.setCustomID(`accept`)
			.setEmoji(`✔️`)
			.setStyle(`SUCCESS`)
		],[
			new MessageButton()
			.setCustomID(`decline`)
			.setEmoji(`✖️`)
			.setStyle(`DANGER`)
		])
		interaction.reply({content: `${playerTwo}, ${interaction.user} has invited you to play tic tac toe. Do you accept?`, components: [choices]})
		.catch((err) => {
			console.error(err)
			interaction.user.send({content: `Something went wrong\nI might not have permission to speak here`})
			.catch(console.error)
		})
	});
	
	const button = (ID) => {return new MessageButton().setCustomID(ID).setEmoji(`<:ras:741303046574702652>`).setStyle(`SECONDARY`)}
	
	const row1 = new MessageActionRow().addComponents([button(`TTT1`), button(`TTT2`), button(`TTT3`)]);
	const row2 = new MessageActionRow().addComponents([button(`TTT4`), button(`TTT5`), button(`TTT6`)]);
	const row3 = new MessageActionRow().addComponents([button(`TTT7`), button(`TTT8`), button(`TTT9`)]);
	
	startingGrid = [row1, row2, row3];
	
	interaction.client.on(`interactionCreate`, (buttonInteraction) => {
		if(buttonInteraction.isButton()){
			/** @type {ButtonInteraction} */
			const BInteraction = buttonInteraction;
			switch(BInteraction.customID){
				//================================================================================================================
				case `accept`:
				
				if(BInteraction.user.id == BInteraction.message.mentions.users.first().id){
					/** @type {User[]} */
					const players = [BInteraction.message.mentions.users.first(), BInteraction.message.mentions.users.last()]
					const randomNumber = Math.round(Math.random())
					const randomOrder = [players[randomNumber], players[1-randomNumber]]
					
					BInteraction.update({components: []})
					.then(() => {
						BInteraction.editReply({content: `(no alternate rules) ${randomOrder[0]} is starting. ${randomOrder[1]} Please wait until your turn.`, components: startingGrid})
						.catch(console.error)
					})
					.catch((err) => {
						console.error(err)
						BInteraction.user.send({content: `Something went horribly wrong`})
						.catch(console.error)
					})
				} else {
					BInteraction.reply({content: `Sorry, but you can't do that`, ephemeral: true})
					.catch(console.error)
				}
				break;
				//================================================================================================================
				case `decline`:
				if(BInteraction.user.id == BInteraction.message.mentions.users.first().id){
					BInteraction.update({content: `The request was declined`, components: []})
					.catch(console.error)
				} else {
					BInteraction.reply({content: `Sorry, but you can't do that`, ephemeral: true})
					.catch(console.error)
				}
				break;
				//================================================================================================================
				default:
				if(BInteraction.customID.startsWith(`TTT`)){
					/** @type {User[]} */
					BInteraction.guild.members.fetch(BInteraction.message.content.split(` `)[3].replace(`<@`, ``).replace(`>`, ``).replace(`!`, ``), BInteraction.message.content.split(` `)[6].replace(`<@`, ``).replace(`>`, ``).replace(`!`, ``)).then(() => {
						const players = [BInteraction.guild.members.cache.get(BInteraction.message.content.split(` `)[3].replace(`<@`, ``).replace(`>`, ``).replace(`!`, ``)), BInteraction.guild.members.cache.get(BInteraction.message.content.split(` `)[6].replace(`<@`, ``).replace(`>`, ``).replace(`!`, ``))]
						const movePieces = !(BInteraction.message.content.includes(`no`))
						/** @type {MessageActionRow[]} */
						const rows = BInteraction.message.components
						/** @type {MessageButton[]} */
						let buttons = []
						let O = 0
						let X = 0
						
						rows.forEach((row) => {
							row.components.forEach((button) => {
								buttons.push(button)
							})
						})
						
						buttons.forEach((button) => {
							switch(button.emoji.name){
								case `⭕`:
								O++
								break;
								case `❌`:
								X++
								break;
								default:
								break;
							}
						})
						if(BInteraction.user.id == players[0].id){
							if(BInteraction.component.emoji.id == `741303046574702652`){
								const style = `SECONDARY`
								/** @type {Message} */
								const BM = BInteraction.message
								
								/**
								* @param {Number} row 
								* @param {Number} collumn 
								* @returns
								*/
								if(!movePieces){
									const newButton = (row, collumn) => {
										return new MessageButton().setCustomID(BM.components[row].components[collumn].customID).setEmoji(BM.components[row].components[collumn].emoji).setStyle(style)
									}
									/**
									* @param {Number} row 
									* @param {Number} collumn 
									* @returns
									*/
									const newCheckedButton = (row, collumn, emoji) => {
										return new MessageButton().setCustomID(BM.components[row].components[collumn].customID).setEmoji(emoji).setStyle(style)
									}
									
									let row1 = new MessageActionRow().addComponents([newButton(0, 0), newButton(0, 1), newButton(0, 2)]);
									let row2 = new MessageActionRow().addComponents([newButton(1, 0), newButton(1, 1), newButton(1, 2)]);
									let row3 = new MessageActionRow().addComponents([newButton(2, 0), newButton(2, 1), newButton(2, 2)]);
									
									if(X > O){
										const emoji = `⭕`
										switch(BInteraction.customID){
											case `TTT1`:
											row1 = new MessageActionRow()
											.addComponents([newCheckedButton(0, 0, emoji), newButton(0, 1), newButton(0, 2)])
											break;
											case `TTT2`:
											row1 = new MessageActionRow()
											.addComponents([newButton(0, 0), newCheckedButton(0, 1, emoji), newButton(0, 2)])
											break;
											case `TTT3`:
											row1 = new MessageActionRow()
											.addComponents([newButton(0, 0), newButton(0, 1), newCheckedButton(0, 2, emoji)])
											break;
											case `TTT4`:
											row2 = new MessageActionRow()
											.addComponents([newCheckedButton(1, 0, emoji), newButton(1, 1), newButton(1, 2)])
											break;
											case `TTT5`:
											row2 = new MessageActionRow()
											.addComponents([newButton(1, 0), newCheckedButton(1, 1, emoji), newButton(1, 2)])
											break;
											case `TTT6`:
											row2 = new MessageActionRow()
											.addComponents([newButton(1, 0), newButton(1, 1), newCheckedButton(1, 2, emoji)])
											break;
											case `TTT7`:
											row3 = new MessageActionRow()
											.addComponents([newCheckedButton(2, 0, emoji), newButton(2, 1), newButton(2, 2)])
											break;
											case `TTT8`:
											row3 = new MessageActionRow()
											.addComponents([newButton(2, 0), newCheckedButton(2, 1, emoji), newButton(2, 2)])
											break;
											case `TTT9`:
											row3 = new MessageActionRow()
											.addComponents([newButton(2, 0), newButton(2, 1), newCheckedButton(2, 2, emoji)])
											break;
											default:
											break;
										}
									} else {
										const emoji = `❌`
										switch(BInteraction.customID){
											case `TTT1`:
											row1 = new MessageActionRow()
											.addComponents([newCheckedButton(0, 0, emoji), newButton(0, 1), newButton(0, 2)])
											break;
											case `TTT2`:
											row1 = new MessageActionRow()
											.addComponents([newButton(0, 0), newCheckedButton(0, 1, emoji), newButton(0, 2)])
											break;
											case `TTT3`:
											row1 = new MessageActionRow()
											.addComponents([newButton(0, 0), newButton(0, 1), newCheckedButton(0, 2, emoji)])
											break;
											case `TTT4`:
											row2 = new MessageActionRow()
											.addComponents([newCheckedButton(1, 0, emoji), newButton(1, 1), newButton(1, 2)])
											break;
											case `TTT5`:
											row2 = new MessageActionRow()
											.addComponents([newButton(1, 0), newCheckedButton(1, 1, emoji), newButton(1, 2)])
											break;
											case `TTT6`:
											row2 = new MessageActionRow()
											.addComponents([newButton(1, 0), newButton(1, 1), newCheckedButton(1, 2, emoji)])
											break;
											case `TTT7`:
											row3 = new MessageActionRow()
											.addComponents([newCheckedButton(2, 0, emoji), newButton(2, 1), newButton(2, 2)])
											break;
											case `TTT8`:
											row3 = new MessageActionRow()
											.addComponents([newButton(2, 0), newCheckedButton(2, 1, emoji), newButton(2, 2)])
											break;
											case `TTT9`:
											row3 = new MessageActionRow()
											.addComponents([newButton(2, 0), newButton(2, 1), newCheckedButton(2, 2, emoji)])
											break;
											default:
											break;
										}
									}
									const newButtons = [row1, row2, row3]
									/** @type {[String, String, String][]} */
									let buttonArray = [];
									/**
									* 
									* @param {MessageActionRow[]} rows 
									*/
									const winBoard = (rows) => {
										rows.forEach((row) => {
											row.components.forEach((button) => {
												buttonArray.push(button.emoji.name)
											})
										})
										if(buttonArray[0] != `ras` || buttonArray[4] != `ras` || buttonArray[8] != `ras`){
											return (buttonArray[0] == `❌` && buttonArray[1] == `❌` && buttonArray[2] == `❌`) ||
											(buttonArray[0] == `❌` && buttonArray[3] == `❌` && buttonArray[6] == `❌`) ||
											(buttonArray[8] == `❌` && buttonArray[7] == `❌` && buttonArray[6] == `❌`) ||
											(buttonArray[8] == `❌` && buttonArray[5] == `❌` && buttonArray[2] == `❌`) ||
											(buttonArray[4] == `❌` && buttonArray[0] == `❌` && buttonArray[8] == `❌`) ||
											(buttonArray[4] == `❌` && buttonArray[1] == `❌` && buttonArray[7] == `❌`) ||
											(buttonArray[4] == `❌` && buttonArray[2] == `❌` && buttonArray[6] == `❌`) ||
											(buttonArray[4] == `❌` && buttonArray[3] == `❌` && buttonArray[5] == `❌`) ||
											(buttonArray[0] == `⭕` && buttonArray[1] == `⭕` && buttonArray[2] == `⭕`) ||
											(buttonArray[0] == `⭕` && buttonArray[3] == `⭕` && buttonArray[6] == `⭕`) ||
											(buttonArray[8] == `⭕` && buttonArray[7] == `⭕` && buttonArray[6] == `⭕`) ||
											(buttonArray[8] == `⭕` && buttonArray[5] == `⭕` && buttonArray[2] == `⭕`) ||
											(buttonArray[4] == `⭕` && buttonArray[0] == `⭕` && buttonArray[8] == `⭕`) ||
											(buttonArray[4] == `⭕` && buttonArray[1] == `⭕` && buttonArray[7] == `⭕`) ||
											(buttonArray[4] == `⭕` && buttonArray[2] == `⭕` && buttonArray[6] == `⭕`) ||
											(buttonArray[4] == `⭕` && buttonArray[3] == `⭕` && buttonArray[5] == `⭕`)
										}
									}
									if(!winBoard(newButtons)){
										if(buttonArray.indexOf(`ras`) >= 0){
											BInteraction.update({components: []})
											.then(() => {
												BInteraction.editReply({content: `(no alternate rules) ${players[1]} is playing. ${players[0]} Please wait until your turn.`, components: newButtons})
												.catch(console.error);
											})
											.catch(console.error)
										} else {
											BInteraction.update({content: `Looks like it ended in a tie\n${buttonArray[0].replace(`ras`, `▫️`)}${buttonArray[1].replace(`ras`, `▫️`)}${buttonArray[2].replace(`ras`, `▫️`)}\n${buttonArray[3].replace(`ras`, `▫️`)}${buttonArray[4].replace(`ras`, `▫️`)}${buttonArray[5].replace(`ras`, `▫️`)}\n${buttonArray[6].replace(`ras`, `▫️`)}${buttonArray[7].replace(`ras`, `▫️`)}${buttonArray[8].replace(`ras`, `▫️`)}`, components: []})
											.catch(console.error)
										}
									} else {
										BInteraction.update({content: `${players[0]} won!\n${buttonArray[0].replace(`ras`, `▫️`)}${buttonArray[1].replace(`ras`, `▫️`)}${buttonArray[2].replace(`ras`, `▫️`)}\n${buttonArray[3].replace(`ras`, `▫️`)}${buttonArray[4].replace(`ras`, `▫️`)}${buttonArray[5].replace(`ras`, `▫️`)}\n${buttonArray[6].replace(`ras`, `▫️`)}${buttonArray[7].replace(`ras`, `▫️`)}${buttonArray[8].replace(`ras`, `▫️`)}`, components: []})
										.catch(console.error)
									}
								} else {
									BInteraction.update({content: `this mode has not been added yet. Please set the movepieces parameter to false instead`});
								}
							} else {
								BInteraction.reply({content: `Sorry, but you can't do that`, ephemeral: true})
								.catch(console.error)
							}
						} else {
							BInteraction.reply({content: `Sorry, but you can't do that`, ephemeral: true})
							.catch(console.error)
						}
					})
					.catch(console.error)
					break;
				}
			}
		}
	})
}
module.exports = ticTacToe;