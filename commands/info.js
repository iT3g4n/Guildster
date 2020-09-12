const { Client, Message } = require("discord.js");
const newembed = require("../newembed");
const ms = require(`ms`);

this.aliases = ['botinfo', 'bot']

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
                .addField(`Uptime`, `${ms(bot.uptime, { long: false })}`, true)
                .addField(`API Ping`, `${bot.ws.ping} MS`, true)
                .addField(`Owner`, `<@381024325974622209>`, true)
                .addField(`Severs`, `${bot.guilds.cache.size}`, true)
                .addField(`Bot Invite`, "[Click Here!](https://discord.com/api/oauth2/authorize?client_id=730440454835011674&permissions=2134207679&scope=bot)", true)
                .addField(`Support`, "[Click Here!](https://discord.gg/yVVDJfM)", true)
                .addField(`YouTube`, "[Click Here!](https://youtube.com/T3g4n)", true)
                .addField(`Commands`, "[Click Here!](https://docs.google.com/document/d/1fbXv3c7MLatbkGSS3POwINSmLBiyINE5AIkhT7GcfVI/edit?usp=sharing)", true)
                .addField(`Version`, `${require(`../package.json`).version}`, true )
            message.channel.send(embed)
        })
    }
}