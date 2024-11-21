/*
╔═════════════════════════════════════════════════════╦═╦═╦═╗
║ Command Prompt                                      ║-║▫║X║
╠═════════════════════════════════════════════════════╩═╩═╩═╣
║ These bots were made by RasMatHam#8846                    ║
║ Feel free to do whatever you want with the code           ║
║ as long as it isn't just a copy/paste of the entire thing ║
║ C:\WINDOWS\system32>echo Hello, World!                    ║
╚═══════════════════════════════════════════════════════════╝
*/
//#region Common

//#region imports
import { ActivityType, Client, EmbedBuilder, Events } from "discord.js";
import { Index, ShiftBy, blackList, botReady, decimalShift, ephemeral, genericCatch, headerlessField, inc, intents, listThings, login, msInS, offByOne, sendAsWebHook, technicalStuff } from "./custom_modules/generalUse";
import { ReactionTypes } from "./custom_modules/stupidStuff";
import * as coinflip from "./custom_modules/coinflip";
import * as containsWord from "./custom_modules/containsWordFunctions";
import * as dice from "./custom_modules/dice";
import * as dotenv from "dotenv";
import * as forwarding from "./custom_modules/forwardMessages";
import * as info from "./custom_modules/info";
import * as inspiroBot from "./custom_modules/inspiroBot";
import * as maze from "./custom_modules/playableMaze";
import * as pokedex from "./custom_modules/pokedex";
import * as stupidStuff from "./custom_modules/stupidStuff";
import * as ticTacToe from "./custom_modules/TicTacToe";
import * as timestamps from "./custom_modules/timestamp";
import * as wordle from "./custom_modules/wordle/wordle";
import * as xkcd from "./custom_modules/xkcd";
dotenv.config();
//#endregion

//#region links
const buzzLink = `https://discordapp.com/oauth2/authorize?&client_id=689449074008653865&scope=bot&permissions=8`,
ebnjLink = `https://discordapp.com/oauth2/authorize?&client_id=654079161723387914&scope=bot&permissions=8`,
githublink = `https://github.com/Rasmatham/Ras-s-Discord-Bots`,
gladosLink = `https://discordapp.com/oauth2/authorize?&client_id=680053684243398693&scope=bot&permissions=8`,
pokeLink = `https://discordapp.com/oauth2/authorize?&client_id=716002740442103899&scope=bot&permissions=8`,
r2Link = `https://discordapp.com/oauth2/authorize?&client_id=688152192196149250&scope=bot&permissions=8`,
randomLink = `https://discordapp.com/oauth2/authorize?&client_id=654787079590641713&scope=bot&permissions=8`,
zeldaLink = `https://discordapp.com/oauth2/authorize?&client_id=654786965090074656&scope=bot&permissions=8`;
//#endregion

//#region instantiating Clients
// eslint-disable-next-line one-var
const client = (name: string, state: string): Client => new Client({ intents, presence: { activities: [{ name, state, type: ActivityType.Custom }] } });
// eslint-disable-next-line one-var
const amber = client(`Amber`, ``),
artoo = client(`R2D2`, `[screaming sounds]`),
buzzBot = client(`BuzzBot`, `Listening to jazz`),
canine = client(`K9`, `Spoilers!`),
croissant = client(`croissant`, `Plotting a revolution`),
ebnj = client(`EBNJ`, `Uninstalling Bedrock edition`),
glados = client(`GLaDOS`, `Testing chambers`),
pokebot = client(`Pokébot`, `Catching 'em all`),
random = client(`random`, `Dividing by Math.random()`),
zelda = client(`Zelda`, `Committing Korok genocide`);
//#endregion

