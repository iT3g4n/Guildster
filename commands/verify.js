const { Client, Message } = require("discord.js");
const { bot } = require('../index');

module.exports = {
    name: 'Verify',
    aliases: [],
    catagory: 'moderation',
    usage: '[command]',
    description: 'Use this when you join the server!',
    /**
     * @param {Message} message
     * @param {String[0]} args
     */
    run: async(a, message, args) => {
        bot.emit('guildMemberAdd', message.member);
    }
}