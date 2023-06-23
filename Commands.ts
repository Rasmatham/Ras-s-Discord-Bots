//#region imports
import {ActivityType, ApplicationCommandData, ApplicationCommandDataResolvable, ApplicationCommandOptionType, Client} from "discord.js";
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
	command:ApplicationCommandData
}
//#endregion

//#region instantiating clients
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
//#endregion

//#region logins
amber.login(process.env.AMBERTOKEN).catch(console.error);
//#endregion

//#region commands
const amberCommands:commandObject[] = [
	{
		command: {
			name: `d`,
			description: `Rolls one, or multple dies`
		}
	}
];
//#endregion

//#region arrays
const bots:Client[] = [
	amber
];
const commandGroup:commandObject[][] = [
	amberCommands
];
//#endregion

//#region the stuff that creates/edits the commands
bots.forEach((bot, i):void => {
	//list commands
	bot.on(`ready`, ():void => {
		bot.application?.commands.fetch().then((command) => {
			command.delete()
		})
	});
});
//#endregion