const { bot } = require('../Client');
const { Message, Collection } = require('discord.js');
bot.afkmap = [];

module.exports = {
    name: 'AFK',
    description: 'Sets your AFK status!',
    aliases: [],
    usage: '[command] [optional reason]',
    catagory: 'fun',
    /**
     * @param {Message} message
     * @param {String[]} args
     */
    run: async(a, message, args) => {

        if (bot.afkmap.includes(message.author.id)) return message.reply(bot.embed.setDescription('You are already AFK, ' + message.author + '!'));

        let reason = args.join(' ');
        if (!reason) reason = 'No Reason Specified';

        bot.afkmap.push(`${message.author.id}:${reason}`)

        message.reply(bot.embed.setDescription('I set your AFK to `' + reason + '`!'));

        try {
            message.member.setNickname('[AFK] ' + message.member.displayName).catch(() => {
                return message.reply(bot.embed.setDescription('I do not have permission to change your nickname, ' + message.author));
            });
        } catch (e) {
            message.reply(bot.embed.setDescription('I do not have permission to change your nickname, ' + message.author))

            if (e.toLowerCase().includes('discordapiError: missing permissions')) return;
            console.error(e)
        }
    }
}