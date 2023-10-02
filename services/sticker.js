const client = require("../libs/client")

exports.convertToSticker = async (msg) => {
    msg.react('⏳')
    try {
        const media = await msg.downloadMedia()

        client.sendMessage(msg.from, media, {
            sendMediaAsSticker: true
        })
    } catch (error) {
        client.sendMessage('Failed convert image to sticker 😥')
        console.log(error)
    }
}