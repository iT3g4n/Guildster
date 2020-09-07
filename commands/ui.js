const { Message, Client, Role } = require('discord.js')
const newembed = require('../newembed')
const ms = require('ms')
this.name = 'UI'
this.description = 'Gets information on a user!'
/**
 * @param {Client} bot 
 * @param {Message} message 
 * @param {String[]} args
 */
this.run = async(bot, message, args) => {
    newembed(message, this).then(async embed => {
        const mention = message.mentions.members.first()
        const user = message.guild.members.cache.get(args[0])
        if (!mention && !user) return message.channel.send(`You did not mention anybody. Please try again, but this time, mention somebody.`).then(m => m.delete({ timeout: 5000 }))

        let mi;
        let mt;
        let person;
        if (!mention) {
            mi = user.id
            mt = user.user.tag
            person = user
        } else {
            mi = mention.id
            mt = mention.user.tag
            person = mention
        }

        embed
            .setTitle(`User Info for ${mt}`)
            .addField('Created', person.user.createdAt.toLocaleTimeString() + ` on ${person.user.createdAt.toDateString()}`, true)
            if (!message.guild.member(person)._roles) {
                embed.addField('Roles', `${mt} has no roles.`, true)
            } else {
                embed.addField('Roles', '<@&' + message.guild.member(person)._roles.join('> <@&') + '>', true)
            }
        embed
            .addField('Joined', person.joinedAt.toLocaleTimeString() + ` on ${person.joinedAt.toDateString()}`, true)
            
        message.channel.send(embed)

    })
}