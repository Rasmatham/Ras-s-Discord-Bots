/*
╔═════════════════════════════════════════════════════╦═╦═╦═╗
║ Command Prompt                                      ║-║▫║X║
╠═════════════════════════════════════════════════════╩═╩═╩═╣
║ These bots were made by RasMatHam#0001                    ║
║ Feel free to do whatever you want with the code           ║
║ as long as it isn't just a copy/paste of the entire thing ║
║ C:\WINDOWS\system32>echo Hello, World!                    ║
╚═══════════════════════════════════════════════════════════╝
*/

import { Client, Message, MessageEmbed, ColorResolvable, GuildMember, Interaction, MessageComponentInteraction, ButtonInteraction, CommandInteraction, MessageActionRow, SelectMenuInteraction } from "discord.js";
import containsWord = require("./custom_modules/containsWordFunctions");
import forwarding = require("./custom_modules/forwardMessages");
import generalStuff = require("./custom_modules/generalUse");
import stupidStuff = require("./custom_modules/stupidStuff");
import inspiroBot = require("./custom_modules/inspiroBot");
import coinflip = require("./custom_modules/coinflip");
import maze = require("./custom_modules/playableMaze");
import pokedex = require("./custom_modules/pokedex");
import ticTacToe = require("./custom_modules/TicTacToe");
//import music = require("./custom_modules/music`);
import dice = require("./custom_modules/dice");
import info = require("./custom_modules/info");
import xkcd = require("./custom_modules/xkcd");
require(`dotenv`).config();

//Common
//Other Variables
const buzzLink:string = `https://discordapp.com/oauth2/authorize?&client_id=689449074008653865&scope=bot&permissions=8`;
const ebnjLink:string = `https://discordapp.com/oauth2/authorize?&client_id=654079161723387914&scope=bot&permissions=8`;
const GladosLink:string = `https://discordapp.com/oauth2/authorize?&client_id=680053684243398693&scope=bot&permissions=8`;
const pokeLink:string = `https://discordapp.com/oauth2/authorize?&client_id=716002740442103899&scope=bot&permissions=8`;
const r2Link:string = `https://discordapp.com/oauth2/authorize?&client_id=688152192196149250&scope=bot&permissions=8`;
const randomLink:string = `https://discordapp.com/oauth2/authorize?&client_id=654787079590641713&scope=bot&permissions=8`;
const zeldaLink:string = `https://discordapp.com/oauth2/authorize?&client_id=654786965090074656&scope=bot&permissions=8`;
const githublink:string = `https://github.com/Rasmatham/Ras-s-Discord-Bots`
const buzzBot:Client		= new Client({intents: generalStuff.intents, presence: {activities: [{name: `Bee Movie Game`,						type: `PLAYING`}]}});
const clambot:Client		= new Client({intents: generalStuff.intents, presence: {activities: [{name: `Whatever Clams is playing`,			type: `PLAYING`}]}});
const ebnj:Client		= new Client({intents: generalStuff.intents, presence: {activities: [{name: `Minecraft`,							type: `PLAYING`}]}});
const glados:Client		= new Client({intents: generalStuff.intents, presence: {activities: [{name: `Portal Bridge Constructor`,			type: `PLAYING`}]}});
const pokebot:Client		= new Client({intents: generalStuff.intents, presence: {activities: [{name: `Pokémon Pinball`,						type: `PLAYING`}]}});
const artoo:Client		= new Client({intents: generalStuff.intents, presence: {activities: [{name: `LEGO Star Wars: the Skywalker saga`,	type: `PLAYING`}]}});
const random:Client		= new Client({intents: generalStuff.intents, presence: {activities: [{name: `honestly, idk what to put here`,		type: `PLAYING`}]}});
const sini:Client		= new Client({intents: generalStuff.intents, presence: {activities: [{name: `Splatoon 3`,							type: `PLAYING`}]}});
const zelda:Client		= new Client({intents: generalStuff.intents, presence: {activities: [{name: `Zelda: The Wand of Gamelon`,			type: `PLAYING`}]}});
const croissant:Client	= new Client({intents: generalStuff.intents, presence: {activities: [{name: `Oui Oui Baguette`,						type: `PLAYING`}]}});
const testChannel:`${bigint}` = `735213241860620308`;
const PokePrefix:string = `pd`;
const GLaDOSPrefix:string = `&`;
//logins
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
generalStuff.botReady([buzzBot, clambot, ebnj, glados, pokebot, artoo, random, sini, zelda, croissant]);


