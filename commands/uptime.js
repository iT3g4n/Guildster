const { MessageEmbed } = require("discord.js")
const ms = require("ms")
const randomcolour =  "#" + Math.floor(Math.random() * 16777215).toString(16);

module.exports= {
    name: "uptime",
    description: "Tell you how long the bot has been online",
    usage: "*uptime",
    async run (bot, message, args) {

        message.delete({ timeout: 0 })

        let m = await message.channel.send("Checking Uptime...")

        const e = new MessageEmbed()
        .setTitle("Uptime")
        .setDescription(`I have been online for:\n${ms(bot.uptime)}`)
        .setColor(randomcolour)

        await m.edit(e)
        await m.edit("")
    }
}