const { Client, Collection, Intents, MessageEmbed } = require(`discord.js`);

require("dotenv").config();

class BotClient extends Client {
  constructor() {
    super({
      partials: ["REACTION", "MESSAGE", "USER", "GUILD_MEMBER", "CHANNEL"],
      ws: { intents: Intents.ALL },
    });
    this.blacklistedWords = require("./src/blacklistedWords");
    this.owners = ["381024325974622209"];
    this.allCatagorys = [];
    this.embed = new MessageEmbed();
    this.fs = require("fs");
    this.path = require("path");
    this.ms = require("ms");
    this.discord = require("discord.js");
    this.bufferUtil = require("bufferutil");
    this.crypto = require("crypto");
    this.commandlength = 0;
    this.catagorys = {};
    this.queue = {};
    this.helpEmbed = new MessageEmbed();
    this.afkmap = new Collection();
    this.commands = new Collection();
    this.prefixes = new Collection();
  }

  /* Embed */
  e(description = String(), send = Boolean()) {
    return new MessageEmbed();
  }

  /* Error Embed */
  error(description) {
    const embed = new MessageEmbed()
      .setTimestamp(Date.now())
      .setFooter("ERROR")
      .setColor("RED")
      .setDescription(description);
    return embed;
  }

  /* Capitalize */
  capitalize(string = String()) {
    const capitalized =
      string.toLowerCase().charAt(0).toUpperCase() +
      string.toLowerCase().slice(1);

    return capitalized;
  }

  /* Command Handler */
  commandHandler() {
    require("./events/readdir").run();
  }

  /* Test Whatever */
  test(whatever, i, want, to, test) {
    return whatever, i, want, to, test;
  }

  /* Feature Loader */
  featureLoader() {
    this.fs.readdirSync("./features").forEach((file) => {
      require("./features/" + file)();
      console.log(`Loaded the "${file.split(".")[0]}" feature.`);
    });
  }

  /* Mongo Loader */
  mongoLoader() {
    require("./mongo")().then(() => console.log("MongoDB Ready!"));
  }

  /* Start */
  start() {
    this.login(process.env.TOKEN);
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

    const buffer = this.crypto.randomBytes(10);
    const mask = this.crypto.randomBytes(4);

    this.bufferUtil.unmask(buffer, mask);

    let map = new Map();
    this.on("message", (message) => {
      require("./events/message").run(this, message, map);
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
      this.owners.forEach((owner) => {
        const user = this.users.cache.get(owner);
        if (!user) return;
        user.send(
          new MessageEmbed({
            description: err.toString(),
            color: "RED",
            timestamp: Date.now(),
            author: {
              name: "ERROR",
              iconURL: user.displayAvatarURL({ dynamic: true, format: "png" }),
            },
          })
        );
      });
      console.error(
        "__________________________\nUNHANDLED PROMISE REJECTION\n\n",
        err,
        "\n__________________________\n"
      );
    });
  }
}

module.exports.BotClient = BotClient;
module.exports.bot = require("./index").bot;
