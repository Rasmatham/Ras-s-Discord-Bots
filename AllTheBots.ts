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
import {Client, Message, MessageEmbed, ColorResolvable, GuildMember, Interaction, MessageComponentInteraction, ButtonInteraction, CommandInteraction, SelectMenuInteraction, PartialGuildMember, BufferResolvable, InteractionReplyOptions} from "discord.js";
import * as containsWord from "./custom_modules/containsWordFunctions";
import * as forwarding from "./custom_modules/forwardMessages";
import * as generalStuff from "./custom_modules/generalUse";
import * as stupidStuff from "./custom_modules/stupidStuff";
import * as inspiroBot from "./custom_modules/inspiroBot";
import * as coinflip from "./custom_modules/coinflip";
import * as maze from "./custom_modules/playableMaze";
import * as pokedex from "./custom_modules/pokedex";
import * as ticTacToe from "./custom_modules/TicTacToe";
//import music from "./custom_modules/music`);
import * as dice from "./custom_modules/dice";
import * as info from "./custom_modules/info";
import * as xkcd from "./custom_modules/xkcd";
import * as wordle from "./custom_modules/wordle/wordle";
import * as dotenv from "dotenv";
dotenv.config();
//#endregion

//#region links
const buzzLink = `https://discordapp.com/oauth2/authorize?&client_id=689449074008653865&scope=bot&permissions=8`;
const ebnjLink = `https://discordapp.com/oauth2/authorize?&client_id=654079161723387914&scope=bot&permissions=8`;
const GladosLink = `https://discordapp.com/oauth2/authorize?&client_id=680053684243398693&scope=bot&permissions=8`;
const pokeLink = `https://discordapp.com/oauth2/authorize?&client_id=716002740442103899&scope=bot&permissions=8`;
const r2Link = `https://discordapp.com/oauth2/authorize?&client_id=688152192196149250&scope=bot&permissions=8`;
const randomLink = `https://discordapp.com/oauth2/authorize?&client_id=654787079590641713&scope=bot&permissions=8`;
const zeldaLink = `https://discordapp.com/oauth2/authorize?&client_id=654786965090074656&scope=bot&permissions=8`;
const githublink = `https://github.com/Rasmatham/Ras-s-Discord-Bots`;
//#endregion

//#region instantiating Clients
const buzzBot:Client = new Client({
	intents: generalStuff.intents,
	presence: {
		activities: [
			{
				name: `Bee Movie Game`,
				type: `PLAYING`
			}
		]
	}
});
const clambot:Client = new Client({
	intents: generalStuff.intents,
	presence: {
		activities: [
			{
				name: `Whatever Clams is playing`,
				type: `PLAYING`
			}
		]
	}
});
const ebnj:Client = new Client({
	intents: generalStuff.intents,
	presence: {
		activities: [
			{
				name: `Minecraft`,
				type: `PLAYING`
			}
		]
	}
});
const glados:Client = new Client({
	intents: generalStuff.intents,
	presence: {
		activities: [
			{
				name: `Portal Bridge Constructor`,
				type: `PLAYING`
			}
		]
	}
});
const pokebot:Client = new Client({
	intents: generalStuff.intents,
	presence: {
		activities: [
			{
				name: `Pokémon Pinball`,
				type: `PLAYING`
			}
		]
	}
});
const artoo:Client = new Client({
	intents: generalStuff.intents,
	presence: {
		activities: [
			{
				name: `LEGO Star Wars: the Skywalker saga`,
				type: `PLAYING`
			}
		]
	}
});
const random:Client = new Client({
	intents: generalStuff.intents,
	presence: {
		activities: [
			{
				name: `honestly, idk what to put here`,
				type: `PLAYING`
			}
		]
	}
});
const sini:Client = new Client({
	intents: generalStuff.intents,
	presence: {
		activities: [
			{
				name: `Splatoon 3`,
				type: `PLAYING`
			}
		]
	}
});
const zelda:Client = new Client({
	intents: generalStuff.intents,
	presence: {
		activities: [
			{
				name: `Zelda: The Wand of Gamelon`,
				type: `PLAYING`
			}
		]
	}
});
const croissant:Client = new Client({
	intents: generalStuff.intents,
	presence: {
		activities: [
			{
				name: `Oui Oui Baguette`,
				type: `PLAYING`
			}
		]
	}
});
//#endregion

