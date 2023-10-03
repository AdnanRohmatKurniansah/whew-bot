const axios = require('axios')
const config = require('../config')

exports.checkWeather = async (msg) => {
    const city = msg.body.slice(9).toLowerCase()
    msg.react('⏳')
    try {
        const url = `${config.WEATHER_URL}${config.WEATHER_API}&q=${city}, Indonesia`
        
        const response = await axios.get(url)

        const weather = response.data

        if (weather.location.country !== 'Indonesia') {
            throw new Error(`Kota ${city} tidak ditemukan di Indonesia.`);
        }

        const replyMessage = `Cuaca di ${city} saat ini:\n`
            + `Temperatur: ${weather.current.temp_c}°C\n`
            + `Kondisi Cuaca: ${weather.current.condition.text}`
        
        msg.reply(replyMessage)
    } catch (error) {
        msg.reply('Error when checking weather 😥')
        console.error('Failed', error)
    }
}