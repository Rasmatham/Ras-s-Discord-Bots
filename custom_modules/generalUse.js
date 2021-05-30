const { Message, MessageAttachment, TextChannel, WebhookClient, Client } = require(`discord.js`);
//Check amount
{
	/**
	 * 
	 * @param {String[]} arr 
	 * @param {String} str 
	 * @returns {String} Returns the string and the amount of elements in the array
	 */
	var checkFor = (arr, str) => {
		if (arr.length > 0) {
			return `${str} ${arr.length}\n`;
		} else {
			return ``;
		}
	}
}
//send as webhook
{
    /**
     * 
     * @param {Message} message Discord.js Message object
     * @param {TextChannel} sendTo Discord.js TextChannel object that a message should be sent to
     * @param {String} sendMessage The message that the webhook should send
     * @param {MessageAttachment} sendAttachments Anything that should be sent with the message
     * @param {String} name The name the webhook should use for the message
     * @param {URL} PFP The image the webhook should use as a PFP for the message
     */
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
                            let myWebHook = new WebhookClient(webHook.id, webHook.token)
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
//Bot check
{
    /**
     * 
     * @param {Client[]} bots
     */
    var botReady = (bots) => {
        bots.forEach((bot) => {
            bot.on(`ready`, () => {
                console.log(`${bot.user.username} is online`);
            })
        })
    }
}
module.exports = {checkFor, sendAsWebHook, botReady};