//#region logins
buzzBot.login(process.env.BUZZBOTTOKEN).catch(console.error);
clambot.login(process.env.CLAMBOTTOKEN).catch(console.error);
ebnj.login(process.env.EBNJTOKEN).catch(console.error);
glados.login(process.env.GLADOSTOKEN).catch(console.error);
pokebot.login(process.env.POKETOKEN).catch(console.error);
artoo.login(process.env.ARTOOTOKEN).catch(console.error);
random.login(process.env.RANDOMTOKEN).catch(console.error);
sini.login(process.env.SINITOKEN).catch(console.error);
zelda.login(process.env.ZELDATOKEN).catch(console.error);
croissant.login(process.env.CROISSANTTOKEN).catch(console.error);
generalStuff.botReady([
	{
		bots: [
			buzzBot,
			clambot,
			ebnj,
			glados,
			pokebot,
			artoo,
			random,
			sini,
			zelda,
			croissant
		]
	}
]);
//#endregion

//#endregion


//#region individual

//#region BuzzBot

//#region long stuff
const mrtz = `Did you know BeeMrtz is short for Bee Master? He just had a tiny stroke while typing it`;
//#endregion

//#region functions
const buzzes = ():string => {
	let str = ``;
	for (let i = 0; i < Math.floor(Math.random() * 9); i++) {
		if (Math.floor(Math.random() * 2)) {
			str = `${
				str
			}buzz `;
		}
		else {
			str = `${
				str
			}buzz, `;
		}
	}
	str = `${
		str
	}buzz`;
	return str;
};
//#endregion

//#region replies
buzzBot.on(`messageCreate`, (message: Message):void => {
	if (message.channel.type == `DM`) {
		return;
	}
	if (generalStuff.blackList.includes(message.channel.name)) {
		return;
	}
	containsWord.replyThing([
		{
			message: message,
			type: `exact`,
			chance: 10,
			reply: {
				content: `He makes me go buzz`
			},
			triggers: [
				`ras`,
				`rasmatham`,
				`rasberry`
			]
		},
		{
			message: message,
			type: `exact`,
			chance: 10,
			reply: {
				content: `It's BeeMrtz, you insensitive prick!`
			},
			triggers: [
				`bymrtz`
			]
		},
		{
			message: message,
			type: `exact`,
			chance: 10,
			reply: {
				content: mrtz
			},
			triggers: [
				`mrtz`,
				`beemrtz`,
				`rasberry`
			]
		},
		{
			message: message,
			type: `anywhere`,
			reply: {
				content: buzzLink
			},
			triggers: [
				`botlink buzzbot`
			]
		},
		{
			message: message,
			type: `anywhere`,
			reply: {
				content: `The hivemind is the absolute truth`
			},
			triggers: [
				`hive`
			]
		},
		{
			message: message,
			type: `anywhere`,
			reply: {
				content: `you have no choice`
			},
			triggers: [
				`join us`
			]
		},
		{
			message: message,
			type: `anywhere`,
			reply: {
				content: buzzes()
			},
			triggers: [
				`buzz`
			]
		}
	]);
	forwarding.messageForwarding([{message: message}]);
	//music(message, `bb;`);
});
//#endregion

//#endregion

//#region Clambot

