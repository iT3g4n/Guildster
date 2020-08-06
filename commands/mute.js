const { MessageEmbed } = require("discord.js")
const ms = require("ms")

module.exports = {
    usage: "*mute <mention || id> <time> <reason>",
    async run (bot, message, args) {

        if (!message.author.permission.has("MANAGE_MEMBERS")) return message.channel.send(`Hey! You don't have enough permissions to do that!`)

        const mention = message.mentions.users.first() || message.guild.members.cache.get(args[0]);
        if (!mention) return message.channel.send(`Please mention a user to mute or give an id. Usage: ${this.usage}`);

        const time = ms(args[1])
        if (isNaN(args[0][0])) return message.channel.send(`Please specify a time to mute ${mention} for.`)
        if (!args[0].toLowerCase().endsWith("h" && "m" && "s" && "d")) return message.channel.send(`Please specify a time such as: 10m, 20s, 1d, 2h etc.`)

        const reason = args.slice(2).join(" ")
        if (!reason) return message.channel.send(`Please specify a reason for the mute.`)

        const muteroleid = "716339905097105438"

    }
}