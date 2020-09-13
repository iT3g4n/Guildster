const { Message, MessageEmbed } = require("discord.js")
const { bot } = require('../Client')
const mongo = require("../mongo")
const guildSchema = require("../schemas/guildSchema")
const ms = require('ms')

this.name = 'Mute'
this.aliases = ['silence', 'shut', 'sh', 'stop']
this.catagory = 'moderation',
this.usage = '[command] [mention or id] [reason]'
this.description = 'Mutes the mentioned person!'
/**
 * @param {Message} message 
 * @param {String[]} args 
 */
this.run = async(asdfasdf, message, args) => {
    if (!message.member.hasPermission('MANAGE_ROLES')) return message.reply(bot.embed.setDescription('You do not have enough permissions, ' + message.author)).then(m => m.delete({ timeout: 5000 }));

    const user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if (!user) return message.channel.send(bot.embed.setDescription('You didn\'t mention anyone!'));

    const muterole = message.guild.roles.cache.find(r => r.name === 'Muted')
    if (!muterole) return message.channel.send(bot.embed.setDescription(`This server does not have a \'Muted\' role! Please create a role with the exact name \`Muted\`.`)).then(m => m.delete({ timeout: 20000}));

    const time = ms(args[1])
    if (!time) return message.reply(bot.embed.setDescription(`You did not specify a time!`));

    let reason = args.slice(1).join(' ');

    user.roles.add(muterole)

    setTimeout(() => {
        user.roles.remove(muterole)
    }, time)

    await mongo().then(async mongoose => {
        const channel = await guildSchema.findOne({ _id: message.guild.id })
        if (!channel.Logs) return;
        const sendchannel = channel.Logs

        if (!reason) reason = 'No Reason Specified';

        const embed = new MessageEmbed()
            .setTitle(`User Muted`)
            .addField(`User`, user, true)
            .addField(`Moderator`, `<@${message.author.id}>`, true)
            .addField(`Reason`, `${reason}`, true)
            .setColor(`GREY`);
        bot.channels.cache.get(sendchannel).send(embed)
    })
}