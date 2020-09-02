const discord = require('discord.js');
const bot = new discord.Client();

module.exports = {
    name: 'slowmode',
    description: "**ADMIN-ONLY**\nSets the slowmode to the specified amount!",
    async run(bot, message, args) {

        message.delete({ timeout: 0 })

        if (message.member.hasPermission(`MANAGE_CHANNELS`)) {

            if (!args[0]) return message.channel.send(`Slowmode is ${message.channel.rateLimitPerUser}`).then(msg => { msg.delete({ timeout: 5000 }) })

            if (isNaN(args[0][0])) return message.channel.send("That is not a number!")

            if (args[0] === "1") {
                var secondornot = " second"
            } else {
                var secondornot = " seconds"
            }

            if (args[0] > 1000) return message.channel.send("Please give a number lower than 1000 as that is the limit of the Discord API").then(msg => { msg.delete({ timeout: 6000 }) })

            await message.channel.setRateLimitPerUser(args[0]).catch(err => console.error(err))
            message.reply("Slowmode is now " + message.channel.rateLimitPerUser + secondornot).then(msg => { msg.delete({ timeout: 5000 }) })

        } else return message.reply("YOU DO NOT HAVE ENOUGH PERMISSIONS!").then(msg => { msg.delete({ timeout: 5000 }) })

    }
}