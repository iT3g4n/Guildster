const { MessageEmbed, Client, Message } = require("discord.js")
const { bot } = require('./../../index');

module.exports = {
    name: 'Ban',
    aliases: ['b'],
    catagory: 'moderation',
    description: "This bans the mentioned user with a reason!",
    usage: '[command] [mention] [reason]',
    /**
     * @param {Client} bot 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(a, message, args) => {

        if (!message.member.hasPermission(`BAN_MEMBERS`)) return message.channel.send(bot.error(`You are not allowed to run that command!`)).then(m => m.delete({ timeout: 5000 }))

        const mention = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        if (!mention) return message.reply(bot.error(`Please mention a person to ban.`)).then(msg => msg.delete({ timeout: 5000 }))


        const reason = args.slice(1).join(' ')
        if (!reason) return message.reply(bot.error(`Please give a reason.`)).then(msg => msg.delete({ timeout: 5000 }))

        if(!mention.bannable) return message.channel.send(bot.error(`<@${mention.id}> is not bannable! Please try again later. Does <@${mention.id}> have a higher role than me?`))
        mention.ban({ reason: reason });
    }
}