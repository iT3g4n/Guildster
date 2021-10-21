const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "Poll",
  aliases: [],
  catagory: "misc",
  usage: "[command] [poll message]",
  description: "Creates a poll in the channel of the message!",
  run: async (bot, message, args) => {
    const msgArgs = args.join(" ");

    if (message.channel.permissionsFor(message.member).has("MANAGE_MESSAGES")) {
      if (!msgArgs) return;
      const embed = new MessageEmbed()
        .setColor(`RANDOM`)
        .setTitle("Poll Time!")
        .setDescription(msgArgs)
        .setTimestamp(Date.now());

      message.delete();

      const msg = await message.channel.send(embed);

      await msg.react("✔️");
      msg.react("❌");
    } else return message.reply("YOU DO NOT HAVE ENOUGH PERMISSIONS");
  },
};
