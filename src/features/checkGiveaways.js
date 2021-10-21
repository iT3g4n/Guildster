const { MessageEmbed, Message, MessageReaction } = require("discord.js");
const { bot } = require(".././index");
const giveawaySchema = require("../schemas/giveawaySchema");

module.exports = async () => {
  setInterval(() => {
    bot.guilds.cache.forEach(async (guild) => {
      const docs = await giveawaySchema.find({
        guildId: guild.id,
      });

      if (!docs) return;

      docs.forEach(async (doc) => {
        try {
          const { guildId, channelId, messageId, time, tag } = doc;

          const channel = guild.channels.cache.get(channelId);
          if (!channel) {
            await giveawaySchema.deleteMany({
              messageId,
            });
            return;
          }
          const message = await channel.messages.fetch(messageId);
          if (!message) {
            await giveawaySchema.deleteMany({
              messageId,
            });
            return;
          }

          if (time < Date.now() === false) return;
          const getReaction = await message.reactions.cache
            .get("🎉")
            .users.fetch();
          const winner = getReaction.filter((x) => !x.bot).random();
          if (!winner)
            return (
              message.edit(
                "🎉 **GIVEAWAY** 🎉",
                new MessageEmbed()
                  .addField("Prize", message.embeds[0].fields[0].value)
                  .addField("Winner", "Nobody has won this giveaway.")
                  .setFooter("Hosted by " + tag)
                  .setTimestamp(Date.now())
              ),
              await giveawaySchema.deleteOne({
                messageId,
              })
            );

          message.edit(
            "🎉 **GIVEAWAY** 🎉",
            new MessageEmbed()
              .addField("Prize", message.embeds[0].fields[0].value)
              .addField("Winner", `<@${winner.id}>`)
              .setFooter("Hosted by " + tag)
              .setTimestamp(Date.now())
          );

          message.channel
            .send(`<@${winner.id}>`)
            .then((msg) => msg.delete({ timeout: 1000 }));

          await giveawaySchema.deleteMany({
            messageId,
          });
        } catch (e) {
          await giveawaySchema.deleteMany({
            messageId: doc.messageId,
          });
        }
      });
    });
  }, 1000 * 5);
};
