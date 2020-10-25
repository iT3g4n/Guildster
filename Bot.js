const { Client, Collection, Intents, MessageEmbed } = require(`discord.js`);
const discord = require("discord.js");
const { error } = require("console");
class BotClient extends Client {
  constructor() {
    super({
      partials: ["REACTION", "MESSAGE", "USER", "GUILD_MEMBER", "CHANNEL"],
      ws: { intents: Intents.ALL },
    });
    this.owners = ["381024325974622209"];
    this.fs = require("fs");
    this.path = require("path");
    this.ms = require("ms");
    this.discord = require("discord.js");
    this.commandlength = 0;
    this.catagorys = {};
    this.afkmap = new Collection();
    this.helpEmbed = new MessageEmbed();
    this.commands = new Collection();
    this.prefixes = new Collection();
  }
  error(message, title) {
    const embed = new MessageEmbed()
      .setTimestamp(Date.now())
      .setFooter("ERROR")
      .setColor("RED")
      .setDescription(message);
    if (title) embed.setTitle(title);
    return embed;
  }
  capitalize(string = String()) {
    const capitalized =
      string.toLowerCase().charAt(0).toUpperCase() +
      string.toLowerCase().slice(1);

    return capitalized;
  }
  commandHandler() {
    require("./events/readdir").run();
  }
  featureLoader() {
    this.fs.readdirSync("./features").forEach((file) => {
      require("./features/" + file)();
      console.log(`Loaded the "${file.split(".")[0]}" feature.`);
    });
  }
  mongoLoader() {
    require("./mongo")().then(() => console.log("MongoDB Ready!"));
  }
  start(token) {
    this.login(token);
    this.commandHandler();
    this.mongoLoader();
    this.once("ready", async () => {
      require("./events/ready").run(this);
      this.featureLoader();
      this.emoji = this.guilds.cache.get("714809218024079430")
        ? this.guilds.cache
            .get("714809218024079430")
            .emojis.cache.find((e) => e.name.toLowerCase() === "loading")
        : "";
    });
    let map = new Map();
    this.on("message", (message) => {
      require("./events/message").run(this, message, map);
    });
    this.on("messageReactionAdd", (reaction, user) => {
      require(`./events/reaction`).run(reaction, user);
    });
    this.on("guildCreate", async (guild) => {
      require(`./events/guildCreate`).run(this, guild);
    });
    this.on("guildDelete", async (guild) => {
      require(`./events/guildRemove`).run(this, guild);
    });
    this.on("guildMemberAdd", (member) => {
      if (!member.guild.id === "714809218024079430") return;
      require("./events/guildMemberAdd").run(member);
    });
    process.on("unhandledRejection", (err) => {
      if (err.message.includes("DiscordAPIError: Unknown Message")) return;
      error(
        "__________________________\nUNHANDLED PROMISE REJECTION\n\n",
        err,
        "\n__________________________\n"
      );
    });

    return this;
  }
}

module.exports = new BotClient();