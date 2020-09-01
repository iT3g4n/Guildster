const { MessageEmbed } = require("discord.js");

module.exports = {
    description: "Gets an avatar for the mentioned user!",
    async run (bot, message, args) {

        message.delete();

        let mention = message.mentions.users.first() || message.author;

        let embed = new MessageEmbed()
        .setTitle(`Avatar for ${mention.tag}`)
        .setURL(mention.avatarURL({ dynamic: true, format: "png", size: 2048 }))
        .setImage(mention.avatarURL({ dynamic: true, format: "png", size: 2048 }))
        .setColor('RANDOM')

        message.channel.send(embed)
    }
};