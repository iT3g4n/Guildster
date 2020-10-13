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
        const mention = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!mention) return message.channel.send(`You did not mention anyone.`);

        const embed = new MessageEmbed().setColor('RANDOM').setAuthor(`Warnings for ${mention.user.tag}`, mention.user.displayAvatarURL({ dynamic: true }));

        const msg = await message.channel.send(`Getting warnings for ${mention.user.tag}...`);

        const results = await warns.findOne({
            User: mention.id,
            Guild: message.guild.id
        });

        let i = 1;

        if (!results) return msg.edit(bot.embed.setDescription(`${mention.user.tag} has no warnings`));

        for (const warning of results.Warns) {
            embed.addField(`Warning ${i++}`, `Moderator: <@${warning.Moderator}>\nReason: ${warning.Reason}`);
        }

        msg.delete().catch(e => { console.error(e) });
        message.channel.send(embed);
    }
}