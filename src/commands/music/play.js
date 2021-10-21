const { Message, MessageEmbed } = require("discord.js");
const { bot } = require("../../index");
const play = require("ytdl-core");
const search = require("yt-search");

this.name = "Play";
this.aliases = ["p"];
this.usage = "[command] [song name or link]";
this.description = "Plays a song in the voice channel that you are in!";
this.catagory = "music";
/**
 * @param {Message} message
 * @param {String[]} args
 */
this.run = async (a, message, args) => {
  if (!message.member.voice.channel)
    return message.reply(
      bot.error("You are not in a VC, <@" + message.author + ">!")
    );

  const query = args.join(" ");
  if (!query)
    return message.reply(bot.error("You did not specify anything to play!"));

  const embed = new MessageEmbed().setColor("GREEN");

  await message.member.voice.channel.join().then(async (vc) => {
    await search(query).then((data, err) => {
      if (err) console.error(err);
      if (data.all[0].type !== "video")
        return message.reply(
          bot.error(
            "I have only found a playlist with that name. Please try a different search query."
          )
        );

      require("../../customEvents/queue")(message, data);

      try {
        vc.play(
          play(data.all[0].url, {
            format: {
              hasVideo: false,
              hasAudio: true,
              audioBitrate: 6000,
            },
          }),
          {
            bitrate: "auto",
          }
        );
      } catch (e) {
        console.error(e);
        message.channel.send(
          bot.error("I'm sorry! There was an error with playing your music!")
        );
      }
      embed.setTitle(`Now Playing: ${data.all[0].title}`);
      embed.addField("Artist", data.all[0].author.name);
      embed.addField("Length", data.all[0].duration.timestamp);
      embed.setTimestamp(data.all[0].duration.seconds * 1000 + Date.now());
      embed.setURL(data.all[0].url);
    });
  });
  message.reply(embed);
};