//BuzzBot
//long stuff
const mrtz:string = `Did you know BeeMrtz is short for Bee Master? He just had a tiny stroke while typing it`;
//functions
const buzzes = ():string => {
	let str:string = ``;
	for (let i:number = 0; i < Math.floor(Math.random() * 9); i++) {
		if (Math.floor(Math.random() * 2)) {
			str = `${str}buzz `;
		} else {
			str = `${str}buzz, `;
		}
	}
	str = `${str}buzz`;
	return str;
}
//replies
buzzBot.on(`messageCreate`, (message: Message):void => {
	if (message.channel.type == `DM`) {return}
	if (generalStuff.blackList.includes(message.channel.name)) {return};
	containsWord.replyThing(message, `exact`, 10, {content: `He makes me go buzz`}, [`ras`, `rasmatham`, `rasberry`]);
	containsWord.replyThing(message, `exact`, 10, {content: `It's BeeMrtz, you insensitive prick!`}, [`bymrtz`]);
	containsWord.replyThing(message, `exact`, 10, {content: mrtz}, [`mrtz`, `beemrtz`, `rasberry`]);
	containsWord.replyThing(message, `anywhere`, 100, {content: buzzLink}, [`botlink buzzbot`]);
	containsWord.replyThing(message, `anywhere`, 100, {content: `The hivemind is the absolute truth`}, [`hive`]);
	containsWord.replyThing(message, `anywhere`, 100, {content: `you have no choice`}, [`join us`]);
	containsWord.replyThing(message, `anywhere`, 100, {content: buzzes()}, [`buzz`]);
	forwarding.messageForwarding(message);
	//music(message, `bb;`);
})

//Clambot
//Stuff
clambot.on(`messageCreate`, (message: Message):void => {
	if (message.channel.type == `DM`) {return}
	if (generalStuff.blackList.includes(message.channel.name)) {return};
	containsWord.replyThing(message, `anywhere`, 100, {content: `PING!`}, [`<@&`]);
	//forwarding.DMSpy(message, `764479509138636810`);
	forwarding.messageForwarding(message);
	//music(message, `cb;`);
})

//EBNJ
//replies
ebnj.on(`messageCreate`, (message: Message):void => {
	if (message.channel.type == `DM`) {return}
	if (generalStuff.blackList.includes(message.channel.name)) {return};
	containsWord.replyThing(message, `anywhere`, 100, {content: ebnjLink}, [`botlink ebnj`]);
	containsWord.replyThing(message, `anywhere`, 100, {content: `🦆 <:Minecoins:656622021240815623>`}, [`minecoin`]);
	containsWord.replyThing(message, `anywhere`, 100, {content: `Nice\nJava`}, [`java`]);
	containsWord.replyThing(message, `anywhere`, 100, {content: `Ew\nBedrock`}, [`bedrock`]);
	containsWord.replyThing(message, `anywhere`, 100, {content: `R.I.P. Earth\nApparently nobody liked you`}, [`earth`]);
	containsWord.replyThing(message, `exact`, 10, {content: `Cool\nRas`}, [`ras`, `rasmatham`, `rasberry`]);
	containsWord.reactThing(message, `anywhere`, 100, [`🇫`, `🇺`, `🇨`, `🇰`, `➖`, `🇩`, `ℹ️`, `🇴`, `🇷`, `🇮`, `🇹`, `🇪`], [`diorite`]);
	forwarding.messageForwarding(message);
	//music(message, `eb;`);
})

