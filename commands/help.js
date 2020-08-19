const { MessageEmbed } = require("discord.js");

module.exports = {
  name: 'help',
  description: "this is a help command!",
  async run (bot, message, args) {


    if (message.member.roles.cache.has("728443375778529400") || (message.member.roles.cache.has("71628940296349302")) || (message.member.roles.cache.has("728443657140830299")) || (message.member.roles.cache.has("716238674089476116"))) {

      message.delete({ timeout: 0 })

      const adminembed = new MessageEmbed()
        .setColor("00ff00")
        .setTitle(`Commands for Zone of W's`)

        .setDescription("More commands are on their way soon!")

        .addField("*help", "Brings up a help message. Like this!")
        .addField("*ping", "Check you ping to this bot!")
        .addField("*socials", "Brings up T3g4n's Socials")
        .addField("*meme", "Gets a meme from a random reddit page!")
        .addField("*dog", "Brings up a cute doggo.")
        .addField("\u200b", "**Admin Commands**", true)
        .addField("*purge", "Deletes a specific number of messages in the channel of the message.")
        .addField("*warn", "Warns the person that you mention.")
        .addField("*warnings", "Check the amount of warnings a person has.")
        .addField("*clearwarn", "Clears all warnings for a person.")
        .addField(`*ban`, `Bans the mentioned person with a reason.`)
        .addField(`*kick`, `Kicks the mentioned person with a reason.`)

      message.channel.send("Please make sure to open your DM's otherwise I cannot send you the help command!").then(msg => { msg.delete({ timeout: 5000 }) })

      message.author.send(adminembed).catch(console.log(Error))

    } else {

      const normalEmbed = new MessageEmbed()
        .setColor("00ff00")
        .setTitle("Commands for Zone of W's")
        .addField("*help", "Brings up a help message. Like this!")
        .addField("*ping", "Check you ping to this bot!")
        .addField("*socials", "Brings up T3g4n's Socials")
        .addField("*meme", "Gets a meme from a random reddit page!")
        .addField("*dog", "Brings up a cute doggo.")
        .setDescription("More commands are on their way soon!");

      message.channel.send("Please make sure to open your DM's otherwise I cannot send you the help command!").then(msg => { msg.delete({ timeout: 10000 }) })

      message.author.send(normalEmbed).catch(console.log(Error))

    }

  }
};