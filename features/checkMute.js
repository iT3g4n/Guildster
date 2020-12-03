const { bot } = require("../index");
const guildSchema = require("../schemas/guildSchema");
const muteSchema = require("../schemas/muteSchema");

module.exports = () => {
  bot.guilds.cache.forEach((guild) => {
    setInterval(async () => {
      let date = Date.now();

      const results = await muteSchema.find({ _id: guild.id });

      if (!results) return;

      results.forEach(async (result) => {
        if (result.expires < date == false) return;

        const member = guild.members.cache.get(result.userId);

        const doc = await muteSchema.findOne({
          _id: guild.id,
          userId: result.userId,
        });

        if (!member) {
          doc.deleteOne();
          return;
        }

        if (!member.roles) {
          doc.deleteOne();
          return;
        }

        let role = guild.roles.cache.get(result.roleId);
        if (!role) {
          doc.deleteOne();
          return;
        }

        member.roles.remove(role, "Mute time up").catch((e) => {
          doc.deleteOne();
          return e;
        });
        doc.deleteOne();
      });
    }, 1000 * 5);
  });
};
