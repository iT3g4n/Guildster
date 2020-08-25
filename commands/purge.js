module.exports = {
    name: 'purge',
    description: "this is a purge command",
    async run(bot, message, args) {

        message.delete()

        if (!message.member.hasPermission(`MANAGE_MESSAGES`)) return;

        if (!args[0]) return message.channel.send("Please mention an amount to purge.")
        if (isNaN(args[0][0])) return message.channel.send("That is not a number!")
        message.channel.bulkDelete(args[0])
    }
}