//#region Stuff
clambot.on(`ready`, () => {
	clambot.users.fetch(`588511925944582186`).then((fetchedUser) => {
		if (clambot.user != null) {
			clambot.user.setAvatar(fetchedUser.avatarURL()).catch(() => console.log(`[${fetchedUser.tag}] You're probably changing the avatar too fast`));
			clambot.user.setUsername(fetchedUser.username).catch(() => console.log(`[${fetchedUser.tag}] You're probably changing the username too fast`));
		}
	});
});
clambot.on(`userUpdate`, (oldUser, newUser) => {
	if (clambot.user != null) {
		if (newUser.id == `588511925944582186`) {
			clambot.user.setAvatar(newUser.avatarURL()).catch(() => console.log(`[${newUser.tag}] You're probably changing the avatar too fast`));
			clambot.user.setUsername(newUser.username).catch(() => console.log(`[${newUser.tag}] You're probably changing the username too fast`));
		}
	}
});
clambot.on(`messageCreate`, (message: Message):void => {
	if (message.channel.type == `DM`) {
		return;
	}
	if (generalStuff.blackList.includes(message.channel.name)) {
		return;
	}
	containsWord.replyThing([
		{
			message: message,
			type: `anywhere`,
			reply: {
				content: `PING!`
			},
			triggers: [
				`<@&`
			]
		}
	]);
	//forwarding.DMSpy(message, `764479509138636810`);
	forwarding.messageForwarding([{message: message}]);
	//music(message, `cb;`);
});
//#endregion

//#endregion

//#region EBNJ

//#region replies
ebnj.on(`messageCreate`, (message: Message):void => {
	if (message.channel.type == `DM`) {
		return;
	}
	if (generalStuff.blackList.includes(message.channel.name)) {
		return;
	}
	containsWord.replyThing([
		{
			message: message,
			type: `anywhere`,
			reply: {
				content: ebnjLink
			},
			triggers: [
				`botlink ebnj`
			]
		},
		{
			message: message,
			type: `anywhere`,
			reply: {
				content: `🦆 <:Minecoins:656622021240815623>`
			},
			triggers: [
				`minecoin`
			]
		},
		{
			message: message,
			type: `anywhere`,
			reply: {
				content: `Nice\nJava`
			},
			triggers: [
				`java`
			]
		},
		{
			message: message,
			type: `anywhere`,
			reply: {
				content: `Ew\nBedrock`
			},
			triggers: [
				`bedrock`
			]
		},
		{
			message: message,
			type: `anywhere`,
			reply: {
				content: `R.I.P. Earth\nApparently nobody liked you`
			},
			triggers: [
				`earth`
			]
		},
		{
			message: message,
			type: `exact`,
			chance: 10,
			reply: {
				content: `Cool\nRas`
			},
			triggers: [
				`ras`,
				`rasmatham`,
				`rasberry`
			]
		}
	]);
	containsWord.reactThing([
		{
			message: message,
			type: `anywhere`,
			emotes: [
				`🇫`,
				`🇺`,
				`🇨`,
				`🇰`,
				`➖`,
				`🇩`,
				`ℹ️`,
				`🇴`,
				`🇷`,
				`🇮`,
				`🇹`,
				`🇪`
			],
			triggers: [
				`diorite`
			]
		}
	]);
	forwarding.messageForwarding([{message: message}]);
	//music(message, `eb;`);
});
//#endregion

//#endregion

//#region GLaDOS

