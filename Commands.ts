//#region imports
import {ApplicationCommandOptionType, Client, Guild} from "discord.js";
import {intents} from "./custom_modules/generalUse.js";
import * as dotenv from "dotenv";
dotenv.config();
//#endregion

//#region type definitions
type commandObject = {
	id:`${
		bigint
	}`, 
	guild?:Guild,
	command:{
		name:string, 
		description:string, 
		defaultPermission:boolean,
		options?:{
			name:string,
			type:ApplicationCommandOptionType,
			description:string,
			required:boolean,
			choices?: {
				name: string,
				value: string | number
			}[]
		}[]
	}
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
				type: `PLAYING`
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
				type: `PLAYING`
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
				type: `PLAYING`
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
				type: `PLAYING`
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
				type: `PLAYING`
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
				type: `PLAYING`
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
				type: `PLAYING`
			}
		]
	}
});
const sini:Client = new Client({
	intents: intents,
	presence: {
		status: `dnd`,
		activities: [
			{
				name: `Doing some maintenance`,
				type: `PLAYING`
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
				type: `PLAYING`
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
			defaultPermission: true
		}
	},
	{
		id: `862460436423376947`,
		command: {
			name: `sightingslink`,
			description: `Sends a link to the server this bot is mainly developed for`,
			defaultPermission: true
		}
	},
	{
		id: `862460437420310569`,
		command: {
			name: `inviscolor`,
			description: `Sends the hex color code for the backround color of Discord`,
			defaultPermission: true
		}
	},
	{
		id: `862460438318415872`,
		command: {
			name: `source`,
			description: `Sends a link to a GitHub repository for this bot`,
			defaultPermission: true
		}
	},
	{
		id: `862460439157014558`,
		command: {
			name: `userinfo`,
			description: `Sends all information a bot can get to you (Made to show that bots can't get any private information`,
			defaultPermission: true,
			options: [
				{
					name: `public`,
					type: `BOOLEAN`,
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
			defaultPermission: true
		}
	},
	{
		id: `862460523509841941`,
		command: {
			name: `joindate`,
			description: `Shows when you joined Discord`,
			defaultPermission: true,
			options: [
				{
					name: `public`,
					type: `BOOLEAN`,
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
			defaultPermission: true,
			options: [
				{
					name: `button_content`,
					type: `STRING`,
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
			defaultPermission: true
		}
	},
	{
		id: `862460525891289100`,
		command: {
			name: `d`,
			description: `Rolls a die`,
			defaultPermission: true,
			options: [
				{
					name: `die_sides`,
					type: `INTEGER`,
					description: `How many sides should the individul die have?`,
					required: false,
				},
				{
					name: `dice_count`,
					type: `INTEGER`,
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
			defaultPermission: true,
			options: [
				{
					name: `xkcd_number`,
					type: `INTEGER`,
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
			defaultPermission: true,
			options: [
				{
					name: `style`,
					type: `STRING`,
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
			defaultPermission: true,
			options: [
				{
					name: `playertwo`,
					type: `USER`,
					description: `Invite a second player to play`,
					required: true,
				},
				{
					name: `movepieces`,
					type: `BOOLEAN`,
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
			defaultPermission: true,
			options: [
				{
					name: `side`,
					type: `STRING`,
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
	}
];

const pokebotCommands:commandObject[] = [
];

const artooCommands:commandObject[] = [	
];

const randomCommands:commandObject[] = [	
];

const siniCommands:commandObject[] = [
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
	sini,
	zelda,
	croissant
];
const commandGroup:{
	id:`${
		bigint
	}`, 
	guild?:Guild,
	command:{
		name:string, 
		description:string, 
		defaultPermission:boolean,
		options?:{
			name:string,
			type:ApplicationCommandOptionType,
			description:string,
			required:boolean,
			choices?: {
				name: string,
				value: string | number
			}[]
		}[]
	}
}[][] = [
	buzzBotCommands,
	clambotCommands,
	ebnjCommands,
	gladosCommands,
	pokebotCommands,
	artooCommands,
	randomCommands,
	siniCommands,
	zeldaCommands,
	croissantCommands
];
//#endregion

//#region the stuff that creates/edits the commands
bots.forEach((bot, i):void => {
	//list commands
	bot.on(`ready`, ():void => {
		bot.application.commands.fetch().then(():void => {
			for (const command of bot.application.commands.cache.map((value) => value)) {
				console.log(command);
			}
		})
			.catch(console.error);
	});
	//Replace all
	bot.on(`ready`, ():void => {
		bot.application.commands.fetch().then(():void => {
			console.log(`${
				bot.user.tag
			} is active`);
			commandGroup[i].forEach((command, j):void => {
				bot.application.commands.create(command.command, command.guild = null)
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