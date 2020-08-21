const discord = require(`discord.js`)

module.exports = {

    /**
     * 
     * @param {discord.MessageReaction} reaction 
     * @param {discord.User} user 
     */

    async run(reaction, user) {

        if (reaction.message.channel.id != "739480654109999185") return;

        if (reaction.emoji.name != "🎫") return;

        if (user.bot) return;

        const db = new Map()
        if (db.has(`TICKET: ${user.id}`)) return reaction.message.channel.send(`Sorry <@${user.id}>. You already have a ticket open! Please wait for the time to be over.`).then(m => m.delete({ timeout: 5000 }))

        await reaction.users.remove(user)

        const randomcolour = `#${Math.floor(Math.random() * 16777215).toString(16)}`;

        try {
            await reaction.fetch();
        } catch (error) {
            console.log(error);
            return;
        }

        console.log(`reaction: ${reaction.emoji.name}`);

        const embed = new discord.MessageEmbed()
            .setTitle("Create a Ticket  🎫")
            .setDescription(
                `What is your suggestion <@${user.id}>?\n\nPlease start your message with *ticket`
            )
            .setColor(randomcolour);

        let m = await reaction.message.guild.channels.create(`${user.id}-ticket`, {
            type: "text", parent: "714809218024079432",
            permissionOverwrites: [
                {
                    id: user.id,
                    allow: ["VIEW_CHANNEL"],
                },

                {
                    id: reaction.message.guild.roles.everyone.id,
                    deny: ["VIEW_CHANNEL"],
                },
            ]
        });

        let th = await m.send(`<@${user.id}>`);
        await th.edit(embed);
        db.set(`TICKET: ${user.id}`)

        setTimeout(() => {

            db.delete(`TICKET: ${user.id}`)

            if (!m) return;

            m.delete();

            console.log(m.name = " was deleted because it timed out.");

        }, 300000);
    }
}