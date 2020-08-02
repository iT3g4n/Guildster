const { MessageEmbed } = require("discord.js")
const randomPuppy = require("random-puppy")

module.exports = {
    name: 'meme',
    description: "this is a meme command!",
    run: async (bot, message, args) => {
        const subreddits = ["dankmeme", "meme", "dank_meme", "dankmemes", "memes", "me_irl", "facepalm"];
        const random = subreddits[Math.floor(Math.random() * subreddits.length)]

        const randomColor = Math.floor(Math.random() * 16777215).toString(16);

        message.delete({ timeout: 0 })

        const img = await randomPuppy(random);
        const embed = new MessageEmbed()
        .setColor("#" + randomColor)
        .setTitle(`From /r/${random}`)
        .setImage(img)
        .setURL(`https://reddit.com/r/${random}`)

        message.channel.send(embed)
    }
}