const { Client, Message, MessageEmbed } = require('discord.js')
const mongo = require(`./../../mongo`)
const warns = require(`./../../schemas/warnSchema`);
const guilds = require(`./../../schemas/guildSchema`);

module.exports = {
    name: 'Warn',
    aliases: ['w'],
    catagory: 'moderation',
    description: "Warns the mentioned user!",
    usage: '[command] [mention or id] [reason]',

    /**
     * @param {Client} bot 
     * @param {Message} message
     * @param {String[]} args 
     */

    async run(bot, message, args) {
        if (!message.member.hasPermission(`MANAGE_MESSAGES`)) return message.reply(`no`);
        const mention = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    
        if (!mention) return message.channel.send(bot.embed.setDescription(`You did not mention anyone.`));

        const reason = args.slice(1).join(' ')
        if (!reason) return message.channel.send(`You did not specify a reason.`);

        const msg = await message.channel.send(`Warning ${mention.user.tag}...`);

                await warns.findOneAndUpdate({

                    User: mention.id,
                    Guild: message.guild.id

                }, {

                    User: mention.id,
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


        await msg.edit(`${mention.user.tag} has been succesfully warned with the reason of \`${reason}\``)

        const embed = new MessageEmbed()
            .setAuthor(`New Warning`, mention.user.displayAvatarURL({ dynamic: true }))
            .addField(`User`, `<@${mention.id}>`, true)
            .addField(`Moderator`, `<@${message.author.id}>`, true)
            .addField(`Reason`, `${reason}`)
            .setColor(`YELLOW`);

        const result = await guilds.findOne({ _id: message.guild.id })
        if (!result) return;
        bot.channels.cache.get(result.Logs).send(embed)
    }
};