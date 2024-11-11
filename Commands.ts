//#region imports
import {ActivityType, ApplicationCommandType, ApplicationIntegrationType, Client, ContextMenuCommandBuilder, InteractionContextType, SlashCommandBuilder, SlashCommandOptionsOnlyBuilder, SlashCommandSubcommandsOnlyBuilder} from "discord.js";
import {intents} from "./custom_modules/generalUse.js";
import * as dotenv from "dotenv";
dotenv.config();
//#endregion

//#region type definitions
type commandObject = {
	id?:`${
		bigint
	}`, 
	guild?:`${
		bigint
	}`,
	command:SlashCommandBuilder | SlashCommandOptionsOnlyBuilder | SlashCommandSubcommandsOnlyBuilder | ContextMenuCommandBuilder
}
//#endregion

//#region instantiating clients
const buzzBot:Client = new Client({
	intents: intents,
	presence: {
		status: `dnd`,
		activities: [
			{
				name: `Doing some maintenance`,
				type: ActivityType.Playing
			}
		]
	}
});
const ebnj:Client = new Client({
	intents: intents,
	presence: {
		status: `dnd`,
		activities: [
			{
				name: `Doing some maintenance`,
				type: ActivityType.Playing
			}
		]
	}
});
const glados:Client = new Client({
	intents: intents,
	presence: {
		status: `dnd`,
		activities: [
			{
				name: `Doing some maintenance`,
				type: ActivityType.Playing
			}
		]
	}
});
const pokebot:Client = new Client({
	intents: intents,
	presence: {
		status: `dnd`,
		activities: [
			{
				name: `Doing some maintenance`,
				type: ActivityType.Playing
			}
		]
	}
});
const artoo:Client = new Client({
	intents: intents,
	presence: {
		status: `dnd`,
		activities: [
			{
				name: `Doing some maintenance`,
				type: ActivityType.Playing
			}
		]
	}
});
const random:Client = new Client({
	intents: intents,
	presence: {
		status: `dnd`,
		activities: [
			{
				name: `Doing some maintenance`,
				type: ActivityType.Playing
			}
		]
	}
});
const amber:Client = new Client({
	intents: intents,
	presence: {
		status: `dnd`,
		activities: [
			{
				name: `Doing some maintenance`,
				type: ActivityType.Playing
			}
		]
	}
});
const zelda:Client = new Client({
	intents: intents,
	presence: {
		status: `dnd`,
		activities: [
			{
				name: `Doing some maintenance`,
				type: ActivityType.Playing
			}
		]
	}
});
const croissant:Client = new Client({
	intents: intents,
	presence: {
		status: `dnd`,
		activities: [
			{
				name: `Doing some maintenance`,
				type: ActivityType.Playing
			}
		]
	}
});
const canine:Client = new Client({
	intents: intents,
	presence: {
		status: `dnd`,
		activities: [
			{
				name: `Doing some maintenance`,
				type: ActivityType.Playing
			}
		]
	}
});
//#endregion

//#region logins
try {
	buzzBot.login(process.env.BUZZBOTTOKEN)
} catch (err) {
	console.log("Buzzbot did not like jazz")
	console.error(err)
}
try {
	ebnj.login(process.env.EBNJTOKEN)
} catch (err) {
	console.log("EBNJ booted up the wrong edition of Minecraft")
	console.error(err)
}
try {
	glados.login(process.env.GLADOSTOKEN)
} catch (err) {
	console.log("GLaDOS was turned into a potato")
	console.error(err)
}
try {
	pokebot.login(process.env.POKETOKEN)
} catch (err) {
	console.log("Pokébot could not catch them all")
	console.error(err)
}
try {
	artoo.login(process.env.ARTOOTOKEN)
} catch (err) {
	console.log("R2 missed the lightsaber throw")
	console.error(err)
}
try {
	random.login(process.env.RANDOMTOKEN)
} catch (err) {
	console.log("Random Bot got a divide by 0 error")
	console.error(err)
}
try {
	amber.login(process.env.AMBERTOKEN)
} catch (err) {
	console.log("Amber lost a Splatoon game")
	console.error(err)
}
try {
	zelda.login(process.env.ZELDATOKEN)
} catch (err) {
	console.log("Zelda Bot could not figure out where BOTW/AOC/TOTK falls on the timeline")
	console.error(err)
}
try {
	croissant.login(process.env.CROISSANTTOKEN)
} catch (err) {
	console.log("Le Franciosle bot français n'a pas réussi à s'authentifier")
	console.error(err)
}
try {
	canine.login(process.env.K9TOKEN)
} catch (err) {
	console.log("K9 was not affirmative")
	console.error(err)
}
//#endregion

//#region commands
const buzzBotCommands:commandObject[] = [	
];

const ebnjCommands:commandObject[] = [	
];

