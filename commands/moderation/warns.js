const { Client, Message, MessageEmbed } = require('discord.js')
const warns = require(`./../../schemas/warnSchema`)

module.exports = {
    name: 'Warns',
    aliases: ['warnings'],
    catagory: 'moderation',
    description: "Gets the warns for the mentioned user!",
    usage: '[command] [mention or id]',

    /**
     * @param {Client} bot 
     * @param {Message} message 
     * @param {String[]} args 
     */

    async run(bot, message, args) {

        if (!message.member.hasPermission(`MANAGE_MESSAGES`)) return message.reply(`no`);
        const mention = message.mentions.users.first();
        const mrid = message.guild.members.cache.get(args[0]);
        if (!mention && !mrid) return message.channel.send(`You did not mention anyone.`);

        var mi;
        var mt;

        if (!mention) {
            var mi = mrid.id
            var mt = mrid.user.tag
        } else {
            var mi = mention.id
            var mt = mention.tag
        }

        const embed = new MessageEmbed().setColor('RANDOM').setTitle(`Warnings for ${mt}`);

        let msg = await message.channel.send(`Getting warnings for ${mt}...`)


        const results = await warns.findOne({
            User: mi,
            Guild: message.guild.id
        })

        let i = 1;

        if (!results) return msg.edit(`${mt} has no warnings`);

        for (const warning of results.Warns) {
            embed.addField(`Warning ${i++}`, `Moderator: <@${warning.Moderator}>\nReason: ${warning.Reason}`, true)
        }

        await msg.edit(embed)
        msg.edit("")
    }


}