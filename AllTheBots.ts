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
import {Client, Message, ActivityType, ChannelType, InteractionType, ChatInputCommandInteraction, BaseInteraction} from "discord.js";
import * as forwarding from "./custom_modules/forwardMessages";
import * as generalStuff from "./custom_modules/generalUse";
import * as dice from "./custom_modules/dice";
import * as dotenv from "dotenv";
dotenv.config();
//#endregion

//#region links
//#endregion

//#region instantiating Clients
const amber:Client = new Client({
	intents: generalStuff.intents,
	presence: {
		activities: [
			{
				name: `Splatoon 4`,
				type: ActivityType.Streaming
			}
		]
	}
});
//#endregion

//#region logins
amber.login(process.env.AMBERTOKEN).catch(console.error);
const bots = [
	amber
];
generalStuff.botReady([{bots: bots}]);

//#endregion

//#endregion


//#region individual

//#region amberbot

//#region Stuff
amber.on(`ready`, () => {
	amber.users.fetch(`707188499153158204`).then((user) => {
		if (amber.user != null) {
			amber.user.setAvatar(user.avatarURL()).catch(() => console.log(`[${user.tag}] You're probably changing the avatar too fast`));
			amber.user.setUsername(user.username).catch(() => console.log(`[${user.tag}] You're probably changing the username too fast`));
		}
	});
});
amber.on(`userUpdate`, (oldUser, newUser) => {
	if (amber.user != null) {
		if (newUser.id == `707188499153158204`) {
			amber.user.setAvatar(newUser.avatarURL()).catch(() => console.log(`[${newUser.tag}] You're probably changing the avatar too fast`));
			amber.user.setUsername(newUser.username).catch(() => console.log(`[${newUser.tag}] You're probably changing the username too fast`));
		}
	}
});
amber.on(`messageCreate`, (message: Message):void => {
	if (message.channel.type === ChannelType.DM) {
		return;
	}
	if (generalStuff.blackList.includes(message.channel.name)) {
		return;
	}
	forwarding.messageForwarding([{message: message}]);
	//music(message, `sn;`);
});
amber.on(`interactionCreate`, async (interaction: BaseInteraction):Promise<void> => {
	if (interaction.type === InteractionType.ApplicationCommand) {
		const commandInteraction = interaction as ChatInputCommandInteraction;
		switch (commandInteraction.commandName) {
		case `dice`:
			dice.dice([{interaction: commandInteraction}]);
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

//#endregion