const discord = require("discord.js");
const bot = new discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION', 'USER', 'GUILD_MEMBER'] });
const prefix = "*";
require("dotenv").config()

const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://ADMIN:gF00qvKdUrbcnDiD@warnings.xsvkz.gcp.mongodb.net/Warnings?retryWrites=true&w=majority', { useUnifiedTopology: true, useNewUrlParser: true });

bot.on("ready", () => {
  console.log(`logged in as ${bot.user.tag}`);

  bot.user.setActivity("Zone of W's!", { type: "WATCHING" });

});

bot.on("message", async message => {

  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).split(" ");
  const command = args.shift().toLowerCase();
  if (!message.guild) return;

  try {
    require(`./commands/${command}`).run(bot, message, args)
    console.log(`${command} command used`);
  } catch {
    message.delete()
    message.channel.send(`That is not a command!`).then(m => m.delete({ timout: 2000 }))
    console.error();
  }

});

bot.on("messageReactionAdd", (reaction, user) => {
  require(`./commands/reaction.js`).run(reaction, user)
});

bot.login(process.env.TOKEN)