const discord = require("discord.js");
const bot = new discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] });
const prefix = "*";
const fs = require("fs");
require("dotenv").config()

bot.commands = new discord.Collection();

const commandFiles = fs
  .readdirSync("./commands/")
  .filter((File) => File.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);

  bot.commands.set(command.name, command);
}

bot.on("ready", () => {
  console.log(`logged in as ${bot.user.username}`);

  bot.user.setActivity("Zone of W's!", { type: "WATCHING" });

});

bot.on("message", async (message) => {

  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).split(" ");
  const command = args.shift().toLowerCase();
  if (!message.guild) return;

  try {
    bot.commands.get(command).run(bot, message, args);
    console.log(`${command} command used`);
  } catch {
    console.error();
  }

});

bot.on("messageReactionAdd", async (reaction, user) => {

  if (reaction.message.channel.id != "739480654109999185") return;

  if (reaction.emoji.name != "🎫") return;

  if (user.bot) return;


  const db = require(`quick.db`)
  if (db.includes(`TICKET: ${user.id}`)) return reaction.message.channel.send(`Sorry <@${user.id}>. You already have a ticket open! Please wait for the time to be over.`).then(m => m.delete({ timeout: 5000 }))

  await reaction.users.remove(user)
  await reaction.message.react("🎫")

  const randomcolour = `#${Math.floor(Math.random() * 16777215).toString(16)}`;

  try {
    await reaction.fetch();
  } catch (error) {
    console.log(error);
    return;
  }

  console.log(`reaction: ${reaction._emoji.name}`);

  const embed = new discord.MessageEmbed()
    .setTitle("Create a Ticket  🎫")
    .setDescription(
      `What is your suggestion <@${user.id}>?\n\nPlease start your message with *ticket`
    )
    .setColor(randomcolour);

  let m = await reaction.message.guild.channels.create(`${user.id}-ticket`, {
    type: "text", parent: "714809218024079432",
    permissionOverwrites: [
      {
        id: user.id,
        allow: ["VIEW_CHANNEL"],
      },

      {
        id: reaction.message.guild.roles.everyone.id,
        deny: ["VIEW_CHANNEL"],
      },
    ]
  });
  let th = await (await m).send(`<@${user.id}>`);
  await (await th).edit(embed);
  db.add(`TICKET: ${user.id}`, 1)
  setTimeout(() => {

    db.delete(`TICKET: ${user.id}`)

    if (!m) return;

    m.delete();

    console.log((m.name = " was deleted because it timed out."));

  }, 300000);
});

bot.login(process.env.TOKEN);