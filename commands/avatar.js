const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "avatar",
    description: "gets an avatar for a mentioned user",
    async run (bot, message, args) {

        message.delete();

        let mention = message.mentions.users.first() || message.author;

        let embed = new MessageEmbed()
        .setTitle(`Avatar for ${mention.tag}`)
        .setURL(mention.avatarURL({ dynamic: true, format: "png", size: 1024 }))
        .setImage(mention.avatarURL({ dynamic: true, format: "png", size: 1024 }))
        .setColor('RANDOM')

        message.channel.send(embed)
    }
};