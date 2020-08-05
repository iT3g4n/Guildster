const { MessageEmbed } = require("discord.js");
const randomcolor = "#" + Math.floor(Math.random() * 16777215).toString(16)

module.exports = {
    name: "avatar",
    deacription: "gets an avatar for a mentioned user",
    async run (bot, message, args) {

        message.delete();

        let mention = message.mentions.users.first() || message.author;

        let embed = new MessageEmbed()
        .setTitle(`Avatar for ${mention.username}`)
        .setURL(mention.avatarURL())
        .setImage(mention.avatarURL())
        .setColor(randomcolor)

        await message.channel.send(embed)
    }
}