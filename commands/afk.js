const { Client, Message } = require("discord.js")

module.exports = {

    /**
     * @param {Client} bot 
     * @param {Message} message 
     * @param {String[]} args 
     */

    async run(bot, message, args) {

        let setting = await message.channel.send(`Setting your AFK to ${args.join(' ')}...`)
        message.author.setAFK(args.join(" "))
        setting.edit(`:white_check_mark: Set your afk to ${args.join(" ")}`)

    }
}