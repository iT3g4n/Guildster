const discord = require("discord.js");

module.exports = {
  name: "Slowmode",
  aliases: ["sm", "chatspeed", "speed", "mode", "slow"],
  catagory: "misc",
  usage: "[command] [slowmode in secs]",
  description: "Sets the slowmode to the specified amount!",
  /**
   * 
   * @param {require("../../index.js").bot} bot 
   * @param {discord.Message} message 
   * @param {Array} args 
   */
  async run(bot, message, args) {
    if (message.channel.permissionsFor(message.member).has("MANAGE_CHANNEL")) {
      if (!args[0])
        return message.channel
          .send(`Slowmode is ${message.channel.rateLimitPerUser}`)
          .then((msg) => {
            msg.delete({ timeout: 5000 });
          });

      if (isNaN(args[0][0]))
        return message.channel.send("That is not a number!");

      if (args[0] === "1") {
        var secondornot = " second";
      } else {
        var secondornot = " seconds";
      }

      if (args[0] > 1000)
        return message.channel
          .send(
            "Please give a number lower than 1000 as that is the limit of the Discord API"
          )
          .then((msg) => {
            msg.delete({ timeout: 6000 });
          });

      await message.channel
        .setRateLimitPerUser(args[0])
        .catch((err) => console.error(err));
      message
        .reply(bot.e("Slowmode is now " + args[0] + secondornot))
        .then((msg) => {
          msg.delete({ timeout: 5000 });
        });
    } else
      return message.reply("YOU DO NOT HAVE ENOUGH PERMISSIONS!").then((m) => {
        m.delete({ timeout: 5000 });
      });
  },
};
