const guild = require(`./../../schemas/guildSchema`)
const { Client, Message } = require("discord.js");
const mongo = require("./../../mongo");

module.exports = {
    name: 'Prefix',
    aliases: ['pre', 'startofmessage'],
    catagory: 'moderation',
    usage: '[command] [optional setprefix]',
    description: `Sets the prefix for this guild!`,
    /**
     * @param {Client} bot
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (bot, message, args) => {


        if (!args[0]) return message.channel.send(`The prefix for ${message.guild.name} is \`${bot.prefixes.get(message.guild.id)}\``);

        if (!message.member.hasPermission(`ADMINISTRATOR`)) return message.channel.send(`You don't have enough permissions to do that!`);

        await guild.findOneAndUpdate({ _id: message.guild.id }, {
            Prefix: args[0]
        }, {})

        bot.prefixes.set(message.guild.id, args[0]);

        message.channel.send(`:white_check_mark: Success! The prefix for ${message.guild.name} is now \`${arga[0]}\``);


    }
};