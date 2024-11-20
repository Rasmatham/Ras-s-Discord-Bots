//#region imports
import { ActivityType, ApplicationCommandType, ApplicationIntegrationType, Client, ContextMenuCommandBuilder, Events, InteractionContextType, PresenceUpdateStatus } from "discord.js";
import type { SlashCommandBuilder, SlashCommandOptionsOnlyBuilder, SlashCommandSubcommandsOnlyBuilder } from "discord.js";
import { genericCatch, intents, login, simpleCommand } from "./custom_modules/generalUse.js";
import * as dotenv from "dotenv";
dotenv.config();
//#endregion

//#region type definitions
interface CommandObject {
	id?:`${bigint}`, 
	guild?:`${bigint}`,
	command:SlashCommandBuilder | SlashCommandOptionsOnlyBuilder | SlashCommandSubcommandsOnlyBuilder | ContextMenuCommandBuilder
}
//#endregion

//#region default client options
const client = (): Client => new Client({ intents, presence: { activities: [{ name: `Doing some maintenance`, type: ActivityType.Playing }], status: PresenceUpdateStatus.DoNotDisturb } });
//#endregion

//#region instantiating clients
// eslint-disable-next-line one-var
const amber = client(),
artoo = client(),
buzzBot = client(),
canine = client(),
croissant = client(),
ebnj = client(),
glados = client(),
pokebot = client(),
random = client(),
zelda = client();
//#endregion

//#region logins

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
//#endregion

//#region commands
// eslint-disable-next-line one-var
const amberCommands:CommandObject[] = [],
artooCommands:CommandObject[] = [],
buzzBotCommands:CommandObject[] = [],
canineCommands:CommandObject[] = [
	{
	command: simpleCommand(`set_timezone`, `Set or remove your timezone (This data will be stored for use with the /timestamp command)`)
		.setContexts(InteractionContextType.BotDM, InteractionContextType.Guild, InteractionContextType.PrivateChannel)
		.setIntegrationTypes(ApplicationIntegrationType.GuildInstall, ApplicationIntegrationType.UserInstall)
	},{
		command: new ContextMenuCommandBuilder()
			.setName(`Set Timezone`)
			.setContexts(InteractionContextType.BotDM, InteractionContextType.Guild, InteractionContextType.PrivateChannel)
			.setIntegrationTypes(ApplicationIntegrationType.GuildInstall, ApplicationIntegrationType.UserInstall)
			.setType(ApplicationCommandType.Message)
	},{
		command: simpleCommand(`timestamp`, `Create a timestamp`)
			.setContexts(InteractionContextType.BotDM, InteractionContextType.Guild, InteractionContextType.PrivateChannel)
			.setIntegrationTypes(ApplicationIntegrationType.GuildInstall, ApplicationIntegrationType.UserInstall)
	},{
		command: new ContextMenuCommandBuilder()
			.setName(`Create Timestamp`)
			.setContexts(InteractionContextType.BotDM, InteractionContextType.Guild, InteractionContextType.PrivateChannel)
			.setIntegrationTypes(ApplicationIntegrationType.GuildInstall, ApplicationIntegrationType.UserInstall)
			.setType(ApplicationCommandType.Message)
	}
],
croissantCommands:CommandObject[] = [],
ebnjCommands:CommandObject[] = [],
gladosCommands:CommandObject[] = [
	{ command: simpleCommand(`sightingslink`, `Sends a link to the server this bot is mainly developed for`), id: `862460436423376947` },
	{ command: simpleCommand(`invisicolor`, `Sends the hex color code for the backround color of Discord`), id: `862460437420310569` },
	{ command: simpleCommand(`selectmenu`, `This is just a test command made to show off select menus`), id: `862460525329121280` },
	{ command: simpleCommand(`serverinfo`, `Sends some of the statistical information of the server`), id: `862460522665738271` },
	{ command: simpleCommand(`source`, `Sends a link to a GitHub repository for this bot`), id: `862460438318415872` },
	{ command: simpleCommand(`botlink`, `Link to add this bot to another server`), id: `862460436048642098` },
	{ command: simpleCommand(`reboot`, `Reboots the host`), guild: `647924443078852613` },
	{
		command: simpleCommand(`userinfo`, `Sends all information a bot can get to you (Made to show that bots can't get any private information`)
			.addBooleanOption(option => option
				.setName(`public`)
				.setDescription(`Should the message be shown to everyone?`)
				.setRequired(true)),
		id: `862460439157014558`
	},
	{
		command: simpleCommand(`joindate`, `Shows when you joined Discord`)
			.addBooleanOption(option => option
				.setName(`public`)
				.setDescription(`Should the message be shown to everyone?`)
				.setRequired(true)),
		id: `862460523509841941`
	},
	{
		command: simpleCommand(`grid`, `This is just a test command made to show off buttons`)
			.addStringOption(option => option
				.setName(`button_content`)
				.setDescription(`What text/emoji should the buttons display?`)
				.setRequired(true)),
		id: `862460524235194399`
	},
	{
		command: simpleCommand(`d`, `Rolls a die`)
			.addIntegerOption(option => option
				.setName(`die_sides`)
				.setDescription(`How many sides should the individul die have?`)
				.setRequired(false))
			.addIntegerOption(option => option
				.setName(`dice_count`)
				.setDescription(`How many dice should be thrown?`)
				.setRequired(false)),
		id: `862460525891289100`
	},
	{
		command: simpleCommand(`xkcd`, `A test Sends a random XKCD`)
			.addIntegerOption(option => option
				.setName(`xkcd_number`)
				.setDescription(`Which XKCD comic do you want?`)
				.setRequired(false)),
		id: `862460609714192414`
	},
	{
		command: simpleCommand(`maze`, `A playable maze game`)
			.addStringOption(option => option
				.setName(`style`)
				.setDescription(`What style of maze do you want?`)
				.addChoices(...[{ name: `normal`, value: `0` }, { name: `zelda`, value: `1` }])
			),
		id: `862460610435612682`
	},
	{
		command: simpleCommand(`tictactoe`, `Starts a game of Tic Tac Toe`)
			.addUserOption(option => option
				.setName(`playertwo`)
				.setDescription(`Invite a second player to play`)
				.setRequired(true)
			)
			.addBooleanOption(option => option
				.setName(`movepieces`)
				.setDescription(`Should you move pieces aftee both players has laid down three pieces?`)
				.setRequired(true)
			),
		id: `862809521243684894`
	},
	{
		command: simpleCommand(`coinflip`, `Flips a coin for you`)
			.addStringOption(option => option
				.setName(`side`)
				.setDescription(`Which side do you choose?`)
				.setRequired(true)
				.addChoices(...[{ name: `heads`, value: `heads` }, { name: `tails`, value: `tails` }])
			),
		id: `0`
	},
	{
		command: simpleCommand(`list`, `Lists all of something in a server`)
			.addStringOption(option => option
				.setName(`thing`)
				.setDescription(`What should be listed?`)
				.setRequired(true)
				.addChoices(...[{ name: `channels`, value: `channels` }, { name: `emojis`, value: `emojis` }, { name: `roles`, value: `roles` }])
			)
	},
	{
		command: simpleCommand(`gladle`, `Totally not another wordle clone`)
			.addSubcommandGroup(subCommandGroup => subCommandGroup
				.setName(`play`)
				.setDescription(`play a game of totally not wordle`)
				.addSubcommand(subCommand => subCommand
					.setName(`easy`)
					.setDescription(`You can guess any word at any time`)
				)
				.addSubcommand(subCommand => subCommand
					.setName(`hard`)
					.setDescription(`Any revealed hints must be used in subsequent guesses`)
				)
			)
			.addSubcommand(subCommand => subCommand
				.setName(`scoreboard`)
				.setDescription(`Not implemented yet`)
			)
	},
],
pokebotCommands:CommandObject[] = [],
randomCommands:CommandObject[] = [],
zeldaCommands:CommandObject[] = [];
//#endregion

