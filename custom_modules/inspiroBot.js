const { Message } = require(`discord.js`);
const req = require('node-fetch')
/**
 * @returns {Promise<string>} A promise to a random inspirobot URL.
 */
const getURL = () => {
    return req(`https://inspirobot.me/api?generate=true`)
    .then((res) => {
        return res.text()
    })
    .catch(console.error)
}
/**
 * 
 * @param {Message} message 
 */
const sendMessage = (message) => {
    if (!message.author.bot && (message.content.toLowerCase().includes(`inspire`) || message.content.toLowerCase().includes(`inspiration`) || message.content.toLowerCase().includes(`inspiring`))) {
        getURL().then((url) => {
            message.channel.send(url)
			.catch(console.error)
        })
    }
}
module.exports = {getURL, sendMessage};