const { MessageEmbed } = require("discord.js")
const ms = require("ms")
const randomcolour =  "#" + Math.floor(Math.random() * 16777215).toString(16);

module.exports= {
    name: "uptime",
    description: "Tells you how long the bot has been online",
    usage: "*uptime",
    async run (bot, message, args) {

        message.delete({ timeout: 0 })

        let m = await message.channel.send("Checking Uptime...")

        const uptime = ms(bot.uptime)

        const e = new MessageEmbed()
        .setTitle("Uptime")
        .setDescription(`I have been online for:\n${uptime}`)
        .setColor(randomcolour)

        await m.edit(e)
        await m.edit("")
    }
}