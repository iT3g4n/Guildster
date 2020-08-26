const { Client, Message, MessageEmbed } = require('discord.js')
const mongo = require(`../mongo`)
const warns = require(`../schemas/warnSchema`);

module.exports = {
    description: '**ADMIN-ONLY**\nThis clears all warns for a user!',
    /**
     * @param {Client} bot 
     * @param {Message} message
     * @param {String[]} args 
     */
    async run(bot, message, args) {
        if (!message.member.hasPermission(`MANAGE_MESSAGES`)) return message.reply(`no`);
        const mention = message.mentions.users.first();
        const uid = message.guild.members.cache.get(args[0]);
        if (!mention && !uid) return message.channel.send(`You did not mention anyone.`);

        var mi;
        var mt;

        if (!mention) {
            var mi = uid.id
            var mt = uid.user.tag
        } else {
            var mi = mention.id
            var mt = mention.tag
        }

        console.log(mt, mi)

        let msg = await message.channel.send(`Clearing warns for ${mt}...`)

        mongo().then(async mongoose => {
            try {
                await warns.findOneAndDelete({ User: mi, Guild: message.guild.id })
            } finally {
                mongoose.connection.close()
            }

        })

        msg.edit(`Succesfully cleared warns for ${mt}`)

    }
}