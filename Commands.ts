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
const clambot:Client = new Client({
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
//#endregion

//#region logins
buzzBot.login(process.env.BUZZBOTTOKEN).catch(console.error);
clambot.login(process.env.CLAMBOTTOKEN).catch(console.error);
ebnj.login(process.env.EBNJTOKEN).catch(console.error);
glados.login(process.env.GLADOSTOKEN).catch(console.error);
pokebot.login(process.env.POKETOKEN).catch(console.error);
artoo.login(process.env.ARTOOTOKEN).catch(console.error);
random.login(process.env.RANDOMTOKEN).catch(console.error);
amber.login(process.env.AMBERTOKEN).catch(console.error);
zelda.login(process.env.ZELDATOKEN).catch(console.error);
croissant.login(process.env.CROISSANTTOKEN).catch(console.error);
//#endregion

//#region commands
const buzzBotCommands:commandObject[] = [	
];

const clambotCommands:commandObject[] = [	
];

const ebnjCommands:commandObject[] = [	
];

const gladosCommands:commandObject[] = [
	{
		id: `862460436048642098`,
		command: {
			name: `botlink`,
			description: `Link to add this bot to another server`,
		}
	},
	{
		id: `862460436423376947`,
		command: {
			name: `sightingslink`,
			description: `Sends a link to the server this bot is mainly developed for`,
		}
	},
	{
		id: `862460437420310569`,
		command: {
			name: `invisicolor`,
			description: `Sends the hex color code for the backround color of Discord`,
		}
	},
	{
		id: `862460438318415872`,
		command: {
			name: `source`,
			description: `Sends a link to a GitHub repository for this bot`,
		}
	},
	{
		id: `862460439157014558`,
		command: {
			name: `userinfo`,
			description: `Sends all information a bot can get to you (Made to show that bots can't get any private information`,
			options: [
				{
					name: `public`,
					type: ApplicationCommandOptionType.Boolean,
					description: `Should the message be shown to everyone?`,
					required: true
				}
			]
		}
	},
	{
		id: `862460522665738271`,
		command: {
			name: `serverinfo`,
			description: `Sends some of the statistical information of the server`,
		}
	},
	{
		id: `862460523509841941`,
		command: {
			name: `joindate`,
			description: `Shows when you joined Discord`,
			options: [
				{
					name: `public`,
					type: ApplicationCommandOptionType.Boolean,
					description: `Should the message be shown to everyone?`,
					required: true
				}
			]
		}
	},
	{
		id: `862460524235194399`,
		command: {
			name: `grid`,
			description: `This is just a test command made to show off buttons`,
			options: [
				{
					name: `button_content`,
					type: ApplicationCommandOptionType.String,
					description: `What text/emoji should the buttons display?`,
					required: true,
				}
			]
		}
	},
	{
		id: `862460525329121280`,
		command: {
			name: `selectmenu`,
			description: `This is just a test command made to show off select menus`,
		}
	},
	{
		id: `862460525891289100`,
		command: {
			name: `d`,
			description: `Rolls a die`,
			options: [
				{
					name: `die_sides`,
					type: ApplicationCommandOptionType.Integer,
					description: `How many sides should the individul die have?`,
					required: false,
				},
				{
					name: `dice_count`,
					type: ApplicationCommandOptionType.Integer,
					description: `How many dice should be thrown?`,
					required: false,
				}
			]
		}
	},
	{
		id: `862460609714192414`,
		command: {
			name: `xkcd`,
			description: `A test Sends a random XKCD`,
			options: [
				{
					name: `xkcd_number`,
					type: ApplicationCommandOptionType.Integer,
					description: `Which XKCD comic do you want?`,
					required: false,
				}
			]
		}
	},
	{
		id: `862460610435612682`,
		command: {
			name: `maze`,
			description: `A playable maze game`,
			options: [
				{
					name: `style`,
					type: ApplicationCommandOptionType.String,
					description: `What style of maze do you want?`,
					required: true,
					choices: [
						{
							name: `normal`,
							value: `0`
						},
						{
							name: `zelda`,
							value: `1`
						}
					]
				}
			]
		}
	},
	{
		id: `862809521243684894`,
		command: {
			name: `tictactoe`,
			description: `Starts a game of Tic Tac Toe`,
			options: [
				{
					name: `playertwo`,
					type: ApplicationCommandOptionType.User,
					description: `Invite a second player to play`,
					required: true,
				},
				{
					name: `movepieces`,
					type: ApplicationCommandOptionType.Boolean,
					description: `should you move pieces aftee both players has laid down three pieces?`,
					required: true
				}
			]
		}
	},
	{
		id: `0`,
		command: {
			name: `coinflip`,
			description: `flips a coin for you`,
			options: [
				{
					name: `side`,
					type: ApplicationCommandOptionType.String,
					description: `Invite a second player to play`,
					required: true,
					choices: [
						{
							name: `heads`,
							value: `heads`
						},
						{
							name: `tails`,
							value: `tails`
						}
					]
				}
			]
		}
	},
	{
		command: {
			name: `list`,
			description: `Lists all of something in a server`,
			options: [
				{
					name: `thing`,
					type: ApplicationCommandOptionType.String,
					description: `What should be listed?`,
					required: true,
					choices: [
						{
							name: `channels`,
							value: `channels`
						},
						{
							name: `emojis`,
							value: `emojis`
						},
						{
							name: `roles`,
							value: `roles`
						}
					]
				}
			]
		}
	},
	{
		command: {
			name: `gladle`,
			description: `Totally not another wordle clone`,
			options: [
				{
					name: `play`,
					type: ApplicationCommandOptionType.SubcommandGroup,
					description: `play a game of totally not wordle`,
					options: [
						{
							name: `easy`,
							description: `You can guess any word at any time`,
							type: ApplicationCommandOptionType.Subcommand,
						},
						{
							name: `hard`,
							description: `Any revealed hints must be used in subsequent guesses`,
							type: ApplicationCommandOptionType.Subcommand,
						}
					]
				},
				{
					name: `scoreboard`,
					type: ApplicationCommandOptionType.Subcommand,
					description: `Doesn't really do anything yet. Would reset when switching PC's`
				}
			]
		}
	},
	{
		command: {
			name: `reboot`,
			description: `Reboots the host`,
		},
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
//#endregion

//#region arrays
const bots:Client[] = [
	buzzBot,
	clambot,
	ebnj,
	glados,
	pokebot,
	artoo,
	random,
	amber,
	zelda,
	croissant
];
const commandGroup:commandObject[][] = [
	buzzBotCommands,
	clambotCommands,
	ebnjCommands,
	gladosCommands,
	pokebotCommands,
	artooCommands,
	randomCommands,
	amberCommands,
	zeldaCommands,
	croissantCommands
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
			commands.map((command) => command).forEach((command) => {
				command.delete();
			});
			commandGroup[i].forEach((command, j):void => {
				console.log(command.guild);
				if(command.guild != undefined){
					bot.application?.commands.create(command.command as ApplicationCommandDataResolvable, command.guild)
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
					bot.application?.commands.create(command.command as ApplicationCommandDataResolvable)
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