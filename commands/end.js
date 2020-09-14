const { Message } = require("discord.js");
const { bot } = require('../Client');

module.exports = {
    name: 'End',
    description: 'Ends the giveaway when you provide a messageID',
    aliases: [],
    catagory: 'fun',
    usage: '[command] [messageid]',
    /**
     * @param {Message} message
     * @param {String[]} args
     */
    run: async(a, message, args) => {
        const msg = message.channel.messages.fetch(args[0], true, false);
        if (!msg) return message.reply(bot.embed.setDescription(`You did not specify any message, ${message.author}`));

        const thing = (await msg).reactions.cache.get("🎁")
        const winner = (await (await msg).reactions.cache.get("🎁").users.fetch()).filter(u => !u.bot).random()
        if (!winner) return message.channel.send("Nobody won the giveaway. How sad.")
        message.channel.send((`**CONGRATULATIONS** ${winner}**!** You won this giveaway! => **<https://discordapp.com/channels/${message.guild.id}/${message.channel.id}/${(await msg).id}>**!`))
    }
};