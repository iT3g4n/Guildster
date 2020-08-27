const { MessageEmbed, Client, Message } = require("discord.js");
const mongo = require("../mongo");
const guilds = require(`../schemas/guildSchema`)

module.exports = {
    description: "**ADMIN-ONLY**\nThis bans the mentioned user with a reason!",
    /**
     * 
     * @param {Client} bot 
     * @param {Message} message 
     * @param {String[]} args 
     */
    async run(bot, message, args) {

        message.delete()

        const user = message.mentions.users.first() || message.guild.members.cache.get(args[0]);
        user.fetch()
        if (!user) return message.channel.send(`Please include a user to ban.`)
        console.log(user.username)

        const reason = args.slice(1).join(" ")
        if (!reason) return message.channel.send(`Please give a reason to ban ${user}`)
        console.log(reason)

        const embed = new MessageEmbed()
            .setDescription(`**${user.tag} has been banned**\n\n*Reason:* \`${reason}\`\n\nModerator: <@${message.author}>`)
            .setColor(`#000000`)

        user.ban(reason).catch(console.error())

        await mongo().then(async mongoose => {

            try {
                const result = await guilds.findOne({ Guild: message.guild.id })
                bot.channels.cache.get(result.Logs).send(embed)
            } finally {
                mongoose.connection.close()
            }
            

        })

    }
}