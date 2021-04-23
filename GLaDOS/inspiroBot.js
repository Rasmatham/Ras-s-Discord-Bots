const req = require('node-fetch')
const getURL = () => {
    return req(`https://inspirobot.me/api?generate=true`)
    .then((res) => {
        return res.text()
    })
}
module.exports = getURL;