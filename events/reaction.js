const discord = require(`discord.js`);
const db = new Map()

module.exports = {
    /**
     * @param {discord.MessageReaction} reaction 
     * @param {discord.User} user 
     */

    run: async(reaction, user) => {

        if (user.bot) return;

        if (reaction.emoji.name == "🎫") {

            if (user.bot) return;

            if (db.has(`TICKET: ${user.id}`)) return reaction.message.channel.send(`Sorry <@${user.id}>. You already have a ticket open! Please wait for the time to be over.`).then(m => m.delete({ timeout: 5000 })), reaction.users.remove(user);

            console.log('test')

            const embed = new discord.MessageEmbed()
                .setTitle("Create a Ticket  🎫")
                .setDescription(`What is your suggestion <@${user.id}>?`)
                .setColor('RANDOM');

            let m = await reaction.message.guild.channels.create(`${user.id}-ticket`, {
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

            await reaction.fetch();

            const collector = m.createMessageCollector((x) => x.author.id == message.author.id);

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