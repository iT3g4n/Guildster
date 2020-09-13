const { bot } = require(`../Client`);

bot.commandlength = 0;

this.fun = []

this.run = async (a, err, files) => {
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
            if (commandName.toLowerCase() !== 'dog') {
                embedname = commandName.toUpperCase()
            } else {
                return;
            }
            
        }
        if (props.catagory == 'fun') {
            this.fun.push(`**Name:** ${embedname}\n**Description:** ${props.description}`)
        } 
        bot.helpEmbed.addField(embedname, props.description, true);
        bot.commandlength++
    });
};