//GLaDOS
//Long stuff (please collapse)
const cake:string = `It is totally real (Definitely not a lie)`;
const lemonrant:string = `All right, I've been thinking, when life gives you lemons, don't make lemonade!\nMake life take the lemons back!\nGet mad!\nI don't want your damn lemons!\nWhat am I supposed to do with these?\nDemand to see life's manager!\nMake life rue the day it thought it could give Cave Johnson lemons!\nDo you know who I am?\nI'm the man whose gonna burn your house down - with the lemons!`;
const lie:string = `I will tell you what is not a lie\nThe cake`;
const ping:string = `P I N G\nWait\nNevermind`;
const stillalive:MessageEmbed = new MessageEmbed()
.setColor(`FFFFFF` as ColorResolvable)
.setTitle(`Still alive`)
.addFields({
	name: `᲼`,
	value: `This was a triumph\nI'm taking a note here: "HUGE SUCCESS"\nIt's hard to overstate\nMy satisfaction`,
}, {
	name: `᲼`,
	value: `Aperture Science\nWe do what we must because we can\nFor the good of all of us\nExcept the ones who are dead`,
}, {
	name: `᲼`,
	value: `But there's no sense crying over every mistake\nYou just keep on trying till you run out of cake\nAnd the science gets done, and you make a neat gun\nFor the people who are still alive`,
}, {
	name: `᲼`,
	value: `I'm not even angry\nI'm being so sincere right now\nEven though you broke my heart\nAnd killed me`,
}, {
	name: `᲼`,
	value: `And tore me to pieces\nAnd threw every piece into a fire\nAs they burned, it hurt because\nI was so happy for you`,
}, {
	name: `᲼`,
	value: `Now these points of data make a beautiful line\nAnd we're out of beta, we're releasing on time\nSo I'm GLaD I got burned: think of the things we learned\nFor the people who are still alive`,
}, {
	name: `᲼`,
	value: `Go ahead and leave me\nI think I prefer to stay inside\nMaybe you'll find someone else\nTo help you`,
}, {
	name: `᲼`,
	value: `Maybe Black Mesa\nThat was a joke. Haha, fat chance\nAnyway, this cake is great\nIt's so delicious and moist`,
}, {
	name: `᲼`,
	value: `Look at me still talking when there's Science to do\nWhen I look out there, it makes me GLaD I'm not you\nI've experiments to run; there is research to be done\nOn the people who are still alive`,
}, {
	name: `᲼`,
	value: `And believe me, I am still alive\nI'm doing science and I'm still alive\nI feel fantastic and I'm still alive\nWhile you're dying, I'll be still alive`,
}, {
	name: `᲼`,
	value: `And when you're dead, I will be still alive\nStill alive, still alive...`,
});
//welcome/goodbye Message
glados.on(`guildMemberAdd`, (member: GuildMember):void => {
	member.guild.systemChannel.send({content: `Welcome to the server, #${member.guild.memberCount}\nWe currently have ${info.channelCount(member.guild).all}/500 channels used`})
	.catch(console.error);
})
glados.on(`guildMemberRemove`, (member: GuildMember):void => {
	member.guild.systemChannel.send({content: `Bye, ${member.user.tag}`})
	.catch(console.error);
})
//replies
//Stuff
glados.on(`messageCreate`, (message: Message):void => {
	if(message.channel.type == `DM`) {return}
	if (generalStuff.blackList.includes(message.channel.name)) {return};
	containsWord.replyThing(message, `anywhere`, 100, {content: cake}, [`cake`, `tower 15`]);
	containsWord.replyThing(message, `anywhere`, 100, {files: [{attachment: `./GLaDOS/files/lemonade.png`, name: `test.png`}], content: lemonrant}, [`lemon`, `🍋`]);
	containsWord.replyThing(message, `exact`, 100, {content: lie}, [`lie`]);
	containsWord.replyThing(message, `anywhere`, 100, {files: [`./GLaDOS/files/BSOD.png`]}, [`neurotoxin`]);
	containsWord.replyThing(message, `exact`, 100, {content: `<@${process.env.RASID}>`}, [`@ras`]);
	containsWord.replyThing(message, `exact`, 100, {content: `<@454340813388775445>`}, [`@kelp`]);
	containsWord.replyThing(message, `anywhere`, 100, {embeds: [stillalive]}, [`still alive`]);
	containsWord.replyThing(message, `mention`, 100, {content: `P I N G`}, [`680053684243398693`]);
	containsWord.replyThing(message, `mention`, 100, {content: ping}, [`654074851337699328`]);
	containsWord.replyThing(message, `exact`, 100, {content: `He's my daddy 😉`}, [`quinn`, `quinnsnipe`]);
	containsWord.replyThing(message, `exact`, 10, {content: `He's a superior lifeform`}, [`ras`, `rasmatham`, `rasberry`]);
	containsWord.replyThing(message, `exact`, 10, {content: `Did you mean: Czechia?`}, [`cz`, `cz12345`]);
	containsWord.replyThing(message, `exact`, 10, {content: `Failed test subject #1`}, [`12`, `flit`, `flitwick`]);
	containsWord.replyThing(message, `exact`, 50, {content: `Say hi to him for me 😳`}, [`espen bot`]);
	containsWord.reactThing(message, `anywhere`, 100, [`838084115629735976`], [`science`]);
	containsWord.reactThing(message, `anywhere`, 100, [`838084115391053844`], [`blue`]);
	containsWord.reactThing(message, `anywhere`, 100, [`838084116653670420`], [`orange`]);
	forwarding.channelLink(message, `842486821510447115`, `842486725347508266`);
	inspiroBot.sendMessage(message);
	//forwarding.DMSpy(message, `741333824494895144`);
	forwarding.messageForwarding(message);
	//music(message, GLaDOSPrefix);
	//coinflip.setup(message, GLaDOSPrefix);
	//coinflip.flip(message, GLaDOSPrefix);
	stupidStuff.hencefortifier(message);
	stupidStuff.espenBotReplacement(`message`, message, 1, process.env.RASID as `${bigint}`, {content: `https://cdn.discordapp.com/attachments/735213241860620308/781189544103247922/unknown.png`});
	stupidStuff.espenBotReplacement(`react`, message, 100, process.env.ZARLID as `${bigint}`, `🦆`);
	//stupidStuff.userWordBan(message, `last`, `541617670533939210`);
})
glados.on(`interactionCreate`, (interaction: Interaction):void => {
	switch(interaction.type){
		case `MESSAGE_COMPONENT`:
		const messageComponentInteraction:MessageComponentInteraction = interaction as MessageComponentInteraction;
		switch(messageComponentInteraction.componentType){
			case `BUTTON`:
			const buttonInteraction:ButtonInteraction = messageComponentInteraction as ButtonInteraction;
			switch(buttonInteraction.customId){
				case `Dummy`:
				buttonInteraction.deleteReply()
				.catch(console.error);
				break;
				default:
				break;
			}
			break;
			case `SELECT_MENU`:
			const selectMenuInteraction:SelectMenuInteraction = messageComponentInteraction as SelectMenuInteraction;
			switch(selectMenuInteraction.customId){
				case `Dummy`:
				selectMenuInteraction.update({content: `Seems about right`})
				.catch(console.error)
				break;
				default:
				break;
			}
			break;
			default:
			break;
		}
		break;
		case `APPLICATION_COMMAND`:
		const commandInteraction:CommandInteraction = interaction as CommandInteraction;
		switch(commandInteraction.commandName){
			case `botlink`:
			commandInteraction.reply({content: GladosLink, ephemeral: true}).catch(console.error);
			break;
			case `sightingslink`:
			commandInteraction.reply({content: `https://discord.gg/62jvqRv`, ephemeral: true}).catch(console.error);
			break;
			case `invisicolor`:
			commandInteraction.reply({content: `#36393F`, ephemeral: true}).catch(console.error);
			break;
			case `source`:
			commandInteraction.reply({content: githublink, ephemeral: true}).catch(console.error);
			break;
			case `userinfo`:
			info.userInfo(commandInteraction);
			break;
			case `serverinfo`:
			info.serverInfo(commandInteraction);
			break;
			case `joindate`:
			commandInteraction.reply(info.joindate(commandInteraction)).catch(console.error);
			break;
			case `grid`:
			commandInteraction.reply(stupidStuff.buttonGrid(commandInteraction)).catch(console.error);
			break;
			case `selectmenu`:
			commandInteraction.reply(stupidStuff.selectMenu()).catch(console.error);
			break;
			case `d`:
			dice.dice(commandInteraction);
			break;
			case `xkcd`:
			xkcd.xkcdFunct(commandInteraction);
			break;
			case `maze`:
			maze.mazeFunction(commandInteraction);
			break;
			case `tictactoe`:
			ticTacToe.ticTacToe(commandInteraction);
			break;
			default:
			break;
		}
		break;
		default:
		break;
	}
})