//#region logins
login(buzzBot, process.env.BUZZBOTTOKEN, `Buzzbot did not like jazz`);
login(ebnj, process.env.EBNJTOKEN, `EBNJ booted up the wrong edition of Minecraft`);
login(glados, process.env.GLADOSTOKEN, `GLaDOS was turned into a potato`);
login(pokebot, process.env.POKETOKEN, `Pokébot could not catch them all`);
login(artoo, process.env.ARTOOTOKEN, `R2 missed the lightsaber throw`);
login(random, process.env.RANDOMTOKEN, `Random Bot got a divide by 0 error`);
login(amber, process.env.AMBERTOKEN, `Amber lost a Splatoon game`);
login(zelda, process.env.ZELDATOKEN, `Zelda Bot could not figure out where BOTW/AOC/TOTK falls on the timeline`);
login(croissant, process.env.CROISSANTTOKEN, `Le Franciosle bot français n'a pas réussi à s'authentifier`);
login(canine, process.env.K9TOKEN, `K9 was not affirmative`);
// eslint-disable-next-line one-var
const bots = [ buzzBot, ebnj, glados, pokebot, artoo, random, amber, zelda, croissant, canine ];
botReady([{ bots }]);
technicalStuff(process, bots);

//#endregion

//#endregion


//#region individual

//#region BuzzBot

//#region long stuff
// eslint-disable-next-line one-var
const mrtz = `Did you know BeeMrtz is short for Bee Master? He just had a tiny stroke while typing it`;
//#endregion

//#region functions
// eslint-disable-next-line one-var
const buzzChance = 9, commaChance = 2;
// eslint-disable-next-line one-var
const buzzes = (buzz = `buzz`, count = Math.floor(Math.random() * buzzChance)): string => {
	let buzzTmp, countTmp;
	buzzTmp = buzz;
	countTmp = count;
	buzzTmp = (Math.round(Math.random() * commaChance)? `buzz ` : `buzz, `).concat(buzzTmp);
	countTmp = countTmp? countTmp-offByOne : countTmp;
	return countTmp? buzzes(buzzTmp, countTmp) : buzzTmp;
};
//#endregion

//#region replies
buzzBot.on(Events.MessageCreate, (message) => {
	if (message.channel.isDMBased()) return;
	if (blackList.includes(message.channel.name)) return;
	containsWord.replyThing([
		{
			chance: 10,
			message,
			reply: { content: `He makes me go buzz` },
			triggers: [ `ras`, `rasmatham`, `rasberry` ],
			type: `exact`
		},{
			chance: 10,
			message,
			reply: { content: `It's BeeMrtz, you insensitive prick!` },
			triggers: [`bymrtz`],
			type: `exact`
		},{
			chance: 10,
			message,
			reply: { content: mrtz },
			triggers: [ `mrtz`, `beemrtz`, `rasberry` ],
			type: `exact`
		},{
			message,
			reply: { content: buzzLink },
			triggers: [`botlink buzzbot`],
			type: `anywhere`
		},{
			message,
			reply: { content: `The hivemind is the absolute truth` },
			triggers: [`hive`],
			type: `anywhere`
		},{
			message,
			reply: { content: `you have no choice` },
			triggers: [`join us`],
			type: `anywhere`
		},{
			message,
			reply: { content: buzzes() },
			triggers: [`buzz`],
			type: `anywhere`
		}
	]);
	forwarding.messageForwarding([{ message }]);
});
//#endregion

//#endregion

//#region EBNJ

//#region replies
ebnj.on(Events.MessageCreate, (message) => {
	if (message.channel.isDMBased()) return;
	if (blackList.includes(message.channel.name)) return;
	containsWord.replyThing([
		{
			message,
			reply: { content: ebnjLink },
			triggers: [`botlink ebnj`],
			type: `anywhere`
		},{
			message,
			reply: { content: `🦆 <:Minecoins:656622021240815623>` },
			triggers: [`minecoin`],
			type: `anywhere`
		},{
			message,
			reply: { content: `Nice\nJava` },
			triggers: [`java`],
			type: `anywhere`
		},{
			message,
			reply: { content: `Ew\nBedrock` },
			triggers: [`bedrock`],
			type: `anywhere`
		},{
			message,
			reply: { content: `R.I.P. Earth\nApparently nobody liked you` },
			triggers: [`earth`],
			type: `anywhere`
		},{
			chance: 10,
			message,
			reply: { content: `Cool\nRas` },
			triggers: [ `ras`, `rasmatham`, `rasberry` ],
			type: `exact`
		}
	]);
	containsWord.reactThing([
		{
			emotes: [ `🇫`, `🇺`, `🇨`, `🇰`, `➖`, `🇩`, `ℹ️`, `🇴`, `🇷`, `🇮`, `🇹`, `🇪` ],
			message,
			triggers: [`diorite`],
			type: `anywhere`,
		}
	]);
	forwarding.messageForwarding([{ message }]);
});
//#endregion

