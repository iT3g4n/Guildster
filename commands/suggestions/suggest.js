const { Message, MessageEmbed } = require("discord.js")
const guildSchema = require('../../schemas/guildSchema');
const { bot } = require('../../index');

this.name = 'Suggest'
this.description = 'Give a suggestion!'
this.aliases = []
this.usage = '[command] [suggestion]'
this.catagory = 'suggestions'

/**
 * @param {Message} message 
 * @param {Array} args 
 */
this.run = async function(a, message, args) {

    if (!args[2]) return message.reply(bot.error('Please make your suggestion longer.'))

    const result = await guildSchema.findOne({
        _id: message.guild.id
    })
    const channel = message.guild.channels.cache.get(result.Suggestions);

    if (!channel) return message.reply(bot.error(`Please DM <@${message.guild.ownerID}> to set the suggestion channel. It is not yet setup on this server.`));
    const aamessage = await channel.send(new MessageEmbed()
    .setAuthor(`Suggestion by ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
        .setColor('YELLOW')
        .setTimestamp(Date.now())
        .setDescription(args.join(' '))
        .setFooter('Pending Approval'))

    message.reply(bot.e(`Success! Your idea is pending approval. Check it out [here!](${aamessage.url})`))
}