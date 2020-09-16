const { Message, Client, MessageEmbed } = require('discord.js');
/**
 * @param {Client} bot 
 * @param {Message} message 
 * @param {Map} map 
 */

this.run = async (bot, message, map) => {

    if (message.author.bot) return;

    if (message.channel.id === '716239917751206048') message.delete();

    const prefixes = [`<@!${bot.user.id}>`, `<@${bot.user.id}>`, '*']
    //in your case can only be var prefixes = ["<@453463055741747200>", "<@!453463055741747200>"]

    let prefix = false;
    for (const thisPrefix of prefixes) {
        if (message.content.toLowerCase().startsWith(thisPrefix)) prefix = thisPrefix;
    }
    const args = message.content.slice(prefix.length).trim().split(" ");
    const command = args.shift().toLowerCase();

    if (message.author.bot || !message.guild) return;

    if (bot.afkmap) {
        bot.afkmap.forEach(item => {
            if (!item.includes(message.author.id)) return;
            item.replace(message.author.id, '')
            message.channel.send(new MessageEmbed().setColor('RANDOM').setDescription(`Welcome Back ${message.author}! I have removed your AFK!`)), message.member.setNickname(message.author.username);
        })
    }

    if (!message.content.startsWith(prefix)) {
        if (bot.afkmap.includes(message.author.id)) return;
        if (!message.mentions.members) return;

        let i = 0
        message.mentions.members.forEach((_mention) => i++);

        if (i !== 1) return;
        if (!bot.afkmap) return;

        bot.afkmap.forEach(thing => {

            if (thing.includes(message.mentions.users.first().id)) {

                message.reply(new MessageEmbed().setColor('RANDOM').setDescription(`One of the users you mentioned is afk for:\n\n${thing.split(':')[1]}`));

            }
        })

        return;
    };

    const cmd = bot.commands.get(command) || bot.commands.find(c => c.aliases && c.aliases.includes(command))

    if (!cmd) return;

    if (map.has(message.author.id)) {
        message.react('⏰');
        map.set(message.author.id);
        return;
    };

    try {
        bot.emoji = bot.guilds.cache.get('714809218024079430').emojis.cache.find(e => e.name.toLowerCase() === 'loading')
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
};