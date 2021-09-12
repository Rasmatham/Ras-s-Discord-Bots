import {CommandInteraction, User, MessageButton, MessageActionRow, ButtonInteraction, Message, GuildMember, MessageMentions, UserResolvable, EmojiIdentifierResolvable, MessageButtonStyle} from "discord.js";
export const ticTacToe = (interaction: CommandInteraction):void => {
	interaction.guild.members.fetch(interaction.options.get(`playertwo`).user).then((playerTwo):void => {
		const choices:MessageActionRow = new MessageActionRow()
			.addComponents([
				new MessageButton()
					.setCustomId(`accept`)
					.setEmoji(`✔️`)
					.setStyle(`SUCCESS`)
			],
			[
				new MessageButton()
					.setCustomId(`decline`)
					.setEmoji(`✖️`)
					.setStyle(`DANGER`)
			]);
		interaction.reply({
			content: `<@${
				playerTwo
			}>, <@${
				interaction.user
			}> has invited you to play tic tac toe. Do you accept?`,
			components: [
				choices
			]
		})
			.catch((err):void => {
				console.error(err);
				interaction.user.send({
					content: `Something went wrong\nI might not have permission to speak here`
				})
					.catch(console.error);
			});
	})
		.catch(console.error);
	
	const button = (ID: string):MessageButton => {
		return new MessageButton().setCustomId(ID).setEmoji(`<:ras:741303046574702652>`).setStyle(`SECONDARY`);
	};
	
	const row1:MessageActionRow = new MessageActionRow().addComponents([
		button(`TTT1`),
		button(`TTT2`),
		button(`TTT3`)
	]);
	const row2:MessageActionRow = new MessageActionRow().addComponents([
		button(`TTT4`),
		button(`TTT5`),
		button(`TTT6`)
	]);
	const row3:MessageActionRow = new MessageActionRow().addComponents([
		button(`TTT7`),
		button(`TTT8`),
		button(`TTT9`)
	]);
	
	const startingGrid:MessageActionRow[] = [
		row1,
		row2,
		row3
	];
	
	interaction.client.on(`interactionCreate`, (buttonInteraction: ButtonInteraction):void => {
		if (buttonInteraction.message.mentions instanceof MessageMentions) {
			switch(buttonInteraction.customId) {
			//================================================================================================================
			case `accept`:
				if (buttonInteraction.user.id == buttonInteraction.message.mentions.members.first().id) {
					console.log(buttonInteraction.user);
					console.log(buttonInteraction.message.mentions.members.first());
					const players:[
						User,
						User
					] = [
						buttonInteraction.message.mentions.users.first(),
						buttonInteraction.message.mentions.users.last()
					];
					const randomNumber:number = Math.round(Math.random());
					const randomOrder:[
						User,
						User
					] = [
						players[randomNumber],
						players[1-randomNumber]
					];
					
					buttonInteraction.update({
						components: []
					})
						.then(():void => {
							buttonInteraction.editReply({
								content: `(no alternate rules) <@${
									randomOrder[0]
								}> is starting. <@${
									randomOrder[1]
								}> Please wait until your turn.`,
								components: startingGrid
							})
								.catch(console.error);
						})
						.catch((err):void => {
							console.error(err);
							buttonInteraction.user.send({
								content: `Something went horribly wrong`
							})
								.catch(console.error);
						});
				}
				else {
					buttonInteraction.reply({
						content: `Sorry, but you can't do that`,
						ephemeral: true
					})
						.catch(console.error);
				}
				break;
				//================================================================================================================
			case `decline`:
				if (buttonInteraction.user.id == buttonInteraction.message.mentions.users.first().id) {
					buttonInteraction.update({
						content: `The request was declined`,
						components: []
					})
						.catch(console.error);
				}
				else {
					buttonInteraction.reply({
						content: `Sorry, but you can't do that`,
						ephemeral: true
					})
						.catch(console.error);
				}
				break;
				//================================================================================================================
			default:
				if (buttonInteraction.customId.startsWith(`TTT`)) {
					buttonInteraction.guild.members.fetch(buttonInteraction.message.content.split(` `)[3].replace(`<@`, ``).replace(`>`, ``).replace(`!`, ``) as UserResolvable)
						.then(():void => {
							buttonInteraction.guild.members.fetch(buttonInteraction.message.content.split(` `)[6].replace(`<@`, ``).replace(`>`, ``).replace(`!`, ``) as UserResolvable);
						})
						.catch(console.error)
						.then(():void => {
							const players:[
								GuildMember,
								GuildMember
							] = [
								buttonInteraction.guild.members.cache.get(buttonInteraction.message.content.split(` `)[3].replace(`<@`, ``).replace(`>`, ``).replace(`!`, ``) as `${bigint}`),
								buttonInteraction.guild.members.cache.get(buttonInteraction.message.content.split(` `)[6].replace(`<@`, ``).replace(`>`, ``).replace(`!`, ``) as `${bigint}`)
							];
							const movePieces = !(buttonInteraction.message.content.includes(`no`));
							const rows:MessageActionRow[] = buttonInteraction.message.components as MessageActionRow[];
							const buttons:MessageButton[] = [];
							let O = 0;
							let X = 0;
						
							rows.forEach((row):void => {
								row.components.forEach((component):void => {
									if (component.type == `BUTTON`) {
										buttons.push(component);
									}
								});
							});
						
							buttons.forEach((button):void => {
								switch(button.emoji.name) {
								case `⭕`:
									O++;
									break;
								case `❌`:
									X++;
									break;
								default:
									break;
								}
							});
							if (buttonInteraction.user.id == players[0].id && buttonInteraction.component instanceof MessageButton) {
								if (buttonInteraction.component.emoji.id == `741303046574702652`) {
									const style:MessageButtonStyle = `SECONDARY`;
									const BM:Message = buttonInteraction.message as Message;
								
									if (!movePieces) {
										const newButton = (row: number, collumn: number):MessageButton => {
											const messageButton:MessageButton = BM.components[row].components[collumn] as MessageButton;
											return new MessageButton().setCustomId(messageButton.customId).setEmoji(messageButton.emoji.id).setStyle(style);
										};
										const newCheckedButton = (row: number, collumn: number, emoji: EmojiIdentifierResolvable):MessageButton => {
											const messageButton:MessageButton = BM.components[row].components[collumn] as MessageButton;
											return new MessageButton().setCustomId(messageButton.customId).setEmoji(emoji).setStyle(style);
										};
									
										let row1:MessageActionRow = new MessageActionRow().addComponents([
											newButton(0, 0),
											newButton(0, 1),
											newButton(0, 2)
										]);
										let row2:MessageActionRow = new MessageActionRow().addComponents([
											newButton(1, 0),
											newButton(1, 1),
											newButton(1, 2)
										]);
										let row3:MessageActionRow = new MessageActionRow().addComponents([
											newButton(2, 0),
											newButton(2, 1),
											newButton(2, 2)
										]);
									
										if (X > O) {
											const emoji:EmojiIdentifierResolvable = `⭕`;
											switch(buttonInteraction.customId) {
											case `TTT1`:
												row1 = new MessageActionRow()
													.addComponents([
														newCheckedButton(0, 0, emoji),
														newButton(0, 1),
														newButton(0, 2)
													]);
												break;
											case `TTT2`:
												row1 = new MessageActionRow()
													.addComponents([
														newButton(0, 0),
														newCheckedButton(0, 1, emoji),
														newButton(0, 2)
													]);
												break;
											case `TTT3`:
												row1 = new MessageActionRow()
													.addComponents([
														newButton(0, 0),
														newButton(0, 1),
														newCheckedButton(0, 2, emoji)
													]);
												break;
											case `TTT4`:
												row2 = new MessageActionRow()
													.addComponents([
														newCheckedButton(1, 0, emoji),
														newButton(1, 1),
														newButton(1, 2)
													]);
												break;
											case `TTT5`:
												row2 = new MessageActionRow()
													.addComponents([
														newButton(1, 0),
														newCheckedButton(1, 1, emoji),
														newButton(1, 2)
													]);
												break;
											case `TTT6`:
												row2 = new MessageActionRow()
													.addComponents([
														newButton(1, 0),
														newButton(1, 1),
														newCheckedButton(1, 2, emoji)
													]);
												break;
											case `TTT7`:
												row3 = new MessageActionRow()
													.addComponents([
														newCheckedButton(2, 0, emoji),
														newButton(2, 1),
														newButton(2, 2)
													]);
												break;
											case `TTT8`:
												row3 = new MessageActionRow()
													.addComponents([
														newButton(2, 0),
														newCheckedButton(2, 1, emoji),
														newButton(2, 2)
													]);
												break;
											case `TTT9`:
												row3 = new MessageActionRow()
													.addComponents([
														newButton(2, 0),
														newButton(2, 1),
														newCheckedButton(2, 2, emoji)
													]);
												break;
											default:
												break;
											}
										}
										else {
											const emoji:EmojiIdentifierResolvable = `❌`;
											switch(buttonInteraction.customId) {
											case `TTT1`:
												row1 = new MessageActionRow()
													.addComponents([
														newCheckedButton(0, 0, emoji),
														newButton(0, 1),
														newButton(0, 2)
													]);
												break;
											case `TTT2`:
												row1 = new MessageActionRow()
													.addComponents([
														newButton(0, 0),
														newCheckedButton(0, 1, emoji),
														newButton(0, 2)
													]);
												break;
											case `TTT3`:
												row1 = new MessageActionRow()
													.addComponents([
														newButton(0, 0),
														newButton(0, 1),
														newCheckedButton(0, 2, emoji)
													]);
												break;
											case `TTT4`:
												row2 = new MessageActionRow()
													.addComponents([
														newCheckedButton(1, 0, emoji),
														newButton(1, 1),
														newButton(1, 2)
													]);
												break;
											case `TTT5`:
												row2 = new MessageActionRow()
													.addComponents([
														newButton(1, 0),
														newCheckedButton(1, 1, emoji),
														newButton(1, 2)
													]);
												break;
											case `TTT6`:
												row2 = new MessageActionRow()
													.addComponents([
														newButton(1, 0),
														newButton(1, 1),
														newCheckedButton(1, 2, emoji)
													]);
												break;
											case `TTT7`:
												row3 = new MessageActionRow()
													.addComponents([
														newCheckedButton(2, 0, emoji),
														newButton(2, 1),
														newButton(2, 2)
													]);
												break;
											case `TTT8`:
												row3 = new MessageActionRow()
													.addComponents([
														newButton(2, 0),
														newCheckedButton(2, 1, emoji),
														newButton(2, 2)
													]);
												break;
											case `TTT9`:
												row3 = new MessageActionRow()
													.addComponents([
														newButton(2, 0),
														newButton(2, 1),
														newCheckedButton(2, 2, emoji)
													]);
												break;
											default:
												break;
											}
										}
										const newButtons:MessageActionRow[] = [
											row1,
											row2,
											row3
										];
										const buttonArray:string[] = [];
										const winBoard = (rows: MessageActionRow[]):boolean => {
											rows.forEach((row):void => {
												row.components.forEach((button: MessageButton):void => {
													buttonArray.push(button.emoji.name);
												});
											});
											if (buttonArray[0] != `ras` || buttonArray[4] != `ras` || buttonArray[8] != `ras`) {
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
													(buttonArray[4] == `⭕` && buttonArray[3] == `⭕` && buttonArray[5] == `⭕`);
											}
										};
										if (!winBoard(newButtons)) {
											if (buttonArray.indexOf(`ras`) >= 0) {
												buttonInteraction.update({
													components: []
												})
													.then(():void => {
														buttonInteraction.editReply({
															content: `(no alternate rules) ${
																players[1]
															} is playing. ${
																players[0]
															} Please wait until your turn.`,
															components: newButtons
														})
															.catch(console.error);
													})
													.catch(console.error);
											}
											else {
												buttonInteraction.update({
													content: `Looks like it ended in a tie\n${
														buttonArray[0].replace(`ras`, `▫️`)
													}${
														buttonArray[1].replace(`ras`, `▫️`)
													}${
														buttonArray[2].replace(`ras`, `▫️`)
													}\n${
														buttonArray[3].replace(`ras`, `▫️`)
													}${
														buttonArray[4].replace(`ras`, `▫️`)
													}${
														buttonArray[5].replace(`ras`, `▫️`)
													}\n${
														buttonArray[6].replace(`ras`, `▫️`)
													}${
														buttonArray[7].replace(`ras`, `▫️`)
													}${
														buttonArray[8].replace(`ras`, `▫️`)
													}`,
													components: []
												})
													.catch(console.error);
											}
										}
										else {
											buttonInteraction.update({
												content: `<@${
													players[0]
												}> won!\n${
													buttonArray[0].replace(`ras`, `▫️`)
												}${
													buttonArray[1].replace(`ras`, `▫️`)
												}${
													buttonArray[2].replace(`ras`, `▫️`)
												}\n${
													buttonArray[3].replace(`ras`, `▫️`)
												}${
													buttonArray[4].replace(`ras`, `▫️`)
												}${
													buttonArray[5].replace(`ras`, `▫️`)
												}\n${
													buttonArray[6].replace(`ras`, `▫️`)
												}${
													buttonArray[7].replace(`ras`, `▫️`)
												}${
													buttonArray[8].replace(`ras`, `▫️`)
												}`,
												components: []
											})
												.catch(console.error);
										}
									}
									else {
										buttonInteraction.update({
											content: `this mode has not been added yet. Please set the movepieces parameter to false instead`
										})
											.catch(console.error);
									}
								}
								else {
									buttonInteraction.reply({
										content: `Sorry, but you can't do that`,
										ephemeral: true
									})
										.catch(console.error);
								}
							}
							else {
								buttonInteraction.reply({
									content: `Sorry, but you can't do that`,
									ephemeral: true
								})
									.catch(console.error);
							}
						})
						.catch(console.error);
					break;
				}
			}
		}
	});
};