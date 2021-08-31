import { ColorResolvable, Message, MessageEmbed } from "discord.js";
const {mkdir, writeFile, existsSync, readFileSync} = require(`fs`);
const setup = (message: Message, prefix: string):void => {
	if (message.content.toLowerCase().startsWith(`${prefix}cfsetup`)) {
		message.channel
		.send(`Creating save for ${message.author}`)
		.then(():void => {mkdir(`./${message.client.user.username}/userinfo/`, console.error)})
		.catch(console.error)
		.then(():void => {mkdir(`./${message.client.user.username}/userinfo/${message.author.id}`, console.error)})
		.catch(console.error)
		.then(():void => {mkdir(`./${message.client.user.username}/userinfo/${message.author.id}/coinflip/`, console.error)})
		.catch(console.error)
		.then(():void => {writeFile(`./${message.client.user.username}/userinfo/${message.author.id}/coinflip/wins.log`, `0`, console.error)})
		.catch(console.error)
		.then(():void => {writeFile(`./${message.client.user.username}/userinfo/${message.author.id}/coinflip/losses.log`, `0`, console.error)})
		.catch(console.error);
		message.channel.send(`Setup complete\nWarning: Using this command agin will reset your score`);
	}
}
const flip = (message: Message, prefix: string):void => {
	if (message.content.toLowerCase().startsWith(`${prefix}coinflip`)) {
		const coinflippath:string = `./${message.client.user.username}/userinfo/${message.author.id}/coinflip/`;
		const coinfilew:string = `./${message.client.user.username}/userinfo/${message.author.id}/coinflip/wins.log`;
		const coinfilel:string = `./${message.client.user.username}/userinfo/${message.author.id}/coinflip/losses.log`;
		if (existsSync(coinflippath)) {
			if (message.content.toLowerCase().startsWith(`${prefix}coinflip heads`)) {
				if (Math.random() * 10 < 5 === true) {
					const wincount:string = readFileSync(coinfilew, `utf8`, console.error);
					const losecount:string = readFileSync(coinfilel, `utf8`, console.error);
					writeFile(coinfilew, (parseInt(wincount) + 1).toString(), console.error);
					const embed:MessageEmbed = new MessageEmbed()
					.setColor(`00FF00` as ColorResolvable)
					.setTitle(`You won!`)
					.setThumbnail(`https://cdn.discordapp.com/attachments/656164355381133332/715662587471331359/ezgif-3-b3ae702d4205.gif`)
					.addFields({ name: `The coin landed on heads`, value: `You won!` }, { name: `Wins`, value: (parseInt(wincount) + 1).toString() }, { name: `Losses`, value: losecount });
					message.channel.send({ embeds: [embed] })
					.catch(console.error);
				} else {
					const wincount:string = readFileSync(coinfilew, `utf8`, console.error);
					const losecount:string = readFileSync(coinfilel, `utf8`, console.error);
					writeFile(coinfilel, (parseInt(losecount) + 1).toString(), console.error);
					const embed:MessageEmbed = new MessageEmbed()
					.setColor(`FF0000` as ColorResolvable)
					.setTitle(`You lost!`)
					.setThumbnail(`https://cdn.discordapp.com/attachments/656164355381133332/715669285128634368/ezgif-3-b8913657fa57.gif`)
					.addFields({ name: `The coin landed on tails`, value: `You lost!` }, { name: `Wins`, value: wincount }, { name: `Losses`, value: (parseInt(losecount) + 1).toString() });
					message.channel.send({ embeds: [embed] })
					.catch(console.error);
				}
			}
			if (message.content.toLowerCase().startsWith(`${prefix}coinflip tails`)) {
				if (Math.random() * 10 < 5 === true) {
					const wincount:string = readFileSync(coinfilew, `utf8`, console.error);
					const losecount:string = readFileSync(coinfilel, `utf8`, console.error);
					writeFile(coinfilew, (parseInt(losecount) + 1).toString(), console.error);
					const embed:MessageEmbed = new MessageEmbed()
					.setColor(`00FF00` as ColorResolvable)
					.setTitle(`You won!`)
					.setThumbnail(`https://cdn.discordapp.com/attachments/656164355381133332/715669285128634368/ezgif-3-b8913657fa57.gif`)
					.addFields({ name: `The coin landed on tails`, value: `You won!` }, { name: `Wins`, value: (parseInt(wincount) + 1).toString() }, { name: `Losses`, value: losecount });
					message.channel.send({ embeds: [embed] })
					.catch(console.error);
				} else {
					const wincount:string = readFileSync(coinfilew, `utf8`, console.error);
					const losecount:string = readFileSync(coinfilel, `utf8`, console.error);
					writeFile(coinfilel, (parseInt(losecount) + 1).toString(), console.error);
					const embed:MessageEmbed = new MessageEmbed()
					.setColor(`FF0000` as ColorResolvable)
					.setTitle(`You lost!`)
					.setThumbnail(`https://cdn.discordapp.com/attachments/656164355381133332/715662587471331359/ezgif-3-b3ae702d4205.gif`)
					.addFields({ name: `The coin landed on heads`, value: `You lost!` }, { name: `Wins`, value: wincount }, { name: `Losses`, value: (parseInt(losecount) + 1).toString() });
					message.channel.send({ embeds: [embed] })
					.catch(console.error);
				}
			}
		} else {
			message.channel.send(`Sorry, but you don't seem to have set up yet. Say \"${prefix}cfsetup\" and try again`)
			.catch(console.error);
		}
	}
}