//#region Long stuff (please collapse)
const cake = `It is totally real (Definitely not a lie)`;
const lemonrant = `All right, I've been thinking, when life gives you lemons, don't make lemonade!\nMake life take the lemons back!\nGet mad!\nI don't want your damn lemons!\nWhat am I supposed to do with these?\nDemand to see life's manager!\nMake life rue the day it thought it could give Cave Johnson lemons!\nDo you know who I am?\nI'm the man whose gonna burn your house down - with the lemons!`;
const lie = `I will tell you what is not a lie\nThe cake`;
const ping = `P I N G\nWait\nNevermind`;
const stillalive:MessageEmbed = new MessageEmbed()
	.setColor(`FFFFFF` as ColorResolvable)
	.setTitle(`Still alive`)
	.addFields({
		name: `᲼`,
		value: `This was a triumph\nI'm taking a note here: "HUGE SUCCESS"\nIt's hard to overstate\nMy satisfaction`,
	},
	{
		name: `᲼`,
		value: `Aperture Science\nWe do what we must because we can\nFor the good of all of us\nExcept the ones who are dead`,
	},
	{
		name: `᲼`,
		value: `But there's no sense crying over every mistake\nYou just keep on trying till you run out of cake\nAnd the science gets done, and you make a neat gun\nFor the people who are still alive`,
	},
	{
		name: `᲼`,
		value: `I'm not even angry\nI'm being so sincere right now\nEven though you broke my heart\nAnd killed me`,
	},
	{
		name: `᲼`,
		value: `And tore me to pieces\nAnd threw every piece into a fire\nAs they burned, it hurt because\nI was so happy for you`,
	},
	{
		name: `᲼`,
		value: `Now these points of data make a beautiful line\nAnd we're out of beta, we're releasing on time\nSo I'm GLaD I got burned: think of the things we learned\nFor the people who are still alive`,
	},
	{
		name: `᲼`,
		value: `Go ahead and leave me\nI think I prefer to stay inside\nMaybe you'll find someone else\nTo help you`,
	},
	{
		name: `᲼`,
		value: `Maybe Black Mesa\nThat was a joke. Haha, fat chance\nAnyway, this cake is great\nIt's so delicious and moist`,
	},
	{
		name: `᲼`,
		value: `Look at me still talking when there's Science to do\nWhen I look out there, it makes me GLaD I'm not you\nI've experiments to run; there is research to be done\nOn the people who are still alive`,
	},
	{
		name: `᲼`,
		value: `And believe me, I am still alive\nI'm doing science and I'm still alive\nI feel fantastic and I'm still alive\nWhile you're dying, I'll be still alive`,
	},
	{
		name: `᲼`,
		value: `And when you're dead, I will be still alive\nStill alive, still alive...`,
	});
//#endregion

//#region welcome/goodbye Message
glados.on(`guildMemberAdd`, (member: GuildMember):void => {
	if (member.guild.systemChannel != null) {
		member.guild.systemChannel.send({
			content: `Welcome to the server, #${
				member.guild.memberCount
			}\nWe currently have ${
				info.channelCount({guild: member.guild}).all
			}/500 channels used`
		})
			.catch(console.error);
	}
});
glados.on(`guildMemberRemove`, (member: GuildMember|PartialGuildMember):void => {
	if (member.guild.systemChannel != null) {
		member.guild.systemChannel.send({
			content: `Bye, ${
				member.user.tag
			}`
		})
			.catch(console.error);
	}
});
//#endregion

//#region replies

