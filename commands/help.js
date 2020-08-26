const { MessageEmbed, Client, Message } = require("discord.js");
const { helpEmbed } = require(`../index`)


module.exports = {
  name: 'help',
  description: "This displays a list of all commands!",
  /**
   * @param {Client} bot 
   * @param {Message} message 
   * @param {String[]} args 
   */
  async run(bot, message, args) {
    let embed = helpEmbed.setThumbnail(message.author.avatarURL({dynamic: true, format: 'png'})).setTitle(`All Commands for ${bot.user.tag}`).setFooter(`|  Help Command`, message.author.avatarURL({ dynamic: true, format: 'png' })).setTimestamp(Date.now())
    message.channel.send(embed)
  }
}