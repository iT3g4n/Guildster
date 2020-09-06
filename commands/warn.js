const { Client, Message, MessageEmbed } = require('discord.js')
const mongo = require(`../mongo`)
const warns = require(`../schemas/warnSchema`);
const guilds = require(`../schemas/guildSchema`);

module.exports = {
    name: 'warn',
    description: "**ADMIN-ONLY**\nWarns the mentioned user!",

    /**
     * @param {Client} bot 
     * @param {Message} message
     * @param {String[]} args 
     */

    async run(bot, message, args) {
        if (!message.member.hasPermission(`MANAGE_MESSAGES`)) return message.reply(`no`);
        const mention = message.mentions.users.first();
        const mrid = message.guild.members.cache.get(args[0]);
        if (!mention && !mrid) return message.channel.send(`You did not mention anyone.`);

        var mi;
        var mt;

        if (!mention) {
            var mi = mrid.id
            var mt = mrid.user.tag
        } else {
            var mi = mention.id
            var mt = mention.tag
        }

        const reason = args.slice(1).join(' ')
        if (!reason) return message.channel.send(`You did not specify a reason.`);

        let msg = await message.channel.send(`Warning ${mt}...`);

        console.log(mi, mt);

        await mongo().then(async mongoose => {
            
            try {

                await warns.findOneAndUpdate({

                    User: mi,
                    Guild: message.guild.id

                }, {

                    User: mi,
                    Guild: message.guild.id,
                    $push: {
                        Warns: [
                            {
                                Moderator: message.author.id,
                                Reason: reason,
                            }
                        ]
                    },

                }, { upsert: true })

            } finally {
                mongoose.connection.close()
            }
        })

        await msg.edit(`${mt} has been succesfully warned with the reason of \`${reason}\``)

        const embed = new MessageEmbed()
            .setTitle(`User Warned`)
            .addField(`User`, `<@${mi}>`, true)
            .addField(`Moderator`, `<@${message.author.id}>`, true)
            .addField(`Reason`, `${reason}`, true)
            .setColor(`YELLOW`)

        await mongo().then(async mongoose => {

            try {
                const result = await guilds.findOne({ _id: message.guild.id })
                if (!result) return;
                bot.channels.cache.get(result.Logs).send(embed)
            } finally {
                mongoose.connection.close()
            }
            

        })



    }
}