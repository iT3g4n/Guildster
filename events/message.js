const { Message, Client, MessageEmbed } = require('discord.js');
const { bot } = require('../index');
/**
 * @param {Client} bot 
 * @param {Message} message 
 * @param {Map} map 
 */

this.run = async (a, message, map) => {

    if (message.author.bot && message.channel.id === '716239917751206048') message.delete({ timeout: 20000 }).catch(e => {
        return;
    });
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
        if (bot.afkmap.has(message.author.id)) {
            bot.afkmap.delete(message.author.id);
            message.member.setNickname(message.member.nickname.split('[AFK] ')[1]);
            message.reply(new MessageEmbed().setColor('RANDOM').setDescription(`It's good to have you back, <@${message.author.id}>!`))
        }
    }

    if (!message.content.startsWith(prefix)) {
        if (!message.mentions.members.first()) return;
        if (!bot.afkmap.has(message.mentions.members.first().id)) return;
        if (!bot.afkmap) return;

        if (bot.afkmap.has(message.mentions.members.first().id)) {

            message.reply(new MessageEmbed().setColor('RANDOM').setDescription(`One of the users you mentioned is afk for:\n${bot.afkmap.get(message.mentions.members.first().id)}`));

        }

        return;
    };

    const cmd = bot.commands.get(command) || bot.commands.find(c => c.aliases && c.aliases.includes(command))

    if (!cmd) return;

    if (!bot.owners.includes(message.author.id)) {
        if (map.has(message.author.id)) {
            message.react('⏰');
            map.set(message.author.id);
            return;
        };
    }
    
    try {
        bot.embed = new MessageEmbed().setFooter(`|   ${cmd.name} Command`, message.author.avatarURL({ dynamic: true, format: 'png' })).setColor('RANDOM').setTimestamp(Date.now())
        cmd.run(bot, message, args);
        console.log(`${cmd.name.toLowerCase()} command used`);
        map.set(message.author.id)
    } catch (err) {
        await message.channel.send(`I'm sorry. There was an error executing the \`${command}\` command.`);
        console.error(err);
    };

    if (bot.owners.includes(message.author.id)) return;
    setTimeout(() => {
        map.delete(message.author.id);
    }, 1000 * 5);
};