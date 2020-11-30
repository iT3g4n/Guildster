const { MessageEmbed } = require("discord.js");
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
          if (!doc) return;

          const guildId = doc.guildId;
          const channelId = doc.channelId;
          const messageId = doc.messageId;
          const time = doc.time;
          const tag = doc.tag;

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

          const getReaction = message.reactions.resolve("🎉");
          const winner = getReaction.users.cache.filter((x) => !x.bot).random();
          if (!winner)
            return (
              message.edit(
                ":tada: **GIVEAWAY** :tada:",
                new MessageEmbed()
                  .addField("Prize", message.embeds[0].fields[0].value)
                  .addField("Winner", "Nobody has won this giveaway.")
                  .setFooter("Hosted by " + tag)
                  .setTimestamp(Date.now())
              ),
              await giveawaySchema.deleteOne({
                guildId,
                channelId,
                messageId,
              })
            );

          message.edit(
            ":tada: **GIVEAWAY** :tada:",
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
