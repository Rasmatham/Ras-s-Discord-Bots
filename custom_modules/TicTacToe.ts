//#region imports
import { APIButtonComponentWithCustomId, ActionRowBuilder, ButtonBuilder, ButtonComponent, ButtonInteraction, ButtonStyle, CommandInteraction, ComponentEmojiResolvable, ComponentType, EmojiIdentifierResolvable, Events, MessageMentions, User, UserResolvable } from "discord.js";
import { ephemeral, genericCatch } from "./generalUse";
//#endregion

//#region tic tac toe game
export const ticTacToe = (inObjs: { interaction: CommandInteraction }[]) => {
	inObjs.forEach((inObj) => {
		inObj.interaction.guild?.members.fetch(inObj.interaction.options.get(`playertwo`)?.user ?? ``).then((playerTwo) => {
			const choices = new ActionRowBuilder<ButtonBuilder>()
				.addComponents([
					new ButtonBuilder()
						.setCustomId(`accept`)
						.setEmoji(`✔️`)
						.setStyle(ButtonStyle.Success),
					new ButtonBuilder()
						.setCustomId(`decline`)
						.setEmoji(`✖️`)
						.setStyle(ButtonStyle.Danger)
				]);
			inObj.interaction.reply({
				components: [choices],
				content: `<@${playerTwo.id}>, <@${inObj.interaction.user.id}> has invited you to play tic tac toe. Do you accept?`
			}).catch((err: unknown) => {
				console.error(err);
				inObj.interaction.user.send({ content: `Something went wrong\nI might not have permission to speak here` }).catch(genericCatch);
			});
		}).catch(genericCatch);
	
		const rasButton = (ID: string) => new ButtonBuilder().setCustomId(ID).setEmoji(`<:ras:741303046574702652>`).setStyle(ButtonStyle.Secondary);
	
		// eslint-disable-next-line one-var
		const startingGrid = [
			new ActionRowBuilder<ButtonBuilder>()
				.addComponents([
					rasButton(`TTT1`),
					rasButton(`TTT2`),
					rasButton(`TTT3`)
				]),
			new ActionRowBuilder<ButtonBuilder>()
				.addComponents([
					rasButton(`TTT4`),
					rasButton(`TTT5`),
					rasButton(`TTT6`)
				]),
			new ActionRowBuilder<ButtonBuilder>()
				.addComponents([
					rasButton(`TTT7`),
					rasButton(`TTT8`),
					rasButton(`TTT9`)
				])
		];
	
		inObj.interaction.client.on(Events.InteractionCreate, (interaction) => {
			/* eslint-disable sort-vars */
			const buttonInteraction = interaction as ButtonInteraction,
			{ mentions } = buttonInteraction.message,
			memberMentions = mentions.members,
			firstMemberMention = memberMentions?.first(),
			lastMemberMention = memberMentions?.last(),
			buttonGuild = buttonInteraction.guild;
			/* eslint-enable sort-vars */
			if (buttonInteraction.message.mentions instanceof MessageMentions) {
				switch (buttonInteraction.customId) {
					//================================================================================================================
					case `accept`:
						if (buttonInteraction.user.id === firstMemberMention?.id && lastMemberMention?.user) {
							const players:[ User, User ] = [ firstMemberMention.user, lastMemberMention.user ],
							randomNumber:number = Math.round(Math.random()),
							randomOrder:[ User, User ] = [ players[randomNumber], players[1-randomNumber] ];
						
							buttonInteraction.update({ components: [] }).then(() => {
								buttonInteraction.editReply({
									components: startingGrid,
									content: `(no alternate rules) <@${randomOrder[0].id}> is starting. <@${randomOrder[1].id}> Please wait until your turn.`
								}).catch(genericCatch);
							}).catch((err: unknown) => {
								console.error(err);
								buttonInteraction.user.send({ content: `Something went horribly wrong` }).catch(genericCatch);
							});
						}
						else
							buttonInteraction.reply({ content: `Sorry, but you can't do that`, ephemeral }).catch(genericCatch);
						break;
					//================================================================================================================
					case `decline`:
						if (buttonInteraction.user.id === firstMemberMention?.user.id)
							buttonInteraction.update({ components: [], content: `The request was declined` }).catch(genericCatch);
						else
							buttonInteraction.reply({ content: `Sorry, but you can't do that`, ephemeral }).catch(genericCatch);
						break;
					//================================================================================================================
					default:
						if (buttonInteraction.customId.startsWith(`TTT`)) {
							buttonGuild?.members.fetch(buttonInteraction.message.content.split(` `)[3].replace(/<@!?(?=\d*)|(?<=\d*)>/gu, ``) as UserResolvable).then(() => {
								buttonGuild.members.fetch(buttonInteraction.message.content.split(` `)[6].replace(/<@!?(?=\d*)|(?<=\d*)>/gu, ``) as UserResolvable).catch(genericCatch);
							}).then(() => {
								const buttons:ButtonComponent[] = [],
								movePieces = !(buttonInteraction.message.content.includes(`no`)),
								players:[ { id: string }, { id: string } ] = [
									buttonGuild.members.cache.get(buttonInteraction.message.content.split(` `)[3].replace(/<@!?(?=\d*)|(?<=\d*)>/gu, ``) as `${bigint}`) ?? { id: `` },
									buttonGuild.members.cache.get(buttonInteraction.message.content.split(` `)[6].replace(/<@!?(?=\d*)|(?<=\d*)>/gu, ``) as `${bigint}`) ?? { id: `` }
								];
								// eslint-disable-next-line id-length
								let O = 0, X = 0;
							
								buttonInteraction.message.components.forEach((row) => {
									row.components.forEach((component) => {
										if (component.type === ComponentType.Button)
											buttons.push(component);
									});
								});
						
								buttons.forEach((button) => {
									if (button.emoji !== null) {
										switch (button.emoji.name) {
										case `⭕`:
											O += 1;
											break;
										case `❌`:
											X += 1;
											break;
										default:
											break;
										}
									}
								});
								if (buttonInteraction.user.id === players[0].id && buttonInteraction.component instanceof ButtonComponent) {
									if (buttonInteraction.component.emoji === null)
										buttonInteraction.reply({ content: `Sorry, but you can't do that`, ephemeral }).catch(genericCatch);
									else if (buttonInteraction.component.emoji.id === `741303046574702652`) {
										const BM = buttonInteraction.message, style = ButtonStyle.Secondary;
								
										if (movePieces)
											buttonInteraction.update({ content: `this mode has not been added yet. Please set the movepieces parameter to false instead` }).catch(genericCatch);
										else {
											const newButton = (row: number, collumn: number):ButtonBuilder => {
												const messageButton:ButtonComponent = BM.components[row].components[collumn] as ButtonComponent;
												return new ButtonBuilder().setCustomId(messageButton.customId ?? ``).setEmoji(messageButton.emoji?.id ?? ``).setStyle(style);
											},
											newCheckedButton = (row: number, collumn: number, emoji: ComponentEmojiResolvable):ButtonBuilder => {
												const messageButton:ButtonComponent = BM.components[row].components[collumn] as ButtonComponent;
												return new ButtonBuilder().setCustomId(messageButton.customId ?? ``).setEmoji(emoji).setStyle(style);
											};
								
											let row1 = new ActionRowBuilder<ButtonBuilder>().addComponents([ newButton(0, 0), newButton(0, 1), newButton(0, 2) ]),
											row2 = new ActionRowBuilder<ButtonBuilder>().addComponents([ newButton(1, 0), newButton(1, 1), newButton(1, 2) ]),
											row3 = new ActionRowBuilder<ButtonBuilder>().addComponents([ newButton(2, 0), newButton(2, 1), newButton(2, 2) ]);
								
											if (X > O) {
												const emoji:EmojiIdentifierResolvable = `⭕`;
												// eslint-disable-next-line max-depth
												switch (buttonInteraction.customId) {
													case `TTT1`:
														row1 = new ActionRowBuilder<ButtonBuilder>()
															.addComponents([
																newCheckedButton(0, 0, emoji),
																newButton(0, 1),
																newButton(0, 2)
															]);
														break;
													case `TTT2`:
														row1 = new ActionRowBuilder<ButtonBuilder>()
															.addComponents([
																newButton(0, 0),
																newCheckedButton(0, 1, emoji),
																newButton(0, 2)
															]);
														break;
													case `TTT3`:
														row1 = new ActionRowBuilder<ButtonBuilder>()
															.addComponents([
																newButton(0, 0),
																newButton(0, 1),
																newCheckedButton(0, 2, emoji)
															]);
														break;
													case `TTT4`:
														row2 = new ActionRowBuilder<ButtonBuilder>()
															.addComponents([
																newCheckedButton(1, 0, emoji),
																newButton(1, 1),
																newButton(1, 2)
															]);
														break;
													case `TTT5`:
														row2 = new ActionRowBuilder<ButtonBuilder>()
															.addComponents([
																newButton(1, 0),
																newCheckedButton(1, 1, emoji),
																newButton(1, 2)
															]);
														break;
													case `TTT6`:
														row2 = new ActionRowBuilder<ButtonBuilder>()
															.addComponents([
																newButton(1, 0),
																newButton(1, 1),
																newCheckedButton(1, 2, emoji)
															]);
														break;
													case `TTT7`:
														row3 = new ActionRowBuilder<ButtonBuilder>()
															.addComponents([
																newCheckedButton(2, 0, emoji),
																newButton(2, 1),
																newButton(2, 2)
															]);
														break;
													case `TTT8`:
														row3 = new ActionRowBuilder<ButtonBuilder>()
															.addComponents([
																newButton(2, 0),
																newCheckedButton(2, 1, emoji),
																newButton(2, 2)
															]);
														break;
													case `TTT9`:
														row3 = new ActionRowBuilder<ButtonBuilder>()
															.addComponents([
																newButton(2, 0),
																newButton(2, 1),
																newCheckedButton(2, 2, emoji)
															]);
														break;
													default:
														break;
												}
											} else {
												const emoji:EmojiIdentifierResolvable = `❌`;
												// eslint-disable-next-line max-depth
												switch (buttonInteraction.customId) {
												case `TTT1`:
													row1 = new ActionRowBuilder<ButtonBuilder>()
														.addComponents([
															newCheckedButton(0, 0, emoji),
															newButton(0, 1),
															newButton(0, 2)
														]);
													break;
												case `TTT2`:
													row1 = new ActionRowBuilder<ButtonBuilder>()
														.addComponents([
															newButton(0, 0),
															newCheckedButton(0, 1, emoji),
															newButton(0, 2)
														]);
													break;
												case `TTT3`:
													row1 = new ActionRowBuilder<ButtonBuilder>()
														.addComponents([
															newButton(0, 0),
															newButton(0, 1),
															newCheckedButton(0, 2, emoji)
														]);
													break;
												case `TTT4`:
													row2 = new ActionRowBuilder<ButtonBuilder>()
														.addComponents([
															newCheckedButton(1, 0, emoji),
															newButton(1, 1),
															newButton(1, 2)
														]);
													break;
												case `TTT5`:
													row2 = new ActionRowBuilder<ButtonBuilder>()
														.addComponents([
															newButton(1, 0),
															newCheckedButton(1, 1, emoji),
															newButton(1, 2)
														]);
													break;
												case `TTT6`:
													row2 = new ActionRowBuilder<ButtonBuilder>()
														.addComponents([
															newButton(1, 0),
															newButton(1, 1),
															newCheckedButton(1, 2, emoji)
														]);
													break;
												case `TTT7`:
													row3 = new ActionRowBuilder<ButtonBuilder>()
														.addComponents([
															newCheckedButton(2, 0, emoji),
															newButton(2, 1),
															newButton(2, 2)
														]);
													break;
												case `TTT8`:
													row3 = new ActionRowBuilder<ButtonBuilder>()
														.addComponents([
															newButton(2, 0),
															newCheckedButton(2, 1, emoji),
															newButton(2, 2)
														]);
													break;
												case `TTT9`:
													row3 = new ActionRowBuilder<ButtonBuilder>()
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
											enum XO {
												XX = `❌`,
												OO = `⭕`,
												RAS = `ras`
											}
											// eslint-disable-next-line one-var
											const buttonArray:XO[] = [],
											newButtons = [ row1, row2, row3 ],
											winBoard = (rows: ActionRowBuilder<ButtonBuilder>[]) => {
												const check = (index: number, type: XO) => buttonArray[index] === type,
												checkThree = (index:[number, number, number], type: XO) => check(index[0], type) && check(index[1], type) && check(index[2], type);
												rows.forEach((row) => {
													row.components.forEach((button) => {
														buttonArray.push((button.toJSON() as APIButtonComponentWithCustomId).emoji?.name as (XO | undefined) ?? XO.RAS);
													});
												});
												if (buttonArray[0] !== XO.RAS || buttonArray[4] !== XO.RAS || buttonArray[8] !== XO.RAS) {
													return checkThree([ 0, 1, 2 ], XO.XX) ||
														checkThree([ 0, 3, 6 ], XO.XX) ||
														checkThree([ 6, 7, 8 ], XO.XX) ||
														checkThree([ 2, 5, 8 ], XO.XX) ||
														checkThree([ 0, 4, 8 ], XO.XX) ||
														checkThree([ 1, 4, 7 ], XO.XX) ||
														checkThree([ 2, 4, 6 ], XO.XX) ||
														checkThree([ 3, 4, 5 ], XO.XX) ||
														checkThree([ 0, 3, 6 ], XO.OO) ||
														checkThree([ 0, 1, 2 ], XO.OO) ||
														checkThree([ 6, 7, 8 ], XO.OO) ||
														checkThree([ 2, 5, 8 ], XO.OO) ||
														checkThree([ 0, 4, 8 ], XO.OO) ||
														checkThree([ 1, 4, 7 ], XO.OO) ||
														checkThree([ 2, 4, 6 ], XO.OO) ||
														checkThree([ 3, 4, 5 ], XO.OO);
												}
												return false;
											};
											if (winBoard(newButtons)) {
												buttonInteraction.update({
													components: [],
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
													}`
												}).catch(genericCatch);
											} else if (buttonArray.includes(XO.RAS)) {
												buttonInteraction.update({ components: [] }).then(() => {
													buttonInteraction.editReply({
														components: newButtons,
														content: `(no alternate rules) ${players[1].id} is playing. ${players[0].id} Please wait until your turn.`
													}).catch(genericCatch);
												}).catch(genericCatch);
											} else {
												buttonInteraction.update({
													components: [],
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
													}`
												}).catch(genericCatch);
											}
										}
									}
								} else
									buttonInteraction.reply({ content: `Sorry, but you can't do that`, ephemeral }).catch(genericCatch);
							}).catch(genericCatch);
							break;
						}
				}
			}
		});
	});
};
//#endregion