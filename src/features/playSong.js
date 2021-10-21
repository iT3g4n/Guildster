const { MessageEmbed } = require("discord.js");
const { bot } = require("../index");

module.exports = () => {
  setInterval(() => {
    bot.guilds.cache.forEach((guild) => {
      if (!bot.queue[guild.id]) return;
      let item = bot.queue[guild.id][0];

      const {
        channelId,
        url,
        timeInSeconds,
        requestedBy,
        thumbnail,
        name,
        authorData,
      } = item;

      

      const channel = guild.channels.cache.get(channelId);
      if (!channel) return item.delete();

      const embed = new MessageEmbed()
        .setColor("RANDOM")
        .setThumbnail(thumbnail)
        .setTimestamp(timeInSeconds * 1000 + Date.now())
        .setTitle(`Now Playing ${name}`)
        .setURL(url)
        .setFooter(`Requested by ${requestedBy} | Ends`)
        .addField("Song Uploader", authorData.name);


      channel.send(embed).catch(console.error);
      
    });
  }, 3 * 1000);
};
