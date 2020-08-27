/**



 Consts



 */

const discord = require("discord.js");
const bot = new discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION', 'USER', 'GUILD_MEMBER'] });
const Enmap = require(`enmap`)
require("dotenv").config()
const fs = require(`fs`);
const mongo = require("./mongo.js");
const guilds = require(`./schemas/guildSchema`)

/**



 Ready



 */

bot.on("ready", async () => {
  console.log(`logged in as ${bot.user.tag}`);

  bot.user.setActivity("Zone of W's!", { type: "WATCHING" });

  await mongo().then(async (mongoose) => {

    try {
      console.log(`MongoDB Ready!`)
    } finally {
      mongoose.connection.close()
    }
  }).catch(err => console.error(err))

  setInterval(() => {
    bot.channels.cache.get('736954524954001478').send(`Keep chat active please. kthx.`)
  }, 999999)

});




/**



 Message



 */


/**
thing
 */

let helpEmbed = new discord.MessageEmbed().setColor('RANDOM')

bot.commands = new Enmap()

fs.readdir('./commands/', (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    let props = require(`./commands/${file}`);
    let commandName = file.split(".")[0];
    console.log(`Attempting to load command ${commandName}`);
    bot.commands.set(commandName, props);
    helpEmbed.addField(commandName, props.description)
  });
});

module.exports = { helpEmbed }

/**
end of thing
 */

bot.on("message", async message => {
  //await mongo().then(async mongoose => {
    try {
      // const prefixa = await guilds.findOne({ Guild: message.guild.id });
      // const prefix = prefixa.Prefix;
      const prefix = '*';
      if (!message.content.startsWith(prefix)) return;
      const args = message.content.slice(prefix.length).split(" ");
      const command = args.shift().toLowerCase();
      if (message.author.bot || !message.guild || !bot.commands.has(command)) return;
    
      try {
        bot.commands.get(command).run(bot, message, args);
        console.log(`${command} command used`);
      } catch (err) {
        await message.channel.send(`I'm sorry. There was an error executing the \`${command}\` command.`);
        console.log(err);
      };
    } catch (err) {
      console.log(err)
    }
  })
//});

/**
 


 Reaction


 */

bot.on("messageReactionAdd", (reaction, user) => {
  require(`./commands/reaction.js`).run(reaction, user);
});

bot.login(process.env.TOKEN);