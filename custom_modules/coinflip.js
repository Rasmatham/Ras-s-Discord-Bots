const { Message, MessageEmbed } = require(`discord.js`);
var {mkdir, writeFile, existsSync, readFileSync} = require(`fs`);
/**
 * 
 * @param {Message} message 
 * @param {String} prefix 
 */
var setup = (message, prefix) => {
    if (message.content.toLowerCase().startsWith(`${prefix}cfsetup`)) {
        message.channel
            .send(`Creating save for ${message.author}`)
            .then(() => mkdir(`userinfo/`, (err) => { }))
            .then(() =>
                mkdir(`./${message.client.user.username}/userinfo/${message.author.id}`, (err) => { })
            )
            .then(() => {
                mkdir(`./${message.client.user.username}/userinfo/${message.author.id}/coinflip/`, (err) => { })
            })
            .then(() => { writeFile(`./${message.client.user.username}/userinfo/${message.author.id}/coinflip/wins.txt`, `0`, (err) => { }) })
            .then(() => { writeFile(`./${message.client.user.username}/userinfo/${message.author.id}/coinflip/losses.txt`, `0`, (err) => { }) });
        message.channel.send(`Setup complete\nWarning: Using this command agin will reset your score`);
    }
}
/**
 * 
 * @param {Message} message 
 * @param {String} prefix 
 */
var flip = (message, prefix) => {
    if (message.content.toLowerCase().startsWith(`${prefix}coinflip`)) {
        var coinflippath = `./${message.client.user.username}/userinfo/${message.author.id}/coinflip/`;
        var coinfilew = `./${message.client.user.username}/userinfo/${message.author.id}/coinflip/wins.txt`;
        var coinfilel = `./${message.client.user.username}/userinfo/${message.author.id}/coinflip/losses.txt`;
        if (existsSync(coinflippath)) {
            if (message.content.toLowerCase().startsWith(`${prefix}coinflip heads`)) {
                if (Math.random() * 10 < 5 === true) {
                    var wincount = readFileSync(coinfilew, `utf8`, (err) => { });
                    var losecount = readFileSync(coinfilel, `utf8`, (err) => { });
                    writeFile(coinfilew, (parseInt(wincount) + 1).toString(), (err) => { });
                    var embed = new MessageEmbed()
                        .setColor(`00FF00`)
                        .setTitle(`You won!`)
                        .setThumbnail(`https://cdn.discordapp.com/attachments/656164355381133332/715662587471331359/ezgif-3-b3ae702d4205.gif`)
                        .addFields({ name: `The coin landed on heads`, value: `You won!` }, { name: `Wins`, value: parseInt(wincount) + 1 }, { name: `Losses`, value: losecount });
                    message.channel.send({ embed: embed });
                } else {
                    var wincount = readFileSync(coinfilew, `utf8`, (err) => { });
                    var losecount = readFileSync(coinfilel, `utf8`, (err) => { });
                    writeFile(coinfilel, (parseInt(losecount) + 1).toString(), (err) => { });
                    var embed = new MessageEmbed()
                        .setColor(`FF0000`)
                        .setTitle(`You lost!`)
                        .setThumbnail(`https://cdn.discordapp.com/attachments/656164355381133332/715669285128634368/ezgif-3-b8913657fa57.gif`)
                        .addFields({ name: `The coin landed on tails`, value: `You lost!` }, { name: `Wins`, value: wincount }, { name: `Losses`, value: parseInt(losecount) + 1 });
                    message.channel.send({ embed: embed });
                }
            }
            if (message.content.toLowerCase().startsWith(`${prefix}coinflip tails`)) {
                if (Math.random() * 10 < 5 === true) {
                    var wincount = readFileSync(coinfilew, `utf8`, (err) => { });
                    var losecount = readFileSync(coinfilel, `utf8`, (err) => { });
                    writeFile(coinfilew, (parseInt(losecount) + 1).toString(), (err) => { });
                    var embed = new MessageEmbed()
                        .setColor(`00FF00`)
                        .setTitle(`You won!`)
                        .setThumbnail(`https://cdn.discordapp.com/attachments/656164355381133332/715669285128634368/ezgif-3-b8913657fa57.gif`)
                        .addFields({ name: `The coin landed on tails`, value: `You won!` }, { name: `Wins`, value: parseInt(wincount) + 1 }, { name: `Losses`, value: losecount });
                    message.channel.send({ embed: embed });
                } else {
                    var wincount = readFileSync(coinfilew, `utf8`, (err) => { });
                    var losecount = readFileSync(coinfilel, `utf8`, (err) => { });
                    writeFile(coinfilel, (parseInt(losecount) + 1).toString(), (err) => { });
                    var embed = new MessageEmbed()
                        .setColor(`FF0000`)
                        .setTitle(`You lost!`)
                        .setThumbnail(`https://cdn.discordapp.com/attachments/656164355381133332/715662587471331359/ezgif-3-b3ae702d4205.gif`)
                        .addFields({ name: `The coin landed on heads`, value: `You lost!` }, { name: `Wins`, value: wincount }, { name: `Losses`, value: parseInt(losecount) + 1 });
                    message.channel.send({ embed: embed });
                }
            }
        } else {
            message.channel.send(`Sorry, but you don't seem to have set up yet. Say \"${prefix}cfsetup\" and try again`);
        }
    }
}
module.exports = {setup, flip}