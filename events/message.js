const { Message, Client, MessageEmbed } = require('discord.js');
/**
 * @param {Client} bot 
 * @param {Message} message 
 * @param {Map} map 
 */

this.run = async (bot, message, map) => {

    const prefix = '*';
    const args = message.content.slice(prefix.length).trim().split(" ");
    const command = args.shift().toLowerCase();
    if (message.author.bot || !message.guild || !message.content.startsWith(prefix)) return;

    const cmd = bot.commands.get(command) || bot.commands.find(c => c.aliases && c.aliases.includes(command))

    if (!cmd) return;

    if (map.has(message.author.id)) {
        message.react('⏰');
        map.set(message.author.id);
        return;
    };

    try {
        bot.embed = new MessageEmbed().setFooter(`|   ${cmd.name} Command`, message.author.avatarURL({ dynamic: true, format: 'png' })).setColor('RANDOM').setTimestamp(Date.now())
        cmd.run(bot, message, args);
        console.log(`${command} command used`);
        map.set(message.author.id)
    } catch (err) {
        await message.channel.send(`I'm sorry. There was an error executing the \`${command}\` command.`);
        console.error(err);
    };

    setTimeout(() => {
        map.delete(message.author.id);
    }, 1000 * 5);
}