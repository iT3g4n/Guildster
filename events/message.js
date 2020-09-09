const { Message, Client } = require('discord.js')
/**
 * @param {Client} bot 
 * @param {Message} message 
 * @param {Map} map 
 */

this.run = async (bot, message, map) => {
    //await mongo().then(async mongoose => {

    // const prefixa = await guilds.findOne({ Guild: message.guild.id });
    // const prefix = prefixa.Prefix;
    const prefix = '*' || '<@730440454835011674>';
    const args = message.content.slice(prefix.length).trim().split(" ");
    const command = args.shift().toLowerCase();
    if (message.author.bot || !message.guild) return;
    if (!message.content.startsWith(prefix)) return;
    if (!bot.commands.has(command)) return;

    if (map.has(message.author.id)) {
        message.react('⏰');
        map.set(message.author.id);
        return;
    };

    try {
        bot.commands.get(command).run(bot, message, args);
        console.log(`${command} command used`);
        map.set(message.author.id)
    } catch (err) {
        await message.channel.send(`I'm sorry. There was an error executing the \`${command}\` command.`);
        console.error(err);
    };

    setTimeout(() => {
        map.delete(message.author.id);
    }, 1000 * 3);
}