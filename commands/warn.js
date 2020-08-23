const { Client, Message, MessageEmbed } = require('discord.js')
const mongoose = require('mongoose');
const warnSchema = require(`../schemas/warnSchema`);

module.exports = {
    name: 'warn',
    description: "this is a warn command!",

    /**
     * @param {Client} bot 
     * @param {Message} message
     * @param {String[]} args 
     */

    async run(bot, message, args) {
        if (!message.member.hasPermission(`MANAGE_MESSAGES`)) return;

        const mention = message.mentions.users.first() || message.guild.members.cache.get(args[0])
        if (!mention) return message.channel.send(`You did not mention anyone.`)


        const reason = args.slice(1).join(' ')
        if (!reason) return message.channel.send(`You did not specify a reason.`)
        warnSchema.findOne({ userId: mention.id, guildId: message.guild.id }), async (err, data) => {
            if (err) return console.error(err)
            if (!data) {
                let THISISAWARN = new warnSchema({
                    userId: mention.id,
                    guildId: message.guild.id,
                    warnings: [
                        {
                            moderatorId: message.author.id,
                            reason: reason
                        }
                    ]
                }).save()
            }
        }

        message.channel.send(`${mention.tag} has been warned for \`${reason}\``).then(r => r.delete({ timeout: 5000 }))

        const embed = new MessageEmbed()
            .setTitle(`${mention.avatar} User Warned`)
            .addField(`User:`, `<@${mention.id}>`, true)
            .addField(`Moderator:`, `<@${message.author.id}>`, true)

        let channel = bot.channels.cache.get(`728653429785755730`);
        channel.send(embed)

    }
}