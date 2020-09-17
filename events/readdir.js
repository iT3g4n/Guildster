const { MessageEmbed } = require("discord.js");
const { bot } = require('../index');

this.run = async(err, files) => {
    if (err) console.error(err);
    files.forEach(file => {
        if (!file.endsWith(".js")) return;
        let props = require(`../commands/${file}`);
        if (props.catagory == 'fun') {
            bot.fun.push(`**Name:** ${props.name}\n**Description:** ${props.description}`);
        };
        if (props.catagory == 'moderation') {
            bot.moderation.push(`**Name:** ${props.name}\n**Description:** ${props.description}`);
        };
        if (props.catagory == 'hitting') {
            bot.hitting.push(`**Name:** ${props.name}\n**Description:** ${props.description}`);
        };
        if (props.catagory == 'tickets') {
            bot.tickets.push(`**Name:** ${props.name}\n**Description:** ${props.description}`);
        };
        if (props.catagory == 'owner') {
            bot.owner.push(`**Name:** ${props.name}\n**Description:** ${props.description}`)
        };

        if (!props.aliases) console.error(props.name + ' has no aliases');
        if (!props.name) console.error(props.name + ' has no name');
        if (!props.usage) console.error(props.name + ' has no usage');
        if (!props.description) console.error(props.name + ' has no description');
        if (!props.catagory) console.error(props.name + ' has no catagory');
        
        bot.helpEmbed.addField(props.name, props.description);
        bot.commandlength++
    });
};