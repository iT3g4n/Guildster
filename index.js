/**



 Consts



 */

const discord = require("discord.js");
const bot = new discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION', 'USER', 'GUILD_MEMBER'] });
const prefix = "*";
require("dotenv").config()
const mongo = require(`./mongo`);

/**



 Ready



 */

bot.on("ready", async() => {
  console.log(`logged in as ${bot.user.tag}`);

  bot.user.setActivity("Zone of W's!", { type: "WATCHING" });
  await mongo().then(async (mongoose) => {
    try {
      console.log(`Connected to MongoDB`)
    } finally {
      mongoose.connection.close()
    }
  })
});

/**



 Message



 */

bot.on("message", async message => {

  if (!message.content.startsWith(prefix) || message.author.bot || !message.guild || message.content === '*') return;

  const args = message.content.slice(prefix.length).split(" ");
  const command = args.shift().toLowerCase();

  try {
    require(`./commands/${command}`).run(bot, message, args);
    console.log(`${command} command used`);
  } catch (err) {
    console.log(`Some idiot used the wrong command`);
  };

});

/**
 


 Reaction


 */

bot.on("messageReactionAdd", (reaction, user) => {
  require(`./commands/reaction.js`).run(reaction, user);
});

bot.login(process.env.TOKEN);