//#endregion

//#region GLaDOS

//#region Long stuff (please collapse)
// eslint-disable-next-line one-var
const lemonrant = new EmbedBuilder()
	.addFields([
		{
			name: `When life gives you lemons...`,
			value: `All right, I've been thinking, when life gives you lemons, don't make lemonade!\nMake life take the lemons back!\nGet mad!\nI don't want your damn lemons!\nWhat am I supposed to do with these?\nDemand to see life's manager!\nMake life rue the day it thought it could give Cave Johnson lemons!\nDo you know who I am?\nI'm the man whose gonna burn your house down - with the lemons!`
		}
	])
	.setThumbnail(`https://cdn.discordapp.com/attachments/647924443078852621/947515795590754355/test.png`)
	.setFooter({ text: `-Cave Johnson` })
	.setColor(`Yellow`),
stillalive = new EmbedBuilder()
	.setColor(`#FFFFFF`)
	.setTitle(`Still alive`)
	.addFields([
		headerlessField(`This was a triumph\nI'm taking a note here: "HUGE SUCCESS"\nIt's hard to overstate\nMy satisfaction`),
		headerlessField(`Aperture Science\nWe do what we must because we can\nFor the good of all of us\nExcept the ones who are dead`),
		headerlessField(`But there's no sense crying over every mistake\nYou just keep on trying till you run out of cake\nAnd the science gets done, and you make a neat gun\nFor the people who are still alive`),
		headerlessField(`I'm not even angry\nI'm being so sincere right now\nEven though you broke my heart\nAnd killed me`),
		headerlessField(`And tore me to pieces\nAnd threw every piece into a fire\nAs they burned, it hurt because\nI was so happy for you`),
		headerlessField(`Now these points of data make a beautiful line\nAnd we're out of beta, we're releasing on time\nSo I'm GLaD I got burned: think of the things we learned\nFor the people who are still alive`),
		headerlessField(`Go ahead and leave me\nI think I prefer to stay inside\nMaybe you'll find someone else\nTo help you`),
		headerlessField(`Maybe Black Mesa\nThat was a joke. Haha, fat chance\nAnyway, this cake is great\nIt's so delicious and moist`),
		headerlessField(`Look at me still talking when there's Science to do\nWhen I look out there, it makes me GLaD I'm not you\nI've experiments to run; there is research to be done\nOn the people who are still alive`),
		headerlessField(`And believe me, I am still alive\nI'm doing science and I'm still alive\nI feel fantastic and I'm still alive\nWhile you're dying, I'll be still alive`),
		headerlessField(`And when you're dead, I will be still alive\nStill alive, still alive...`)
	]);
//#endregion

//#region welcome/goodbye Message
glados.on(Events.GuildMemberAdd, (member) => {
	const channelCount = info.channelCount({ guild: member.guild }).all.toString(),
	memberCount = member.guild.memberCount.toString();
	if (member.guild.systemChannel !== null) {
		const content = `Welcome to the server, #${memberCount}\nWe currently have ${channelCount}/500 channels used`;
		member.guild.systemChannel.send({ content }).catch(genericCatch);
	}
});
glados.on(Events.GuildMemberRemove, (member) => {
	if (member.guild.systemChannel !== null) 
		member.guild.systemChannel.send({ content: `Bye, ${member.user.tag}` }).catch(genericCatch);
});
//#endregion

//#region replies

