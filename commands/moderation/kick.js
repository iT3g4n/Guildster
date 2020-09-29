const { MessageEmbed, Client, Message } = require("discord.js");
const {bot} = require('./../../index');

module.exports = {
    name: 'Kick',
    aliases: ['k', 'remove', 'yeet'],
    catagory: 'moderation',
    description: "This kicks the mentioned user with a reason!",
    usage: '[command] [mention or id] [reason]',
    /**
     * 
     * @param {Client} bot 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(a, message, args) => {
        
        if (!message.member.hasPermission(`KICK_MEMBERS`)) return message.channel.send(bot.error(`You are not allowed to run that command!`)).then(m => m.delete({ timeout: 5000 }))

        const mention = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        if (!mention) return message.reply(`Please mention a person to kick.`).then(msg => msg.delete({ timeout: 5000 }))


        const reason = args.slice(1).join(' ')
        if (!reason) return message.reply(`Please give a reason.`).then(msg => msg.delete({ timout: 5000 }))

        mention.kick({ reason: reason });

    }
}