//#region Stuff
glados.on(`messageCreate`, (message: Message):void => {
	if (message.channel.type == `DM`) {
		return;
	}
	if (generalStuff.blackList.includes(message.channel.name)) {
		return;
	}
	containsWord.replyThing([
		{
			message: message,
			type: `anywhere`,
			reply: {
				content: cake
			},
			triggers: [
				`cake`,
				`tower 15`
			]
		},
		{
			message: message,
			type: `anywhere`,
			reply: {
				files: [
					{
						attachment: `./GLaDOS/files/lemonade.png`,
						name: `test.png`
					}
				],
				content: lemonrant
			},
			triggers: [
				`lemon`,
				`🍋`
			]
		},
		{
			message: message,
			type: `exact`,
			reply: {
				content: lie
			},
			triggers: [
				`lie`
			]
		},
		{
			message: message,
			type: `anywhere`,
			reply: {
				files: [
					`./GLaDOS/files/BSOD.png`
				]
			},
			triggers: [
				`neurotoxin`
			]
		},
		{
			message: message,
			type: `exact`,
			reply: {
				content: `<@${
					process.env.RASID
				}>`
			},
			triggers: [
				`@ras`
			]
		},
		{
			message: message,
			type: `exact`,
			reply: {
				content: `<@454340813388775445>`
			},
			triggers: [
				`@kelp`
			]
		},
		{
			message: message,
			type: `anywhere`,
			reply: {
				embeds: [
					stillalive
				]
			},
			triggers: [
				`still alive`
			]
		},
		{
			message: message,
			type: `mention`,
			reply: {
				content: `P I N G`
			},
			triggers: [
				`680053684243398693`
			]
		},
		{
			message: message,
			type: `mention`,
			reply: {
				content: ping
			},
			triggers: [
				`654074851337699328`
			]
		},
		{
			message: message,
			type: `exact`,
			chance: 10,
			reply: {
				content: `He's a superior lifeform`
			},
			triggers: [
				`ras`,
				`rasmatham`,
				`rasberry`
			]
		},
		{
			message: message,
			type: `exact`,
			chance: 10,
			reply: {
				content: `Did you mean: Czechia?`
			},
			triggers: [
				`cz`,
				`cz12345`
			]
		},
		{
			message: message,
			type: `exact`,
			chance: 50,
			reply: {
				content: `Say hi to him for me 😳`
			},
			triggers: [
				`espen bot`
			]
		}
	]);
	containsWord.reactThing([
		{
			message: message,
			type: `anywhere`,
			emotes: [
				`838084115629735976`
			],
			triggers: [
				`science`
			]
		},
		{
			message: message,
			type: `anywhere`,
			emotes: [
				`838084115391053844`
			],
			triggers: [
				`blue`
			]
		},
		{
			message: message,
			type: `anywhere`,
			emotes: [
				`838084116653670420`
			],
			triggers: [
				`orange`
			]
		}
	]);
	forwarding.channelLink([{message: message, ch1: `842486821510447115`, ch2: `842486725347508266`}]);
	inspiroBot.sendMessage([{message: message}]);
	//forwarding.DMSpy(message, `741333824494895144`);
	forwarding.messageForwarding([{message: message}]);
	//music(message, GLaDOSPrefix);
	stupidStuff.hencefortifier([{message: message}]);
	stupidStuff.espenBotReplacement([
		{
			type: `message`,
			message: message,
			chance: 1,
			victim: process.env.RASID as `${bigint}`,
			out: {
				content: `https://cdn.discordapp.com/attachments/735213241860620308/781189544103247922/unknown.png`
			}
		}
	]);
	stupidStuff.espenBotReplacement([
		{
			type: `react`,
			message: message,
			chance: 100,
			victim: process.env.ZARLID as `${bigint}`,
			out: `🦆`
		}
	]);
	//stupidStuff.userWordBan(message, `last`, `541617670533939210`);
});
glados.on(`interactionCreate`, async (interaction: Interaction):Promise<void> => {
	if (interaction.type == `MESSAGE_COMPONENT`) {
		const messageComponentInteraction:MessageComponentInteraction = interaction as MessageComponentInteraction;
		if (messageComponentInteraction.componentType == `BUTTON`) {
			const buttonInteraction:ButtonInteraction = messageComponentInteraction as ButtonInteraction;
			if (buttonInteraction.customId.toLowerCase().includes(`dummy`)) {
				buttonInteraction.reply({
					content: `That button worked`,
					ephemeral: true
				})
					.catch(console.error);
			}
		}
		else if (messageComponentInteraction.componentType == `SELECT_MENU`) {
			const selectMenuInteraction:SelectMenuInteraction = messageComponentInteraction as SelectMenuInteraction;
			switch (selectMenuInteraction.customId) {
			case `Dummy`:
				selectMenuInteraction.update({
					content: `Seems about right`
				})
					.catch(console.error);
				break;
			default:
				break;
			}
		}
	}
	else if (interaction.type == `APPLICATION_COMMAND`) {
		const commandInteraction:CommandInteraction = interaction as CommandInteraction;
		switch (commandInteraction.commandName) {
		case `list`:
			// eslint-disable-next-line no-case-declarations
			const x = await generalStuff.listThings(commandInteraction);
			commandInteraction.reply(x[0]).then(async () => {
				x.shift();
				x.forEach(element => {
					commandInteraction.followUp(element);
				});
			});
			
			break;
		case `botlink`:
			commandInteraction.reply({
				content: GladosLink,
				ephemeral: true
			}).catch(console.error);
			break;
		case `sightingslink`:
			commandInteraction.reply({
				content: `https://discord.gg/62jvqRv`,
				ephemeral: true
			}).catch(console.error);
			break;
		case `invisicolor`:
			commandInteraction.reply({
				content: `#36393F`,
				ephemeral: true
			}).catch(console.error);
			break;
		case `source`:
			commandInteraction.reply({
				content: githublink,
				ephemeral: true
			}).catch(console.error);
			break;
		case `userinfo`:
			info.userInfo({interaction: commandInteraction}).then((message) => {
				commandInteraction.reply(message);
			});
			break;
		case `serverinfo`:
			info.serverInfo([{interaction: commandInteraction}]);
			break;
		case `joindate`:
			commandInteraction.reply(info.joindate({interaction: commandInteraction})).catch(console.error);
			break;
		case `grid`:
			commandInteraction.reply(stupidStuff.buttonGrid({interaction: commandInteraction}) as InteractionReplyOptions).catch(console.error);
			break;
		case `selectmenu`:
			commandInteraction.reply(stupidStuff.selectMenu()).catch(console.error);
			break;
		case `d`:
			dice.dice([{interaction: commandInteraction}]);
			break;
		case `xkcd`:
			xkcd.xkcdFunct([{interaction: commandInteraction}]);
			break;
		case `maze`:
			maze.mazeFunction([{interaction: commandInteraction}]);
			break;
		case `tictactoe`:
			ticTacToe.ticTacToe([{interaction: commandInteraction}]);
			break;
		case `coinflip`:
			coinflip.flip([{interaction: commandInteraction}]);
			break;
		case `gladle`:
			wordle.startGame(commandInteraction);
			break;
		default:
			console.log(commandInteraction);
			commandInteraction.reply({ephemeral: true, content: `This command is likely in a test phase`});
			break;
		}
	}
});
//#endregion

