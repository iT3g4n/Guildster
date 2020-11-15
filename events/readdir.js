const bot = require("../Bot");
const fs = require("fs");
const path = require("path");

this.run = async () => {
  function find_nested(dir, pattern) {
    let results = [];

    fs.readdirSync(dir).forEach((inner_dir) => {
      inner_dir = path.resolve(dir, inner_dir);
      const stat = fs.statSync(inner_dir);

      if (stat.isDirectory()) {
        results = results.concat(find_nested(inner_dir, pattern));
      }
      if (stat.isFile() && inner_dir.endsWith(pattern)) {
        results.push(inner_dir);
      }
    });

    return results;
  }

  find_nested("./commands/", ".js").forEach(async (file) => {
    if (!file) return;
    if (!file.endsWith(".js")) return;
    const props = require(file);
    try {
      props;
    } catch (e) {
      console.log(e);
    }

    bot.commands.set(props.name.toLowerCase(), props);

    if (!bot.catagorys[props.catagory]) {
      bot.catagorys[props.catagory] = [];
      bot.allCatagorys.push(props.catagory);
    }

    bot.catagorys[props.catagory].push(props.name);

    if (!props.aliases) console.error(props.name + " has no aliases");
    if (!props.name) console.error(props.name + " has no name");
    if (!props.usage) console.error(props.name + " has no usage");
    if (!props.description) console.error(props.name + " has no description");
    if (!props.catagory) console.error(props.name + " has no catagory");

    bot.commandlength++;
  });
};

// push(`**Name:** ${props.name}\n**Description:** ${props.description}`);