//Pokebot
//search
const sendEmbed = (message: Message):void => {
	if (message.author.id !== pokebot.user.id) {
		if (message.content.toLowerCase().startsWith(`${PokePrefix} `)) {
			if(message.channel.type == `GUILD_TEXT` || message.channel.type == `GUILD_NEWS`){
				generalStuff.sendAsWebHook(message, message.channel, pokedex.natDex(message.content.toLowerCase().split(` `)[1]), pokedex.DB.trainers[Math.round(Math.random() * pokedex.DB.trainers.length)], pokebot.user.avatarURL());
			}
		}
	}
}
//Stuff
pokebot.on(`messageCreate`, (message: Message):void => {
	if(message.channel.type == `DM`) {return}
	if (generalStuff.blackList.includes(message.channel.name)) {return};
	containsWord.replyThing(message, `anywhere`, 100, {content: pokeLink}, [`botlink pokebot`]);
	forwarding.messageForwarding(message);
	//music(message, PokePrefix);
	sendEmbed(message);
})

//Artoo
//Long stuff
const generalRas:string = `General Ras.\nYears ago you served my father in the Clone Wars.\nNow he begs you to help him in his struggle against the Empire.\nI regret that I am unable to present my father's request to you in person, but my ship has fallen under attack, and I'm afraid my mission to bring you to Alderaan has failed.\nI have placed information vital to the survival of the Rebellion into the memory systems of this R2 unit.\nMy father will know how to retrieve it.\nYou must see this droid safely delivered to him on Alderaan.\nThis is our most desperate hour.\nHelp me, Rasmatham.\nYou're my only hope.`;
const SWWords:string[] = [`star`, `wars`, `anakin`, `luke`, `obi`, `wan`, `kenobi`, `han`, `solo`, `leia`, `yoda`, `mace`, `windu`, `force`, `c3po`, `chewbacca`, `chewie`, `darth`, `vader`, `maul`, `sidius`, `plagueis`, `c-3po`, `r2`, `d2`, `emperor`, `palpatine`, `skywalker`, `jango`, `fett`, `padme`, `padmé`, `amidala`, `doku`, `tyranus`, `grievous`, `qui`, `gon`, `jinn`, `ackbar`, `tarkin`, `jabba`, `hut`, `lando`, `calrissian`, `boba`, `naboo`, `kashyyyk`, `alderaan`, `geonosis`, `kamino`, `dagobah`, `hoth`, `endor`, `bespin`, `mustafar`, `coruscant`, `tatooine`];
//functions
const beeps = ():string => {
	let str:string = ``;
	for (let i:number = 0; i < Math.floor(Math.random() * 10); i++) {
		if (Math.floor(Math.random() * 2)) {
			str = `${str}beep `
		} else {
			str = `${str}boop `
		}
	}
	return str;
}
//replies
artoo.on(`messageCreate`, (message: Message):void => {
	if(message.channel.type == `DM`) {return}
	if (generalStuff.blackList.includes(message.channel.name)) {return};
	containsWord.replyThing(message, `anywhere`, 100, {content: r2Link}, [`botlink artoo`]);
	containsWord.replyThing(message, `exact`, 10, {content: generalRas}, [`ras`, `rasmatham`, `rasberry`]);
	containsWord.replyThing(message, `anywhere`, 100, {content: beeps()}, SWWords);
	forwarding.messageForwarding(message);
	//music(message, `r2;`);
})

