const { Message } = require("discord.js");

module.exports = {
    name: 'End',
    description: 'Ends the giveaway when you provide a messageID',
    aliases: ['reroll', 'again', 'newwinner'],
    catagory: 'giveaways',
    usage: '[command] [message id]',
    /**
     * @param {Message} message
     * @param {String[]} args
     */
    run: async(bot, message, args) => {

        message.delete()

        const msg = message.channel.messages.fetch(args[0], true, false);
        if (!msg) return message.reply(bot.embed.setDescription(`You did not specify any message, ${message.author}`));

        const thing = (await msg).reactions.cache.get("🎁")
        const winner = (await (await msg).reactions.cache.get("🎁").users.fetch()).filter(u => !u.bot).random()
        if (!winner) return message.channel.send("Nobody won the giveaway. How sad.")
        message.channel.send((`**CONGRATULATIONS** ${winner}**!** You won this giveaway! => **<https://discordapp.com/channels/${message.guild.id}/${message.channel.id}/${(await msg).id}>**!`))
    }
};