const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'Ping',
    aliases: ['p', 'pong'],
    catagory: 'fun',
    usage: '[command]',
    description: "Check your ping to the bot!",
    async run(bot, message, args) {

        const emoji = bot.emoji

        message.delete({ timeout: 0 })
        let msg = await message.channel.send(`${emoji} Pinging...`)

        var time = `${msg.createdTimestamp - message.createdTimestamp} MS`
        if (time.startsWith('-')) var time = `${message.createdTimestamp - msg.createdTimestamp} MS`

        const embed = new MessageEmbed()
            .setTitle("🏓 Pong! 🏓")
            .addField(`Bot`, `${emoji} ` + time)
            .addField("API", `${emoji} ${bot.ws.ping} MS`)
            .setColor('RANDOM')
            .setFooter(`|   Ping Command`, message.author.avatarURL({ dynamic: true }))
            .setTimestamp(Date.now())


        await msg.edit(embed)
        msg.edit("")

    }
}