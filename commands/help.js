const { Client, Message } = require("discord.js");

module.exports = {
  name: 'Help',
  aliases: ['h', 'commands', 'command'],
  catagory: 'fun',
  description: "This displays a list of all commands!",
  /**
   * @param {Client} bot 
   * @param {Message} message 
   * @param {String[]} args 
   */
  run: async (bot, message, args) => {

    if (!args[0]) {
      
      const msg = message.reply(bot.embed.setDescription(`Hello ${message.author}! This is what I can do!
      
      😃: Fun
      🤖: Moderation
      🤬: Hitting
      🎫: Tickets`))

      await (await msg).react('😃');
      await (await msg).react('🤖');
      await (await msg).react('🤬');
      await (await msg).react('🎫');

      bot.on('messageReactionAdd', async (reaction, user) => {
        if (reaction.emoji.name === '😃' && user.id === message.author.id) (await msg).edit(bot.embed.setTitle('Catagory: Fun').setDescription(require('../events/readdir').fun.join('\n\n')))
        return;
      })
      
    }

    const command = bot.commands.get(args[0]) || bot.commands.find(c => c.aliases && c.aliases.includes(args[0]))
    if (!command) return message.reply(bot.embed.setDescription('I couldn\'t find that command. Please try again.')).then(m => m.delete({ timeout: 5000 }))

    let data = []
    if (command.name) data.push('Name: `' + command.name + '`');
    if (command.description) data.push('Description: `' + command.description + '`');
    if (command.aliases) data.push('Aliases: `' + command.aliases.join(', ') + '`');
    if (command.usage) data.push('Usage: `' + command.usage + '`');
    if (command.catagory) data.push('Catagory: `' + command.catagory + '`')

    message.reply(bot.embed.setDescription(data).setTitle('Help for "' + command.name + '"'));

  }
}