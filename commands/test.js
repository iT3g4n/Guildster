const { Client, Message } = require("discord.js");
const newembed = require(`../newembed`)
this.name = 'Test'

module.exports = {
    name: 'Test',
    aliases: ['t'],
    description: 'This is just for testing commands and such.',
    /**
     * @param {Client} bot
     * @param {Message} message
     * @param {String[0]} args
     */
    run: async(bot, message, args) => {

        message.channel.send(bot.embed.setDescription('test'))
   
    }
}