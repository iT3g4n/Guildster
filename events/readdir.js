const { bot } = require(`../Client`);
const { MessageEmbed } = require("discord.js");

bot.commandlength = 0;
bot.helpEmbed = new MessageEmbed().setColor('RANDOM')

this.fun = []
this.moderation = []
this.hitting = []
this.tickets = []
this.owner = []

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
        if (props.catagory == 'fun') {
            this.fun.push(`**Name:** ${embedname}\n**Description:** ${props.description}`);
        };
        if (props.catagory == 'moderation') {
            this.moderation.push(`**Name:** ${embedname}\n**Description:** ${props.description}`);
        };
        if (props.catagory == 'hitting') {
            this.hitting.push(`**Name:** ${embedname}\n**Description:** ${props.description}`);
        };
        if (props.catagory == 'tickets') {
            this.tickets.push(`**Name:** ${embedname}\n**Description:** ${props.description}`);
        };
        if (props.catagory == 'owner') {
            this.owner.push(`**Name:** ${embedname}\n**Description:** ${props.description}`)
        };
        bot.helpEmbed.addField(embedname, props.description);
        bot.commandlength++
    });
};