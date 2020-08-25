const { Client, Message, MessageEmbed } = require('discord.js')
const mongo = require(`../mongo`)
const warns = require(`../schemas/warnSchema`)

module.exports = {
    name: 'warnings',
    description: "this is a warnings command!",

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

        mongo().then(async mongoose => {
            try {
                const results = await warns.findOne({
                    User: mi,
                    Guild: message.guild.id
                })

                let i = 1;

                if (!results) return msg.edit(`${mt} has no warnings`);

                for (const warning of results.Warns) {
                    console.log(`Warns:`, warning)
                    embed.addField(`Warning ${i++}`, `Moderator: <@${warning.Moderator}>\nReason: ${warning.Reason}`, true)
                }

                await msg.edit(embed)
                msg.edit("")

            } finally {
                mongoose.connection.close()
            }
        })

    }
}