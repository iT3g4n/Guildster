const { Message, MessageEmbed } = require('discord.js');
const { bot } = require('../index');

this.name = 'Guildlist'
this.aliases = ['guilds', 'servers', 'serverlist'];
this.usage = '[command]'
this.description = 'Names all of the guilds the bot is in!'
this.catagory = 'fun'
/**
 * @param {Message} message 
 * @param {String[]} args 
 */
this.run = async(a, message, args) => {
    const embed = new MessageEmbed().setColor('RANDOM').setAuthor('Guild Name\'s', message.author.displayAvatarURL({ dynamic: true }));
    bot.guilds.cache.forEach(guild => {
        embed.addField(guild.name,`Member Count: ${guild.members.cache.size}`, true);
    })
    message.reply(embed)
}