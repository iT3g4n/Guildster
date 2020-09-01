const { MessageEmbed, Message } = require('discord.js')

/**
 * 
 * @param {Message} message 
 */

module.exports = async(message, command) => {
    const embed = new MessageEmbed().setFooter(`|   ${command.name} Command`, message.author.avatarURL({ dynamic: true, format: 'png' })).setColor('RANDOM').setTimestamp(Date.now())
    return embed;
}