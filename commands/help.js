const { MessageEmbed, Client, Message } = require("discord.js");
const { helpEmbed } = require(`../index`)
const fs = require(`fs`)

module.exports = {
  name: 'Help',
  aliases: ['h', 'commands', 'command'],
  description: "This displays a list of all commands!",
  /**
   * @param {Client} bot 
   * @param {Message} message 
   * @param {String[]} args 
   */
  run: async (bot, message, args) => {

    if (!args[0]) {
      const embed = helpEmbed.setColor('RANDOM').setThumbnail(message.author.displayAvatarURL({ dynamic: true, format: 'png' })).setTitle(`All Commands for ${bot.user.tag}`).setFooter(`|  Help Command`, message.author.avatarURL({ dynamic: true, format: 'png', size: 2048 })).setTimestamp(Date.now())
      try {
        await message.author.send(embed);
        message.reply(`I sent you a DM!`).then(msg => msg.delete({ timeout: 3000 }))
      return;
      } catch (err) {
        message.reply(bot.embed.setDescription(`Please open your DM's so that I can send you the help command! I need to do this because the command list is very long.`)).then(msg => msg.delete({ timeout: 10000 }))
        return;
      }
    }

    const command = bot.commands.get(args[0]) || bot.commands.find(c => c.aliases && c.aliases.includes(args[0]))
    if (!command) return message.reply(bot.embed.setDescription('I couldn\'t find that command. Please try again.')).then(m => m.delete({ timeout: 5000 }))

    let data = []
    if (command.name) data.push('Name: `' + command.name + '`');
    if (command.description) data.push('Description: `' + command.description + '`')
    if (command.aliases) data.push('Aliases: `' + command.aliases + '`')
    if (command.usage) data.push('Usage: `' + command.usage + '`')

    message.reply(bot.embed.setDescription(data).setTitle('Help for "' + command.name + '"'))

  }
}