const gladosCommands:commandObject[] = [
	{
		id: `862460436048642098`,
		command: new SlashCommandBuilder()
			.setName(`botlink`)
			.setDescription(`Link to add this bot to another server`)
	},
	{
		id: `862460436423376947`,
		command: new SlashCommandBuilder()
			.setName(`sightingslink`)
			.setDescription(`Sends a link to the server this bot is mainly developed for`)
	},
	{
		id: `862460437420310569`,
		command: new SlashCommandBuilder()
			.setName(`invisicolor`)
			.setDescription(`Sends the hex color code for the backround color of Discord`)
	},
	{
		id: `862460438318415872`,
		command: new SlashCommandBuilder()
			.setName(`source`)
			.setDescription(`Sends a link to a GitHub repository for this bot`)
	},
	{
		id: `862460439157014558`,
		command: new SlashCommandBuilder()
			.setName(`userinfo`)
			.setDescription(`Sends all information a bot can get to you (Made to show that bots can't get any private information`)
			.addBooleanOption(option =>
				option.setName(`public`)
					.setDescription(`Should the message be shown to everyone?`)
					.setRequired(true))
	},
	{
		id: `862460522665738271`,
		command: new SlashCommandBuilder()
			.setName(`serverinfo`)
			.setDescription(`Sends some of the statistical information of the server`)
	},
	{
		id: `862460523509841941`,
		command: new SlashCommandBuilder()
			.setName(`joindate`)
			.setDescription(`Shows when you joined Discord`)
			.addBooleanOption(option =>
				option.setName(`public`)
					.setDescription(`Should the message be shown to everyone?`)
					.setRequired(true))
	},
	{
		id: `862460524235194399`,
		command: new SlashCommandBuilder()
			.setName(`grid`)
			.setDescription(`This is just a test command made to show off buttons`)
			.addStringOption(option =>
				option.setName(`button_content`)
					.setDescription(`What text/emoji should the buttons display?`)
					.setRequired(true))
	},
	{
		id: `862460525329121280`,
		command: new SlashCommandBuilder()
			.setName(`selectmenu`)
			.setDescription(`This is just a test command made to show off select menus`)
	},
	{
		id: `862460525891289100`,
		command: new SlashCommandBuilder()
			.setName(`d`)
			.setDescription(`Rolls a die`)
			.addIntegerOption(option =>
				option.setName(`die_sides`)
					.setDescription(`How many sides should the individul die have?`)
					.setRequired(false))
			.addIntegerOption(option =>
				option.setName(`dice_count`)
					.setDescription(`How many dice should be thrown?`)
					.setRequired(false))
	},
	{
		id: `862460609714192414`,
		command: new SlashCommandBuilder()
			.setName(`xkcd`)
			.setDescription(`A test Sends a random XKCD`)
			.addIntegerOption(option =>
				option.setName(`xkcd_number`)
					.setDescription(`Which XKCD comic do you want?`)
					.setRequired(false))
	},
	{
		id: `862460610435612682`,
		command: new SlashCommandBuilder()
			.setName(`maze`)
			.setDescription(`A playable maze game`)
			.addStringOption(option =>
				option.setName(`style`)
					.setDescription(`What style of maze do you want?`)
					.addChoices(
						{name: `normal`, value: `0`},
						{name: `zelda`, value: `1`}
					)
			)
	},
	{
		id: `862809521243684894`,
		command: new SlashCommandBuilder()
			.setName(`tictactoe`)
			.setDescription(`Starts a game of Tic Tac Toe`)
			.addUserOption(option =>
				option.setName(`playertwo`)
					.setDescription(`Invite a second player to play`)
					.setRequired(true)
			)
			.addBooleanOption(option =>
				option.setName(`movepieces`)
					.setDescription(`Should you move pieces aftee both players has laid down three pieces?`)
					.setRequired(true)
			)
	},
	{
		id: `0`,
		command: new SlashCommandBuilder()
			.setName(`coinflip`)
			.setDescription(`Flips a coin for you`)
			.addStringOption(option =>
				option.setName(`side`)
					.setDescription(`Which side do you choose?`)
					.setRequired(true)
					.addChoices(
						{name: `heads`, value: `heads`},
						{name: `tails`, value: `tails`}
					)
			)
	},
	{
		command: new SlashCommandBuilder()
			.setName(`list`)
			.setDescription(`Lists all of something in a server`)
			.addStringOption(option =>
				option.setName(`thing`)
					.setDescription(`What should be listed?`)
					.setRequired(true)
					.addChoices(
						{name: `channels`, value: `channels`},
						{name: `emojis`, value: `emojis`},
						{name: `roles`, value: `roles`}
					)
			)
	},
	{
		command: new SlashCommandBuilder()
			.setName(`gladle`)
			.setDescription(`Totally not another wordle clone`)
			.addSubcommandGroup(subCommandGroup =>
				subCommandGroup.setName(`play`)
					.setDescription(`play a game of totally not wordle`)
					.addSubcommand(subCommand =>
						subCommand.setName(`easy`)
							.setDescription(`You can guess any word at any time`)
					)
					.addSubcommand(subCommand =>
						subCommand.setName(`hard`)
							.setDescription(`Any revealed hints must be used in subsequent guesses`)
					)
			)
			.addSubcommand(subCommand =>
				subCommand.setName(`scoreboard`)
					.setDescription(`Not implemented yet`)
			)
	},
	{
		command: new SlashCommandBuilder()
			.setName(`reboot`)
			.setDescription(`Reboots the host`),
		guild: `647924443078852613`
	}
];