//#region arrays
// eslint-disable-next-line one-var
const bots:Client[] = [ buzzBot, ebnj, glados, pokebot, artoo, random, amber, zelda, croissant, canine ],
commandGroup:CommandObject[][] = [ buzzBotCommands, ebnjCommands, gladosCommands, pokebotCommands, artooCommands, randomCommands, amberCommands, zeldaCommands, croissantCommands, canineCommands ];
//#endregion

//#region the stuff that creates/edits the commands
bots.forEach((bot, i) => {
	// List commands
	bot.on(Events.ClientReady, () => {
		bot.application?.commands.fetch().then(() => {
			bot.application?.commands.cache.map((value) => value).forEach(console.info); 
		}).catch(genericCatch);
	});
	//Replace all
	bot.on(Events.ClientReady, () => {
		bot.application?.commands.fetch().then((commands) => {
			console.info(`${bot.user?.tag ?? `[unknown bot tag]`} is active`);
			commands.forEach((command) => {
				console.info(`Removing command ${command.name}`);
				command.delete().catch(genericCatch);
			});
			commandGroup[i].forEach((command, j) => {
				bot.application?.commands.create(command.command, command.guild)
					.then((cmd) => {
						const current = (j + 1).toString(),
						total = commandGroup[i].length.toString();
						console.info(`[${current}/${total}] Command: "${cmd.name}" updated`);
					}).catch(genericCatch);
			});
		}).catch(genericCatch);
	});
});
//#endregion