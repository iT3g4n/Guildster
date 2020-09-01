const { MessageEmbed, Client, Message } = require("discord.js");
const { helpEmbed } = require(`../index`)
const fs = require(`fs`)
let i = 1

fs.readdir('./', (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    i++
  });
});

module.exports = {
  name: 'help',
  description: "This displays a list of all commands!",
  /**
   * @param {Client} bot 
   * @param {Message} message 
   * @param {String[]} args 
   */
  run: async(bot, message, args) => {

    let embed = helpEmbed.setColor('RANDOM').setThumbnail(message.author.displayAvatarURL({ dynamic: true, format: 'png' })).setTitle(`All Commands for ${bot.user.tag}`).setFooter(`|  Help Command`, message.author.avatarURL({ dynamic: true, format: 'png', size: 2048 })).setTimestamp(Date.now())
    message.author.send(embed).catch(err => {
      message.reply(`Please open your DM's so that I can send you the help command! I need to do this because the command list is \`${i}\` commands long.`).then(msg => msg.delete({ timeout: 10000 }))
      if (err !== `DiscordAPIError: Cannot send messages to this user`) return;
      console.error(err)
    })
    message.reply(`I sent you a DM!`).then(msg => msg.delete({ timeout: 3000 }))
    
  }
}