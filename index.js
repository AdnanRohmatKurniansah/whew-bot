const qrcode = require('qrcode-terminal')
const { convertToSticker } = require('./services/sticker')
const { searchYgoCard } = require('./services/ygo')
const { searchComic } = require('./services/comic')
const client = require('./libs/client')
const { checkWeather } = require('./services/weather')

const menu = `
📜 Menu:
- Type "/menu" to display this menu.
- Type "/sticker" to convert image -> sticker.
- Type "/ygo *query*" to search yugioh's card.
- Type "/comic *query*" to search comic.
- Type "/weather *place*" to check weather.
`

client.initialize()

client.on('qr', (qr) => {
    qrcode.generate(qr, {
        small: true
    })
})

client.on('authenticated', () => {
    console.log('Authenticated')
})

client.on('ready', () => {
    console.log('Bot is ready')
})

client.on('message', async msg => {
    if (msg.body === '/menu') {
        msg.reply(menu)
    } else if (msg.hasMedia && msg.body === '/sticker') {
        convertToSticker(msg)
    } else if (msg.body.startsWith('/ygo ')) {
        searchYgoCard(msg)
    } else if (msg.body.startsWith('/comic ')) {
        searchComic(msg)
    } else if (msg.body.startsWith('/weather ')) {
        checkWeather(msg)
    }
})

client.on('disconnected', () => {
    console.log('Bot was logged out')
});