//#endregion

//#region ghost message thing
glados.on(`messageDelete`, (message):void => {
	if ((Math.floor(new Date().getTime() / 1000) - Math.floor(message.createdTimestamp / 1000)) < 10) {
		if (message.author != null) {
			message.channel.send(`${message.author.tag} deleted a message within 10 seconds of sending it`);
		}
	}
});
//#endregion

//#endregion

//#region Pokebot

//#region search
const sendEmbed = (message: Message):void => {
	if (pokebot.user != null) {
		if (message.author.id != pokebot.user.id) {
			if (message.content.toLowerCase().startsWith(`pd`)) {
				if (message.channel.type == `GUILD_TEXT` || message.channel.type == `GUILD_NEWS`) {
					generalStuff.sendAsWebHook([
						{
							message: message,
							sendTo: message.channel,
							sendMessage: pokedex.natDex({query: message.content.toLowerCase().split(` `)[1]}),
							name: pokedex.trainers[Math.round(Math.random() * pokedex.trainers.length)],
							PFP: pokebot.user.avatarURL() as BufferResolvable
						}
					]);
				}
			}
		}
	}
};
//#endregion

//#region Stuff
pokebot.on(`messageCreate`, (message: Message):void => {
	if (message.channel.type == `DM`) {
		return;
	}
	if (generalStuff.blackList.includes(message.channel.name)) {
		return;
	}
	containsWord.replyThing([
		{
			message: message,
			type: `anywhere`,
			reply: {
				content: pokeLink
			},
			triggers: [
				`botlink pokebot`
			]
		}
	]);
	forwarding.messageForwarding([{message: message}]);
	//music(message, PokePrefix);
	sendEmbed(message);
});
//#endregion

//#endregion

//#region Artoo

