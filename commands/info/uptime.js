const ms = require("ms");
const newembed = require("./../../newembed");

module.exports = {
  name: "Uptime",
  aliases: ["time", "long"],
  catagory: "info",
  description: "Tells you how long the bot has been online!",
  usage: "[command]",
  async run(bot, message, args) {
    const m = await message.channel.send(
      bot.embed.setDescription("Checking Uptime...")
    );

    const uptime = ms(bot.uptime, { long: true });

    newembed(message, module.exports).then(async (embed) => {
      embed
        .setTitle("Uptime")
        .setDescription(`I have been online for:\n\`${uptime}\``);
      await m.edit(embed);
    });
  },
};
