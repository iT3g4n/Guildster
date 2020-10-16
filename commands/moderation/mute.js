const { Message, MessageEmbed } = require("discord.js")
const { bot } = require('./../../index')
const guildSchema = require("./../../schemas/guildSchema")
const ms = bot.ms

this.name = 'Mute'
this.aliases = ['silence', 'shut', 'sh', 'stop']
this.catagory = 'moderation',
    this.usage = '[command] [mention or id] [reason]'
this.description = 'Mutes the mentioned person!'
/**
 * @param {Message} message 
 * @param {String[]} args 
 */
this.run = async function (_p, message, args) {
    if (!message.member.hasPermission('MANAGE_ROLES'))
        return message.reply(bot.embed.setDescription('You do not have enough permissions, ' + message.author)).then(m => m.delete({ timeout: 5000 }))

    const mention = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    if (!mention)
        return message.channel.send(bot.embed.setDescription('You didn\'t mention anyone!'))

    const muterole = message.guild.roles.cache.find(r => r.name === 'Muted')
    if (!muterole)
        return message.channel.send(bot.embed.setDescription(`This server does not have a \'Muted\' role! Please create a role with the exact name \`Muted\`.`)).then(m => m.delete({ timeout: 20000 }))

    const time = ms(args[1])
    if (!time)
        return message.reply(bot.embed.setDescription(`You did not specify a time!`))
    if (!isNaN(args[0][0]))
        return message.reply(bot.embed.setDescription('That is not a time.'))

    let reason = args.slice(1).join(' ')

    mention.roles.add(muterole)

    if (!reason)
        reason = 'No Reason Specified'


    message.reply(bot.embed.setDescription(`Successfully Muted <@${mention.id}>`))


    setTimeout(() => {
        mention.roles.remove(muterole)
    }, time)

    const channel = await guildSchema.findOne({ _id: message.guild.id })
    if (!channel.Logs)
        return
    const sendchannel = channel.Logs



    const embed = new MessageEmbed()
        .setTitle(`User Muted`)
        .addField(`User`, mention, true)
        .addField(`Moderator`, `<@${message.author.id}>`, true)
        .addField(`Reason`, `${reason}`, true)
        .setColor(`GREY`)
    bot.channels.cache.get(sendchannel).send(embed)
}