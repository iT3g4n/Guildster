const { bot } = require("../index");
const ms = bot.ms;

module.exports = (message, data) => {
  const song = data.all[0];
  if (!bot.queue[message.guild.id]) {
    bot.queue[message.guild.id] = [];
  }

  bot.queue[message.guild.id].push({
    name: song.title,
    channelId: message.channel.id,
    url: song.url,
    timeInSeconds: song.duration.seconds,
    requestedBy: message.author.tag,
    thumbnail: song.thumbnail,
    authorData: song.author,
  });
};
