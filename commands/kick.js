const { MessageEmbed } = require("discord.js");
const guilds = require(`../schemas/guildSchema`);
const mongo = require("../mongo");

module.exports = {
    description: '**ADMIN-ONLY**\nKicks the mentioned person from the server!',
    async run (bot, message, args) {

        message.delete()

        const user = message.mentions.users.first() || message.guild.members.cache.get(args[0]);
        if (!user) return message.channel.send(`Please include a user to ban.`)
        console.log(user.username)

        const reason = args.slice(1).join(" ")
        if (!reason) return message.channel.send(`Please give a reason to ban ${user}`)
        console.log(reason)

        const embed = new MessageEmbed()
        .setDescription(`**${user} has been kicked**\n\nReason: *${reason}*\n\nModerator: <@${message.author.id}>`)
        .setColor(`WHITE`)

        user.kick(reason).catch(console.error())
        await mongo().then(async mongoose => {
            try {
                const result = await guilds.findOne({ Guild: message.guild.id })
                bot.channels.cache.get(result.Logs).send(embed)
            } finally {
                mongoose.connection.close()
            }
        })

    }}