//#region Stuff
glados.on(Events.MessageCreate, (message) => {
	if (message.channel.isDMBased()) return;
	if (blackList.includes(message.channel.name)) return;
	containsWord.replyThing([
		{
			message,
			reply: { content: `It is totally real (Definitely not a lie)` },
			triggers: [ `cake`, `tower 15` ],
			type: `anywhere`
		},{
			message,
			reply: { embeds: [lemonrant] },
			triggers: [ `lemon`, `🍋` ],
			type: `anywhere`
		},{
			message,
			reply: { content: `I will tell you what is not a lie\nThe cake` },
			triggers: [`lie`],
			type: `exact`
		},{
			message,
			reply: { files: [`./GLaDOS/files/BSOD.png`] },
			triggers: [`neurotoxin`],
			type: `anywhere`
		},{
			message,
			reply: { content: `<@${process.env.RASID ?? ``}>` },
			triggers: [`@ras`],
			type: `exact`
		},{
			message,
			reply: { content: `<@454340813388775445>` },
			triggers: [`@kelp`],
			type: `exact`
		},{
			message,
			reply: { embeds: [stillalive] },
			triggers: [`still alive`],
			type: `anywhere`
		},{
			message,
			reply: { content: `P I N G` },
			triggers: [`680053684243398693`],
			type: `mention`
		},{
			message,
			reply: { content: `P I N G\nWait\nNevermind` },
			triggers: [`654074851337699328`],
			type: `mention`
		},{
			chance: 10,
			message,
			reply: { content: `He's a superior lifeform` },
			triggers: [ `ras`, `rasmatham`, `rasberry` ],
			type: `exact`
		},{
			chance: 10,
			message,
			reply: { content: `Did you mean: Czechia?` },
			triggers: [ `cz`, `cz12345` ],
			type: `exact`
		},{
			chance: 50,
			message,
			reply: { content: `Say hi to him for me 😳` },
			triggers: [`espen bot`],
			type: `exact`
		}
	]);
	containsWord.reactThing([
		{
			emotes: [`838084115629735976`],
			message,
			triggers: [`science`],
			type: `anywhere`
		},{
			emotes: [`838084115391053844`],
			message,
			triggers: [ `blue`, `blå` ],
			type: `anywhere`
		},{
			emotes: [`838084116653670420`],
			message,
			triggers: [ `orange`, `oransje` ],
			type: `anywhere`
		}
	]);
	forwarding.channelLink([{ ch1: `842486821510447115`, ch2: `842486725347508266`, message }]);
	inspiroBot.sendMessage([{ message }]);
	forwarding.messageForwarding([{ message }]);
	stupidStuff.hencefortifier([{ message }]);
	stupidStuff.espenBotReplacement([
		{
			chance: 1,
			message,
			out: { content: `https://cdn.discordapp.com/attachments/735213241860620308/781189544103247922/unknown.png` },
			type: ReactionTypes.Message,
			victim: process.env.RASID as `${bigint}`
		}
	]);
	stupidStuff.espenBotReplacement([
		{
			chance: 100,
			message,
			out: `🦆`,
			type: ReactionTypes.React,
			victim: process.env.ZARLID as `${bigint}`
		}
	]);
});
glados.on(Events.InteractionCreate, (interaction) => {
	if (interaction.isMessageComponent()) {
		if (interaction.isButton()) {
			if (interaction.customId.toLowerCase().includes(`dummy`))
				interaction.reply({ content: `That button worked`, ephemeral }).catch(genericCatch);
			switch (interaction.customId) {
				case `inspirobot`: {
					inspiroBot.sendMessage([{ message: interaction }]);
					break;
				}
				default: {
					break;
				}
			}
		}
		if (interaction.isStringSelectMenu()) {
			switch (interaction.customId) {
				case `Dummy`: {
					interaction.update({ content: `Seems about right` }).catch(genericCatch);
					break;
				}
				default: {
					break;
				}
			}
		}
	}
	if (interaction.isChatInputCommand()) {
		switch (interaction.commandName) {
			case `list`: {
				listThings(interaction).then((interactionReplyOptions) => {
					interaction.reply(interactionReplyOptions[Index.First]).then(() => {
						interactionReplyOptions.shift();
						interactionReplyOptions.forEach(element => {
							interaction.followUp(element).catch(genericCatch);
						});
					}).catch(genericCatch);
				}).catch(genericCatch);
				break;
			}
			case `botlink`: {
				interaction.reply({ content: gladosLink, ephemeral }).catch(genericCatch);
				break;
			}
			case `sightingslink`: {
				interaction.reply({ content: `https://discord.gg/62jvqRv`, ephemeral }).catch(genericCatch);
				break;
			}
			case `invisicolor`: {
				interaction.reply({ content: `#36393F`, ephemeral }).catch(genericCatch);
				break;
			}
			case `source`: {
				interaction.reply({ content: githublink, ephemeral }).catch(genericCatch);
				break;
			}
			case `userinfo`: {
				info.userInfo({ interaction }).then((message) => {interaction.reply(message).catch(genericCatch);}).catch(genericCatch);
				break;
			}
			case `serverinfo`: {
				info.serverInfo([{ interaction }]);
				break;
			}
			case `joindate`: {
				interaction.reply(info.joindate({ interaction })).catch(genericCatch);
				break;
			}
			case `grid`: {
				interaction.reply(stupidStuff.buttonGrid({ interaction })).catch(genericCatch);
				break;
			}
			case `selectmenu`: {
				interaction.reply(stupidStuff.selectMenu()).catch(genericCatch);
				break;
			}
			case `d`: {
				dice.dice([{ interaction }]);
				break;
			}
			case `xkcd`: {
				xkcd.xkcdFunct([{ interaction }]);
				break;
			}
			case `maze`: {
				maze.mazeFunction([{ interaction }]);
				break;
			}
			case `tictactoe`: {
				ticTacToe.ticTacToe([{ interaction }]);
				break;
			}
			case `coinflip`: {
				coinflip.flip([{ interaction }]);
				break;
			}
			case `gladle`: {
				wordle.startGame(interaction);
				break;
			}
			case `reboot`: {
				interaction.reply({ content: `And when you're gone I'll still be aliiiiii` }).then(() => process.exit()).catch(genericCatch);
				break;
			}
			default: {
				console.warn(interaction);
				interaction.reply({ content: `This command is likely in a test phase`, ephemeral }).catch(genericCatch);
				break;
			}
		}
	}
});
//#endregion

