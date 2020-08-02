const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'poll',
    description: "this is a poll command!",
    run: async (bot, message, args) => {

        var msgArgs = args.slice(1).join(" ");

        if (message.member.roles.cache.has("728443375778529400") || (message.member.roles.cache.has("71628940296349302")) || (message.member.roles.cache.has("728443657140830299")) || (message.member.roles.cache.has("716238674089476116"))) {

            const randomColor = Math.floor(Math.random() * 16777215).toString(16);

            const embed = new MessageEmbed()
                .setColor("#" + randomColor)
                .setTitle("Poll Time!")
                .setDescription(args[0] + " " + msgArgs);

            await message.delete({ timeout: 200 })

            let rlmessage = await message.channel.send("@everyone")

            await rlmessage.edit(embed)
            await rlmessage.edit("")
            await rlmessage.react("✔️")
            await rlmessage.react("❌")

        } else return message.reply("YOU DO NOT HAVE ENOUGH PERMISSIONS")

    }
}