const pokebotCommands:commandObject[] = [
];

const artooCommands:commandObject[] = [	
];

const randomCommands:commandObject[] = [	
];

const amberCommands:commandObject[] = [
];

const zeldaCommands:commandObject[] = [
];

const croissantCommands:commandObject[] = [
];

const canineCommands:commandObject[] = [
	{
		command: new SlashCommandBuilder()
			.setName(`set_timezone`)
			.setDescription(`Set or remove your timezone (This data will be stored for use with the /timestamp command)`)
			.setContexts(InteractionContextType.BotDM, InteractionContextType.Guild, InteractionContextType.PrivateChannel)
			.setIntegrationTypes(ApplicationIntegrationType.GuildInstall, ApplicationIntegrationType.UserInstall)
	},
	{
		command: new ContextMenuCommandBuilder()
			.setName(`Set Timezone`)
			.setContexts(InteractionContextType.BotDM, InteractionContextType.Guild, InteractionContextType.PrivateChannel)
			.setIntegrationTypes(ApplicationIntegrationType.GuildInstall, ApplicationIntegrationType.UserInstall)
			.setType(ApplicationCommandType.Message)
	},
	{
		command: new SlashCommandBuilder()
			.setName(`timestamp`)
			.setDescription(`Create a timestamp`)
			.setContexts(InteractionContextType.BotDM, InteractionContextType.Guild, InteractionContextType.PrivateChannel)
			.setIntegrationTypes(ApplicationIntegrationType.GuildInstall, ApplicationIntegrationType.UserInstall)
	},
	{
		command: new ContextMenuCommandBuilder()
			.setName(`Create Timestamp`)
			.setContexts(InteractionContextType.BotDM, InteractionContextType.Guild, InteractionContextType.PrivateChannel)
			.setIntegrationTypes(ApplicationIntegrationType.GuildInstall, ApplicationIntegrationType.UserInstall)
			.setType(ApplicationCommandType.Message)
	},
];
//#endregion

//#region arrays
const bots:Client[] = [
	buzzBot,
	ebnj,
	glados,
	pokebot,
	artoo,
	random,
	amber,
	zelda,
	croissant,
	canine
];
const commandGroup:commandObject[][] = [
	buzzBotCommands,
	ebnjCommands,
	gladosCommands,
	pokebotCommands,
	artooCommands,
	randomCommands,
	amberCommands,
	zeldaCommands,
	croissantCommands,
	canineCommands
];
//#endregion

//#region the stuff that creates/edits the commands
bots.forEach((bot, i):void => {
	//list commands
	bot.on(`ready`, ():void => {
		bot.application?.commands.fetch().then(():void => {
			bot.application?.commands.cache.map((value) => value).forEach((command) =>{
				console.log(command);
			}); 
				
		})
			.catch(console.error);
	});
	//Replace all
	bot.on(`ready`, ():void => {
		bot.application?.commands.fetch().then((commands):void => {
			console.log(`${
				bot.user?.tag
			} is active`);
			commands.forEach((command) => {
				console.log(`Removing command ${command.name}`)
				command.delete();
			});
			commandGroup[i].forEach((command, j):void => {
				if(command.guild != undefined){
					bot.application?.commands.create(command.command, command.guild)
						.then((command):void => {
							console.log(`[${
								j + 1
							}/${
								commandGroup[i].length
							}] Command: "${
								command.name
							}" updated`);
						})
						.catch(console.error);
				} else {
					bot.application?.commands.create(command.command)
						.then((command):void => {
							console.log(`[${
								j + 1
							}/${
								commandGroup[i].length
							}] Command: "${
								command.name
							}" updated`);
						})
						.catch(console.error);
				}
				
			});
		});
	});
	//edit specific
	/*bot.on(`ready`, ():void => {
		commandGroup[i].forEach((command, j):void => {
			bot.application.commands.create(command.command, command.guild = null)
				.then((command):void => {
					console.log(`[${
						i+1
					}/${
						bots.length
					}][${
						j+1
					}/${
						commandGroup[i].length
					}] Edited ${
						command.name
					}`);
				})
				.catch(console.error);
		});
	});*/
});
//#endregion