//#endregion

//#region ghost message thing
glados.on(Events.MessageDelete, (message) => {
	const timeout = 10;
	if ((Math.floor(new Date().getTime() / msInS) - Math.floor(message.createdTimestamp / msInS)) < timeout) {
		if (message.author !== null)
			message.channel.send(`${message.author.tag} deleted a message within 10 seconds of sending it`).catch(genericCatch);
	}
});
//#endregion

//#endregion

//#region Pokebot

//#region Stuff
pokebot.on(Events.MessageCreate, (message) => {
	if (message.channel.isDMBased()) return;
	if (blackList.includes(message.channel.name)) return;
	containsWord.replyThing([
		{
			message,
			reply: { content: pokeLink },
			triggers: [`botlink pokebot`],
			type: `anywhere`
		}
	]);
	forwarding.messageForwarding([{ message }]);
	if (pokebot.user !== null) {
		if (message.author.id !== pokebot.user.id) {
			if (message.content.toLowerCase().startsWith(`pd`)) {
				if (message.channel.isSendable() && !message.channel.isThread()) {
					sendAsWebHook([
						{
							message,
							name: pokedex.trainers[Math.round(Math.random() * pokedex.trainers.length)],
							pfp: pokebot.user.avatarURL() ?? ``,
							sendMessage: pokedex.natDex({ query: message.content.toLowerCase().split(` `)[Index.Second] }),
							sendTo: message.channel,
						}
					]);
				}
			}
		}
	}
});
//#endregion

//#endregion

//#region Artoo

//#region Long stuff
// eslint-disable-next-line one-var
const generalRas = `General Ras.\nYears ago you served my father in the Clone Wars.\nNow he begs you to help him in his struggle against the Empire.\nI regret that I am unable to present my father's request to you in person, but my ship has fallen under attack, and I'm afraid my mission to bring you to Alderaan has failed.\nI have placed information vital to the survival of the Rebellion into the memory systems of this R2 unit.\nMy father will know how to retrieve it.\nYou must see this droid safely delivered to him on Alderaan.\nThis is our most desperate hour.\nHelp me, Rasmatham.\nYou're my only hope.`,
starWarsWords = [ `star`, `wars`, `anakin`, `luke`, `obi`, `wan`, `kenobi`, `han`, `solo`, `leia`, `yoda`, `mace`, `windu`, `force`, `c3po`, `chewbacca`, `chewie`, `darth`, `vader`, `maul`, `sidius`, `plagueis`, `c-3po`, `r2`, `d2`, `emperor`, `palpatine`, `skywalker`, `jango`, `fett`, `padme`, `padmé`, `amidala`, `doku`, `tyranus`, `grievous`, `qui`, `gon`, `jinn`, `ackbar`, `tarkin`, `jabba`, `hut`, `lando`, `calrissian`, `boba`, `naboo`, `kashyyyk`, `alderaan`, `geonosis`, `kamino`, `dagobah`, `hoth`, `endor`, `bespin`, `mustafar`, `coruscant`, `tatooine` ];
//#endregion

