const { Message } = require(`discord.js`);
var ytdl = require(`ytdl-core`);
/**
 * 
 * @param {Message} message 
 * @param {String} prfx 
 * @returns 
 */
var music = (message, prfx) => {
    if (message.author.bot) return;
    if (!(message.content.toLowerCase().startsWith(`${prfx}`)) || message.guild === null) return;
    const serverQueue = message.client.queue.get(message.guild.id);
    if (message.content.startsWith(`${prfx}play `) ||
        message.content.startsWith(`${prfx}p `)) {
        if (process.env.HOME) {
            execute(message, serverQueue);
        } else {
            message.channel.send(`Sorry, but this function is disabled right now.\nRas might be at school and doesn't want to constantly up/download youtube videos.\nIf you know for a fact that he's not at school, ping him until he turns it on or gives an explanation`);
        }
        return;
    } else if (message.content.toLowerCase() == `${prfx}skip` ||
        message.content.toLowerCase() == `${prfx}s`) {
        if (process.env.BUZZBOTTOKEN) {
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
}
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
            message.client.queue.set(message.guild.id, queueContruct);
            queueContruct.songs.push(song);
            try {
                var connection = await voiceChannel.join();
                queueContruct.connection = connection;
                play(message, message.guild, queueContruct.songs[0]);
            } catch (err) {
                console.log(err);
                message.client.queue.delete(message.guild.id);
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
const play = (message, guild, song) => {
    const serverQueue = message.client.queue.get(guild.id);
    if (!song) {
        serverQueue.voiceChannel.leave();
        message.client.queue.delete(guild.id);
        return;
    }
    const dispatcher = serverQueue.connection.play(ytdl(song.url, { quality: 'highestaudio' }))
        .on(`speaking`, (speaking) => {
            if (!speaking) {
                serverQueue.songs.shift();
                play(message, guild, serverQueue.songs[0]);
            }
        })
        .on(`error`, error => {
            console.error(error);
        });
    dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
}
module.exports = music;