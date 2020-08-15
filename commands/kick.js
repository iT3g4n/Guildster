const { MessageEmbed } = require("discord.js");

module.exports = {
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
        .setColor(`#000000`)

        user.kick(reason).catch(console.error())

        bot.channels.cache.get("728653429785755730").send(embed);

    }}