//#region Long stuff
const generalRas = `General Ras.\nYears ago you served my father in the Clone Wars.\nNow he begs you to help him in his struggle against the Empire.\nI regret that I am unable to present my father's request to you in person, but my ship has fallen under attack, and I'm afraid my mission to bring you to Alderaan has failed.\nI have placed information vital to the survival of the Rebellion into the memory systems of this R2 unit.\nMy father will know how to retrieve it.\nYou must see this droid safely delivered to him on Alderaan.\nThis is our most desperate hour.\nHelp me, Rasmatham.\nYou're my only hope.`;
const SWWords:string[] = [
	`star`,
	`wars`,
	`anakin`,
	`luke`,
	`obi`,
	`wan`,
	`kenobi`,
	`han`,
	`solo`,
	`leia`,
	`yoda`,
	`mace`,
	`windu`,
	`force`,
	`c3po`,
	`chewbacca`,
	`chewie`,
	`darth`,
	`vader`,
	`maul`,
	`sidius`,
	`plagueis`,
	`c-3po`,
	`r2`,
	`d2`,
	`emperor`,
	`palpatine`,
	`skywalker`,
	`jango`,
	`fett`,
	`padme`,
	`padmé`,
	`amidala`,
	`doku`,
	`tyranus`,
	`grievous`,
	`qui`,
	`gon`,
	`jinn`,
	`ackbar`,
	`tarkin`,
	`jabba`,
	`hut`,
	`lando`,
	`calrissian`,
	`boba`,
	`naboo`,
	`kashyyyk`,
	`alderaan`,
	`geonosis`,
	`kamino`,
	`dagobah`,
	`hoth`,
	`endor`,
	`bespin`,
	`mustafar`,
	`coruscant`,
	`tatooine`
];
//#endregion

//#region functions
const beeps = ():string => {
	let str = ``;
	for (let i = 0; i < Math.floor(Math.random() * 10); i++) {
		if (Math.floor(Math.random() * 2)) {
			str = `${
				str
			}beep `;
		}
		else {
			str = `${
				str
			}boop `;
		}
	}
	return str;
};
//#endregion

//#region replies
artoo.on(`messageCreate`, (message: Message):void => {
	if (message.channel.type == `DM`) {
		return;
	}
	if (generalStuff.blackList.includes(message.channel.name)) {
		return;
	}
	containsWord.replyThing([
		{
			message: message,
			type: `anywhere`,
			reply: {
				content: r2Link
			},
			triggers: [
				`botlink artoo`
			]
		},
		{
			message: message,
			type: `exact`,
			chance: 10,
			reply: {
				content: generalRas
			}, 
			triggers: [
				`ras`,
				`rasmatham`,
				`rasberry`
			]
		},
		{
			message: message,
			type: `anywhere`,
			reply: {
				content: beeps()
			},
			triggers: SWWords
		}
	]);
	forwarding.messageForwarding([{message: message}]);
	//music(message, `r2;`);
});
//#endregion

//#endregion

//#region Random

