const discord = require("discord.js");
const bot = new discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION', 'USER', 'GUILD_MEMBER'] });
const prefix = "*";
require("dotenv").config()

const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://ADMIN:' + process.env.PASSWORD + '@warnings.xsvkz.gcp.mongodb.net/data?retryWrites=true&w=majority', { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false });

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
    
    require(`./commands/${command}`)(bot, message, args)
    console.log(`${command} command used`);
  } catch (err) {
    message.channel.send(`ERROR: ${err}`)
    console.log(err);
  }

});

bot.on("messageReactionAdd", (reaction, user) => {
  require(`./commands/reaction.js`).run(reaction, user)
});

bot.login(process.env.TOKEN)