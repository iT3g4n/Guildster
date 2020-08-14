module.exports = {
    async run(reaction, user) {

        if (reaction.message.channel.id != "739480654109999185") return;

        if (reaction.emoji.name != "🎫") return;

        await reaction.emoji.delete

        const randomcolour = "#" + Math.floor(Math.random() * 16777215).toString(16);

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
            type: "text",
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
        await (await m).send(embed);
        await (await m).edit(`<@${user.id}>`);
        setTimeout(() => {
            m.delete();
            console.log((m.id = " was deleted because it timed out."));
        }, 60000);
    }
}