module.exports = {
    name: 'purge',
    description: "this is a purge command",
    execute(bot, message, args) {

        if (message.member.roles.cache.has("728443375778529400") || (message.member.roles.cache.has("71628940296349302")) || (message.member.roles.cache.has("728443657140830299")) || (message.member.roles.cache.has("716238674089476116"))) {

        if (!args[0]) return message.channel.send("Please mention an amount to purge.").then(msg => {msg.delete({ timeout: 5000})})

        if(isNaN(args[0][0])) return message.channel.send("That is not a number!")

        message.channel.bulkDelete(Math.floor(1 + args[0]))
        .catch(console.error)}
    }}