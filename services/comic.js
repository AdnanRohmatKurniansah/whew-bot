const { MessageMedia } = require("whatsapp-web.js")
const client = require("../libs/client")
const axios = require("axios")
const config = require("../config")

exports.searchComic = async (msg) => {
    const query = msg.body.slice(7)
    msg.react('⏳')
    try {
        const response = await axios.get(`${config.COMIC_URL}${encodeURIComponent(query)}`)

        const comics = response.data.data

        if (comics.length === 0) {
            msg.reply('No comic matching your query was found in the database 😥');
        } else {
            for (const comic of comics) {
                const media = await MessageMedia.fromUrl(comic.image);
                const caption = `Title: ${comic.title}\nType: ${comic.type}\nDesc: ${comic.desc}`;
                client.sendMessage(msg.from, media, { 
                    caption 
                });
            }
        }
    } catch (error) {
        msg.reply('An error occurred while fetching the comic data 😥')
        console.error('Failed', error)
    }
}