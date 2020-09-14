const { MessageEmbed, Client, Message } = require("discord.js")
const ms = require("ms")
module.exports = {
    name: "ga",
    /**
 * @param {Client} bot
 * @param {Message} message
 * @param {String[]} args
 */

    aliases: ['giveaway', 'start', 'g', 'give'],
    description: "Creates a giveaway in the channel of the message!",
    catagory: 'fun',
    usage: "[command] [time] [prize]",
    async run(bot, message, args) {

        if (!message.member.hasPermission('MANAGE_ROLES')) return;

        message.delete({ timeout: 0 })

        if (!args[0]) return message.channel.send(this.usage).then(msg => { msg.delete({ timeout: 10000 }) })
        if (!args[0].endsWith("d") && !args[0].endsWith("h") && !args[0].endsWith("m") && !args[0].endsWith("s")) return message.channel.send("Please specify the amount of time before the giveaway ends.").then(msg => { msg.delete({ timeout: 6000 }) })
        if (isNaN(args[0][0])) return message.channel.send("That is not a number!").then(msg => { msg.delete({ timeout: 5000 }) })

        const prize = args.slice(1).join(" ")
        if (!prize) return message.channel.send("No prize was given. Aborting Command").then(msg => { msg.delete({ timeout: 5000 }) })

        const msg = await message.channel.send("@everyone");

        const embed = new MessageEmbed()
            .setColor('RANDOM')
            .setTitle("🎁  GIVEAWAY TIME  🎁")
            .setDescription(`Prize: **${prize}**`)
            .setFooter(`Giveaway Started By: ${message.author.username}. ends`)
            .setTimestamp(Date.now() + ms(args[0]));

        await msg.edit(embed);
        await msg.edit("");
        await msg.react("🎁");
        setTimeout(() => {
            const thing = msg.reactions.cache.get("🎁")
            const winner = thing.users.cache.filter(u => !u.bot).random()
            if (!winner) return message.channel.send("Nobody won the giveaway. How sad.")
            message.channel.send(`**CONGRATULATIONS** ${winner}**!** You have won the \`${prize}\`!`);
        }, ms(args[0]));
    }
}