const { MessageEmbed } = require("discord.js");
const token = "NzMwNDQwNDU0ODM1MDExNjc0.Xwg0lg.lUFNkX9vMaV6vz45-xvcnNtgn9g"

module.exports = {
  name: 'test',
  description: "this is a test command!",
  async run(bot, message, args) {

    const ms = require("ms"); // npm install ms

    // g!start-giveaway 2d 1 Awesome prize!
    // will create a giveaway with a duration of two days, with one winner and the prize will be "Awesome prize!"

    bot.giveawaysManager.start(message.channel, {
      time: ms(args[0]),
      prize: args.slice(2).join(" "),
      winnerCount: parseInt(args[1])
    }).then((gData) => {
      console.log(gData); // {...} (messageid, end date and more)
    });
    // And the giveaway has started!
  }

}