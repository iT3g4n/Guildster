const { bot } = require(`../Client`);

let commands;
bot.commandlength = 0;

this.run = async (bot, err, files, helpEmbed) => {
    if (err) return console.error(err);
    files.forEach(file => {
        if (!file.endsWith(".js")) return;
        let props = require(`../commands/${file}`);
        let commandName = file.split(".")[0];
        let one = commandName.slice(''.length)[0].toUpperCase();
        let two = commandName.slice(' '.length);
        let embedname = one + two;
        console.log(`Attempting to load command ${commandName}`);
        bot.commands.set(commandName, props);
        if (commandName.length < 4) {
            if (!commandName.toLowerCase() == 'dog') {
                embedname = commandName.toUpperCase()
            } else {
                return;
            }
            
        }
        helpEmbed.addField(embedname, props.description, true);
        bot.commandlength++
    });
};