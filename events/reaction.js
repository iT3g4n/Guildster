const discord = require(`discord.js`);
const db = new Map()
const guildSchema = require('../schemas/guildSchema');
const MessageEmbed = require('discord.js').MessageEmbed

module.exports = {
    /**
     * @param {discord.MessageReaction} reaction 
     * @param {discord.User} user 
     */

    run: async(reaction, user) => {
        const { message } = reaction
        await reaction.fetch();

        if (user.bot) return;

        const result = await guildSchema.findOne({ _id: message.guild.id });

        if (reaction.emoji.name == "🎫" && message.channel.id === result.Tickets) {

            if (user.bot) return;

            if (db.has(`TICKET: ${user.id}`)) return reaction.message.channel.send(`Sorry <@${user.id}>. You already have a ticket open! Please wait for the time to be over.`).then(m => m.delete({ timeout: 5000 })), reaction.users.remove(user);

            const embed = new discord.MessageEmbed()
                .setTitle("Create a Ticket  🎫")
                .setDescription(`What is your suggestion <@${user.id}>?`)
                .setColor('RANDOM');

            const m = await reaction.message.guild.channels.create(`${user.id}-ticket`, {
                type: "text", parent: reaction.message.channel.parentID,
                permissionOverwrites: [
                    {
                        id: user.id,
                        allow: ["VIEW_CHANNEL"],
                    },

                    {
                        id: reaction.message.guild.roles.everyone.id,
                        deny: ["VIEW_CHANNEL"],
                    },
                ],
            });

            let msg = await m.send(`<@${user.id}>`);
            await msg.edit(embed);
            db.set(`TICKET: ${user.id}`);

            const { message } = reaction

            const collector = m.createMessageCollector((x) => x.author.id === user.id);

            collector.on('collect', async message => {

                console.log(message.content)

                const ticketembed = new MessageEmbed()
                    .setDescription(`**Suggestion by <@${message.author.id}>**\n\n**Suggestion**\n${msgArgs}`)
                    .setColor('RANDOM');
                const ticketid = "739480654109999185";

                let m = await bot.channels.cache.get(reaction.message.channel.id).send(ticketembed);
                await m.react("⬆️")
                m.react("⬇️")

                message.channel.delete().catch(err => console.error(err));
                db.delete(`TICKET: ${message.author.id}`)
                collector.stop('ticket complete');
            })

            setTimeout(() => {

                db.delete(`TICKET: ${user.id}`)

                if (!m.deletable) return;

                m.delete();
            }, 300000);

        }


    }
}