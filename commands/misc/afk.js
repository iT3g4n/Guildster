const { bot } = require('../../index');
const { Message } = require('discord.js');

module.exports = {
    name: 'AFK',
    description: 'Sets your AFK status!',
    aliases: [],
    usage: '[command] [optional reason]',
    catagory: 'misc',
    /**
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (a, message, args) => {

        if (bot.afkmap.has(message.author.id)) return;

        let reason = args.join(' ');
        if (!reason) reason = 'No Reason Specified';

        bot.afkmap.set(message.author.id, reason)

        message.reply(bot.embed.setDescription('I set your AFK to `' + reason + '`!'));

        message.member.setNickname('[AFK] ' + message.member.displayName).catch(() => {
            return message.reply(bot.embed.setDescription('I do not have permission to change your nickname, <@' + message.author.id + '>'));
        });
    },
};