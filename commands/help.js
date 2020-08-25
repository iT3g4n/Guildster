const { MessageEmbed, Client, Message } = require("discord.js");

module.exports = {
  name: 'help',
  description: "this is a help command!",
  /**
   * @param {Client} bot 
   * @param {Message} message 
   * @param {String[]} args 
   */
  async run(bot, message, args) {
    let embed = new MessageEmbed()
      .setThumbnail(message.author.avatarURL({ dynamic: true, format: "png", size: 1024 }))
  }
}