const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'poll',
    description: "**ADMIN-ONLY**\nCreates a poll in the channel of the message!",
    run: async (bot, message, args) => {

        const msgArgs = args.slice(1).join(" ");

        if (message.member.hasPermission(`ADMINISTRATOR`)) {

            const embed = new MessageEmbed()
                .setColor(`RANDOM`)
                .setTitle("Poll Time!")
                .setDescription(args[0] + " " + msgArgs);

            await message.delete({ timeout: 200 })

            let msg = await message.channel.send("@everyone")

            await msg.edit(embed)
            msg.edit("")
            await msg.react("✔️")
            msg.react("❌")

        } else return message.reply("YOU DO NOT HAVE ENOUGH PERMISSIONS")

    }
}