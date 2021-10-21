const { Message, MessageEmbed } = require("discord.js");
const giveawaySchema = require("../../schemas/giveawaySchema");

module.exports = {
  name: "End",
  description: "Ends the giveaway when you provide a message ID",
  aliases: [],
  catagory: "giveaways",
  usage: "[command] [message id]",
  /**
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (bot, message, args) => {
    if (message.member.hasPermission("MANAGE_MESSAGES"))
      return message.channel.send(
        bot.error("You do not have enough permissions!")
      );

    message.delete();

    if (!args.length)
      return message.channel.send(bot.error("Please specify a message ID"));

    const msg = await message.channel.messages.fetch(args[0]);

    if (!msg)
      return message.channel.send(
        bot.error("I could not find that message in this channel.")
      );

    if (!msg.editable)
      return message
        .reply(
          bot.error(
            "That does not seem to be my message. Please select a giveaway message that I have sent."
          )
        )
        .then((msg) => msg.delete({ timeout: 5000 }));

    if (!msg)
      return message.reply(
        bot.error(
          `You did not specify any message, or I can't find it in this channel.`
        )
      );

    const doc = await giveawaySchema.findOne({
      messageId: msg.id,
    });

    if (!doc)
      return message.channel.send(
        bot.error("I could not find that giveaway in my database.")
      );

    const { tag } = doc;

    const thing = msg.reactions.resolve("🎉");
    const winner = thing.users.cache.filter((u) => !u.bot).random();

    if (!winner)
      return msg.edit(
        ":tada: **GIVEAWAY** :tada:",
        new MessageEmbed()
          .addField("Prize", msg.embeds[0].fields[0].value)
          .addField("Winner", "Nobody has won this giveaway.")
          .setFooter("Hosted by " + tag)
          .setTimestamp(Date.now()),
        await giveawaySchema.deleteOne({
          guildId: message.guild.id,
          channelId: message.channel.id,
          messageId: msg.id,
        })
      );

    msg.edit(
      ":tada: **GIVEAWAY** :tada:",
      new MessageEmbed()
        .addField("Prize", msg.embeds[0].fields[0].value)
        .addField("Winner", `<@${winner.id}>`)
        .setFooter("Hosted by " + tag)
        .setTimestamp(Date.now())
    );

    await giveawaySchema.deleteOne({
      guildId: message.guild.id,
      channelId: message.channel.id,
      messageId: msg.id,
    });
    message.channel
      .send(
        `<@${winner.id}> You have won the prize of \`${msg.embeds[0].fields[0].value}\``
      )
      .then((msg) => msg.delete({ timeout: 1000 }));
  },
};
