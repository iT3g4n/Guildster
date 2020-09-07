let commands;

this.run = async (bot, err, files, helpEmbed) => {
    if (err) return console.error(err);
    files.forEach(file => {
        if (!file.endsWith(".js")) return;
        let props = require(`../commands/${file}`);
        let commandName = file.split(".")[0];
        let one = commandName.slice(''.length)[0].toUpperCase();
        let two = commandName.slice(' '.length);
        const embedname = one + two;
        console.log(`Attempting to load command ${commandName}`);
        bot.commands.set(commandName, props);
        helpEmbed.addField(embedname, props.description, true)

    });
}

