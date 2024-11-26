//#region imports
import type { CommandInteraction, ComponentEmojiResolvable, EmojiIdentifierResolvable, User, UserResolvable } from "discord.js";

import { ActionRowBuilder, ButtonBuilder, ButtonComponent, ButtonStyle, ComponentType, Events, MessageMentions } from "discord.js";

import { ephemeral, genericCatch, inc, Index, offByOne, zero } from "./generalUse";
//#endregion

//#region tic tac toe game
export const ticTacToe = (inObjs: Array<{ interaction: CommandInteraction }>): void => {
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
	
		const rasButton = (id: string): ButtonBuilder => new ButtonBuilder().setCustomId(id).setEmoji(`<:ras:741303046574702652>`).setStyle(ButtonStyle.Secondary);
	
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
			if (!interaction.isButton()) return;
			/* eslint-disable sort-vars */
			const { mentions } = interaction.message,
			memberMentions = mentions.members,
			firstMemberMention = memberMentions?.first(),
			lastMemberMention = memberMentions?.last(),
			buttonGuild = interaction.guild;
			/* eslint-enable sort-vars */
			if (interaction.message.mentions instanceof MessageMentions) {
				switch (interaction.customId) {
					//================================================================================================================
					case `accept`:
						if (interaction.user.id === firstMemberMention?.id && lastMemberMention?.user) {
							const players:[ User, User ] = [ firstMemberMention.user, lastMemberMention.user ],
							randomNumber:number = Math.round(Math.random()),
							randomOrder:[ User, User ] = [ players[randomNumber], players[players.length-offByOne-randomNumber] ];
						
							interaction.update({ components: [] }).then(() => {
								interaction.editReply({
									components: startingGrid,
									content: `(no alternate rules) <@${randomOrder[Index.First].id}> is starting. <@${randomOrder[Index.Second].id}> Please wait until your turn.`
								}).catch(genericCatch);
							}).catch((err: unknown) => {
								console.error(err);
								interaction.user.send({ content: `Something went horribly wrong` }).catch(genericCatch);
							});
						}
						else
						interaction.reply({ content: `Sorry, but you can't do that`, ephemeral }).catch(genericCatch);
						break;
					//================================================================================================================
					case `decline`:
						if (interaction.user.id === firstMemberMention?.user.id)
							interaction.update({ components: [], content: `The request was declined` }).catch(genericCatch);
						else
						interaction.reply({ content: `Sorry, but you can't do that`, ephemeral }).catch(genericCatch);
						break;
					//================================================================================================================
					default:
						if (interaction.customId.startsWith(`TTT`)) {
							buttonGuild?.members.fetch(interaction.message.content.split(` `)[Index.Fourth].replace(/<@!?(?=\d*)|(?<=\d*)>/gu, ``) as UserResolvable).then(() => {
								buttonGuild.members.fetch(interaction.message.content.split(` `)[Index.Seventh].replace(/<@!?(?=\d*)|(?<=\d*)>/gu, ``) as UserResolvable).catch(genericCatch);
							}).then(() => {
								const buttons:ButtonComponent[] = [],
								movePieces = !(interaction.message.content.includes(`no`)),
								players:[ { id: string }, { id: string } ] = [
									buttonGuild.members.cache.get(interaction.message.content.split(` `)[Index.Fourth].replace(/<@!?(?=\d*)|(?<=\d*)>/gu, ``)) ?? { id: `` },
									buttonGuild.members.cache.get(interaction.message.content.split(` `)[Index.Seventh].replace(/<@!?(?=\d*)|(?<=\d*)>/gu, ``)) ?? { id: `` }
								];
								// eslint-disable-next-line id-length
								let o: number, x: number;
								o = zero;
								x = zero;
							
								interaction.message.components.forEach((row) => {
									row.components.forEach((component) => {
										if (component.type === ComponentType.Button)
											buttons.push(component);
									});
								});
						
								buttons.forEach((button) => {
									if (typeof button.emoji?.name !== `undefined`) {
										switch (button.emoji.name) {
										case `❌`:
											x += inc;
											break;
										case `⭕`:
											o += inc;
											break;
          								default:
											break;
										}
									}
								});
								if (interaction.user.id === players[Index.First].id && interaction.component instanceof ButtonComponent) {
									if (interaction.component.emoji === null)
										interaction.reply({ content: `Sorry, but you can't do that`, ephemeral }).catch(genericCatch);
									else if (interaction.component.emoji.id === `741303046574702652`) {
										const buttonMessage = interaction.message, style = ButtonStyle.Secondary;
								
										if (movePieces)
											interaction.update({ content: `this mode has not been added yet. Please set the movepieces parameter to false instead` }).catch(genericCatch);
										else {
											const newButton = (row: number, collumn: number):ButtonBuilder => {
												const messageButton:ButtonComponent = buttonMessage.components[row].components.filter(component => component.type === ComponentType.Button)[collumn];
												return new ButtonBuilder().setCustomId(messageButton.customId ?? ``).setEmoji(messageButton.emoji?.id ?? ``).setStyle(style);
											},
											newCheckedButton = (row: number, collumn: number, emoji: ComponentEmojiResolvable):ButtonBuilder => {
												const messageButton:ButtonComponent = buttonMessage.components[row].components.filter(component => component.type === ComponentType.Button)[collumn];
												return new ButtonBuilder().setCustomId(messageButton.customId ?? ``).setEmoji(emoji).setStyle(style);
											};
								
											let row1, row2, row3;
											row1 = new ActionRowBuilder<ButtonBuilder>().addComponents([ newButton(Index.First, Index.First), newButton(Index.First, Index.Second), newButton(Index.First, Index.Third) ]);
											row2 = new ActionRowBuilder<ButtonBuilder>().addComponents([ newButton(Index.Second, Index.First), newButton(Index.Second, Index.Second), newButton(Index.Second, Index.Third) ]);
											row3 = new ActionRowBuilder<ButtonBuilder>().addComponents([ newButton(Index.Third, Index.First), newButton(Index.Third, Index.Second), newButton(Index.Third, Index.Third) ]);
								
											if (x > o) {
												const emoji:EmojiIdentifierResolvable = `⭕`;
												// eslint-disable-next-line max-depth
												switch (interaction.customId) {
													case `TTT1`:
														row1 = new ActionRowBuilder<ButtonBuilder>()
															.addComponents([
																newCheckedButton(Index.First, Index.First, emoji),
																newButton(Index.First, Index.Second),
																newButton(Index.First, Index.Third)
															]);
														break;
													case `TTT2`:
														row1 = new ActionRowBuilder<ButtonBuilder>()
															.addComponents([
																newButton(Index.First, Index.First),
																newCheckedButton(Index.First, Index.Second, emoji),
																newButton(Index.First, Index.Third)
															]);
														break;
													case `TTT3`:
														row1 = new ActionRowBuilder<ButtonBuilder>()
															.addComponents([
																newButton(Index.First, Index.First),
																newButton(Index.First, Index.Second),
																newCheckedButton(Index.First, Index.Third, emoji)
															]);
														break;
													case `TTT4`:
														row2 = new ActionRowBuilder<ButtonBuilder>()
															.addComponents([
																newCheckedButton(Index.Second, Index.First, emoji),
																newButton(Index.Second, Index.Second),
																newButton(Index.Second, Index.Third)
															]);
														break;
													case `TTT5`:
														row2 = new ActionRowBuilder<ButtonBuilder>()
															.addComponents([
																newButton(Index.Second, Index.First),
																newCheckedButton(Index.Second, Index.Second, emoji),
																newButton(Index.Second, Index.Third)
															]);
														break;
													case `TTT6`:
														row2 = new ActionRowBuilder<ButtonBuilder>()
															.addComponents([
																newButton(Index.Second, Index.First),
																newButton(Index.Second, Index.Second),
																newCheckedButton(Index.Second, Index.Third, emoji)
															]);
														break;
													case `TTT7`:
														row3 = new ActionRowBuilder<ButtonBuilder>()
															.addComponents([
																newCheckedButton(Index.Third, Index.First, emoji),
																newButton(Index.Third, Index.Second),
																newButton(Index.Third, Index.Third)
															]);
														break;
													case `TTT8`:
														row3 = new ActionRowBuilder<ButtonBuilder>()
															.addComponents([
																newButton(Index.Third, Index.First),
																newCheckedButton(Index.Third, Index.Second, emoji),
																newButton(Index.Third, Index.Third)
															]);
														break;
													case `TTT9`:
														row3 = new ActionRowBuilder<ButtonBuilder>()
															.addComponents([
																newButton(Index.Third, Index.First),
																newButton(Index.Third, Index.Second),
																newCheckedButton(Index.Third, Index.Third, emoji)
															]);
														break;
													default:
														break;
												}
											} else {
												const emoji:EmojiIdentifierResolvable = `❌`;
												// eslint-disable-next-line max-depth
												switch (interaction.customId) {
												case `TTT1`:
													row1 = new ActionRowBuilder<ButtonBuilder>()
														.addComponents([
															newCheckedButton(Index.First, Index.First, emoji),
															newButton(Index.First, Index.Second),
															newButton(Index.First, Index.Third)
														]);
													break;
												case `TTT2`:
													row1 = new ActionRowBuilder<ButtonBuilder>()
														.addComponents([
															newButton(Index.First, Index.First),
															newCheckedButton(Index.First, Index.Second, emoji),
															newButton(Index.First, Index.Third)
														]);
													break;
												case `TTT3`:
													row1 = new ActionRowBuilder<ButtonBuilder>()
														.addComponents([
															newButton(Index.First, Index.First),
															newButton(Index.First, Index.Second),
															newCheckedButton(Index.First, Index.Third, emoji)
														]);
													break;
												case `TTT4`:
													row2 = new ActionRowBuilder<ButtonBuilder>()
														.addComponents([
															newCheckedButton(Index.Second, Index.First, emoji),
															newButton(Index.Second, Index.Second),
															newButton(Index.Second, Index.Third)
														]);
													break;
												case `TTT5`:
													row2 = new ActionRowBuilder<ButtonBuilder>()
														.addComponents([
															newButton(Index.Second, Index.First),
															newCheckedButton(Index.Second, Index.Second, emoji),
															newButton(Index.Second, Index.Third)
														]);
													break;
												case `TTT6`:
													row2 = new ActionRowBuilder<ButtonBuilder>()
														.addComponents([
															newButton(Index.Second, Index.First),
															newButton(Index.Second, Index.Second),
															newCheckedButton(Index.Second, Index.Third, emoji)
														]);
													break;
												case `TTT7`:
													row3 = new ActionRowBuilder<ButtonBuilder>()
														.addComponents([
															newCheckedButton(Index.Third, Index.First, emoji),
															newButton(Index.Third, Index.Second),
															newButton(Index.Third, Index.Third)
														]);
													break;
												case `TTT8`:
													row3 = new ActionRowBuilder<ButtonBuilder>()
														.addComponents([
															newButton(Index.Third, Index.First),
															newCheckedButton(Index.Third, Index.Second, emoji),
															newButton(Index.Third, Index.Third)
														]);
													break;
												case `TTT9`:
													row3 = new ActionRowBuilder<ButtonBuilder>()
														.addComponents([
															newButton(Index.Third, Index.First),
															newButton(Index.Third, Index.Second),
															newCheckedButton(Index.Third, Index.Third, emoji)
														]);
													break;
												default:
													break;
												}
											}
											enum PlayerSymbol {
												X = `❌`,
												O = `⭕`,
												Ras = `ras`
											}
											// eslint-disable-next-line one-var
											const buttonArray:PlayerSymbol[] = [],
											newButtons = [ row1, row2, row3 ],
											winBoard = (rows: Array<ActionRowBuilder<ButtonBuilder>>): boolean => {
												const check = (index: number, type: PlayerSymbol): boolean => buttonArray[index] === type,
												checkThree = (index:[number, number, number], type: PlayerSymbol): boolean => check(index[Index.First], type) && check(index[Index.Second], type) && check(index[Index.Third], type);
												rows.forEach((row) => {
													row.components.forEach((button) => {
														const isPlayerSymbol = (value: number|string): value is PlayerSymbol => value in PlayerSymbol,
														json = button.toJSON();
														if (json.style === style && typeof json.emoji?.name !== `undefined` && isPlayerSymbol(json.emoji.name)) {
															switch (json.emoji.name) {
																case PlayerSymbol.O:
																case PlayerSymbol.X:
																	buttonArray.push(json.emoji.name);
																	break;
																case PlayerSymbol.Ras:
                												default:
																	buttonArray.push(PlayerSymbol.Ras);
																break;
															}
														}
													});
												});
												if (buttonArray[Index.First] !== PlayerSymbol.Ras || buttonArray[Index.Fifth] !== PlayerSymbol.Ras || buttonArray[Index.Ninth] !== PlayerSymbol.Ras) {
													return checkThree([ Index.First, Index.Second, Index.Third ], PlayerSymbol.X) ||
														checkThree([ Index.First, Index.Fourth, Index.Seventh ], PlayerSymbol.X) ||
														checkThree([ Index.Seventh, Index.Eighth, Index.Ninth ], PlayerSymbol.X) ||
														checkThree([ Index.Third, Index.Sixth, Index.Ninth ], PlayerSymbol.X) ||
														checkThree([ Index.First, Index.Fifth, Index.Ninth ], PlayerSymbol.X) ||
														checkThree([ Index.Second, Index.Fifth, Index.Eighth ], PlayerSymbol.X) ||
														checkThree([ Index.Third, Index.Fifth, Index.Seventh ], PlayerSymbol.X) ||
														checkThree([ Index.Fourth, Index.Fifth, Index.Sixth ], PlayerSymbol.X) ||
														checkThree([ Index.First, Index.Fourth, Index.Seventh ], PlayerSymbol.O) ||
														checkThree([ Index.First, Index.Second, Index.Third ], PlayerSymbol.O) ||
														checkThree([ Index.Seventh, Index.Eighth, Index.Ninth ], PlayerSymbol.O) ||
														checkThree([ Index.Third, Index.Sixth, Index.Ninth ], PlayerSymbol.O) ||
														checkThree([ Index.First, Index.Fifth, Index.Ninth ], PlayerSymbol.O) ||
														checkThree([ Index.Second, Index.Fifth, Index.Eighth ], PlayerSymbol.O) ||
														checkThree([ Index.Third, Index.Fifth, Index.Seventh ], PlayerSymbol.O) ||
														checkThree([ Index.Fourth, Index.Fifth, Index.Sixth ], PlayerSymbol.O);
												}
												return false;
											};
											if (winBoard(newButtons)) {
												interaction.update({
													components: [],
													content: `<@${
														players[Index.First].id
													}> won!\n${
														buttonArray[Index.First].replace(`ras`, `▫️`)
													}${
														buttonArray[Index.Second].replace(`ras`, `▫️`)
													}${
														buttonArray[Index.Third].replace(`ras`, `▫️`)
													}\n${
														buttonArray[Index.Fourth].replace(`ras`, `▫️`)
													}${
														buttonArray[Index.Fifth].replace(`ras`, `▫️`)
													}${
														buttonArray[Index.Sixth].replace(`ras`, `▫️`)
													}\n${
														buttonArray[Index.Seventh].replace(`ras`, `▫️`)
													}${
														buttonArray[Index.Eighth].replace(`ras`, `▫️`)
													}${
														buttonArray[Index.Ninth].replace(`ras`, `▫️`)
													}`
												}).catch(genericCatch);
											} else if (buttonArray.includes(PlayerSymbol.Ras)) {
												interaction.update({ components: [] }).then(() => {
													interaction.editReply({
														components: newButtons,
														content: `(no alternate rules) ${players[Index.Second].id} is playing. ${players[Index.First].id} Please wait until your turn.`
													}).catch(genericCatch);
												}).catch(genericCatch);
											} else {
												interaction.update({
													components: [],
													content: `Looks like it ended in a tie\n${
														buttonArray[Index.First].replace(`ras`, `▫️`)
													}${
														buttonArray[Index.Second].replace(`ras`, `▫️`)
													}${
														buttonArray[Index.Third].replace(`ras`, `▫️`)
													}\n${
														buttonArray[Index.Fourth].replace(`ras`, `▫️`)
													}${
														buttonArray[Index.Fifth].replace(`ras`, `▫️`)
													}${
														buttonArray[Index.Sixth].replace(`ras`, `▫️`)
													}\n${
														buttonArray[Index.Seventh].replace(`ras`, `▫️`)
													}${
														buttonArray[Index.Eighth].replace(`ras`, `▫️`)
													}${
														buttonArray[Index.Ninth].replace(`ras`, `▫️`)
													}`
												}).catch(genericCatch);
											}
										}
									}
								} else
								interaction.reply({ content: `Sorry, but you can't do that`, ephemeral }).catch(genericCatch);
							}).catch(genericCatch);
							break;
						}
				}
			}
		});
	});
};
//#endregion