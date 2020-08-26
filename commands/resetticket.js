const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "resetticket",
    description: '**ADMIN-ONLY**\nCreates the \'Create a Ticket!\' message in the channel of the message!',
    async run(bot, message, args) {

        if (!message.member.permissions.has('MANAGE_MESSAGES')) return;

        const embed = new MessageEmbed()
            .setColor('RANDOM')
            .setTitle("🎫  CREATE A TICKET  🎫")
            .setDescription("***INFO***\n\n*What is a ticket?*\nA ticket is (in this server) used for you to make suggestions!\n\n**Create a Ticket**\nClick on the 🎫 down below this message to create a ticket!")
            .setFooter(`Please start your message with\` *ticket\` and make sure that is over 10 words long.`)

        let m = await message.channel.send(embed)
        m.react("🎫")

    }
}