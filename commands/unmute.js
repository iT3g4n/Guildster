const { Message, MessageEmbed } = require("discord.js");
const { bot } = require('../Bot');
const mongo = require('../mongo');
const guilds = require('../schemas/guildSchema')

module.exports = {
    name: 'Unmute',
    description: 'Unmutes the mentioned person!',
    aliases: ['u', 'talk'],
    catagory: 'moderation',
    usage: '[command] [mention or id]',
    /**
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (a, message, args) => {
        const mention = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!mention) return message.reply(bot.embed.setDescription('You did not mention anybody!'));

        if (!mention.roles.cache.find(r => r.name === 'Muted')) return message.reply(bot.embed.setDescription('That person is not muted!'))

        mention.roles.remove(mention.roles.cache.find(r => r.name === 'Muted'));

        message.reply(bot.embed.setDescription(`'Succesfully unmuted <@${mention.id}>!`));

        const embed = new MessageEmbed()
            .setTitle(`User Unmuted`)
            .addField(`User`, `<@${mi}>`, true)
            .addField(`Moderator`, `<@${message.author.id}>`, true)
            .setColor(`GREY`)

            const result = await guilds.findOne({ _id: message.guild.id })
            if (!result) return;
            bot.channels.cache.get(result.Logs).send(embed)
    },
}