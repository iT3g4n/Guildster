const { Client, Message } = require("discord.js");
const { bot } = require('../index');
const thanksSchema = require('../schemas/thanksSchema');

module.exports = {
    name: 'Thanks',
    aliases: ['thank', 'thx'],
    catagory: 'fun',
    usage: '[command] [mention or id]',
    description: 'Thank someone for helping you!',
    /**
     * @param {Message} message
     * @param {String[0]} args
     */
    run: async(a, message, args) => {
        const target = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!target) return message.reply(bot.error('You did not mention anyone to thank!'));

        const { guild } = message
        const targetId = target.id
        const authorId = message.author.id
        const now = new Date()

        if (!bot.owners.includes(message.author.id)) {
            if (authorId == targetId) return message.reply(bot.error('You can\'t thank yourself!'));
        };

        const authorData = await thanksSchema.findOne({
            _id: guild.id,
            userId: authorId
        });

        if (!bot.owners.includes(message.author.id)) {
            if (authorData && authorData.lastGave) {
            const then = new Date(authorData.lastGave);

            const dif = now.getTime() - then.getTime();
            const difhours = Math.round(dif / (1000 * 60 * 60));
            if (difhours <= 24) return message.reply(bot.error(`You have already thanked someone in the last 24 hours!`));
        }}

        await thanksSchema.findOneAndUpdate({
            _id: guild.id,
            userId: authorId
        }, {
            _id: guild.id,
            userId: authorId,
            lastGave: now
        }, { upsert: true });

        const result = await thanksSchema.findOneAndUpdate({
            _id: guild.id,
            userId: authorId
        }, {
            _id: guild.id,
            userId: authorId,
            $inc: {
                recieved: 1
            }
        }, { upsert: true, new: true });

        const amount = result.recieved;
        let thankornot
        if(result.recieved = 1) {
            thankornot = 'thank'
        } else {
            thankornot = 'thanks'
        }
        message.reply(bot.embed.setDescription(`You have thanked <@${targetId}>! They now have \`${amount}\` ${thankornot}!`));
    },
};