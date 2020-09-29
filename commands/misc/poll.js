const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'Poll',
    aliases: [],
    catagory: 'fun',
    usage: '[command] [poll message]',
    description: "Creates a poll in the channel of the message!",
    run: async (bot, message, args) => {

        const msgArgs = args.join(" ");

        if (message.member.hasPermission(`ADMINISTRATOR`)) {

            if(!msgArgs) return;
            const embed = new MessageEmbed()
                .setColor(`RANDOM`)
                .setTitle("Poll Time!")
                .setDescription(msgArgs)
                .setTimestamp(Date.now())

            message.delete()

            const msg = await message.channel.send("@everyone")

            await msg.edit(embed)
            msg.edit("")
            await msg.react("✔️")
            msg.react("❌")

        } else return message.reply("YOU DO NOT HAVE ENOUGH PERMISSIONS")

    }
}