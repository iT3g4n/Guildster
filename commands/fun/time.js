module.exports = {
  name: "Time",
  aliases: ["date"],
  catagory: "fun",
  usage: "[command]",
  description: "Sends my time in an embed!",
  run: (bot, message, args) => {
    const date = new Date();
    message.reply(
      bot.embed.setDescription(`My date:
        ${date}`)
    );
  },
};
