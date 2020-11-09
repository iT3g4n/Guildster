const { Message, MessageEmbed } = require("discord.js");
const giveawaySchema = require("../../schemas/giveawaySchema");

module.exports = {
  name: "End",
  description: "Ends the giveaway when you provide a messageID",
  aliases: ["reroll", "again", "newwinner"],
  catagory: "giveaways",
  usage: "[command] [message id]",
  /**
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (bot, message, args) => {
    message.delete();

    const msg = await message.channel.messages.fetch(args[0], true, false);

    if (!msg.editable)
      return message.reply(
        bot.error(
          "That does not seem to be my message. Please select a giveaway message that I have sent."
        )
      );

    if (!msg)
      return message.reply(
        bot.error(
          `You did not specify any message, or I can't find it in this channel, ${message.author}`
        )
      );

    const thing = msg.reactions.cache.get("🎉");
    const winner = thing.users.cache.filter((u) => !u.bot).random();

    if (!winner)
      return msg.edit(
        new MessageEmbed()
          .addField("Prize", msg.embeds[0].fields[0].value)
          .addField("Winner", "Nobody has won this giveaway.")
          .setFooter(
            "Hosted by " +
              msg.embeds[0].footer.text.slice(
                "Hosted by ".length,
                -". | End".length
              ) +
              "| Ended"
          )
          .setTimestamp(Date.now()),
        await giveawaySchema.deleteOne({
          guildId: message.guild.id,
          channelId: message.channel.id,
          messageId: msg.id,
        })
      );

    msg.edit(
      new MessageEmbed()
        .addField("Prize", message.embeds[0].fields[0].value)
        .addField("Winner", `<@${winner.id}>`)
        .setFooter(
          "Hosted by " +
            msg.embeds[0].footer.text.slice(
              "Hosted by ".length,
              -". | End".length
            ) +
            "| Ended"
        )
        .setTimestamp(Date.now()),
      await giveawaySchema.deleteOne({
        guildId: message.guild.id,
        channelId: message.channel.id,
        messageId: msg.id,
      })
    );
    message.channel
      .send(`<@${winner.id}>`)
      .then((msg) => msg.delete({ timeout: 1000 }));
  },
};