//#region replies
random.on(`messageCreate`, (message: Message):void => {
	if (message.channel.type == `DM`) {
		return;
	}
	if (generalStuff.blackList.includes(message.channel.name)) {
		return;
	}
	containsWord.replyThing([
		{
			message: message,
			type: `anywhere`,
			reply: {
				content: randomLink
			},
			triggers: [
				`botlink random stuff`
			]
		},
		{
			message: message,
			type: `anywhere`,
			reply: {
				content: `I like him`
			},
			triggers: [
				`ras`,
				`rasmatham`,
				`rasberry`
			]
		}
	]);
	containsWord.reactThing([
		{
			message: message, 
			type: `exact`,
			emotes: [
				`653023282945196042`
			],
			triggers: [
				`espen`
			]
		},
		{
			message: message, 
			type: `exact`,
			emotes: [
				`642497812885405707`
			],
			triggers: [
				`wolfo`
			]
		},
		{
			message: message,
			type: `exact`,
			emotes: [
				`654428027995815976`
			],
			triggers: [
				`no u`
			]
		},
		{
			message: message,
			type: `exact`,
			emotes: [
				`699747136144932925`
			],
			triggers: [
				`emily`,
				`impa`
			]
		},
		{
			message: message,
			type: `exact`,
			emotes: [
				`699743387817082891`
			],
			triggers: [
				`ahk`,
				`ahkrin`,
				`ck`,
				`ck32`,
				`creeper_killer`,
				`creeper_killer32`
			]
		},
		{
			message: message,
			type: `exact`,
			emotes: [
				`656207221792702466`
			],
			triggers: [
				`enndal,`,
				`ganon`,
				`ganondorf`,
				`ganond0rf`
			]
		},
		{
			message: message,
			type: `anywhere`,
			emotes: [
				`656223106788229121`
			],
			triggers: [
				`force`
			]
		},
		{
			message: message,
			type: `anywhere`,
			emotes: [
				`👍`,
				`👎`
			],
			triggers: [
				`yes/no`,
				`yes or no`,
				`no/yes`,
				`no or yes`
			]
		},
		{
			message: message,
			type: `anywhere`,
			emotes: [
				`0️⃣`,
				`1️⃣`,
				`2️⃣`,
				`3️⃣`,
				`4️⃣`,
				`5️⃣`,
				`6️⃣`,
				`7️⃣`,
				`8️⃣`,
				`9️⃣`,
				`🔟`
			],
			triggers: [
				`multichoice`
			]
		}
	]);
	forwarding.messageForwarding([{message: message}]);
	//music(message, `random;`);
});
//#endregion

//#endregion

//#region sinibot

//#region Stuff
sini.on(`ready`, () => {
	sini.users.fetch(`707188499153158204`).then((user) => {
		if (sini.user != null) {
			sini.user.setAvatar(user.avatarURL()).catch(() => console.log(`[${user.tag}] You're probably changing the avatar too fast`));
			sini.user.setUsername(user.username).catch(() => console.log(`[${user.tag}] You're probably changing the username too fast`));
		}
	});
});
sini.on(`userUpdate`, (oldUser, newUser) => {
	if (sini.user != null) {
		if (newUser.id == `707188499153158204`) {
			sini.user.setAvatar(newUser.avatarURL()).catch(() => console.log(`[${newUser.tag}] You're probably changing the avatar too fast`));
			sini.user.setUsername(newUser.username).catch(() => console.log(`[${newUser.tag}] You're probably changing the username too fast`));
		}
	}
});
sini.on(`messageCreate`, (message: Message):void => {
	if (message.channel.type == `DM`) {
		return;
	}
	if (generalStuff.blackList.includes(message.channel.name)) {
		return;
	}
	forwarding.messageForwarding([{message: message}]);
	//music(message, `sn;`);
});
//#endregion

//#endregion

//#region Zelda

//#region replies
zelda.on(`messageCreate`, (message: Message):void => {
	if (message.channel.type == `DM`) {
		return;
	}
	if (generalStuff.blackList.includes(message.channel.name)) {
		return;
	}
	containsWord.replyThing([
		{
			message: message,
			type: `anywhere`,
			reply: {
				content: zeldaLink
			},
			triggers: [
				`botlink zelda`
			]
		},
		{
			message: message,
			type: `exact`,
			chance: 10,
			reply: {
				content: `Awesome dude`
			},
			triggers: [
				`ras`,
				`rasmatham`,
				`rasberry`
			]
		}
	]);
	containsWord.reactThing([
		{
			message: message,
			type: `anywhere`,
			emotes: [
				`642474761204662284`
			],
			triggers: [
				`courage`
			]
		},
		{
			message: message,
			type: `anywhere`,
			emotes: [
				`642474761804578826`
			],
			triggers: [
				`power`
			]
		},
		{
			message: message,
			type: `anywhere`,
			emotes: [
				`642474761821224990`
			],
			triggers: [
				`wisdom`
			]
		},
		{
			message: message,
			type: `anywhere`,
			emotes: [
				`642474761754247168`
			],
			triggers: [
				`neutral`
			]
		}
	]);
	forwarding.messageForwarding([{message: message}]);
	//music(message, `zd;`);
});
//#endregion

//#endregion

//#endregion