const { MessageEmbed, Client, Message } = require("discord.js");

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
    run: async(bot, message, args) => {

        if (!message.member.hasPermission(`BAN_MEMBERS`)) return message.channel.send(`You are not allowed to run that command!`).then(m => m.delete({ timeout: 5000 }))

        const mention = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        if (!mention) return message.reply(`Please mention a person to ban.`).then(msg => msg.delete({ timeout: 5000 }))


        const reason = args.slice(1).join(' ')
        if (!reason) return message.reply(`Please give a reason.`).then(msg => msg.delete({ timout: 5000 }))

        mention.ban(reason);
    }
}