const { MessageEmbed } = require("discord.js")

 module.exports = {
    name: 'ping',
    aliases: ['p', 'pong'],
    catagory: 'fun',
    usage: '[command]',
    description: "Check your ping to the bot!",
    async run (bot, message, args) {
    
    message.delete({ timeout: 0 })
    let msg = await message.channel.send("Pinging...")

    var time = msg.createdTimestamp - message.createdTimestamp + " ms"
    if (time.startsWith('-')) var time = message.createdTimestamp - msg.createdTimestamp + ' ms'

    const embed = new MessageEmbed()
    .setTitle("🏓 Pong! 🏓")
    .addField(`Bot`, time)
    .addField("API", bot.ws.ping + " ms")
    .setColor('RANDOM')
    .setFooter(`|   Ping Command`, message.author.avatarURL({ dynamic: true }))
    .setTimestamp(Date.now())

    
    await msg.edit(embed)
    msg.edit("")

}}