//#region functions
// eslint-disable-next-line one-var
const beeps = (): string => {
	let str;
	str = ``;
	const beepChance = 2;
	for (let i = 0; i < Math.floor(decimalShift(Math.random(), ShiftBy.P1)); i += inc) 
		str = Math.floor(Math.random() * beepChance) ? `${str}beep ` : `${str}boop `;
	return str;
};
//#endregion

//#region replies
artoo.on(Events.MessageCreate, (message) => {
	if (message.channel.isDMBased()) return;
	if (blackList.includes(message.channel.name)) return;
	containsWord.replyThing([
		{
			message,
			reply: { content: r2Link },
			triggers: [`botlink artoo`],
			type: `anywhere`
		},
		{
			chance: 10,
			message,
			reply: { content: generalRas }, 
			triggers: [ `ras`, `rasmatham`, `rasberry` ],
			type: `exact`
		},
		{
			message,
			reply: { content: beeps() },
			triggers: starWarsWords,
			type: `anywhere`
		}
	]);
	forwarding.messageForwarding([{ message }]);
});
//#endregion

//#endregion

//#region Random

//#region replies
random.on(Events.MessageCreate, (message) => {
	if (message.channel.isDMBased()) return;
	if (blackList.includes(message.channel.name)) return;
	containsWord.replyThing([
		{
			message,
			reply: { content: randomLink },
			triggers: [`botlink random stuff`],
			type: `anywhere`
		},
		{
			message,
			reply: { content: `I like him` },
			triggers: [ `ras`, `rasmatham`, `rasberry` ],
			type: `anywhere`
		}
	]);
	containsWord.reactThing([
		{
			emotes: [`653023282945196042`],
			message,
			triggers: [`espen`],
			type: `exact`
		},
		{
			emotes: [`642497812885405707`],
			message,
			triggers: [`wolfo`],
			type: `exact`
		},
		{
			emotes: [`654428027995815976`],
			message,
			triggers: [`no u`],
			type: `exact`
		},
		{
			emotes: [`699747136144932925`],
			message,
			triggers: [ `emily`, `impa` ],
			type: `exact`
		},
		{
			emotes: [`699743387817082891`],
			message,
			triggers: [ `ahk`, `ahkrin`, `ck`, `ck32`, `creeper_killer`, `creeper_killer32` ],
			type: `exact`
		},
		{
			emotes: [`656207221792702466`],
			message,
			triggers: [ `enndal,`, `ganon`, `ganondorf`, `ganond0rf` ],
			type: `exact`
		},
		{
			emotes: [`656223106788229121`],
			message,
			triggers: [`force`],
			type: `anywhere`
		},
		{
			emotes: [ `👍`, `👎` ],
			message,
			triggers: [ `yes/no`, `yes or no`, `no/yes`, `no or yes` ],
			type: `anywhere`
		},
		{
			emotes: [ `0️⃣`, `1️⃣`, `2️⃣`, `3️⃣`, `4️⃣`, `5️⃣`, `6️⃣`, `7️⃣`, `8️⃣`, `9️⃣`, `🔟` ],
			message,
			triggers: [`multichoice`],
			type: `anywhere`
		}
	]);
	forwarding.messageForwarding([{ message }]);
});
//#endregion

//#endregion

//#region amberbot

