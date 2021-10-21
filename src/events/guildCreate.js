const guildSchema = require(`../schemas/guildSchema`);
const { Guild, MessageEmbed, Client, TextChannel } = require("discord.js");
const { bot } = require(`../index`);

module.exports = {
  /**
   * @param {Guild} b
   */
  run: async (a, b) => {
    const guild = await b.fetch();
    bot.prefixes.set(guild.id, "*");

    await guildSchema.findOneAndUpdate(
      { _id: guild.id },
      {
        _id: guild.id,
        Prefix: "*",
      },
      {
        upsert: true,
      }
    );

    bot.prefixes.set(guild.id, "*");

    const embed = new MessageEmbed()
      .setColor("RANDOM")
      .setTitle(
        `Thank You for inviting me to your server! To get yourself up and running, Please do \`*help\`!`
      );
    console.log(`New Guild:`, guild.name);
    const channel = guild.channels.cache.find(
      (channel) =>
        channel.type === "text" &&
        channel.permissionsFor(guild.me).has("SEND_MESSAGES")
    );
    channel.send(embed);
  },
};
