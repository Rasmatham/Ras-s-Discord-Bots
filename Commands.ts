//#region imports
import {ActivityType, Client, SlashCommandBuilder, SlashCommandIntegerOption} from "discord.js";
import {intents} from "./custom_modules/generalUse.js";
import * as dotenv from "dotenv";
dotenv.config();
//#endregion

//#region type definitions
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
//#endregion

//#region arrays
const bots:Client[] = [
	amber
];
//#endregion

//#region the stuff that creates/edits the commands
bots.forEach((bot):void => {
	//list commands
	bot.on(`ready`, ():void => {
		void bot.application?.commands.fetch().then((commands) => {
			console.log(`fetched ${commands.size} commands`);
			commands.forEach((command) => {
				void command.delete();
			});
		}).then(() => {
			const cmd = new SlashCommandBuilder()
				.setName(`dice`)
				.setDescription(`Rolls dice!`)
				.addIntegerOption(new SlashCommandIntegerOption()
					.setName(`d4`)
					.setDescription(`Rolls X amount of D4 (1-3)`))
				.addIntegerOption(new SlashCommandIntegerOption()
					.setName(`d6`)
					.setDescription(`Rolls x amount of D6 (1-6)`))
				.addIntegerOption(new SlashCommandIntegerOption()
					.setName(`d8`)
					.setDescription(`Rolls x amount of D8 (1-8)`))
				.addIntegerOption(new SlashCommandIntegerOption()
					.setName(`d10`)
					.setDescription(`Rolls x amount of D10 (0-9)`))
				.addIntegerOption(new SlashCommandIntegerOption()
					.setName(`d12`)
					.setDescription(`Rolls x amount of D12 (1-12)`))
				.addIntegerOption(new SlashCommandIntegerOption()
					.setName(`d20`)
					.setDescription(`Rolls x amount of D20 (1-20)`))
				.addIntegerOption(new SlashCommandIntegerOption()
					.setName(`d10x10`)
					.setDescription(`Rolls x amount of D10x10 (00-90)`));
			void bot.application?.commands.create(cmd);
		});
	});
});
//#endregion