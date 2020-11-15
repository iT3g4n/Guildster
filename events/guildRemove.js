const guildSchema = require("../schemas/guildSchema");
const warnSchema = require("../schemas/warnSchema");
const giveawaySchema = require("../schemas/giveawaySchema");
const welcomeSchema = require("../schemas/welcomeSchema");

const { Guild, Client } = require("discord.js");
const thanksSchema = require("../schemas/thanksSchema");

module.exports = {
  /**
   * @param {Guild} guild
   * @param {Client} bot
   */
  run: async (bot, guild) => {
    console.log(`Guild Deleted: ${guild.name} or ${guild.id}`);

    try {
      
      await warnSchema.deleteMany({
        _id: guild.id,
      });

      await guildSchema.deleteMany({
        _id: guild.id,
      });

      await giveawaySchema.deleteMany({
        guildId: guild.id,
      });

      await welcomeSchema.deleteMany({
        _id: guild.id,
      });

      await thanksSchema.deleteMany({
        _id: guild.id,
      });

    } catch (e) {
      console.error(e);
    }
  },
};
