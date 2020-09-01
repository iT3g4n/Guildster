const { Client, Message } = require("discord.js");
const newembed = require("../newembed");
const ms = require(`ms`);
this.name = 'Info'

module.exports = {
    name: 'Info',
    description: 'Get the info on this bot!',
    /**
     * @param {Client} bot
     * @param {Message} message
     * @param {String[]} args
     */
    run: async(bot, message, args) => {
        await newembed(message, this).then(async embed => {
            embed
                .setTitle(`Bot Info`)
                .addField(`Uptime`, `\`${ms(bot.uptime, { long: true })}\``, true)
                .addField(`API Ping`, `\`${bot.ws.ping} MS\``, true)
                .addField(`Owner`, `<@381024325974622209>`, true)
                .addField(`Severs`, `\`${bot.guilds.cache.size}\``, true)
            message.channel.send(embed)
        })
    }
}