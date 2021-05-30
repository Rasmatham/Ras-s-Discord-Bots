/*
╔════════════════════════════════════════════════════╦═╦═╦═╗
║ Command Prompt                                     ║-║▫║X║
╠════════════════════════════════════════════════════╩═╩═╩═╣
║ These bots were made by Rasmatham                        ║
║ Feel free to do whatever you want with the code          ║
║ as long as it isn't just a copy/paste of the entire file ║
║ C:\WINDOWS\system32>echo Hello, World!                   ║
╚══════════════════════════════════════════════════════════╝
*/

//Just testing to see if this works right

//Common
{
	//Modules
	{
		var containsWord = require(`./custom_modules/containsWordFunctions.js`);
		var inspiroBot = require(`./custom_modules/inspiroBot.js`);
		var dice = require(`./custom_modules/dice.js`);
		var mazeThing = require(`generate-maze`);
		var DB = require(`./Pokèbot/PokeDB.js`);
		var Discord = require(`discord.js`);
		var ytdl = require(`ytdl-core`);
		var xkcd = require(`xkcd`);
		require(`dotenv`).config();
		var fs = require(`fs`);
	}
	//Other Variables
	{
		var blackList = [`announcements`, `6-hour-cooldown`, `rules`, `polls`, `stalking-tips`, `rules-for-new-mods`, `serious`, `gif-only-conversation`, `love-advice`, `inspiration`];
		var buzzLink = `https://discordapp.com/oauth2/authorize?&client_id=689449074008653865&scope=bot&permissions=8`;
		var ebnjLink = `https://discordapp.com/oauth2/authorize?&client_id=654079161723387914&scope=bot&permissions=8`;
		var GladosLink = `https://discordapp.com/oauth2/authorize?&client_id=680053684243398693&scope=bot&permissions=8`;
		var pokeLink = `https://discordapp.com/oauth2/authorize?&client_id=716002740442103899&scope=bot&permissions=8`;
		var r2Link = `https://discordapp.com/oauth2/authorize?&client_id=688152192196149250&scope=bot&permissions=8`;
		var randomLink = `https://discordapp.com/oauth2/authorize?&client_id=654787079590641713&scope=bot&permissions=8`;
		var zeldaLink = `https://discordapp.com/oauth2/authorize?&client_id=654786965090074656&scope=bot&permissions=8`;
		var githublink = `https://github.com/Rasmatham/Ras-s-Discord-Bots`
		var buzzBot = new Discord.Client();
		var clambot = new Discord.Client();
		var ebnj = new Discord.Client();
		var glados = new Discord.Client();
		var pokebot = new Discord.Client();
		var artoo = new Discord.Client();
		var random = new Discord.Client();
		var sini = new Discord.Client();
		var zelda = new Discord.Client();
		var rasID = `347039494375079947`;
		var clamID = `588511925944582186`;
		var testChannel = `735213241860620308`;
		var voiceEnabled = false;
		var PokePrefix = `pd`;
		var GLaDOSPrefix = `&`;
		module.exports = { blackList };
	}
	//logins
	{
		buzzBot.login(process.env.BUZZBOTTOKEN);
		clambot.login(process.env.CLAMBOTTOKEN);
		ebnj.login(process.env.EBNJTOKEN);
		glados.login(process.env.GLADOSTOKEN);
		pokebot.login(process.env.POKETOKEN);
		artoo.login(process.env.ARTOOTOKEN);
		random.login(process.env.RANDOMTOKEN);
		sini.login(process.env.SINITOKEN);
		zelda.login(process.env.ZELDATOKEN);
	}
	//Functions
	{
		//forwarding
		{
			var forwarding = (bot) => {
				bot.on(`message`, (message) => {
					if (!message.author.bot) {
						if (message.content.startsWith(`<#`)) {
							if ([`talk-as-${bot.user.username.toLowerCase()}`, `talk-and-dm-as-${bot.user.username.toLowerCase()}`, `dm-and-talk-as-${bot.user.username.toLowerCase()}`].includes(message.channel.name)) {
								if (message.member.id === rasID || message.member.hasPermission(`ADMINISTRATOR`) || !blackList.includes(bot.channels.cache.get(message.mentions.channels.first().id).name)) {
									bot.channels.cache
										.get(message.mentions.channels.first().id)
										.send(message.content.replace(message.mentions.channels.first(), ``)
											.replace(/¤/g, ``), { files: message.attachments.array() }
										);
								} else {
									message.channel.send(`Nice try`);
								}
							}
						} else if (message.content.startsWith(`<@`) && !message.content.startsWith(`<@&`) /*&& message.member.hasPermission(`ADMINISTRATOR`)*/) {
							if ([`dm-as-${bot.user.username.toLowerCase()}`, `talk-and-dm-as-${bot.user.username.toLowerCase()}`, `dm-and-talk-as-${bot.user.username.toLowerCase()}`].includes(message.channel.name)) {
								bot.users.cache
									.get(message.mentions.users.first().id)
									.send(message.content.replace(message.mentions.users.first().id, ``)
										.replace(`<@>`, ``)
										.replace(`<@!>`, ``)
										.replace(/¤/g, ``), { files: message.attachments.array() })
									.then(() => {
										message.channel.send(`Message sent to ${message.mentions.users.first().tag}`)
									})
									.catch((err) => {
										message.channel.send(`Sorry, but ${message.mentions.users.first().tag} has blocked me or they blocked DM's from this server`)
									});
							}
						}
					}
				});
			}
		}
		//send as webhook
		{
			var sendAsWebHook = (message, sendTo, sendMessage, sendAttachments, name, PFP) => {
				let webHookFunction = () => {
					sendTo.fetchWebhooks()
						.then((webHooks) => {
							if (webHooks.size <= 0) {
								sendTo.createWebhook(`${message.client.user.username}-Webhook`)
									.then(() => {
										webHookFunction(message.client)
									}).catch(() => {
										message.channel.send(`Something went wrong`)
									})
							}
							let i = 0;
							for (webHook of webHooks.values()) {
								if (webHook.owner.id === message.client.user.id) {
									let myWebHook = new Discord.WebhookClient(webHook.id, webHook.token)
									myWebHook.edit({ name: name, avatar: PFP })
										.then((editedWebHook) => {
											editedWebHook.send(sendMessage, sendAttachments)
										})
									break
								} else if (i >= webHooks.size - 1) {
									sendTo.createWebhook(`${message.client.user.username}-Webhook`)
										.then(() => {
											webHookFunction(message.client)
										}).catch(() => {
											message.channel.send(`Something went wrong`)
										})
								};
								i++
							}
						}).catch((err) => {
							console.error(err)
						})
				}
				webHookFunction(message.client)
			}
		}
		//Channel link
		{
			var channelLink = (message, ch1, ch2) => {
				if (!message.author.bot) {
					switch (message.channel.id) {
						case ch1:
							sendAsWebHook(message, message.client.channels.cache.get(ch2), message, { files: message.attachments.array() }, message.author.username, message.author.displayAvatarURL({ format: `png`, dynamic: true }));
							break;
						case ch2:
							sendAsWebHook(message, message.client.channels.cache.get(ch1), message, { files: message.attachments.array() }, message.author.username, message.author.displayAvatarURL({ format: `png`, dynamic: true }));
							break;
						default:
							break;
					}
				}
			}
		}
		//Myoooosic
		{
			var music = (bot, prfx) => {
				bot.on(`message`, async message => {
					if (message.author.bot) return;
					if (!(message.content.toLowerCase().startsWith(`${prfx}`)) || message.guild === null) return;
					const serverQueue = bot.queue.get(message.guild.id);
					if (message.content.startsWith(`${prfx}play `) ||
						message.content.startsWith(`${prfx}p `)) {
						if (voiceEnabled) {
							execute(message, serverQueue);
						} else {
							message.channel.send(`Sorry, but this function is disabled right now.\nRas might be at school and doesn't want to constantly up/download youtube videos.\nIf you know for a fact that he's not at school, ping him until he turns it on or gives an explanation`);
						}
						return;
					} else if (message.content.toLowerCase() == `${prfx}skip` ||
						message.content.toLowerCase() == `${prfx}s`) {
						if (voiceEnabled) {
							skip(message, serverQueue);
						} else {
							message.channel.send(`Sorry, but this function is disabled right now.\nRas might be at school and doesn't want to constantly up/download youtube videos.\nIf you know for a fact that he's not at school, ping him until he turns it on or gives an explanation`);
						}
						return;
					} else if (message.content.toLowerCase() == `${prfx}disconnect` ||
						message.content.toLowerCase() == `${prfx}dc`) {
						stop(message, serverQueue);
						return;
					} else {
						return;
					}
				});
				var execute = async (message, serverQueue) => {
					const args = message.content.split(` `);
					const voiceChannel = message.member.voice.channel;
					if (!voiceChannel) return message.channel.send(`You need to be in a VC to play music`);
					const permissions = voiceChannel.permissionsFor(message.client.user);
					if (!permissions.has(`CONNECT`) || !permissions.has(`SPEAK`)) {
						return message.channel.send(`I need permission to speak in a VC to do this`);
					}
					if (ytdl.validateURL(args[1])) {
						const songInfo = await ytdl.getBasicInfo(args[1]);
						const song = {
							title: songInfo.videoDetails.title,
							url: songInfo.videoDetails.video_url,
						};
						if (!serverQueue) {
							const queueContruct = {
								textChannel: message.channel,
								voiceChannel: voiceChannel,
								connection: null,
								songs: [],
								volume: 5,
								playing: true,
							};
							bot.queue.set(message.guild.id, queueContruct);
							queueContruct.songs.push(song);
							try {
								var connection = await voiceChannel.join();
								queueContruct.connection = connection;
								play(message.guild, queueContruct.songs[0]);
							} catch (err) {
								console.log(err);
								bot.queue.delete(message.guild.id);
								return message.channel.send(err);
							}
						} else {
							serverQueue.songs.push(song);
							//console.log(serverQueue.songs);
							return message.channel.send(`${song.title} has been added to the queue!`);
						}
					} else {
						message.channel.send(`This is not a valid YouTube URL`);
					}
				}
				const skip = (message, serverQueue) => {
					if (!message.member.voice.channel) return message.channel.send(`Don't try to ruin someones listening experience`);
					if (!serverQueue) return message.channel.send(`I am not playing any songs right now`);
					serverQueue.voiceChannel.leave();
				}
				const stop = (message, serverQueue) => {
					if (!message.member.voice.channel) return message.channel.send(`Don't try to ruin someones listening experience`);
					serverQueue.songs = [];
					serverQueue.voiceChannel.leave();
				}
				const play = (guild, song) => {
					const serverQueue = bot.queue.get(guild.id);
					if (!song) {
						serverQueue.voiceChannel.leave();
						bot.queue.delete(guild.id);
						return;
					}
					const dispatcher = serverQueue.connection.play(ytdl(song.url, { quality: 'highestaudio' }))
						.on(`speaking`, (speaking) => {
							if (!speaking) {
								serverQueue.songs.shift();
								play(guild, serverQueue.songs[0]);
							}
						})
						.on(`error`, error => {
							console.error(error);
						});
					dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
				}
			}
		}
	}
	//Other
	{
		//Music
		{
			ebnj.on(`ready`, () => voiceEnabled = false)
			music(buzzBot, `bb;`);
			music(clambot, `cb;`);
			music(ebnj, `eb;`);
			music(glados, GLaDOSPrefix);
			music(pokebot, PokePrefix);
			music(artoo, `r2;`);
			music(random, `random;`);
			music(sini, `sn;`);
			music(zelda, `zd;`);
		}
	}
}
//BuzzBot
{
	//long stuff
	{
		var mrtz = `Did you know BeeMrtz is short for Bee Master? He just had a tiny stroke while typing it`;
	}
	//functions
	{
		var buzzes = () => {
			let str = ``;
			for (let i = 0; i < Math.floor(Math.random() * 9); i++) {
				if (Math.floor(Math.random() * 2)) {
					str = `${str}buzz `;
				} else {
					str = `${str}buzz, `;
				}
			}
			str = `${str}buzz`;
			return str;
		}
	}
	//replies
	{
		buzzBot.on(`message`, (message) => {
			if (blackList.includes(message.channel.name)) { return };
			containsWord.replyThing(message, `exact`, 10, {}, `He makes me go buzz`, [`ras`, `rasmatham`, `rasberry`]);
			containsWord.replyThing(message, `exact`, 10, {}, `It's BeeMrtz, you insensitive prick!`, [`bymrtz`]);
			containsWord.replyThing(message, `exact`, 10, {}, mrtz, [`mrtz`, `beemrtz`, `rasberry`]);
			containsWord.replyThing(message, `anywhere`, 100, {}, buzzLink, [`botlink buzzbot`]);
			containsWord.replyThing(message, `anywhere`, 100, {}, `The hivemind is the absolute truth`, [`hive`]);
			containsWord.replyThing(message, `anywhere`, 100, {}, `you have no choice`, [`join us`]);
			containsWord.replyThing(message, `anywhere`, 100, {}, buzzes(), [`buzz`]);
		})
	}
	//forwarding
	{
		forwarding(buzzBot);
	}
}
//Clambot
{
	//Mention reply
	{
		clambot.on(`message`, (message) => {
			if (blackList.includes(message.channel.name)) { return };
			containsWord.replyThing(message, `anywhere`, 100, {}, `PING!`, [`<@&`]);
		})
	}
	//DM spy
	{
		clambot.on(`message`, (message) => {
			if (message.guild === null && !message.author.bot && message.author.id !== rasID && message.author.id !== clamID) {
				clambot.channels.cache.get(`764479509138636810`).send(`\`\`\`${message.author.tag} - <@${message.author.id}>\`\`\` sent:`);
				clambot.channels.cache.get(`764479509138636810`).send(message, { files: message.attachments.array() });
				message.channel.send(`Your message was sent to a super secret channel in Everyone Sightings`);
			}
		})
	}
	//stuff
	{
		forwarding(clambot);
	}
}
//EBNJ
{
	//forwarding
	{
		forwarding(ebnj);
	}
	//replies
	{
		ebnj.on(`message`, (message) => {
			if (blackList.includes(message.channel.name)) { return };
			containsWord.replyThing(message, `anywhere`, 100, {}, ebnjLink, [`botlink ebnj`]);
			containsWord.replyThing(message, `anywhere`, 100, {}, `🦆 <:Minecoins:656622021240815623>`, [`minecoin`]);
			containsWord.replyThing(message, `anywhere`, 100, {}, `Nice\nJava`, [`java`]);
			containsWord.replyThing(message, `anywhere`, 100, {}, `Ew\nBedrock`, [`bedrock`]);
			containsWord.replyThing(message, `anywhere`, 100, {}, `Cool\nEarth`, [`earth`]);
			containsWord.replyThing(message, `exact`, 10, {}, `Cool\nRas`, [`ras`, `rasmatham`, `rasberry`]);
			containsWord.reactThing(message, `anywhere`, 100, [`🇫`, `🇺`, `🇨`, `🇰`, `➖`, `🇩`, `ℹ️`, `🇴`, `🇷`, `🇮`, `🇹`, `🇪`], [`diorite`]);
		})
	}
	//toggle Music
	{
		ebnj.on(`message`, (message) => {
			if (message.author.id === rasID && message.content.startsWith(`toggleMusic`)) {
				console.log(voiceEnabled)
				if (voiceEnabled) {
					voiceEnabled = false;
				} else {
					voiceEnabled = true;
				}
			}
		})
	}
}
//GLaDOS
{
	//Long stuff (please collapse)
	{
		var cake = `It is totally real (Definitely not a lie)`;
		var lemonrant = `All right, I've been thinking, when life gives you lemons, don't make lemonade!\nMake life take the lemons back!\nGet mad!\nI don't want your damn lemons!\nWhat am I supposed to do with these?\nDemand to see life's manager!\nMake life rue the day it thought it could give Cave Johnson lemons!\nDo you know who I am?\nI'm the man whose gonna burn your house down - with the lemons!`;
		var lie = `I will tell you what is not a lie\nThe cake`;
		var ping = `P I N G\nWait\nNevermind`;
		var stillalive = new Discord.MessageEmbed()
			.setColor(`FFFFFF`)
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
	}
	//setups
	{
		//coinflip acc setup
		{
			glados.on(`message`, (message) => {
				if (message.content.toLowerCase().startsWith(`${GLaDOSPrefix}startcf`)) {
					message.channel
						.send(`Creating save for ${message.author}`)
						.then(() => fs.mkdir(`userinfo/`, (err) => { }))
						.then(() =>
							fs.mkdir(`./GLaDOS/userinfo/${message.author.id}`, (err) => { })
						)
						.then(() => {
							fs.mkdir(`./GLaDOS/userinfo/${message.author.id}/coinflip/`, (err) => { })
						})
						.then(() => { fs.writeFile(`./GLaDOS/userinfo/${message.author.id}/coinflip/wins.txt`, `0`, (err) => { }) })
						.then(() => { fs.writeFile(`./GLaDOS/userinfo/${message.author.id}/coinflip/losses.txt`, `0`, (err) => { }) });
					message.channel.send(`Setup complete\nWarning: Using this command agin will reset your score`);
				}
			});
		}
	}
	//xkcd
	{
		var xkcdFunct = (message, numRaw) => {
			let num = Math.ceil(Math.abs(numRaw));
			xkcd((xkcdObjOuter) => {
				if (num > xkcdObjOuter.num || num <= 0) {
					message.channel.send(`Try a whole number from 1 to ${xkcdObjOuter.num}`);
				} else {
					let xkcdRand = Math.ceil(Math.random() * (xkcdObjOuter.num + Math.random()));
					xkcd(num || xkcdRand, (xkcdObj) => {
						const xkcdEmbed = new Discord.MessageEmbed()
							.setTitle(xkcdObj.title)
							.setURL(`https://xkcd.com/${xkcdObj.num}/`)
							.setDescription(xkcdObj.alt)
							.setImage(xkcdObj.img);
						message.channel.send({ embed: xkcdEmbed });
					});
				}
			});
		}
	}
	//Check amount
	{
		var checkFor = (arr, str) => {
			if (arr.length > 0) {
				return `${str} ${arr.length}\n`;
			} else {
				return ``;
			}
		}
	}
	//coinflip
	{
		glados.on(`message`, (message) => {
			if (message.content.toLowerCase().startsWith(`${GLaDOSPrefix}coinflip`)) {
				var userid = message.author.id;
				var coinflippath = `./GLaDOS/userinfo/${userid}/coinflip/`;
				var coinfilew = `./GLaDOS/userinfo/${userid}/coinflip/wins.txt`;
				var coinfilel = `./GLaDOS/userinfo/${userid}/coinflip/losses.txt`;
				if (fs.existsSync(coinflippath)) {
					if (message.content.toLowerCase().startsWith(`${GLaDOSPrefix}coinflip heads`)) {
						if (Math.random() * 10 < 5 === true) {
							var wincount = fs.readFileSync(coinfilew, `utf8`, (err) => { });
							var losecount = fs.readFileSync(coinfilel, `utf8`, (err) => { });
							fs.writeFile(coinfilew, (parseInt(wincount) + 1).toString(), (err) => { });
							var embed = new Discord.MessageEmbed()
								.setColor(`00FF00`)
								.setTitle(`You won!`)
								.setThumbnail(`https://cdn.discordapp.com/attachments/656164355381133332/715662587471331359/ezgif-3-b3ae702d4205.gif`)
								.addFields({ name: `The coin landed on heads`, value: `You won!` }, { name: `Wins`, value: parseInt(wincount) + 1 }, { name: `Losses`, value: losecount });
							message.channel.send({ embed: embed });
						} else {
							var wincount = fs.readFileSync(coinfilew, `utf8`, (err) => { });
							var losecount = fs.readFileSync(coinfilel, `utf8`, (err) => { });
							fs.writeFile(coinfilel, (parseInt(losecount) + 1).toString(), (err) => { });
							var embed = new Discord.MessageEmbed()
								.setColor(`FF0000`)
								.setTitle(`You lost!`)
								.setThumbnail(`https://cdn.discordapp.com/attachments/656164355381133332/715669285128634368/ezgif-3-b8913657fa57.gif`)
								.addFields({ name: `The coin landed on tails`, value: `You lost!` }, { name: `Wins`, value: wincount }, { name: `Losses`, value: parseInt(losecount) + 1 });
							message.channel.send({ embed: embed });
						}
					}
					if (message.content.toLowerCase().startsWith(`${GLaDOSPrefix}coinflip tails`)) {
						if (Math.random() * 10 < 5 === true) {
							var wincount = fs.readFileSync(coinfilew, `utf8`, (err) => { });
							var losecount = fs.readFileSync(coinfilel, `utf8`, (err) => { });
							fs.writeFile(coinfilew, (parseInt(losecount) + 1).toString(), (err) => { });
							var embed = new Discord.MessageEmbed()
								.setColor(`00FF00`)
								.setTitle(`You won!`)
								.setThumbnail(`https://cdn.discordapp.com/attachments/656164355381133332/715669285128634368/ezgif-3-b8913657fa57.gif`)
								.addFields({ name: `The coin landed on tails`, value: `You won!` }, { name: `Wins`, value: parseInt(wincount) + 1 }, { name: `Losses`, value: losecount });
							message.channel.send({ embed: embed });
						} else {
							var wincount = fs.readFileSync(coinfilew, `utf8`, (err) => { });
							var losecount = fs.readFileSync(coinfilel, `utf8`, (err) => { });
							fs.writeFile(coinfilel, (parseInt(losecount) + 1).toString(), (err) => { });
							var embed = new Discord.MessageEmbed()
								.setColor(`FF0000`)
								.setTitle(`You lost!`)
								.setThumbnail(`https://cdn.discordapp.com/attachments/656164355381133332/715662587471331359/ezgif-3-b3ae702d4205.gif`)
								.addFields({ name: `The coin landed on heads`, value: `You lost!` }, { name: `Wins`, value: wincount }, { name: `Losses`, value: parseInt(losecount) + 1 });
							message.channel.send({ embed: embed });
						}
					}
				} else {
					message.channel.send(`Sorry, but you don't seem to have set up yet. Say \"${GLaDOSPrefix}startcf\" and try again`);
				}
			}
		});
	}
	//replies
	{
		//if [MESSAGE(S)] then [MESSAGE(S)]
		{
			glados.on(`message`, (message) => {
				if (blackList.includes(message.channel.name)) { return };
				containsWord.replyThing(message, `anywhere`, 100, {}, GladosLink, [`${GLaDOSPrefix}botlink`]); // These call the function from above and adds the parameters to it.
				containsWord.replyThing(message, `anywhere`, 100, {}, `https://discord.gg/xNQ8TaV`, [`${GLaDOSPrefix}nbclink`]);
				containsWord.replyThing(message, `anywhere`, 100, {}, `https://discord.gg/62jvqRv`, [`${GLaDOSPrefix}sightingslink`]);
				containsWord.replyThing(message, `anywhere`, 100, {}, `https://discord.gg/ys2XWTr`, [`${GLaDOSPrefix}marquettelink`]);
				containsWord.replyThing(message, `anywhere`, 100, {}, `https://discord.gg/xsXdy7h`, [`${GLaDOSPrefix}resourcelink`]);
				containsWord.replyThing(message, `anywhere`, 100, {}, cake, [`cake`, `tower 15`]);
				containsWord.replyThing(message, `anywhere`, 100, { files: [`./GLaDOS/files/lemonade.png`] }, lemonrant, [`lemon`, `🍋`]);
				containsWord.replyThing(message, `exact`, 100, {}, lie, [`lie`]);
				containsWord.replyThing(message, `anywhere`, 100, {}, `JA JA DING DONG!`, [`${GLaDOSPrefix}play`]);
				containsWord.replyThing(message, `anywhere`, 100, { files: [`./GLaDOS/files/BSOD.png`] }, ``, [`neurotoxin`]);
				containsWord.replyThing(message, `anywhere`, 100, {}, `#36393F`, [`${GLaDOSPrefix}inviscolor`, `${GLaDOSPrefix}inviscolour`]);
				containsWord.replyThing(message, `exact`, 100, {}, `<@${rasID}>`, [`@ras`]);
				containsWord.replyThing(message, `exact`, 100, {}, `<@454340813388775445>`, [`@kelp`]);
				containsWord.replyThing(message, `anywhere`, 100, { embed: stillalive }, ``, [`still alive`]);
				containsWord.replyThing(message, `anywhere`, 100, { files: [`./AllTheBots.js`] }, ``, [`${GLaDOSPrefix}source`]);
				containsWord.replyThing(message, `anywhere`, 100, {}, githublink, [`${GLaDOSPrefix}githubsource`]);
				containsWord.replyThing(message, `mention`, 100, {}, `P I N G`, [`680053684243398693`]);
				containsWord.replyThing(message, `mention`, 100, {}, ping, [`654074851337699328`]);
				containsWord.replyThing(message, `exact`, 100, {}, `He's my daddy 😉`, [`quinn`, `quinnsnipe`]);
				containsWord.replyThing(message, `exact`, 10, {}, `He's a superior lifeform`, [`ras`, `rasmatham`, `rasberry`]);
				containsWord.replyThing(message, `exact`, 10, {}, `Did you mean: Czechia?`, [`cz`, `cz12345`]);
				containsWord.replyThing(message, `exact`, 10, {}, `Failed test subject #1`, [`12`, `flit`, `flitwick`]);
				containsWord.replyThing(message, `exact`, 50, {}, `Say hi to him for me 😳`, [`espen bot`]);
				containsWord.replyThing(message, `exact`, 100, {}, userInfo(message), [`${GLaDOSPrefix}userinfo`]);
				containsWord.replyThing(message, `exact`, 100, {}, serverInfo(message), [`${GLaDOSPrefix}serverinfo`]);
				containsWord.replyThing(message, `exact`, 100, { embed: joindate(message) }, ``, [`${GLaDOSPrefix}joindate`]);
				containsWord.reactThing(message, `anywhere`, 100, [`838084115629735976`], [`science`]);
				containsWord.reactThing(message, `anywhere`, 100, [`838084115391053844`], [`blue`]);
				containsWord.reactThing(message, `anywhere`, 100, [`838084116653670420`], [`orange`]);
				channelLink(message, `842486821510447115`, `842486725347508266`)
				if (!message.author.bot && (message.content.includes(`inspire`) || message.content.includes(`inspiration`) || message.content.includes(`inspiring`)) && !blackList.includes(message.channel.name)) {
					inspiroBot().then((url) => {
						message.channel.send(url)
					})
				}

				dice(message, GLaDOSPrefix);
			})
		}
		//forwarding
		{
			forwarding(glados);
		}
	}
	//DM spy
	{
		glados.on(`message`, (message) => {
			if (message.guild === null && !message.author.bot && message.author.id !== rasID) {
				glados.channels.cache.get(`741333824494895144`).send(`\`\`\`${message.author.tag} - <@${message.author.id}>\`\`\`\nsent:`);
				sendAsWebHook(message, glados.channels.cache.get(`741333824494895144`), message, { files: message.attachments.array() }, message.author.username, message.author.displayAvatarURL({ format: `png`, dynamic: true }));
				message.channel.send(`Your message was sent to a super secret channel in Everyone Sightings`);
			}
		});
	}
	//xkcd
	{
		glados.on(`message`, (message) => {
			if (message.content.toLowerCase().startsWith(`${GLaDOSPrefix}xkcd`)) {
				if (!isNaN(message.content.toLowerCase().replace(`${GLaDOSPrefix}xkcd`, ``))) {
					xkcdFunct(message, message.content.toLowerCase().replace(`${GLaDOSPrefix}xkcd `, ``));
				} else {
					xkcdFunct(message);
				}
			}
		});
	}
	//maze thing
	{
		glados.on(`message`, (message) => {
			if (message.content.toLowerCase().startsWith(`${GLaDOSPrefix}maze`) && message.guild !== null && !message.author.bot) {
				const emotes = {
					false: {
						normal: {
							OOOO: `<:0000:733748791806525522>`,
							OOOI: `<:0001:733748792138137702>`,
							OOIO: `<:0010:733748792158847047>`,
							OOII: `<:0011:733748792133681212>`,
							OIOO: `<:0100:733748791869702276>`,
							OIOI: `<:0101:733748791944937575>`,
							OIIO: `<:0110:733748791920033823>`,
							OIII: `<:0111:733748792620220503>`,
							IOOO: `<:1000:733748792238800996>`,
							IOOI: `<:1001:733748792238669865>`,
							IOIO: `<:1010:733748792452579368>`,
							IOII: `<:1011:733748791978623099>`,
							IIOO: `<:1100:733748792209309797>`,
							IIOI: `<:1101:733748792079286274>`,
							IIIO: `<:1110:733748791974428813>`,
							IIII: `<:1111:733748792360304742>`,
							goal: {
								OOII: `<:G0011:826100214766239794>`,
								OIII: `<:G0111:826100214737272842>`,
								IOII: `<:G1011:826100214707519519>`,
							},
						},
						zelda: {
							OOOO: `<:0000Z:738891841667334214>`,
							OOOI: `<:0001Z:738891841553956884>`,
							OOIO: `<:0010Z:738891841570865153>`,
							OOII: `<:0011Z:738891841599963286>`,
							OIOO: `<:0100Z:738891841587380225>`,
							OIOI: `<:0101Z:738891841289584691>`,
							OIIO: `<:0110Z:738891841264549960>`,
							OIII: `<:0111Z:738891841604419646>`,
							IOOO: `<:1000Z:738891841633517608>`,
							IOOI: `<:1001Z:738891841549893725>`,
							IOIO: `<:1010Z:738891841394704455>`,
							IOII: `<:1011Z:738891841667334265>`,
							IIOO: `<:1100Z:738891841444774010>`,
							IIOI: `<:1101Z:738891841415413813>`,
							IIIO: `<:1110Z:738891841339916400>`,
							IIII: `<:1111Z:738891841641906326>`,
							goal: {
								OOII: `<:G0011Z:826100257871364167>`,
								OIII: `<:G0111Z:826100257964032051>`,
								IOII: `<:G1011Z:826100258018820186>`,
							},
						},
					},
					true: {
						normal: {
							OOOO: `<:0000:739569121695498341>`,
							OOOI: `<:0001:739569121695367280>`,
							OOIO: `<:0010:739569121905213440>`,
							OOII: `<:0011:739569121846624326>`,
							OIOO: `<:0100:739569121523400776>`,
							OIOI: `<:0101:739569121896955944>`,
							OIIO: `<:0110:739569121422999715>`,
							OIII: `<:0111:739569121984905226>`,
							IOOO: `<:1000:739569121884110968>`,
							IOOI: `<:1001:739569122165129287>`,
							IOIO: `<:1010:739569121565343826>`,
							IOII: `<:1011:739569122182168667>`,
							IIOO: `<:1100:739569121976647792>`,
							IIOI: `<:1101:739569121997357106>`,
							IIIO: `<:1110:739569121938636860>`,
							IIII: `<:1111:739569121703755878>`,
							goal: {
								OOII: `<:G0011:826101334863642685>`,
								OIII: `<:G0111:826101334809640974>`,
								IOII: `<:G1011:826101334834020362>`,
							},
						},
						zelda: {
							OOOO: `<:0000Z:739569256521269372>`,
							OOOI: `<:0001Z:739569256559149056>`,
							OOIO: `<:0010Z:739569256550629417>`,
							OOII: `<:0011Z:739569256601092186>`,
							OIOO: `<:0100Z:739569256743567452>`,
							OIOI: `<:0101Z:739569257087762473>`,
							OIIO: `<:0110Z:739569256202502162>`,
							OIII: `<:0111Z:739569256659943544>`,
							IOOO: `<:1000Z:739569256756150383>`,
							IOOI: `<:1001Z:825836934210781204>`,
							IOIO: `<:1010Z:739569256806744115>`,
							IOII: `<:1011Z:739569256408154144>`,
							IIOO: `<:1100Z:739569256710013029>`,
							IIOI: `<:1101Z:739569256412479510>`,
							IIIO: `<:1110Z:739569256676720790>`,
							IIII: `<:1111Z:739569256399896678>`,
							goal: {
								OOII: `<:G0011Z:826101295189721136>`,
								OIII: `<:G0111Z:826101295344517120>`,
								IOII: `<:G1011Z:826101295357755442>`,
							},
						},
					},
				};

				var mazeStyle = () => {
					if (typeof message.content.split(` `)[1] === `undefined`) {
						return `normal`;
					} else {
						if (message.content.includes(`zelda`)) {
							return `zelda`;
						} else {
							return `normal`;
						}
					}
				}
				class Cell {
					constructor(emotes, x, y, hasPlayer, walls) {
						this._style = mazeStyle();
						this._emotes = emotes;
						this._loc = [x, y];
						this._hasPlayer = hasPlayer;
						this._walls = walls;
					}
					get playerState() {
						return this._hasPlayer;
					}
					get x() {
						return this._loc[0];
					}
					get y() {
						return this._loc[1];
					}
					movePlayer() {
						this._hasPlayer = !this._hasPlayer;
					}
					get walls() {
						if (this._loc[0] === 7 && this._loc[1] === 7) {
							return this._emotes[this._hasPlayer][this._style].goal[this._walls];
						} else {
							return this._emotes[this._hasPlayer][this._style][this._walls];
						}
					}
					get boolWalls() {
						return this._walls.split(``);
					}
				}
				class Maze {
					constructor(emotes, mazeArr, message) {
						this._emotes = emotes;
						this._playerLoc = [0, 0];
						this._cells = [];
						this._mazeArr = mazeArr;
						this._message = message;
					}
					get cellArr() {
						return this._cells;
					}
					addCell(x, y, walls) {
						this._cells.push(new Cell(this._emotes, x, y, x === 0 && y === 0, walls));
					}
					moveLeft() {
						let lock = true;
						this._cells.forEach((cell, i) => {
							if (cell.playerState && cell.y > 0 && lock && cell.boolWalls[0] === `O`) {
								cell.movePlayer();
								this._cells[i - 1].movePlayer();
								lock = !lock;
							}
						});
					}
					moveUp() {
						let lock = true;
						this._cells.forEach((cell, i) => {
							if (cell.playerState && cell.x > 0 && lock && cell.boolWalls[1] === `O`) {
								cell.movePlayer();
								this._cells[i - 8].movePlayer();
								lock = !lock;
							}
						});
					}
					moveDown() {
						let lock = true;
						this._cells.forEach((cell, i) => {
							if (cell.playerState && cell.x < 7 && lock && cell.boolWalls[3] === `O`) {
								cell.movePlayer();
								this._cells[i + 8].movePlayer();
								lock = !lock;
							}
						});
					}
					moveRight() {
						let lock = true;
						this._cells.forEach((cell, i) => {
							if (cell.playerState && cell.y < 7 && lock && cell.boolWalls[2] === `O`) {
								cell.movePlayer();
								this._cells[i + 1].movePlayer();
								lock = !lock;
							}
						});
					}
				}
				const createdClass = new Maze(emotes, mazeArr, message);
				var mazeArr = [];
				var maze = mazeThing(8, 8);
				maze.forEach((x, i) => {
					x.forEach((y, j) => {
						if (message.content.toLowerCase().includes(`zelda`)) {
							createdClass.addCell(i, j, `${y.left
								}${y.top
								}${y.right
								}${y.bottom
								}`
								.replaceAll(`true`, `I`)
								.replaceAll(`false`, `O`), `zelda`);
						} else {
							createdClass.addCell(i, j, `${y.left
								}${y.top
								}${y.right
								}${y.bottom
								}`.replaceAll(`true`, `I`)
								.replaceAll(`false`, `O`), `normal`);
						}
					});
				});

				var mazeMessage = (mazeObj) => {
					let messageText = ``;
					for (let i = 0; i < 8; i++) {
						for (let j = 0; j < 8; j++) {
							messageText = `${messageText}${mazeObj.cellArr[i * 8 + j].walls}`;
						}
						messageText = `${messageText}\n`;
					}
					return messageText;
				}
				message.channel.send(mazeMessage(createdClass)).then((newMessage) => {
					newMessage
						.react(`⬅️`)
						.then(newMessage.react(`⬆️`))
						.then(newMessage.react(`⬇️`))
						.then(newMessage.react(`➡️`))
						.then(() => {
							let lock = true;
							if (lock) {
								glados.on(`messageReactionAdd`, (reaction, reactor) => {
									if (!reaction.me && reaction.message.id === newMessage.id) {
										if (reactor.id === message.author.id) {
											switch (reaction.emoji.name) {
												case `⬅️`:
													createdClass.moveLeft();
													newMessage.edit(mazeMessage(createdClass));
													break;
												case `⬆️`:
													createdClass.moveUp();
													newMessage.edit(mazeMessage(createdClass));
													break;
												case `⬇️`:
													createdClass.moveDown();
													newMessage.edit(mazeMessage(createdClass));
													break;
												case `➡️`:
													createdClass.moveRight();
													newMessage.edit(mazeMessage(createdClass));
													break;
												default:
													break;
											}
										}
										reaction.users.remove(reactor.id);
										if (createdClass.cellArr[63].playerState) {
											lock = !lock;
											newMessage.edit(`**Congratulations!**\nYou managed to navigate through a maze even one of my ~~test subjects~~paid workers could finish!`);
											newMessage.reactions.removeAll();
										}
									}
								});
							}
						});
				});
			}
		});
	}
	//Frick that one rule
	{
		glados.on(`message`, (message) => {
			if (message.author.id !== glados.user.id && message.guild !== null && message.content.toLowerCase().includes(`from now on`)) {
				let textChannels = [];
				if (message.guild.id === `646155122992480266`) {
					message.guild.channels.cache.map((channel) => {
						if (channel.type === `text`) {
							blackList.forEach((bannedChannel) => {
								if (channel.name !== bannedChannel) {
									textChannels.push(channel.id);
								}
							});
						}
					});
				}
				glados.channels.cache
					.get(textChannels[Math.floor(Math.random() * (textChannels.length - 1))])
					.send(`<@${message.author.id}>, you did an oopsie`);
			}
		});
	}
	//Flit no lasting! Flit no lasting! Flit no lasting! 
	{/*
		bot.on(`message`, (message) => {
			if(message.author.id === `541617670533939210`){
				if(message.content.toLowerCase().includes(`last`)){
					message.delete;
				}
			}
		})
	*/}
	//random stuff I did because I was bored
	{
		//smh, Espen bot doesn't work
		{
			glados.on(`message`, (message) => {
				if (message.author.id === rasID && Math.floor(Math.random() * 100) <= 0 && message.guild.id === `646155122992480266`) {
					message.channel.send(`https://cdn.discordapp.com/attachments/735213241860620308/781189544103247922/unknown.png`);
				}
			});
		}
	}
	//test stuff
	{
		//glados.users.fetch(`202558206495555585`).then(out => console.log(out))
	}
}
//Pokebot
{
	//link
	{
		pokebot.on(`message`, (message) => {
			if (blackList.includes(message.channel.name)) { return };
			containsWord.replyThing(message, `anywhere`, 100, {}, pokeLink, [`botlink ebnj`]);
		})
	}
	//forwarding
	{
		forwarding(pokebot);
	}
	//dex embed
	{
		var dex = (Query) => {
			let dexNumber = 0;
			if (!isNaN(Query)) { Query = Number(Query) }
			switch (typeof Query) {
				case `number`:
					if (Number(Query) <= 151 && Number(Query) > 0) {
						dexNumber = Number(Query);
						break;
					} else {
						break;
					}
				case `string`:
					Object.keys(DB.pokemon).forEach(i => {
						let pokeObj = DB.pokemon[i];
						if (Query === pokeObj.name.toLowerCase()) {
							dexNumber = Number(pokeObj.nat);
						}
					})
					break;
				default:
					break;
			}
			var secType = () => {
				if (typeof DB.pokemon[dexNumber].types[1] !== `undefined`) {
					return DB.pokemon[dexNumber].types[1].name
				} else {
					return `None`
				}
			}
			var embed = new Discord.MessageEmbed()
				.setColor(DB.pokemon[dexNumber].types[0].color)
				.setTitle(DB.pokemon[dexNumber].name)
				.addFields({ name: `National dex number:`, value: DB.pokemon[dexNumber].nat },
					{ name: `Regional dex nunber:`, value: DB.pokemon[dexNumber].reg },
					{ name: `Primary type`, value: DB.pokemon[dexNumber].types[0].name },
					{ name: `Secondary type`, value: secType() }
				)
				.attachFiles([`./Pokèbot/Pokemon/1-151/250px-${DB.pokemon[dexNumber].nat}${DB.pokemon[dexNumber].name}.png`])
				.setImage(`attachment://250px-${DB.pokemon[dexNumber].nat}${DB.pokemon[dexNumber].name.replace(`'`, ``)}.png`);
			return embed;
		}
	}
	//search
	{
		pokebot.on(`message`, (message) => {
			if (message.author.id !== pokebot.user.id) {
				if (message.content.toLowerCase().startsWith(`${PokePrefix} `)) {
					message.channel.send({ embed: dex(message.content.toLowerCase().split(` `)[1]) });
				}
			}
		});
	}
}
//Artoo
{
	//Long stuff
	{
		var generalRas = `General Ras.\nYears ago you served my father in the Clone Wars.\nNow he begs you to help him in his struggle against the Empire.\nI regret that I am unable to present my father's request to you in person, but my ship has fallen under attack, and I'm afraid my mission to bring you to Alderaan has failed.\nI have placed information vital to the survival of the Rebellion into the memory systems of this R2 unit.\nMy father will know how to retrieve it.\nYou must see this droid safely delivered to him on Alderaan.\nThis is our most desperate hour.\nHelp me, Rasmatham.\nYou're my only hope.`;
		var SWWords = [`star`, `wars`, `anakin`, `luke`, `obi`, `wan`, `kenobi`, `han`, `solo`, `leia`, `yoda`, `mace`, `windu`, `force`, `c3po`, `chewbacca`, `chewie`, `darth`, `vader`, `maul`, `sidius`, `plagueis`, `c-3po`, `r2`, `d2`, `emperor`, `palpatine`, `skywalker`, `jango`, `fett`, `padme`, `padmé`, `amidala`, `doku`, `tyranus`, `grievous`, `qui`, `gon`, `jinn`, `ackbar`, `tarkin`, `jabba`, `hut`, `lando`, `calrissian`, `boba`, `naboo`, `kashyyyk`, `alderaan`, `geonosis`, `kamino`, `dagobah`, `hoth`, `endor`, `bespin`, `mustafar`, `coruscant`, `tatooine`];
	}
	//forwarding
	{
		forwarding(artoo);
	}
	//functions
	{
		var beeps = () => {
			let str = ``;
			for (let i = 0; i < Math.floor(Math.random() * 10); i++) {
				if (Math.floor(Math.random() * 2)) {
					str = `${str}beep `
				} else {
					str = `${str}boop `
				}
			}
			return str;
		}
	}
	//replies
	{
		artoo.on(`message`, (message) => {
			if (blackList.includes(message.channel.name)) { return };
			containsWord.replyThing(message, `anywhere`, 100, {}, r2Link, [`botlink artoo`]);
			containsWord.replyThing(message, `exact`, 10, {}, generalRas, [`ras`, `rasmatham`, `rasberry`]);
			containsWord.replyThing(message, `anywhere`, 100, {}, beeps(), SWWords);
		})
	}
}
//Random
{
	//forwarding
	{
		forwarding(random);
	}
	//replies
	{
		random.on(`message`, (message) => {
			if (blackList.includes(message.channel.name)) { return };
			containsWord.replyThing(message, `anywhere`, 100, {}, randomLink, [`botlink random stuff`]);
			containsWord.replyThing(message, `anywhere`, 100, {}, `I like him`, [`ras`, `rasmatham`, `rasberry`]);
			containsWord.reactThing(message, `exact`, 100, [`653023282945196042`], [`espen`]);
			containsWord.reactThing(message, `exact`, 100, [`642497812885405707`], [`wolfo`]);
			containsWord.reactThing(message, `exact`, 100, [`654428027995815976`], [`no u`]);
			containsWord.reactThing(message, `exact`, 100, [`699747136144932925`], [`emily`, `impa`]);
			containsWord.reactThing(message, `exact`, 100, [`699743387817082891`], [`ahk`, `ahkrin`, `ck`, `ck32`, `creeper_killer`, `creeper_killer32`]);
			containsWord.reactThing(message, `exact`, 100, [`656207221792702466`], [`enndal,`, `ganon`, `ganondorf`, `ganond0rf`]);
			containsWord.reactThing(message, `anywhere`, 100, [`656223106788229121`], [`force`]);
			containsWord.reactThing(message, `anywhere`, 100, [`👍`, `👎`], [`yes/no`, `yes or no`, `no/yes`, `no or yes`]);
			containsWord.reactThing(message, `anywhere`, 100, [`0️⃣`, `1️⃣`, `2️⃣`, `3️⃣`, `4️⃣`, `5️⃣`, `6️⃣`, `7️⃣`, `8️⃣`, `9️⃣`, `🔟`], [`multichoice`]);
		})
	}
}
//sinibot
{
	//forwarding
	{
		forwarding(sini);
	}
	//dice roll
	{
		sini.on(`message`, (message) => {
			dice(message, ``);
		})
	}
	//joinVC
	{
		sini.on(`message`, (message) => {
			if (!message.author.bot) {
				if (message.content.startsWith(`&join`)) {
					if (message.member.voice.channel) {
						message.member.voice.channel.join();
					}
				}
			}
		})
		sini.on(`message`, (message) => {
			if (!message.author.bot) {
				if (message.content.startsWith(`&leave`)) {
					if (message.member.voice.channel) {
						message.member.voice.channel.leave();
					}
				}
			}
		})
	}
}
//Zelda
{
	//forwarding
	{
		forwarding(zelda);
	}
	//replies
	{
		zelda.on(`message`, (message) => {
			if (blackList.includes(message.channel.name)) { return };
			containsWord.replyThing(message, `anywhere`, 100, {}, zeldaLink, [`botlink zelda`]);
			containsWord.replyThing(message, `exact`, 10, {}, `Awesome dude`, [`ras`, `rasmatham`, `rasberry`]);
			containsWord.reactThing(message, `anywhere`, 100, [`642474761204662284`], [`courage`]);
			containsWord.reactThing(message, `anywhere`, 100, [`642474761804578826`], [`power`]);
			containsWord.reactThing(message, `anywhere`, 100, [`642474761821224990`], [`wisdom`]);
			containsWord.reactThing(message, `anywhere`, 100, [`642474761754247168`], [`neutral`]);
		})
	}
	//Test stuff
	{
	}
}