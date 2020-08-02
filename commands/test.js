const { MessageEmbed } = require("discord.js");
const token = "NzMwNDQwNDU0ODM1MDExNjc0.Xwg0lg.lUFNkX9vMaV6vz45-xvcnNtgn9g"

module.exports = {
  name: 'test',
  description: "this is a test command!",
  async run(bot, message, args) {
    message.channel.send("this is workin yo")
  }

}
