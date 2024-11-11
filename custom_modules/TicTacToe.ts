//#region imports
import {CommandInteraction, User, ButtonBuilder, ActionRowBuilder, ButtonInteraction, Message, MessageMentions, UserResolvable, EmojiIdentifierResolvable, ButtonStyle, APIActionRowComponent, ComponentType, ButtonComponent, ComponentEmojiResolvable, APIButtonComponentWithCustomId} from "discord.js";
//#endregion

//#region tic tac toe game
export const ticTacToe = (
	inObjs: {
		interaction: CommandInteraction
	}[]
):void => {
	inObjs.forEach((inObj) => {
		inObj.interaction.guild?.members.fetch(inObj.interaction.options.get(`playertwo`)?.user ?? ``).then((playerTwo):void => {
			const choices = new ActionRowBuilder()
				.addComponents(
					new ButtonBuilder()
						.setCustomId(`accept`)
						.setEmoji(`✔️`)
						.setStyle(ButtonStyle.Success),
					new ButtonBuilder()
						.setCustomId(`decline`)
						.setEmoji(`✖️`)
						.setStyle(ButtonStyle.Danger)
				).toJSON() as APIActionRowComponent<APIButtonComponentWithCustomId>;
			inObj.interaction.reply({
				content: `<@${
					playerTwo.id
				}>, <@${
					inObj.interaction.user.id
				}> has invited you to play tic tac toe. Do you accept?`,
				components: [
					choices
				]
			})
				.catch((err: unknown):void => {
					console.error(err);
					inObj.interaction.user.send({
						content: `Something went wrong\nI might not have permission to speak here`
					})
						.catch((err: unknown) => {console.error(err)});
				});
		})
			.catch((err: unknown) => {console.error(err)});
	
		const button = (ID: string):ButtonBuilder => {
			return new ButtonBuilder().setCustomId(ID).setEmoji(`<:ras:741303046574702652>`).setStyle(ButtonStyle.Secondary);
		};
	
		const row1 = new ActionRowBuilder().addComponents(
			button(`TTT1`),
			button(`TTT2`),
			button(`TTT3`)
		).toJSON() as APIActionRowComponent<APIButtonComponentWithCustomId>;
		const row2 = new ActionRowBuilder().addComponents(
			button(`TTT4`),
			button(`TTT5`),
			button(`TTT6`)
		).toJSON() as APIActionRowComponent<APIButtonComponentWithCustomId>;
		const row3 = new ActionRowBuilder().addComponents(
			button(`TTT7`),
			button(`TTT8`),
			button(`TTT9`)
		).toJSON() as APIActionRowComponent<APIButtonComponentWithCustomId>;
	
		const startingGrid = [
			row1,
			row2,
			row3
		];
	
		inObj.interaction.client.on(`interactionCreate`, (interaction):void => {
			const buttonInteraction = interaction as ButtonInteraction;
			const mentions = buttonInteraction.message.mentions;
			const memberMentions = mentions.members;
			const firstMemberMention = memberMentions?.first();
			const lastMemberMention = memberMentions?.last();
			const buttonGuild = buttonInteraction.guild;
			if (buttonInteraction.message.mentions instanceof MessageMentions) {
				switch (buttonInteraction.customId) {
				//================================================================================================================
				case `accept`:
					if (buttonInteraction.user.id == firstMemberMention?.id && lastMemberMention?.user) {
						console.log(buttonInteraction.user);
						console.log(firstMemberMention);
						const players:[
							User,
							User
						] = [
							firstMemberMention.user,
							lastMemberMention.user
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
										randomOrder[0].id
									}> is starting. <@${
										randomOrder[1].id
									}> Please wait until your turn.`,
									components: startingGrid
								})
									.catch((err: unknown) => {console.error(err)});
							})
							.catch((err: unknown):void => {
								console.error(err);
								buttonInteraction.user.send({
									content: `Something went horribly wrong`
								})
									.catch((err: unknown) => {console.error(err)});
							});
					}
					else {
						buttonInteraction.reply({
							content: `Sorry, but you can't do that`,
							ephemeral: true
						})
							.catch((err: unknown) => {console.error(err)});
					}
					break;
				//================================================================================================================
				case `decline`:
					if (buttonInteraction.user.id == firstMemberMention?.user.id) {
						buttonInteraction.update({
							content: `The request was declined`,
							components: []
						})
							.catch((err: unknown) => {console.error(err)});
					}
					else {
						buttonInteraction.reply({
							content: `Sorry, but you can't do that`,
							ephemeral: true
						})
							.catch((err: unknown) => {console.error(err)});
					}
					break;
				//================================================================================================================
				default:
					if (buttonInteraction.customId.startsWith(`TTT`)) {
						buttonGuild?.members.fetch(buttonInteraction.message.content.split(` `)[3].replace(`<@`, ``).replace(`>`, ``).replace(`!`, ``) as UserResolvable)
							.then(():void => {
								void buttonGuild.members.fetch(buttonInteraction.message.content.split(` `)[6].replace(`<@`, ``).replace(`>`, ``).replace(`!`, ``) as UserResolvable);
							})
							.catch((err: unknown) => {console.error(err)})
							.then(():void => {
								const players:[
									{id: string},
									{id: string}
								] = [
									buttonGuild.members.cache.get(buttonInteraction.message.content.split(` `)[3].replace(`<@`, ``).replace(`>`, ``).replace(`!`, ``) as `${bigint}`) ?? {id: ``},
									buttonGuild.members.cache.get(buttonInteraction.message.content.split(` `)[6].replace(`<@`, ``).replace(`>`, ``).replace(`!`, ``) as `${bigint}`) ?? {id: ``}
								];
								const movePieces = !(buttonInteraction.message.content.includes(`no`));
								const rows = buttonInteraction.message.components;
								const buttons:ButtonComponent[] = [];
								let O = 0;
								let X = 0;
						
								rows.forEach((row):void => {
									row.components.forEach((component):void => {
										if (component.type == ComponentType.Button) {
											buttons.push(component);
										}
									});
								});
						
								buttons.forEach((button):void => {
									if (button.emoji != null) {
										switch (button.emoji.name) {
										case `⭕`:
											O++;
											break;
										case `❌`:
											X++;
											break;
										default:
											break;
										}
									}
								});
								if (buttonInteraction.user.id == players[0].id && buttonInteraction.component instanceof ButtonComponent) {
									if (buttonInteraction.component.emoji != null) {
										if (buttonInteraction.component.emoji.id == `741303046574702652`) {
											const style:ButtonStyle = ButtonStyle.Secondary;
											const BM:Message = buttonInteraction.message;
								
											if (!movePieces) {
												const newButton = (row: number, collumn: number):ButtonBuilder => {
													const messageButton:ButtonComponent = BM.components[row].components[collumn] as ButtonComponent;
													return new ButtonBuilder().setCustomId(messageButton.customId ?? ``).setEmoji(messageButton.emoji?.id ?? ``).setStyle(style);
												};
												const newCheckedButton = (row: number, collumn: number, emoji: ComponentEmojiResolvable):ButtonBuilder => {
													const messageButton:ButtonComponent = BM.components[row].components[collumn] as ButtonComponent;
													return new ButtonBuilder().setCustomId(messageButton.customId ?? ``).setEmoji(emoji).setStyle(style);
												};
									
												let row1 = new ActionRowBuilder().addComponents(
													newButton(0, 0),
													newButton(0, 1),
													newButton(0, 2)
												).toJSON() as APIActionRowComponent<APIButtonComponentWithCustomId>;
												let row2 = new ActionRowBuilder().addComponents(
													newButton(1, 0),
													newButton(1, 1),
													newButton(1, 2)
												).toJSON() as APIActionRowComponent<APIButtonComponentWithCustomId>;
												let row3 = new ActionRowBuilder().addComponents(
													newButton(2, 0),
													newButton(2, 1),
													newButton(2, 2)
												).toJSON() as APIActionRowComponent<APIButtonComponentWithCustomId>;
									
												if (X > O) {
													const emoji:EmojiIdentifierResolvable = `⭕`;
													switch (buttonInteraction.customId) {
													case `TTT1`:
														row1 = new ActionRowBuilder()
															.addComponents([
																newCheckedButton(0, 0, emoji),
																newButton(0, 1),
																newButton(0, 2)
															]).toJSON() as APIActionRowComponent<APIButtonComponentWithCustomId>;
														break;
													case `TTT2`:
														row1 = new ActionRowBuilder()
															.addComponents([
																newButton(0, 0),
																newCheckedButton(0, 1, emoji),
																newButton(0, 2)
															]).toJSON() as APIActionRowComponent<APIButtonComponentWithCustomId>;
														break;
													case `TTT3`:
														row1 = new ActionRowBuilder()
															.addComponents([
																newButton(0, 0),
																newButton(0, 1),
																newCheckedButton(0, 2, emoji)
															]).toJSON() as APIActionRowComponent<APIButtonComponentWithCustomId>;
														break;
													case `TTT4`:
														row2 = new ActionRowBuilder()
															.addComponents([
																newCheckedButton(1, 0, emoji),
																newButton(1, 1),
																newButton(1, 2)
															]).toJSON() as APIActionRowComponent<APIButtonComponentWithCustomId>;
														break;
													case `TTT5`:
														row2 = new ActionRowBuilder()
															.addComponents([
																newButton(1, 0),
																newCheckedButton(1, 1, emoji),
																newButton(1, 2)
															]).toJSON() as APIActionRowComponent<APIButtonComponentWithCustomId>;
														break;
													case `TTT6`:
														row2 = new ActionRowBuilder()
															.addComponents([
																newButton(1, 0),
																newButton(1, 1),
																newCheckedButton(1, 2, emoji)
															]).toJSON() as APIActionRowComponent<APIButtonComponentWithCustomId>;
														break;
													case `TTT7`:
														row3 = new ActionRowBuilder()
															.addComponents([
																newCheckedButton(2, 0, emoji),
																newButton(2, 1),
																newButton(2, 2)
															]).toJSON() as APIActionRowComponent<APIButtonComponentWithCustomId>;
														break;
													case `TTT8`:
														row3 = new ActionRowBuilder()
															.addComponents([
																newButton(2, 0),
																newCheckedButton(2, 1, emoji),
																newButton(2, 2)
															]).toJSON() as APIActionRowComponent<APIButtonComponentWithCustomId>;
														break;
													case `TTT9`:
														row3 = new ActionRowBuilder()
															.addComponents([
																newButton(2, 0),
																newButton(2, 1),
																newCheckedButton(2, 2, emoji)
															]).toJSON() as APIActionRowComponent<APIButtonComponentWithCustomId>;
														break;
													default:
														break;
													}
												}
												else {
													const emoji:EmojiIdentifierResolvable = `❌`;
													switch (buttonInteraction.customId) {
													case `TTT1`:
														row1 = new ActionRowBuilder()
															.addComponents([
																newCheckedButton(0, 0, emoji),
																newButton(0, 1),
																newButton(0, 2)
															]).toJSON() as APIActionRowComponent<APIButtonComponentWithCustomId>;
														break;
													case `TTT2`:
														row1 = new ActionRowBuilder()
															.addComponents([
																newButton(0, 0),
																newCheckedButton(0, 1, emoji),
																newButton(0, 2)
															]).toJSON() as APIActionRowComponent<APIButtonComponentWithCustomId>;
														break;
													case `TTT3`:
														row1 = new ActionRowBuilder()
															.addComponents([
																newButton(0, 0),
																newButton(0, 1),
																newCheckedButton(0, 2, emoji)
															]).toJSON() as APIActionRowComponent<APIButtonComponentWithCustomId>;
														break;
													case `TTT4`:
														row2 = new ActionRowBuilder()
															.addComponents([
																newCheckedButton(1, 0, emoji),
																newButton(1, 1),
																newButton(1, 2)
															]).toJSON() as APIActionRowComponent<APIButtonComponentWithCustomId>;
														break;
													case `TTT5`:
														row2 = new ActionRowBuilder()
															.addComponents([
																newButton(1, 0),
																newCheckedButton(1, 1, emoji),
																newButton(1, 2)
															]).toJSON() as APIActionRowComponent<APIButtonComponentWithCustomId>;
														break;
													case `TTT6`:
														row2 = new ActionRowBuilder()
															.addComponents([
																newButton(1, 0),
																newButton(1, 1),
																newCheckedButton(1, 2, emoji)
															]).toJSON() as APIActionRowComponent<APIButtonComponentWithCustomId>;
														break;
													case `TTT7`:
														row3 = new ActionRowBuilder()
															.addComponents([
																newCheckedButton(2, 0, emoji),
																newButton(2, 1),
																newButton(2, 2)
															]).toJSON() as APIActionRowComponent<APIButtonComponentWithCustomId>;
														break;
													case `TTT8`:
														row3 = new ActionRowBuilder()
															.addComponents([
																newButton(2, 0),
																newCheckedButton(2, 1, emoji),
																newButton(2, 2)
															]).toJSON() as APIActionRowComponent<APIButtonComponentWithCustomId>;
														break;
													case `TTT9`:
														row3 = new ActionRowBuilder()
															.addComponents([
																newButton(2, 0),
																newButton(2, 1),
																newCheckedButton(2, 2, emoji)
															]).toJSON() as APIActionRowComponent<APIButtonComponentWithCustomId>;
														break;
													default:
														break;
													}
												}
												const newButtons = [
													row1,
													row2,
													row3
												];
												const buttonArray:string[] = [];
												const winBoard = (rows: APIActionRowComponent<APIButtonComponentWithCustomId>[]):boolean => {
													rows.forEach((row):void => {
														row.components.forEach((button):void => {
															buttonArray.push(button.emoji?.name ?? ``);
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
													return false;
												};
												if (!winBoard(newButtons)) {
													if (buttonArray.includes(`ras`)) {
														buttonInteraction.update({
															components: []
														})
															.then(():void => {
																buttonInteraction.editReply({
																	content: `(no alternate rules) ${
																		players[1].id
																	} is playing. ${
																		players[0].id
																	} Please wait until your turn.`,
																	components: newButtons
																})
																	.catch((err: unknown) => {console.error(err)});
															})
															.catch((err: unknown) => {console.error(err)});
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
															.catch((err: unknown) => {console.error(err)});
													}
												}
												else {
													buttonInteraction.update({
														content: `<@${
															players[0].id
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
														.catch((err: unknown) => {console.error(err)});
												}
											}
											else {
												buttonInteraction.update({
													content: `this mode has not been added yet. Please set the movepieces parameter to false instead`
												})
													.catch((err: unknown) => {console.error(err)});
											}
										}
									}
									else {
										buttonInteraction.reply({
											content: `Sorry, but you can't do that`,
											ephemeral: true
										})
											.catch((err: unknown) => {console.error(err)});
									}
								}
								else {
									buttonInteraction.reply({
										content: `Sorry, but you can't do that`,
										ephemeral: true
									})
										.catch((err: unknown) => {console.error(err)});
								}
							})
							.catch((err: unknown) => {console.error(err)});
						break;
					}
				}
			}
		});
	});
};
//#endregion