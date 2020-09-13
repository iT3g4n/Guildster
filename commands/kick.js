const { MessageEmbed, Client, Message } = require("discord.js");
const mongo = require("../mongo");
const guilds = require(`../schemas/guildSchema`);
const guildSchema = require("../schemas/guildSchema");
const embed = require(`../newembed`)
this.name = 'Kick'
this.aliases = ['k', 'remove', 'yeet']

module.exports = {
    catagory: 'moderation',
    description: "This kicks the mentioned user with a reason!",
    /**
     * 
     * @param {Client} bot 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(bot, message, args) => {
        const mention = message.mentions.users.first()
        const id = message.guild.members.cache.get(args[0])
        if (!id && !mention) return message.reply(`Please mention a person to kick.`).then(msg => msg.delete({ timout: 5000 }))

        if (!mention) {
            var mi = id.id
            var mt = id.user.tag
            var user = id
        } else {
            var mi = mention.id
            var mt = mention.tag
            var user = mention
        }

        const reason = args.slice(1).join(' ')
        if (!reason) return message.reply(`Please give a reason.`).then(msg => msg.delete({ timout: 5000 }))

        user.kick(reason);

        await mongo(async mongoose => {
            
            try {
                let data = await guildSchema.findOne({_id: message.guild.id})
                if (!data.Logs) return;
                bot.channels.cache.get(data.Logs).send(embed(message, this).then(async embed => {
                    embed
                        .setTitle(`${mt} has been kicked`)
                        .setDescription(`
                        User: ${user}
                        Reason: ${reason}
                        Moderator: ${message.author}
                        `)
                }))
            } finally {
                mongoose.connection.close()
            }
        })
    }
}