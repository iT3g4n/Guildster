const { bot } = require("../index");

this.run = async () => {
  console.log(`logged in as ${bot.user.tag}`);
  console.log(`${bot.commandlength} commands were loaded in total.`);
  console.log("Running on Shard", bot.shard)

  activities_list = [
    {
      name: `over ${bot.guilds.cache.size} guilds! | *help`,
      type: "WATCHING",
      url: "https://www.youtube.com/T3g4n",
    },
    { name: `with ${bot.users.cache.size} users! | *help`, type: "PLAYING" },
    { name: `the *help command!`, type: "WATCHING" },
    { name: `${bot.commandlength} Commands! | *help`, type: "LISTENING" },
  ];

  bot.channels.cache.get("730447146079223819")
    ? bot.channels.cache
        .get("730447146079223819")
        .send("<@381024325974622209> I am Online!")
    : null;

  setInterval(() => {
    const index = Math.floor(Math.random() * activities_list.length);

    bot.user.setActivity(activities_list[index]);
  }, 1000 * 10);
};
