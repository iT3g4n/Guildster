const { Message, Client } = require("discord.js");

module.exports = {
    name: 'purge',
    aliases: ['delete', 'del'],
    catagory: 'moderation',
    usage: '[command] amount',
    description: "Deletes the specified amount of messages from the channel of the message!",
    /**
     * 
     * @param {Client} bot 
     * @param {Message} message 
     * @param {String[]} args 
     */
    async run(bot, message, args) {

        if (!message.member.hasPermission(`MANAGE_MESSAGES`)) return;

        if (!args[0]) return message.channel.send("Please mention an amount to purge.")
        if (isNaN(args[0][0])) return message.channel.send("That is not a number!")
        if (parseInt(args[0]) > 99) return bot.e('The best i can do is 99 messages, sorry.', true);
        message.channel.bulkDelete(parseInt(args[0]) + 1);
    }
}