const req = require('node-fetch')
/**
 * @returns {Promise<string>} A promise to a random inspirobot URL.
 */
const getURL = () => {
    return req(`https://inspirobot.me/api?generate=true`)
    .then((res) => {
        return res.text()
    })
}
module.exports = getURL;