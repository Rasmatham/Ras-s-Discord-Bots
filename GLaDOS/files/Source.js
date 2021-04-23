/*
╔════════════════════════════════════════════════════╦═╦═╦═╗
║ Command Prompt                                     ║-║▫║X║
╠════════════════════════════════════════════════════╩═╩═╩═╣
║ This bot was made by Rasmatham                           ║
║ Feel free to do whatever you want with it                ║
║ as long as it isn't just a copy/paste of the entire file ║
║ C:\WINDOWS\system32>echo Hello World                     ║
╚══════════════════════════════════════════════════════════╝
*/
//Packages and stuff
{
	require(`dotenv`).config();
	var prfx			= `&`;
	var Discord			= require(`discord.js`);
	var Twitter			= require(`twitter`);
	var fs				= require(`fs`);
	var readline		= require(`readline`);
	var xkcd			= require(`xkcd`);
	var mazeThing		= require(`generate-maze`);
	var bot				= new Discord.Client();
	var path			= `C:/Users/${process.env.ME}/Documents/DiscordBot/GLaDOS`;
	var rasID			= `347039494375079947`;
	var testChannel		=`735213241860620308`;
}
//Long stuff (please collapse)
{
	var botlink = `https://discordapp.com/oauth2/authorize?&client_id=680053684243398693&scope=bot&permissions=8`;
	var cake = `It is totally real (Definitely not a lie)`;
	var lemonrant = `All right, I've been thinking, when life gives you lemons, don't make lemonade!\nMake life take the lemons back!\nGet mad!\nI don't want your damn lemons!\nWhat am I supposed to do with these?\nDemand to see life's manager!\nMake life rue the day it thought it could give Cave Johnson lemons!\nDo you know who I am?\nI'm the man whose gonna burn your house down - with the lemons!`;
	var lie = `I will tell you what is not a lie\nThe cake`
	var ping = `P I N G\nWait\nNevermind`;
	var blackList = [`announcements`, `6-hour-cooldown`, `rules`, `polls`, `stalking-tips`, `rules-for-new-mods`, `serious`, `gif-only-conversation`, `love-advice`];
	var stillalive = 
	new Discord.MessageEmbed()
		.setColor(`FFFFFF`)
		.setTitle(`Still alive`)
		.addFields(
			{name:`▪️`,
			value: `This was a triumph\nI'm taking a note here: "HUGE SUCCESS"\nIt's hard to overstate\nMy satisfaction`},
			{name:`▪️`,
			value: `Aperture Science\nWe do what we must because we can\nFor the good of all of us\nExcept the ones who are dead`},
			{name:`▪️`,
			value: `But there's no sense crying over every mistake\nYou just keep on trying till you run out of cake\nAnd the science gets done, and you make a neat gun\nFor the people who are still alive`},
			{name:`▪️`,
			value: `I'm not even angry\nI'm being so sincere right now\nEven though you broke my heart\nAnd killed me`},
			{name:`▪️`,
			value: `And tore me to pieces\nAnd threw every piece into a fire\nAs they burned, it hurt because\nI was so happy for you`},
			{name:`▪️`,
			value: `Now these points of data make a beautiful line\nAnd we're out of beta, we're releasing on time\nSo I'm GLaD I got burned: think of the things we learned\nFor the people who are still alive`},
			{name:`▪️`,
			value: `Go ahead and leave me\nI think I prefer to stay inside\nMaybe you'll find someone else\nTo help you`},
			{name:`▪️`,
			value: `Maybe Black Mesa\nThat was a joke. Haha, fat chance\nAnyway, this cake is great\nIt's so delicious and moist`},
			{name:`▪️`,
			value: `Look at me still talking when there's Science to do\nWhen I look out there, it makes me GLaD I'm not you\nI've experiments to run; there is research to be done\nOn the people who are still alive`},
			{name:`▪️`,
			value: `And believe me, I am still alive\nI'm doing science and I'm still alive\nI feel fantastic and I'm still alive\nWhile you're dying, I'll be still alive`},
			{name:`▪️`,
			value: `And when you're dead, I will be still alive\nStill alive, still alive...`},
		);  
}
//source code safeifier
{
	fs.writeFileSync(
		`${path}/files/Source.js`, 
		fs.readFileSync(`GLaDOS.js`)
		.toString()
		.replace(/Twitter bot login info/gim, `Twitter bot login info`)
		.replace(/Twitter bot login info/gim, `Twitter bot login info`)
		.replace(/Twitter bot login info/gim, `Twitter bot login info`)
		.replace(/Twitter bot login info/gim, `Twitter bot login info`)
	);
}
//setups
{
	//Discord login
	{
		bot.login(process.env.DISCORDTOKEN);
	}
	//Twitter login
	{
		var tbot = new Twitter({
			consumer_key: process.env.CONSUMER_KEY,
			consumer_secret: process.env.CONSUMER_SECRET,
			access_token_key: process.env.ACCESS_TOKEN_KEY,
			access_token_secret: process.env.ACCESS_TOKEN_SECRET,
	});
	}
	//readline
	{
		var rl = readline.createInterface({
			input: process.stdin,
			output: process.stdout
		  });
	}
	//coinflip acc setup
	{
		bot.on(`message`, (message) => {
			if (message.content.toLowerCase().startsWith(`${prfx}startcf`)) {
				for (let i = 0;; i++) {
					var coinflippath = `userinfo/${message.author.id}/coinflip/`;
					bot.channels.cache.get(`714912880784441406`).send(`Creating path for ${message.author}`)
					.then(() => fs.mkdir(`userinfo/`, function (err) {}))
					.then(() => fs.mkdir(`userinfo/${message.author.id}`, function (err) {}))
					.then(() => fs.mkdir(`userinfo/${message.author.id}/coinflip/`, function (err) {}))
					.then(() => fs.writeFile(`userinfo/${message.author.id}/coinflip/wins.txt`, `0`, function (err) {}))
					.then(() => fs.writeFile(`userinfo/${message.author.id}/coinflip/losses.txt`, `0`, function (err) {}));
					if (i > 2)
        			break;
				}
				message.channel.send(`Setup complete\nWarning: Using this command agin will reset your score`);
			}
		});
	}
}
//Functions
{
	//Twitter bot function
	{
		function Tweetingbot(thandle, dchannel) {
			tbot.get(`users/show`, {screen_name: thandle} , function(error, userfromh, response) {
				let tuser = userfromh.id_str;
				tbot.stream(`statuses/filter`, {follow: tuser},  function(stream) {
					stream.on(`data`, function(tweet) {
						if (tweet.in_reply_to_status_id === null) {
							if (tweet.in_reply_to_user_id === null) {
								if (tweet.in_reply_to_screen_name === null) {
									if (!tweet.text.startsWith(`RT`)) {
										var embed = new Discord.MessageEmbed()
	    									.setColor(tweet.user.profile_link_color)
											.setTitle(`${tweet.user.name} just tweeted`)
											.setURL(`https://twitter.com/${tweet.user.screen_name}/status/${tweet.id_str}?s=20`)
											.setAuthor(`@${tweet.user.screen_name}`)
											.setThumbnail(tweet.user.profile_image_url)
											.setDescription(tweet.text)
											.setFooter(`This was brought to you by ${bot.users.cache.get(rasID).tag}`);
										bot.channels.cache.get(dchannel).send({embed: embed});
									}
								}
							}
						}
					});
				});
			});
		}
	}
	//contains word function
	{
		function wordThing(type, chance, fileorembed, rply, msgArr) {																				// Creates a function with the name wordThing and gives it 5 parameters.
			bot.on(`message`, (message) => { 																										// This is to get a trigger when someone sends a message. When that happens, it sends a message object, which contains everything about the message.
				if (!blackList.includes(message.channel.name) && !message.author.bot){																// Checks if the message is sent in a blacklisted channel or by a bot. If either are true, it stops from going any further.
					if(	type === `anywhere`){																										// Checks the type parameter to see if it matches the string anywhere. (starts the code block that sends a message if the word can appear anywhere in the message)
						msgArr.forEach(trigger => {																									// Makes it so that you can do something with every object in the msgArr array.
							if(	message.content.toLowerCase().includes(trigger) && Math.random() * 100 <= chance){									// Checks if the message has any of the words in msgArr and creates a random number between 0 and 100, then checks if it's smaller or equal to the chance variable.
								message.channel.send(rply, fileorembed);																			// Sends a message back to the channel you sent the message to.
							}																														// 
						})																															// 
					} else if (	type === `exact`) {																									// Checks the type parameter to see if it matches the string exact. (starts the code block that sends a message if the exact word appears in the message)
						editedMessage = message.content.replace(`.`, ``).replace(`,`, ``).replace(`!`, ``).replace(`?`, ``).replace(`:`, ``);		// Removes the symbols ". , ! and ?" from a message because they are commonly places right after a word.
						message.content.split(` `).forEach(word => {																				// Makes an array with every word in the message and then makes it so that you can do something with every object in the array.
							msgArr.forEach(trigger => {																								// Makes it so that you can do something with every object in the msgArr array.
								if(word === trigger && Math.random() * 100 <= chance) {																// Checks if both the words from the two lines above are the same and creates a random number between 0 and 100, then checks if it's smaller or equal to the chance variable.
									message.channel.send(rply, fileorembed);																		// Sends a message back to the channel you sent the message to.
								}																													// 
							})																														// 
						})																															// 
					} else if (	type === `mention`) {																								// Checks the type parameter to see if it matches the string mention. (starts the code block that sends a message if a specific user is mentinoed in the message)
						msgArr.forEach(trigger => {																									// Makes it so that you can do something with every object in the msgArr array.
							if(message.mentions.users.has(trigger) && Math.random() * 100 <= chance){												// Checks if the specified user is mentioned and creates a random number between 0 and 100, then checks if it's smaller or equal to the chance variable.
								message.channel.send(rply, fileorembed);																							// Sends a message back to the channel you sent the message to.
							}																														// 
						})																															// 
					}																																// 
				}																																	// 
			})																																		// 
		}																																			// 
	}
	//deleted message tracker
	{/*
		function deletedmessages(channelName) {
			bot.on(`messageDelete`, async messageDelete => {
				let channelid = messageDelete.guild.channels.cache.find(channel => channel.name === channelName).id;
				if(messageDelete.guild.channels.cache.has(channelid) && (messageDelete.content.toLowerCase() !== `h!trick`) && (messageDelete.content.toLowerCase() !== `h!treat`)){
					if(!messageDelete.author.bot){
						const fetchedLogs = messageDelete.guild.fetchAuditLogs({
							limit: 1,
							type: `MESSAGE_DELETE`,
						}).then(audit =>
							setTimeout(function() {
								if (messageDelete.attachments.size <= `0`) {
									bot.channels.cache.get(channelid).send(`The message:`)
										.then(bot.channels.cache.get(channelid).send(messageDelete.content))
										.then(bot.channels.cache.get(channelid).send(`by ${messageDelete.author.tag} was deleted from: <#${messageDelete.channel.id}> in ${messageDelete.guild.name} by ${audit.entries.first().executor.tag} or themselves\n==========================================`))
								} else {
									if (messageDelete.content != ``) {
										bot.channels.cache.get(channelid).send(`The message:`)
											.then(bot.channels.cache.get(channelid).send(messageDelete.content))
											.then(bot.channels.cache.get(channelid).send({files: [messageDelete.attachments.first().url]}))
											.then(bot.channels.cache.get(channelid).send(`by ${messageDelete.author.tag} was deleted from: <#${messageDelete.channel.id}> in ${messageDelete.guild.name} by ${audit.entries.first().executor.tag} or themselves\n==========================================`))
									} else {
										bot.channels.cache.get(channelid).send(`The message:`)
											.then(bot.channels.cache.get(channelid).send({files: [messageDelete.attachments.first().url]}))
											.then(bot.channels.cache.get(channelid).send(`by ${messageDelete.author.tag} was deleted from: <#${messageDelete.channel.id}> in ${messageDelete.guild.name} by ${audit.entries.first().executor.tag} or themselves\n==========================================`))
									}
								}
							}, 3000)
						);
					}
				}
			});
		}	
	*/}
	//edited messages tracker
	{
		function editedMessages(channelName) {
			bot.on('messageUpdate', (oldMessage, newMessage) => {
				if(oldMessage.content !== newMessage.content){
					let chArr = [];
					newMessage.guild.channels.cache.forEach(channel => chArr.push([`${channel.name}`, `${channel.id}`]));
					for(let i = 0; i < chArr.length; i++){
						if(chArr[i][0] === channelName){
							let channelid = chArr[i][1];
							if(newMessage.guild.channels.cache.has(channelid)){
								if(!newMessage.author.bot){
									bot.channels.cache.get(channelid).send(`The message:`)
										.then(bot.channels.cache.get(channelid).send(oldMessage.content))
										.then(bot.channels.cache.get(channelid).send(`by ${newMessage.author.tag} was edited to:`))
										.then(bot.channels.cache.get(channelid).send(newMessage.content))
										.then(bot.channels.cache.get(channelid).send(`in <#${newMessage.channel.id}>\n==========================================`))
								}
							}
						}
					}
				}
			});
		}	
	}
	//forwarding
	{
		function forwarding(channelName){
			bot.on(`message`, (message) => {
				if (message.content.startsWith(`<#`)) {
					if (message.channel.name === channelName) {
						if (message.author.id === rasID || message.member.hasPermission(`ADMINISTRATOR`) || !blackList.includes(bot.channels.cache.get(message.mentions.channels.first().id).name)) {
							bot.channels.cache.get(message.mentions.channels.first().id)
								.send(message.content
								.replace((message.mentions.channels.first()),``)
								.replace(/¤/g,``),
								{files: message.attachments.array()});
						} else {
							message.channel.send(`Nice try`);
						}
					}
				}
			});
		}
	}
	//DM forwarding
	{
		function DmForwarding(channelName){
			bot.on(`message`, (message) => {
				if (message.channel.name === channelName) {
					if (message.content.startsWith(`<@`) && !message.content.startsWith(`<@&`)) {
						bot.users.cache.get(message.mentions.users.first().id)
							.send(message.content
								.replace((message.mentions.users.first().id),``)
								.replace(`<@>`, ``)
								.replace(`<@!>`, ``)
								.replace(/¤/g,``),
								{files: message.attachments.array()})
							.then(() => message.channel.send(`Message sent to ${message.mentions.users.first().tag}`))
							.catch(err => message.channel.send(`Sorry, but ${message.mentions.users.first().tag} has blocked me or they blocked DM's from this server`));
					} else if (message.content.startsWith(`<@&`)) {
						let roleArr = [];
						let userArr = [];
						let success = [];
						let fail = [];
						message.guild.members.cache.map(user => {
							userArr.push(user)
							roleArr.push(user._roles)
						})
						message.channel.send(`0% done`)
						for (let i = 0; i < message.guild.memberCount; i++) {
							if (roleArr[i].includes(message.mentions.roles.first().id)){
								setTimeout(function() {
									message.channel.send(`${Math.floor((i+1)/userArr.length*100)}% done`)
									bot.users.cache.get(userArr[i].id)
										.send(message.content
											.replace((message.mentions.roles.first().id),``)
											.replace(`<@&>`, ``)
											.replace(`<@&!>`, ``)
											.replace(/¤/g,``),
											{files: message.attachments.array()})
										.then(() => {
											success.push(`\n${bot.users.cache.get(userArr[i].id).tag}`)
											if (i === message.guild.memberCount-1) {
												message.channel.send(`Sent to: ${success.toString()}`);
												message.channel.send(`Failed to send to: ${fail.toString()}`);
											}
										})
										.catch(err => {
											fail.push(`\n${bot.users.cache.get(userArr[i].id).tag}`)
											if (i === message.guild.memberCount-1) {
												message.channel.send(`Sent to: ${success.toString()}`);
												message.channel.send(`Failed to send to: ${fail.toString()}`);
											}
										});
										
								}, i*1500)
							}
						}
					}
				}
			});
		}
	}
	//add strings
	{
		function addStrings(str1, str2) {
			let sum = ``;
			let str1Length = str1.length;
			let str2Length = str2.length;
			if(str2Length > str1Length ){
				let temp = str2;
				str2 = str1;
				str1 = temp;
			}
			let carry = 0;
			let a;
			let b;
			let temp;
			let digitSum;
			for (let i = 0; i < str1.length; i++) {
				a = parseInt(str1.charAt(str1.length - 1 - i));
				b = parseInt(str2.charAt(str2.length - 1 - i));
				b = (b) ? b : 0;
				temp = (carry + a + b).toString();
				digitSum = temp.charAt(temp.length - 1);
				carry = parseInt(temp.substr(0, temp.length - 1));
				carry = (carry) ? carry : 0;
				sum = (i === str1.length - 1) ? temp + sum : digitSum + sum;
			}
			return sum;
		}
	}
	//xkcd
	{
		function xkcdFunct(message, numRaw){
			let num = Math.ceil(Math.abs(numRaw));
			xkcd(function (xkcdObjOuter) {
				if (num > xkcdObjOuter.num || num <= 0){
					message.channel.send(`Try a whole number from 1 to ${xkcdObjOuter.num}`);
				} else {
					let xkcdRand = Math.ceil(Math.random()*(xkcdObjOuter.num + Math.random()));
					xkcd(num || xkcdRand, function (xkcdObj) {
						const xkcdEmbed = new Discord.MessageEmbed()
							.setTitle(xkcdObj.title)
							.setURL(`https://xkcd.com/${xkcdObj.num}/`)
							.setImage(xkcdObj.img)
						message.channel.send({embed: xkcdEmbed});
					})
				}
			})
		}
	}
	//gifs only Never called becasue it's super buggy)
	{
		function gifOnly(chID){
			bot.on(`message`, (message) => {
				if(	!message.author.bot){
					if(message.channel.id === chID){
						if(message.author.id !== rasID && !message.member.hasPermission(`ADMINISTRATOR`)){
							let gifVar = message.attachments.first();
							let gifArr = message.content.toLowerCase().split(` `)
							let gifArr2 = message.content.toLowerCase().split(`|`)
							if(!message.content.toLowerCase().startsWith(`https://media.tenor.com/`) && !message.content.toLowerCase().startsWith(`https://tenor.com/`) && typeof gifVar === `undefined` && typeof gifArr[1] !== `undefined` && !message.content.toLowerCase().includes(/\|*~/gim)){
								console.log(`${message.author.tag}\n${message.content}`);
								message.delete();
							} else if (typeof gifVar !== `undefined`){
								let gifArr3 = message.attachments.first().name.split(`.`);
								if (gifArr3[gifArr3.length-1] !== `gif` || message.content !== ``){
									console.log(`${message.author.tag}\n${message.content}`);
									message.delete()
								}
							}
						}
					}
				}
			})
			bot.on('messageUpdate', (oldMessage, newMessage) => {
				if(!newMessage.author.bot){
					if(newMessage.channel.id === chID){
						if(newMessage.author.id !== rasID && !newMessage.member.hasPermission(`ADMINISTRATOR`)){
							if(newMessage.content !== oldMessage.content){
								console.log(`${newMessage.author.tag}\nold\n${oldMessage.content}\nnew\n${newMessage.content}`);
								newMessage.delete()
							}
						}
					}
				}
			})
		}
	}
	//delete all (Never called becasue it's super buggy)
	{
		function deleteAll(chID){
			bot.on(`message`, (message) => {
				if(message.channel.id === chID){
					if(message.author.id !== rasID && !message.member.hasPermission(`ADMINISTRATOR`) || message.author.bot){
						message.delete()
						console.log(`${message.author.tag}\n${message.content}\n`);
					}
				}
			})
		}
	}
}
//delete all (Disabled becasue it's super buggy)
{
	//deleteAll(`755625730196373655`)
}
//gifs only (Disabled becasue it's super buggy)
{
	//gifOnly(`656164355381133332`);
	//gifOnly(`666103639739334712`);
}
//twitterbots
{
	Tweetingbot(`Minecraft`, `713875505870274601`);
}
//coinflip
{
	bot.on(`message`, (message) => {
		if (message.content.toLowerCase().startsWith(`${prfx}coinflip`)) {
			var userid = message.author.id;
			var coinflippath = `userinfo/${userid}/coinflip/`;
			var coinfilew = coinflip`${path}wins.txt`;
			var coinfilel = coinflip`${path}losses.txt`;
			if (fs.existsSync(coinflippath)) {
				if (message.content.toLowerCase().startsWith(`${prfx}coinflip heads`)) {
					if ((Math.random() * 10 < 5) === true) {
						var wincount = fs.readFileSync(coinfilew, `utf8`, function (err) {});
						var losecount = fs.readFileSync(coinfilel, `utf8`, function (err) {});
						fs.writeFile(coinfilew, parseInt(wincount) + 1, function (err) {});
						var embed = new Discord.MessageEmbed()
							.setColor(`00FF00`)
							.setTitle(`You won!`)
							.setThumbnail(`https://cdn.discordapp.com/attachments/656164355381133332/715662587471331359/ezgif-3-b3ae702d4205.gif`)
							.addFields(
								{ name: `The coin landed on heads`, value:  `You won!`},
								{ name: `Wins`, value: parseInt(wincount) + 1},
								{ name: `Losses`, value: losecount},
 							);
						message.channel.send({embed: embed});
					} else {
						var wincount = fs.readFileSync(coinfilew, `utf8`, function (err) {});
						var losecount = fs.readFileSync(coinfilel, `utf8`, function (err) {});
						fs.writeFile(coinfilel, parseInt(losecount) + 1, function (err) {});
						var embed = new Discord.MessageEmbed()
							.setColor(`FF0000`)
							.setTitle(`You lost!`)
							.setThumbnail(`https://cdn.discordapp.com/attachments/656164355381133332/715669285128634368/ezgif-3-b8913657fa57.gif`)
							.addFields(
								{ name: `The coin landed on tails`, value:  `You lost!`},
								{ name: `Wins`, value: wincount },
								{ name: `Losses`, value: parseInt(losecount) + 1},
							);
						message.channel.send({embed: embed});
					}
				}
				if (message.content.toLowerCase().startsWith(`${prfx}coinflip tails`)) {
					if ((Math.random() * 10 < 5) === true) {
						var wincount = fs.readFileSync(coinfilew, `utf8`, function (err) {});
						var losecount = fs.readFileSync(coinfilel, `utf8`, function (err) {});
						fs.writeFile(coinfilew, parseInt(wincount) + 1, function (err) {});
						var embed = new Discord.MessageEmbed()
							.setColor(`00FF00`)
							.setTitle(`You won!`)
							.setThumbnail(`https://cdn.discordapp.com/attachments/656164355381133332/715669285128634368/ezgif-3-b8913657fa57.gif`)
							.addFields(
								{ name: `The coin landed on tails`, value:  `You won!`},
								{ name: `Wins`, value: parseInt(wincount) + 1},
								{ name: `Losses`, value: losecount},
							);
						message.channel.send({embed: embed});
					} else {
						var wincount = fs.readFileSync(coinfilew, `utf8`, function (err) {});
						var losecount = fs.readFileSync(coinfilel, `utf8`, function (err) {});
						fs.writeFile(coinfilel, parseInt(losecount) + 1, function (err) {});
						var embed = new Discord.MessageEmbed()
							.setColor(`FF0000`)
							.setTitle(`You lost!`)
							.setThumbnail(`https://cdn.discordapp.com/attachments/656164355381133332/715662587471331359/ezgif-3-b3ae702d4205.gif`)
							.addFields(
								{ name: `The coin landed on heads`, value:  `You lost!`},
								{ name: `Wins`, value: wincount },
								{ name: `Losses`, value: parseInt(losecount) + 1}
							);
						message.channel.send({embed: embed});
					}
				}
			} else {
				message.channel.send(`Sorry, but you don't seem to have set up yet. Say\"${prfx}startcf\" and try again `);
			}
		}
	});
}
//replies
{

	//if [MESSAGE(S)] then [MESSAGE(S)]
	{
		//			type			chance	attachment									message							triggers
		wordThing(	`anywhere`,		100,	{},											botlink,						[`${prfx}botlink`							]);	// These call the function from above and adds the parameters to it.
		wordThing(	`anywhere`,		100,	{},											`https://discord.gg/xNQ8TaV`,	[`${prfx}nbclink`							]);
		wordThing(	`anywhere`,		100,	{},											`https://discord.gg/62jvqRv`,	[`${prfx}sightingslink`						]);
		wordThing(	`anywhere`,		100,	{},											`https://discord.gg/ys2XWTr`,	[`${prfx}marquettelink`						]);
		wordThing(	`anywhere`,		100,	{},											`https://discord.gg/xsXdy7h`,	[`${prfx}resourcelink`						]);
		wordThing(	`anywhere`,		100,	{},											cake,							[`cake`, `tower 15`							]);
		wordThing(	`anywhere`,		100,	{files:	[`${path}/files/lemonade.png`]},	lemonrant,						[`lemon`, `🍋`								]);
		wordThing(	`exact`,		100,	{},											lie,							[`lie`, 									]);
		wordThing(	`anywhere`,		100,	{},											`JA JA DING DONG!`,				[`${prfx}play`								]);
		wordThing(	`anywhere`,		100,	{files:	[`${path}/files/BSOD.png`]},		``,								[`neurotoxin`								]);
		wordThing(	`anywhere`,		100,	{files:	[`${path}/files/Aperture.png`]},	``,								[`science`									]);
		wordThing(	`anywhere`,		100,	{},											`#36393F`,						[`${prfx}inviscolor`, `${prfx}inviscolour`	]);
		wordThing(	`anywhere`,		100,	{files:	[`${path}/files/Blue.png`]},		``,								[`blue`										]);
		wordThing(	`anywhere`,		100,	{files:	[`${path}/files/Orange.png`]},		``,								[`orange`									]);
		wordThing(	`exact`,		100,	{},											`<@${rasID}>`,					[`@ras`										]);
		wordThing(	`exact`,		100,	{},											`<@454340813388775445>`,		[`@kelp`									]);
		wordThing(	`anywhere`,		100,	{embed:	stillalive},						``,								[`still alive`								]);
		wordThing(	`anywhere`,		100,	{files:	[`${path}/files/Source.js`]},		``,								[`${prfx}source`							]);
		wordThing(	`mention`,		100,	{},											`P I N G`,						[`680053684243398693`						]);
		wordThing(	`mention`,		100,	{},											ping,							[`654074851337699328`						]);
		wordThing(	`exact`,		100,	{},											`He's my daddy 😉`,				[`quinn`, `quinnsnipe`						]);
		wordThing(	`exact`,		 10,	{},											`He's a superior lifeform`,		[`ras`, `rasmatham`, `rasberry`				]);
		wordThing(	`exact`,		 10,	{},											`Did you mean: Czechia?`,		[`cz`, `cz12345`							]);
		wordThing(	`exact`,		 10,	{},											`Failed test subject #1`,		[`12`, `flit`, `flitwick`					]);
		wordThing(	`exact`,		 50,	{},											`Say hi to him for me 😳`,		[`espen bot`								]);
	}
	//forwarding
	{
		forwarding(`talk-as-glados`);
		forwarding(`talk-and-dm-as-glados`);
		forwarding(`dm-and-talk-as-glados`);
		DmForwarding(`dm-as-glados`);
		DmForwarding(`talk-and-dm-as-glados`);
		DmForwarding(`dm-and-talk-as-glados`);
	}	
}
//deleted message tracker
{/*
	deletedmessages(`deleted-messages`);
	deletedmessages(`deleted-and-edited-messages`);
	deletedmessages(`edited-and-deleted-messages`);
	editedMessages(`edited-messages`);
	editedMessages(`deleted-and-edited-messages`);
	editedMessages(`edited-and-deleted-messages`);
*/}
//DM spy
{
	bot.on(`message`, (message) => {
		if (message.guild === null && !message.author.bot && message.author.id !== rasID){
			bot.channels.cache.get(`741333824494895144`).send(`\`\`\`${message.author.tag} - <@${message.author.id}>\`\`\` sent:`);
			bot.channels.cache.get(`741333824494895144`).send(message, {files: message.attachments.array()});
			message.channel.send(`Your message was sent to a super secret channel in Everyone Sightings`);
		}
	})
}
//help
{
	bot.on(`message`, (message) => {
		if(!message.author.bot){
			if(message.content.toLowerCase().startsWith(`${prfx}help`)) {
				var help = 
				new Discord.MessageEmbed()
				.setColor(`0000FF`)
				.setTitle(`Commands`)
				.addFields(
					{name:`${prfx}help`,
					value:`Shows a list of commands`},
					{name:`${prfx}botlink`,
					value:`Gives a link to add the bot to your own server`},
					{name:`cake`,
					value:`It does something`},
					{name:`lemon, 🍋`,
					value:`Gives the lemon rant by Cave Johnson from Portal 2`},
					{name:`lie`,
					value:`Tells you something that's not a lie`},
					{name:`neurotoxin`,
					value:`Releases the neurotoxin`},
					{name:`science`,
					value:`Sends an Aperture Science™️ logo. Only use for worshipping reaons`},
					{name:`blue`,
					value:`Shoots a blue portal`},
					{name:`orange`,
					value:`Shoots an orange portal`},
					{name:`still alive`,
					value:`It's the most beautiful song ever. Don't you agree?`},
					{name:`${prfx}source`,
					value:`Sends my source code (with login info removed, of course)`},
					{name:`mentioning me`,
					value:`Makes me angry`},
					{name:`ras, rasmatham, rasberry`,
					value:`Just some credits to my creator`},
					{name:`If you use the format \"[channel mention] [message] [attachment (optional)]\" in a talk as GLaDOS channel`,
					value:`Sends [message] and [attachment] to [channel mention]`},
					{name:`${prfx}startcf`,
					value:`makes/resets your user for my coinflip game`},
					{name:`${prfx}coinflip heads`,
					value:`Bets on heads`},
					{name:`${prfx}coinflip tails`,
					value:`Bets on tails`},
					{name:`${prfx}greyscale`,
					value:`Sends a greyscale version of your pfp or the first image in your message if there is one`},
					{name:`${prfx}blur`,
					value:`Sends a blurred version of your pfp or the first image in your message if there is one`},
					{name:`potatos`,
					value:`Turns me into a potato (Please don't use)`},
					{name:`glados`,
					value:`changes me back into a robot if you did the previous command`},
					{name:`g;p [YouTube link], g;play [YouTube link]`,
					value:`Makes me play the audi from a video if you're in a voice channel`},
					{name:`g;s, g;skip`,
					value:`Skips a song if you're in a voice channel`},
					{name:`g;dc, g;disconnect`,
					value:`Disconnects me from the voice channel if you're in one too`},
					{name:`${prfx}userinfo (only usable in the bot spam channel)`,
					value:`Send you the info that bots can see about you in the current channel`}
				);
				var help2 = 
				new Discord.MessageEmbed()
				.setColor(`0000FF`)
				.addFields(
					{name:`${prfx}userinfodm`,
					value:`Sends the same as the previous one, but in a dm`},
					{name:`${prfx}joindate`,
					value:`Shows the date you joined Discord`},
					{name:`Quinn`,
					value:`Says what he is to me`},
					{name:`CZ`,
					value:`Obviously a spelling error`},
					{name:`Flit`,
					value:`Says how much of a failure he is`},
					{name:`Espen bot`,
					value:`😳`}
				);
				message.channel.send(help);
				message.channel.send(help2);
			}
		}
	});
}
//dice
{
	bot.on(`message`, (message) => {
		if(message.content.toLowerCase() !== `d`){
			if (message.content.toLowerCase().startsWith(`d`)){
				if (isNaN(Number(message.content.toLowerCase().replace(`d`, ``)))){
					if (message.content.includes(`*`)){
						var multidice = message.content.toLowerCase().replace(`d`, ``).replace(`*`, ` `).split(` `);
						var i;
						if (isNaN(multidice[0])){
							return;
						} else if (isNaN(multidice[1])){
							return;
						} else if (multidice[1] >= 21){
							message.channel.send(`Sorry, but you can only do 20 at a time`)
						} else {
							if (multidice[0] === `10`){
								for (i=0; i < multidice[1]; i++){
									var number10 =
										new Discord.MessageEmbed()
											.setColor(`#0099ff`)
											.setTitle(`Totally legit dice`)
											.addField(`You \"rolled\" a:`, Math.floor(Math.random()*10), true)
											.addField(`\"roll\" number:`, `${i+1}/${multidice[1]}`);
									message.channel.send(number10)
								}
							} else if (multidice[0] === `100`){
								for (i=0; i < multidice[1]; i++){
									var number100 =
										new Discord.MessageEmbed()
											.setColor(`#0099ff`)
											.setTitle(`Totally legit dice`)
											.addField(`You \"rolled\" a:`, Math.floor(Math.random()*10)*10, true)
											.addField(`\"roll\" number:`, `${i+1}/${multidice[1]}`);
									message.channel.send(number100);
								}
							} else {
								for (i=0; i < multidice[1]; i++){
									var numberN =
										new Discord.MessageEmbed()
											.setColor(`#0099ff`)
											.setTitle(`Totally legit dice`)
											.addField(`You \"rolled\" a:`, Math.ceil(Math.random()*Number(multidice[0])), true)
											.addField(`\"roll\" number:`, `${i+1}/${multidice[1]}`);
									message.channel.send(numberN);
								}
							}
						}
					} else {
						return
					}
				} else if (message.content.toLowerCase().replace(`d`, ``) === `10`){
					var number10 =
						new Discord.MessageEmbed()
							.setColor(`#0099ff`)
							.setTitle(`Totally legit dice`)
							.addField(`You \"rolled\" a:`, Math.floor(Math.random()*10), true)
					message.channel.send(
						number10
					);
				} else if (message.content.toLowerCase().replace(`d`, ``) === `100`){
					var number100 =
						new Discord.MessageEmbed()
							.setColor(`#0099ff`)
							.setTitle(`Totally legit dice`)
							.addField(`You \"rolled\" a:`, Math.floor(Math.random()*10)*10, true)
					message.channel.send(
						number100
					);
				} else {
					var numberN =
						new Discord.MessageEmbed()
							.setColor(`#0099ff`)
							.setTitle(`Totally legit dice`)
							.addField(`You \"rolled\" a:`, Math.ceil(Math.random()*Number(message.content.toLowerCase().replace(`d`, ``))), true)
					message.channel.send(
						numberN
					);
				}
			}
		}
	})
}
//xkcd
{
	bot.on(`message`, (message) => {
		if (message.content.toLowerCase().startsWith(`${prfx}xkcd`)){
			if (!isNaN(message.content.toLowerCase().replace(`${prfx}xkcd`, ``))){
				xkcdFunct(message,  message.content.toLowerCase().replace(`${prfx}xkcd `, ``));
			} else {
				xkcdFunct(message);
			}
		}
	})
}
//maze thing
{
	bot.on(`message`, (message) => {
		var OOOO = `<:0000:733748791806525522>`;
		var OOOI = `<:0001:733748792138137702>`;
		var OOIO = `<:0010:733748792158847047>`;
		var OOII = `<:0011:733748792133681212>`;
		var OIOO = `<:0100:733748791869702276>`;
		var OIOI = `<:0101:733748791944937575>`;
		var OIIO = `<:0110:733748791920033823>`;
		var OIII = `<:0111:733748792620220503>`;
		var IOOO = `<:1000:733748792238800996>`;
		var IOOI = `<:1001:733748792238669865>`;
		var IOIO = `<:1010:733748792452579368>`;
		var IOII = `<:1011:733748791978623099>`;
		var IIOO = `<:1100:733748792209309797>`;
		var IIOI = `<:1101:733748792079286274>`;
		var IIIO = `<:1110:733748791974428813>`;
		var IIII = `<:1111:733748792360304742>`;
		if(message.content.toLowerCase().includes(`zelda`)){
			OOOO = `<:0000Z:738891841667334214>`;
			OOOI = `<:0001Z:738891841553956884>`;
			OOIO = `<:0010Z:738891841570865153>`;
			OOII = `<:0011Z:738891841599963286>`;
			OIOO = `<:0100Z:738891841587380225>`;
			OIOI = `<:0101Z:738891841289584691>`;
			OIIO = `<:0110Z:738891841264549960>`;
			OIII = `<:0111Z:738891841604419646>`;
			IOOO = `<:1000Z:738891841633517608>`;
			IOOI = `<:1001Z:738891841549893725>`;
			IOIO = `<:1010Z:738891841394704455>`;
			IOII = `<:1011Z:738891841667334265>`;
			IIOO = `<:1100Z:738891841444774010>`;
			IIOI = `<:1101Z:738891841415413813>`;
			IIIO = `<:1110Z:738891841339916400>`;
			IIII = `<:1111Z:738891841641906326>`;	
		}
		if (message.content.toLowerCase().startsWith(`${prfx}maze`)){
			var maze = mazeThing(8, 8);
			var mazeArr = [];
			for (var x = 0; x <= 7; x++) {
				for(var y = 0; y <= 7; y++) {
					if (maze[x][y].left) {
						if (maze[x][y].top) {
							if (maze[x][y].right) {
								if(maze[x][y].bottom) {
									mazeArr.push(IIII)
								} else {	
									mazeArr.push(IIIO)
								}
							} else {
								if(maze[x][y].bottom) {
									mazeArr.push(IIOI)
								} else {
									mazeArr.push(IIOO)
								}
							}
						} else {
							if (maze[x][y].right) {
								if(maze[x][y].bottom) {
									mazeArr.push(IOII)
								} else {
									mazeArr.push(IOIO)
								}
							} else {
								if(maze[x][y].bottom) {
									mazeArr.push(IOOI)
								} else {	
									mazeArr.push(IOOO)
								}
							}
						}
					} else {
						if (maze[x][y].top) {
							if (maze[x][y].right) {
								if(maze[x][y].bottom) {
									mazeArr.push(OIII)
								} else {
									mazeArr.push(OIIO)
								}
							} else {
								if(maze[x][y].bottom) {
									mazeArr.push(OIOI)
								} else {	
									mazeArr.push(OIOO)
								}
							}
						} else {
							if (maze[x][y].right) {
								if(maze[x][y].bottom) {
									mazeArr.push(OOII)
								} else {
									mazeArr.push(OOIO)	
								}
							} else {
								if(maze[x][y].bottom) {
									mazeArr.push(OOOI)
								} else {
									mazeArr.push(OOOO)
								}
							}
						}
					}
				}
			}
			message.channel.send(
				`${mazeArr[ 0]}${mazeArr[ 1]}${mazeArr[ 2]}${mazeArr[ 3]}${mazeArr[ 4]}${mazeArr[ 5]}${mazeArr[ 6]}${mazeArr[ 7]}\n` +
				`${mazeArr[ 8]}${mazeArr[ 9]}${mazeArr[10]}${mazeArr[11]}${mazeArr[12]}${mazeArr[13]}${mazeArr[14]}${mazeArr[15]}\n` +
				`${mazeArr[16]}${mazeArr[17]}${mazeArr[18]}${mazeArr[19]}${mazeArr[20]}${mazeArr[21]}${mazeArr[22]}${mazeArr[23]}\n` +
				`${mazeArr[24]}${mazeArr[25]}${mazeArr[26]}${mazeArr[27]}${mazeArr[28]}${mazeArr[29]}${mazeArr[30]}${mazeArr[31]}\n` +
				`${mazeArr[32]}${mazeArr[33]}${mazeArr[34]}${mazeArr[35]}${mazeArr[36]}${mazeArr[37]}${mazeArr[38]}${mazeArr[39]}\n` +
				`${mazeArr[40]}${mazeArr[41]}${mazeArr[42]}${mazeArr[43]}${mazeArr[44]}${mazeArr[45]}${mazeArr[46]}${mazeArr[47]}\n` +
				`${mazeArr[48]}${mazeArr[49]}${mazeArr[50]}${mazeArr[51]}${mazeArr[52]}${mazeArr[53]}${mazeArr[54]}${mazeArr[55]}\n` +
				`${mazeArr[56]}${mazeArr[57]}${mazeArr[58]}${mazeArr[59]}${mazeArr[60]}${mazeArr[61]}${mazeArr[62]}${mazeArr[63]}`
			)
		}
	})
}
//userinfo
{
	bot.on(`message`, (message) => {
		if(message.channel.id === `670280013127483422` || testChannel){
			if(message.author.id !== bot.user.id){
				if(message.content.toLowerCase() === `${prfx}userinfo`){
					message.channel.send(`\`\`\`json\nmessage.author\n${JSON.stringify(message.author, null, 2)}\n\nmessage.member\n${JSON.stringify(message.member, null, 2)}\n\`\`\``);
				}
			}
		}
	});
	bot.on(`message`, (message) => {
		if(message.channel.id === `670280013127483422` || testChannel){
			if(message.author.id !== bot.user.id){
				if(message.content.toLowerCase() === `${prfx}userinfodm`){
					message.author.send(`\`\`\`json\nmessage.author\n${JSON.stringify(message.author, null, 2)}\n\nmessage.member\n${JSON.stringify(message.member, null, 2)}\n\`\`\``);
				}
			}
		}
	});
}
//join date
{
	bot.on(`message`, (message) => {
		if(message.content.toLowerCase() === `${prfx}joindate`){
			var ms = message.author.createdTimestamp;
			var date = new Date(ms);			
			var embed = new Discord.MessageEmbed()
				.setColor(`FFFFFF`)
				.setTitle(`You joined:`)
				.setThumbnail(`https://cdn.discordapp.com/attachments/656164355381133332/715651846584270899/ezgif-3-ea387cdabbbe.gif`)
				.addFields(
					{ name: `Date`, value:  date.toLocaleDateString(`en-GB`, {timeZone: `utc`})},
					{ name: `Time`, value: date.toLocaleTimeString(`en-GB`, {timeZone: `utc`, timeZoneName: `short`})}
				);
				message.channel.send({embed: embed});
		}
	});
}
//random stuff I did because I was bored
{
	//flit no last
	{/*
		bot.on(`message`, (message) => {
			if(message.author.id === `541617670533939210`){
			  if(message.content.toLowerCase().includes(`last`)){
				message.delete;
			  }
			}
		  })
		*/}
	//fibonacci
	{/*
		var a = `1`, b = `0`, temp;
		var k = 0;
		var fArr = [];
		var len = 1000000;
		fs.writeFileSync(`${path}/files/fibo.txt`, ``,  function (err) {});
		for(var f = 0; f < len; f++){
			temp = a;
    		a = addStrings(a, b);
			b = temp;
			fArr.push(a);
			fs.appendFileSync(`${path}/files/fibo.txt`, `Fibo ${k+1}: ${fArr[k]}\n`,  function (err) {});
			console.log( `Fibo ${k+1}: ${fArr[k]})
			if(k === len-1){
				console.log(`finished`)
			}
			k++;
		}
	*/}
	//counting
	{/*
		var k = 0;
		var cArr = [];
		var len = 1180000;
		fs.writeFileSync(`${path}/files/counting.txt`, ``,  function (err) {});
		for(var c = 0; c < len; c++){
			cArr.push(c+1)
		}
		fs.appendFileSync(`${path}/files/counting.txt`, cArr.toString().replace(/,/g, `\n`),  function (err) {});
		console.log(`finished`)
	*/}
	//console readline test
	{
		let gameArr = [	2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,`\n`,
						2,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,`\n`,
						2,0,2,2,2,2,2,0,0,0,2,2,2,2,0,0,0,2,2,2,2,2,0,2,0,0,0,0,2,0,0,2,2,2,2,0,0,2,2,2,2,2,2,0,2,0,0,0,0,2,0,0,2,2,2,2,0,0,2,0,0,0,0,2,0,2,`\n`,
						2,0,2,0,0,0,0,2,0,2,0,0,0,0,2,0,2,0,0,0,0,0,0,2,2,0,0,2,2,0,2,0,0,0,0,2,0,0,0,2,0,0,0,0,2,0,0,0,0,2,0,2,0,0,0,0,2,0,2,2,0,0,2,2,0,2,`\n`,
						2,0,2,0,0,0,0,2,0,2,0,0,0,0,2,0,2,0,0,0,0,0,0,2,2,0,0,2,2,0,2,0,0,0,0,2,0,0,0,2,0,0,0,0,2,0,0,0,0,2,0,2,0,0,0,0,2,0,2,2,0,0,2,2,0,2,`\n`,
						2,0,2,0,0,0,0,2,0,2,0,0,0,0,2,0,2,0,0,0,0,0,0,2,0,2,2,0,2,0,2,0,0,0,0,2,0,0,0,2,0,0,0,0,2,0,0,0,0,2,0,2,0,0,0,0,2,0,2,0,2,2,0,2,0,2,`\n`,
						2,0,2,0,0,0,0,2,0,2,0,0,0,0,2,0,2,0,0,0,0,0,0,2,0,0,0,0,2,0,2,0,0,0,0,2,0,0,0,2,0,0,0,0,2,0,0,0,0,2,0,2,0,0,0,0,2,0,2,0,0,0,0,2,0,2,`\n`,
						2,0,2,0,0,0,0,2,0,2,0,0,0,0,2,0,2,0,0,0,0,0,0,2,0,0,0,0,2,0,2,0,0,0,0,2,0,0,0,2,0,0,0,0,2,0,0,0,0,2,0,2,0,0,0,0,2,0,2,0,0,0,0,2,0,2,`\n`,
						2,0,2,2,2,2,2,0,0,2,2,2,2,2,2,0,0,2,2,2,2,0,0,2,0,0,0,0,2,0,2,2,2,2,2,2,0,0,0,2,0,0,0,0,2,2,2,2,2,2,0,2,2,2,2,2,2,0,2,0,0,0,0,2,0,2,`\n`,
						2,0,2,2,0,0,0,0,0,2,0,0,0,0,2,0,0,0,0,0,0,2,0,2,0,0,0,0,2,0,2,0,0,0,0,2,0,0,0,2,0,0,0,0,2,0,0,0,0,2,0,2,0,0,0,0,2,0,2,0,0,0,0,2,0,2,`\n`,
						2,0,2,0,2,0,0,0,0,2,0,0,0,0,2,0,0,0,0,0,0,2,0,2,0,0,0,0,2,0,2,0,0,0,0,2,0,0,0,2,0,0,0,0,2,0,0,0,0,2,0,2,0,0,0,0,2,0,2,0,0,0,0,2,0,2,`\n`,
						2,0,2,0,0,2,0,0,0,2,0,0,0,0,2,0,0,0,0,0,0,2,0,2,0,0,0,0,2,0,2,0,0,0,0,2,0,0,0,2,0,0,0,0,2,0,0,0,0,2,0,2,0,0,0,0,2,0,2,0,0,0,0,2,0,2,`\n`,
						2,0,2,0,0,0,2,0,0,2,0,0,0,0,2,0,0,0,0,0,0,2,0,2,0,0,0,0,2,0,2,0,0,0,0,2,0,0,0,2,0,0,0,0,2,0,0,0,0,2,0,2,0,0,0,0,2,0,2,0,0,0,0,2,0,2,`\n`,
						2,0,2,0,0,0,0,2,0,2,0,0,0,0,2,0,2,2,2,2,2,0,0,2,0,0,0,0,2,0,2,0,0,0,0,2,0,0,0,2,0,0,0,0,2,0,0,0,0,2,0,2,0,0,0,0,2,0,2,0,0,0,0,2,0,2,`\n`,
						2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,`\n`,
						2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,`\n`];
		let gamePos;
		gamePos = gameArr.indexOf(1);
		setTimeout(function() {console.log(`${gameArr}`.replace(/,/g, ``).replace(/0/g, `-`).replace(/1/g, `+`).replace(/2/g, `#`))}, 1);
		readline.emitKeypressEvents(process.stdin);
		process.stdin.setRawMode(true);
		process.stdin.on(`keypress`, (str, key) => {
			if(key.sequence.toLowerCase() === `w`) {
				if (gameArr[gamePos-gameArr.indexOf(`\n`)-1] !== 2){
					gameArr[gamePos] = 0;
					gameArr[gamePos-gameArr.indexOf(`\n`)-1] = 1;
					gamePos = gameArr.indexOf(1);
				}
				console.log(`: You moved up\n\n${gameArr}`.replace(/,/g, ``).replace(/0/g, `-`).replace(/1/g, `+`).replace(/2/g, `#`));
			} else if (key.sequence.toLowerCase() === `a`) {
				if (gamePos > 0) {
					if (gameArr[gamePos-1] !== 2){
						gameArr[gamePos] = 0;
						gameArr[gamePos-1] = 1;
						gamePos = gameArr.indexOf(1);
					}
				}
				console.log(`: You moved left\n\n${gameArr}`.replace(/,/g, ``).replace(/0/g, `-`).replace(/1/g, `+`).replace(/2/g, `#`));
			} else if (key.sequence.toLowerCase() === `s`) {
				if (gameArr[gamePos+gameArr.indexOf(`\n`)+1] !== 2){
					gameArr[gamePos] = 0;
					gameArr[gamePos+gameArr.indexOf(`\n`)+1] = 1;
					gamePos = gameArr.indexOf(1);
				}
				console.log(`: You moved down\n\n${gameArr}`.replace(/,/g, ``).replace(/0/g, `-`).replace(/1/g, `+`).replace(/2/g, `#`));
			} else if (key.sequence.toLowerCase() === `d`) {
				if (gameArr[gamePos+1] !== 2){
					gameArr[gamePos] = 0;
					gameArr[gamePos+1] = 1;
					gamePos = gameArr.indexOf(1);
				}
				console.log(`: You moved right\n\n${gameArr}`.replace(/,/g, ``).replace(/0/g, `-`).replace(/1/g, `+`).replace(/2/g, `#`));
			} else {
				console.log(`: Invalid key`);
			}
		})
	}
	//message count
	{/*
		bot.on(`message`, (message) => {
			if(message.author.id === rasID){
				message.guild.channels.cache.forEach(channel => {
					if(channel.type === `text`){
						console.log(channel);
					}
				})
			}
		})
	*/}
	//heck lucia
	{/*
		let spamMsg = ``;
		bot.on(`message`, (message) => {
			if(message.author.id === `421356006652641290`){
				switch(Math.floor(Math.random()*4)) {
					case 0:
						spamMsg =`Follow the law or get the saw`;
						break;
					case 1:
						spamMsg =`Break the rule and you're out of fuel`;
						break;
					case 2:
						spamMsg =`Dishonor Nowrway and I say no way`;
						break;
					case 3:
						spamMsg =`Disobey the ham and you get the ban`;
						break;
					default:
						spamMsg =`Wow, you're lucky if you got this message and should buy a lottery ticket`;
				  }
				  message.author.send(spamMsg)
			}
		})
	*/}
	//smh, Espen bot doesn't work
	{
		bot.on(`message`, (message) => {
			if((message.author.id === rasID) && (Math.floor(Math.random()*100) <= 0) && (message.guild.id === `646155122992480266`)){
				message.channel.send(`https://cdn.discordapp.com/attachments/735213241860620308/781189544103247922/unknown.png`)
			}
		})
	}
}
//fancy stuff
{
	let t = 0; // time variable

	function setup() {
	  createCanvas(600, 600);
	  noStroke();
	  fill(40, 200, 40);
	}
	
	function draw() {
	  background(10, 10); // translucent background (creates trails)
	
	  // make a x and y grid of ellipses
	  for (let x = 0; x <= width; x = x + 30) {
		for (let y = 0; y <= height; y = y + 30) {
		  // starting point of each circle depends on mouse position
		  const xAngle = map(mouseX, 0, width, -4 * PI, 4 * PI, true);
		  const yAngle = map(mouseY, 0, height, -4 * PI, 4 * PI, true);
		  // and also varies based on the particle's location
		  const angle = xAngle * (x / width) + yAngle * (y / height);
	
		  // each particle moves in a circle
		  const myX = x + 20 * cos(2 * PI * t + angle);
		  const myY = y + 20 * sin(2 * PI * t + angle);
	
		  ellipse(myX, myY, 10); // draw particle
		}
	  }
	
	  t = t + 0.01; // update time
	}
	
}