const { Message, Client } = require(`discord.js`)
const { inspect } = require(`util`);
const { owners } = require("./../../index").bot;

module.exports = {
    name: 'Eval',
    aliases: ['e', 'ev'],
    catagory: 'owner',
    usage: '[command] [code]',
    description: 'Tests some code out!',
    /**
     * @param {Client} bot
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (bot, message, args) => {

        if (!owners.includes(message.author.id)) return message.reply(`You cannot do that!`).then(msg => msg.delete({ timeout: 5000 }));

        if (!args.join(' ')) return message.reply(`You did not give any arguments`).then(msg => msg.delete({ timeout: 5000 }))

            const evaled = await eval(args.join(' ')).then(async evaled => {

            try {
                bot.embed.setDescription(`**Input**\n\`\`\`js\n${args.join(' ')}\`\`\`\n**Output**\n\`\`\`${evaled}\`\`\``);
            } catch (error) {
                bot.embed.setDescription(`**Result**\n\`\`\`${error}\`\`\``);
            }

            console.log(inspect(evaled));
            message.channel.send(bot.embed)

})

    }
}
