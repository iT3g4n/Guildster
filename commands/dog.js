const rp = require("random-puppy")
const { MessageEmbed } = require("discord.js")


module.exports = {
  name: "dog",
  aliases: ['d', 'doggy', 'doggo', 'puppy', 'pup', 'dogs'],
  catagory: 'fun',
  description: "Sends a random dog to the channel of the message!",
  async run(bot, message, args) {

    message.delete({ timeout: 0 })

    let doggo = await message.channel.send("looking for a cute doggo...")

    const img = await rp();
    const pEmbed = new MessageEmbed()
      .setImage(img)
      .setColor('RANDOM');

    await doggo.edit(pEmbed);
    doggo.edit("");
  }
}