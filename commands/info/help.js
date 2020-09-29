const { Client, Message } = require("discord.js");
const { bot } = require('./../../index');

module.exports = {
  name: 'Help',
  aliases: ['h', 'commands', 'command'],
  catagory: 'fun',
  description: "This displays a list of all commands!",
  usage: '[command] [optional command]',
  /**
   * @param {Message} message 
   * @param {String[]} args 
   */
  run: async (baot, message, args) => {

    if (!args[0]) {

      const sendmessage = bot.embed.setDescription(`Hello ${message.author}! This is what I can do!
      
      😃: Fun
      🤖: Moderation
      🤬: Hitting
      🎫: Tickets
      🌎: All
      
      **Don't forget!**
      You can use \`*help [command]\` to get help on a specific command!\n`);

      const msg = await message.reply(sendmessage)

      await msg.react('😃').then(() => {
        msg.react('🤖').then(() => {
          msg.react('🤬').then(() => {
            msg.react('🎫').then(() => {
              msg.react('🌎').then(() => {
                if (!bot.owners.includes(message.author.id)) return;
                msg.react('716330113670578257')
              });
            });
          });
        });
      });

      bot.on('messageReactionAdd', async (reaction, user) => {
        if (reaction.emoji.name === '😃' && user.id === message.author.id) reaction.users.remove(user.id) + msg.edit(bot.embed.setTitle('Catagory: Fun').setDescription(bot.fun.join('\n\n')));
        if (reaction.emoji.name === '🤖' && user.id === message.author.id) reaction.users.remove(user.id) + msg.edit(bot.embed.setTitle('Catagory: Moderation').setDescription(bot.moderation.join('\n\n')));
        if (reaction.emoji.name === '🤬' && user.id === message.author.id) reaction.users.remove(user.id) + msg.edit(bot.embed.setTitle('Catagory: Hitting').setDescription(bot.hitting.join('\n\n')));
        if (reaction.emoji.name === '🎫' && user.id === message.author.id) reaction.users.remove(user.id) + msg.edit(bot.embed.setTitle('Catagory: Tickets').setDescription(bot.tickets.join('\n\n')));
        if (reaction.emoji.name === '🌎' && user.id === message.author.id) {
          try {
            reaction.users.remove(user);
            user.send(bot.helpEmbed.setTitle('Catagory: All'));
            msg.edit(bot.embed.setDescription(`I have sent you a DM, ${message.author}!`))
          } catch (err) {
            msg.edit(bot.embed.setDescription(`Please open your DM's first, ${message.author}! The commands list is ${bot.commandlength} commands long.`))
          }
        }
        if (reaction.emoji.id === '716330113670578257' && message.author.id === user.id) reaction.users.remove(user.id) + msg.edit(bot.embed.setTitle(`Catagory: Owner`).setDescription(bot.owner.join('\n\n')));
        if (reaction.emoji.id === '754519671897587833' && message.author.id === user.id) reaction.users.remove(user.id) + msg.edit(bot.embed.setTitle(`Catagory: Owner`).setDescription(bot.owner.join('\n\n')));
        return;
      })
    }

    if (args[0]) {
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
}