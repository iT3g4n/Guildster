const rp = require("random-puppy")
const { MessageEmbed } = require("discord.js")


module.exports = {
  name: "dog",
  description: "Sends a random dog to the channel of the message!",
  async run(bot, message, args) {

    message.delete({ timeout: 0 })

    const randomColor = Math.floor(Math.random() * 16777215).toString(16);

    let doggo = await message.channel.send("looking for a cute doggo...")

    const subreddits = ["dog", "doggo", "dogs", "puppies", "pup"];
    const random = subreddits[Math.floor(Math.random() * subreddits.length)]

    const img = await rp(random)
    const pEmbed = new MessageEmbed()
      .setTitle("Found one!" + " From /r/" + random)
      .setURL(`https://reddit.com/r/${random}`)
      .setImage(img)
      .setColor(`#${randomColor}`)

    await doggo.edit(pEmbed);
    doggo.edit("");
  }
}