//#region Stuff
amber.on(Events.ClientReady, () => {
	amber.users.fetch(`707188499153158204`).then((user) => {
		if (amber.user !== null) {
			amber.user.setAvatar(user.avatarURL()).catch(() => { console.warn(`[${user.tag}] You're probably changing the avatar too fast`); });
			amber.user.setUsername(user.username).catch(() => { console.warn(`[${user.tag}] You're probably changing the username too fast`); });
		}
	}).catch(genericCatch);
});
amber.on(Events.UserUpdate, (oldUser, newUser) => {
	if (amber.user !== null) {
		if (newUser.id === `707188499153158204`) {
			amber.user.setAvatar(newUser.avatarURL()).catch(() => { console.warn(`[${newUser.tag}] You're probably changing the avatar too fast`); });
			amber.user.setUsername(newUser.username).catch(() => { console.warn(`[${newUser.tag}] You're probably changing the username too fast`); });
		}
	}
});
amber.on(Events.MessageCreate, (message) => {
	if (message.channel.isDMBased()) return;
	if (blackList.includes(message.channel.name)) return;
	forwarding.messageForwarding([{ message }]);
});
//#endregion

//#endregion

//#region Zelda

//#region replies
zelda.on(Events.MessageCreate, (message) => {
	if (message.channel.isDMBased()) return;
	if (blackList.includes(message.channel.name)) return;
	containsWord.replyThing([
		{
			message,
			reply: { content: zeldaLink },
			triggers: [`botlink zelda`],
			type: `anywhere`
		},
		{
			chance: 10,
			message,
			reply: { content: `Awesome dude` },
			triggers: [ `ras`, `rasmatham`, `rasberry` ],
			type: `exact`
		}
	]);
	containsWord.reactThing([
		{
			emotes: [`642474761204662284`],
			message,
			triggers: [`courage`],
			type: `anywhere`
		},
		{
			emotes: [`642474761804578826`],
			message,
			triggers: [`power`],
			type: `anywhere`
		},
		{
			emotes: [`642474761821224990`],
			message,
			triggers: [`wisdom`],
			type: `anywhere`
		},
		{
			emotes: [`642474761754247168`],
			message,
			triggers: [`neutral`],
			type: `anywhere`
		}
	]);
	forwarding.messageForwarding([{ message }]);
});
//#endregion

//#endregion

//#region CroissantBot
croissant.on(Events.MessageCreate, (message) => {forwarding.messageForwarding([{ message }]);});
//#endregion

//#region K9

//#region Stuff
canine.on(Events.InteractionCreate, (interaction) => {
	if (interaction.isCommand()) {
		switch (interaction.commandName) {
			case `timestamp`:
			case `Create Timestamp`: {
				timestamps.create([{ interaction }]);
				break;
			}
			case `set_timezone`:
			case `Set Timezone`: {
				timestamps.saveTimezone([{ interaction }]);
				break;
			}
			default: {
				console.warn(interaction);
				interaction.reply({ content: `The command \`${interaction.commandName}\` is still in development`, ephemeral }).catch(genericCatch);
				break;
			}
		}
	} else if (interaction.isModalSubmit()) {
		if (interaction.isFromMessage()) {
			switch (interaction.customId) {
				case `relative`: {
					timestamps.relativeModalInteraction([{ interaction }]);
					break;
				}
				case `absolute`: {
					timestamps.absoluteModalInteraction([{ interaction }]);
					break;
				}
				default: {
					interaction.reply({ content: `Unknown interaction`, ephemeral }).catch(genericCatch);
				}
			}
		} else {
			switch (interaction.customId) {
				case `setTz`: {
					timestamps.saveTimezoneModalResponse([{ interaction }]);
					break;
				}
				default: {
					interaction.reply({ content: `Unknown interaction`, ephemeral }).catch(genericCatch);
				}
			}
		}
	} else if (interaction.isButton()) {
		switch (interaction.customId) {
			case `setTz`:{
				timestamps.saveTimezone([{ interaction }]);
				break;
			}
			case `relative`:{
				timestamps.relativeButtonInteraction([{ interaction }]);
				break;
			}
			case `absolute`:{
				timestamps.absoluteButtonInteraction([{ interaction }]);
				break;
			}
			default: {
				interaction.reply({ content: `Unknown interaction`, ephemeral }).catch(genericCatch);
			}
		}
	}
});
//#endregion

//#endregion

//#endregion
