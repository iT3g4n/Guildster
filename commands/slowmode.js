const discord = require('discord.js');
const bot = new discord.Client();

module.exports = {
    name: 'slowmode',
    description: "this is a slowmode command!",
    async run(bot, message, args) {

        message.delete({ timeout: 0 })

        if (message.member.roles.cache.has("728443375778529400") || (message.member.roles.cache.has("71628940296349302")) || (message.member.roles.cache.has("728443657140830299")) || (message.member.roles.cache.has("716238674089476116"))) {

            if (!args[0]) return message.channel.send("please give a number to set the slowmode to.").then(msg => { msg.delete({ timeout: 5000 }) })

            if (args[0] === "1") {
                var secondornot = " second"
            } else {
                var secondornot = " seconds"
            }

            if (args[0] > 1000) return message.channel.send("please give a number lower than 1000 as that is the lim8t of the Discord API").then(msg => { msg.delete({ timeout: 6000 }) })

            await message.channel.setRateLimitPerUser(args[0]).catch(console.error)
            message.reply("Slowmode is now " + message.channel.rateLimitPerUser + secondornot).then(msg => { msg.delete({ timeout: 5000 }) })

        } else return message.reply("YOU DO NOT HAVE ENOUGH PERMISSIONS!").then(msg => { msg.delete({ timeout: 5000 }) })

    }
}