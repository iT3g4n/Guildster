const { Message, Client } = require(`discord.js`)
const newembed = require("./../../newembed")

module.exports = {
    name: 'Invite',
    aliases: ['helplinks', 'links', 'link', 'support', 'supportserver', 'inv'],
    catagory: 'fun',
    usage: '[command]',
    description: 'Want to invite the bot to your own server? Well use this!',
    /**
     * @param {Message} message
     * @param {Client} bot
     * @param {String[]} args
     */
    run: async(bot, message, args) => {
        newembed(message, require('./invite')).then(async embed => {
            embed
                .setTitle(`Helpful Links`)
                .addField(`Bot Invite`, "[Click Here!](https://discord.com/api/oauth2/authorize?client_id=730440454835011674&permissions=2134207679&scope=bot)", true)
                .addField(`Support`, "[Click Here!](https://discord.gg/yVVDJfM)", true)
                .addField(`YouTube`, "[Click Here!](https://youtube.com/T3g4n)", true)
                .addField(`Commands`, "[Click Here!](https://docs.google.com/document/d/1fbXv3c7MLatbkGSS3POwINSmLBiyINE5AIkhT7GcfVI/edit?usp=sharing)", true)
            message.channel.send(embed)
        })
    }
}