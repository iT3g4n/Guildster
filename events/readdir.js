const { MessageEmbed } = require("discord.js");
const { bot } = require("../index");
const { find } = require("../schemas/warnSchema");
/**
 * @param {String[]} files
 */
this.run = async () => {
  function find_nested(dir, pattern) {
    let results = [];

    bot.fs.readdirSync(dir).forEach((inner_dir) => {
      inner_dir = bot.path.resolve(dir, inner_dir);
      const stat = bot.fs.statSync(inner_dir);

      if (stat.isDirectory()) {
        results = results.concat(find_nested(inner_dir, pattern));
      }
      if (stat.isFile() && inner_dir.endsWith(pattern)) {
        results.push(inner_dir);
      }
    });

    return results;
  }

  find_nested("./commands/", ".js").forEach((file) => {
    if (!file) return;
    if (!file.endsWith(".js")) return;
    const props = require(file);
    console.log(
      `Attempting to load the command named '${props.name.toLowerCase()}'`
    );
    bot.commands.set(props.name.toLowerCase(), props);

    if (!bot.catagorys[props.catagory]) bot.catagorys[props.catagory] = [];

    bot.catagorys[props.catagory].push(
      `**Name:** ${props.name}\n**Description:** ${props.description}`
    );

    if (!props.aliases) console.error(props.name + " has no aliases");
    if (!props.name) console.error(props.name + " has no name");
    if (!props.usage) console.error(props.name + " has no usage");
    if (!props.description) console.error(props.name + " has no description");
    if (!props.catagory) console.error(props.name + " has no catagory");

    bot.helpEmbed.addField(props.name, props.description);
    bot.commandlength++;
  });
};

// push(`**Name:** ${props.name}\n**Description:** ${props.description}`);
