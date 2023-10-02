const axios = require("axios")
const client = require("../libs/client")
const config = require("../config")
const { MessageMedia } = require("whatsapp-web.js")

exports.searchYgoCard = async (msg) => {
    const query = msg.body.slice(5)
    msg.react('⏳')
    try {
        const response = await axios.get(`${config.YGO_URL}${encodeURIComponent(query)}`)

        const cards = response.data.data

        if (cards.length === 0) {
            msg.reply('No card matching your query was found in the database 😥');
        } else {
            for (const card of cards) {
                const media = await MessageMedia.fromUrl(card.card_images[0].image_url)
                const caption = `Name: ${card.name}\nType: ${card.type}\nDesc: ${card.desc}`
                client.sendMessage(msg.from, media, { 
                    caption 
                })
            }
        }
    } catch (error) {
        msg.reply('An error occurred while fetching the card data 😥')
        console.error('Failed', error)
    }
}