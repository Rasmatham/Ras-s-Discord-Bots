const { Client } = require(`discord.js`);
const { intents } = require(`./custom_modules/generalUse.js`);
require(`dotenv`).config();
const buzzBot = new Client({intents: intents, presence: {status: `dnd`, activities: [{name: `Doing some maintenance`, type: `PLAYING`}]}});
const clambot = new Client({intents: intents, presence: {status: `dnd`, activities: [{name: `Doing some maintenance`, type: `PLAYING`}]}});
const ebnj = new Client({intents: intents, presence: {status: `dnd`, activities: [{name: `Doing some maintenance`, type: `PLAYING`}]}});
const glados = new Client({intents: intents, presence: {status: `dnd`, activities: [{name: `Doing some maintenance`, type: `PLAYING`}]}});
const pokebot = new Client({intents: intents, presence: {status: `dnd`, activities: [{name: `Doing some maintenance`, type: `PLAYING`}]}});
const artoo = new Client({intents: intents, presence: {status: `dnd`, activities: [{name: `Doing some maintenance`, type: `PLAYING`}]}});
const random = new Client({intents: intents, presence: {status: `dnd`, activities: [{name: `Doing some maintenance`, type: `PLAYING`}]}});
const sini = new Client({intents: intents, presence: {status: `dnd`, activities: [{name: `Doing some maintenance`, type: `PLAYING`}]}});
const zelda = new Client({intents: intents, presence: {status: `dnd`, activities: [{name: `Doing some maintenance`, type: `PLAYING`}]}});
const croissant = new Client({intents: intents, presence: {status: `dnd`, activities: [{name: `Doing some maintenance`, type: `PLAYING`}]}});

buzzBot.login(process.env.BUZZBOTTOKEN);
clambot.login(process.env.CLAMBOTTOKEN);
ebnj.login(process.env.EBNJTOKEN);
glados.login(process.env.GLADOSTOKEN);
pokebot.login(process.env.POKETOKEN);
artoo.login(process.env.ARTOOTOKEN);
random.login(process.env.RANDOMTOKEN);
sini.login(process.env.SINITOKEN);
zelda.login(process.env.ZELDATOKEN);
croissant.login(process.env.CROISSANTTOKEN);

const buzzBotCommands = [
	
];
const clambotCommands = [
	
];
const ebnjCommands = [
	
];
const gladosCommands = [
	{
		id: `862460436048642098`,
		command: {
			name: 'botlink',
			description: 'Link to add this bot to another server',
			defaultPermission: true
		}
	},
	{
		id: `862460436423376947`,
		command: {
			name: 'sightingslink',
			description: 'Sends a link to the server this bot is mainly developed for',
			defaultPermission: true
		}
	},
	{
		id: `862460437420310569`,
		command: {
			name: 'inviscolor',
			description: 'Sends the hex color code for the backround color of Discord',
			defaultPermission: true
		}
	},
	{
		id: `862460438318415872`,
		command: {
			name: 'source',
			description: 'Sends a link to a GitHub repository for this bot',
			defaultPermission: true
		}
	},
	{
		id: `862460439157014558`,
		command: {
			name: 'userinfo',
			description: 'Sends all information a bot can get to you (Made to show that bots can\'t get any private information',
			defaultPermission: true,
			options: [{
				name: 'public',
				type: 'BOOLEAN',
				description: 'Should the message be shown to everyone?',
				required: true
			}]
		}
	},
	{
		id: `862460522665738271`,
		command: {
			name: 'serverinfo',
			description: 'Sends some of the statistical information of the server',
			defaultPermission: true
		}
	},
	{
		id: `862460523509841941`,
		command: {
			name: 'joindate',
			description: 'Shows when you joined Discord',
			defaultPermission: true,
			options: [{
				name: 'public',
				type: 'BOOLEAN',
				description: 'Should the message be shown to everyone?',
				required: true
			}]
		}
	},
	{
		id: `862460524235194399`,
		command: {
			name: 'grid',
			description: 'This is just a test command made to show off buttons',
			defaultPermission: true,
			options: [{
				name: 'button_content',
				type: 'STRING',
				description: 'What text/emoji should the buttons display?',
				required: true,
			}]
		}
	},
	{
		id: `862460525329121280`,
		command: {
			name: 'selectmenu',
			description: 'This is just a test command made to show off select menus',
			defaultPermission: true
		}
	},
	{
		id: `862460525891289100`,
		command: {
			name: 'd',
			description: 'Rolls a die',
			defaultPermission: true,
			options: [{
				name: 'die_sides',
				type: 'INTEGER',
				description: 'How many sides should the individul die have?',
				required: false,
			},{
				name: 'dice_count',
				type: 'INTEGER',
				description: 'How many dice should be thrown?',
				required: false,
			}]
		}
	},
	{
		id: `862460609714192414`,
		command: {
			name: 'xkcd',
			description: 'A test Sends a random XKCD',
			defaultPermission: true,
			options: [{
				name: 'xkcd_number',
				type: 'INTEGER',
				description: 'Which XKCD comic do you want?',
				required: false,
			}]
		}
	},
	{
		id: `862460610435612682`,
		command: {
			name: 'maze',
			description: 'A playable maze game',
			defaultPermission: true,
			options: [{
				name: 'style',
				type: 'STRING',
				description: 'What style of maze do you want?',
				required: true,
				choices: [{
					name: 'normal',
					value: `normal`
				},{
					name: `zelda`,
					value: `zelda`
				}]
			}]
		}
	},
	{
		id: ``,
		command: {
			name: `tictactoe`,
			description: `Starts a game of Tic Tac Toe`,
			defaultPermission: true,
			options: [{
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
			}]
		}
	}
];
const pokebotCommands = [
	
];
const artooCommands = [
	
];
const randomCommands = [
	
];
const siniCommands = [
	
];
const zeldaCommands = [
	
];
const croissantCommands = [
	
];
const bots = [buzzBot, clambot, ebnj, glados, pokebot, artoo, random, sini, zelda, croissant];
const commandGroup = [buzzBotCommands, clambotCommands, ebnjCommands, gladosCommands, pokebotCommands, artooCommands, randomCommands, siniCommands, zeldaCommands, croissantCommands];

bots.forEach((bot, i) => {
	//list commands
	/*bot.on(`ready`, () => {
		bot.application.commands.fetch().then(() => {
			for (let command of bot.application.commands.cache){
				console.log(command)
			}
		})
	})*/
	//Replace all
	bot.on(`ready`, () => {
		bot.application.commands.fetch().then((command) => {
			console.log(`${bot.user.tag} is active`);
			commandGroup[i].forEach((command, j) => {
				bot.application.commands.create(command.command, command.guild = null)
				.then((command) => {console.log(`[${j + 1}/${commandGroup[i].length}] Command: "${command.name}" updated`)})
				.catch(console.error)
			})
		})
	})
	//edit specific
	/*bot.on(`ready`, () => {
		let commands = commandGroup[i];
		commands.forEach((command) => {
			bot.application.commands.edit(command.id, command.command, command.guild = null)
			.then((command) => {console.log(`Edited ${command.name}`)})
			.catch(console.error);
		})
	})*/
});