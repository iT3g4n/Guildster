const { Client, Message } = require("discord.js");
const newembed = require("../newembed");
const ms = require(`ms`);

module.exports = {
    name: 'Botinfo',
    usage: '[command]',
    catagory: 'fun',
    aliases: ['bot'],
    description: 'Get the info on this bot!',
    /**
     * @param {Client} bot
     * @param {Message} message
     * @param {String[]} args
     */
    run: async(bot, message, args) => {
        await newembed(message, require('./botinfo.js')).then(async embed => {
            embed
                .setTitle(`Bot Info`)
                .addField(`Uptime`, `${ms(bot.uptime, { long: false })}`, true)
                .addField(`API Ping`, `${bot.ws.ping} MS`, true)
                .addField(`Owner`, `<@381024325974622209>`, true)
                .addField(`Severs`, `${bot.guilds.cache.size}`, true)
                .addField(`Version`, `${require(`../package.json`).version}`, true )
            message.channel.send(embed)
        })
    }
}