//Random
//replies
random.on(`messageCreate`, (message: Message):void => {
	if(message.channel.type == `DM`) {return}
	if (generalStuff.blackList.includes(message.channel.name)) {return};
	containsWord.replyThing(message, `anywhere`, 100, {content: randomLink}, [`botlink random stuff`]);
	containsWord.replyThing(message, `anywhere`, 100, {content: `I like him`}, [`ras`, `rasmatham`, `rasberry`]);
	containsWord.reactThing(message, `exact`, 100, [`653023282945196042`], [`espen`]);
	containsWord.reactThing(message, `exact`, 100, [`642497812885405707`], [`wolfo`]);
	containsWord.reactThing(message, `exact`, 100, [`654428027995815976`], [`no u`]);
	containsWord.reactThing(message, `exact`, 100, [`699747136144932925`], [`emily`, `impa`]);
	containsWord.reactThing(message, `exact`, 100, [`699743387817082891`], [`ahk`, `ahkrin`, `ck`, `ck32`, `creeper_killer`, `creeper_killer32`]);
	containsWord.reactThing(message, `exact`, 100, [`656207221792702466`], [`enndal,`, `ganon`, `ganondorf`, `ganond0rf`]);
	containsWord.reactThing(message, `anywhere`, 100, [`656223106788229121`], [`force`]);
	containsWord.reactThing(message, `anywhere`, 100, [`👍`, `👎`], [`yes/no`, `yes or no`, `no/yes`, `no or yes`]);
	containsWord.reactThing(message, `anywhere`, 100, [`0️⃣`, `1️⃣`, `2️⃣`, `3️⃣`, `4️⃣`, `5️⃣`, `6️⃣`, `7️⃣`, `8️⃣`, `9️⃣`, `🔟`], [`multichoice`]);
	forwarding.messageForwarding(message);
	//music(message, `random;`);
})

//sinibot
//Stuff
sini.on(`messageCreate`, (message: Message):void => {
	if(message.channel.type == `DM`) {return}
	if (generalStuff.blackList.includes(message.channel.name)) {return};
	forwarding.messageForwarding(message);
	//music(message, `sn;`);
})

//Zelda
//replies
zelda.on(`messageCreate`, (message: Message):void => {
	if(message.channel.type == `DM`) {return}
	if (generalStuff.blackList.includes(message.channel.name)) {return};
	containsWord.replyThing(message, `anywhere`, 100, {content: zeldaLink}, [`botlink zelda`]);
	containsWord.replyThing(message, `exact`, 10, {content: `Awesome dude`}, [`ras`, `rasmatham`, `rasberry`]);
	containsWord.reactThing(message, `anywhere`, 100, [`642474761204662284`], [`courage`]);
	containsWord.reactThing(message, `anywhere`, 100, [`642474761804578826`], [`power`]);
	containsWord.reactThing(message, `anywhere`, 100, [`642474761821224990`], [`wisdom`]);
	containsWord.reactThing(message, `anywhere`, 100, [`642474761754247168`], [`neutral`]);
	forwarding.messageForwarding(message);
	//music(message, `zd;`);
})