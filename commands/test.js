const { Client, Message } = require("discord.js");
const { bot, owners } = require('../Bot');

module.exports = {
    name: 'Test',
    aliases: ['t'],
    catagory: 'owner',
    usage: '[command] [whatever]',
    description: 'This is just for testing commands and such.',
    /**
     * @param {Message} message
     * @param {String[0]} args
     */
    run: async(a, message, args) => {
        if (!owners.includes(message.author.id)) return;
        message.channel.send(bot.senderror('test'))
    }
}