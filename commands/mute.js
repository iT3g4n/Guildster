const { MessageEmbed } = require("discord.js");
const ms = require("ms");

module.exports = {
    name: "mute",
    description: "**ADMIN-ONLY**\nMutes the mentioned user for the specified amount of time!",
    usage: "`*mute <mention || id> <time> <reason>`",
    async run(bot, message, args) {
        if (!message.member.permissions.has("MANAGE_MEMBERS"))
            return message.channel.send(
                `Hey! You don't have enough permissions to do that!`
            );

        const mention =
            message.mentions.users.first() ||
            message.guild.members.cache.get(args[0]);
        if (!mention)
            return message.channel.send(
                `Please mention a user to mute or give an id. Usage: ${this.usage}`
            );

        if (mention && !args[1])
            return message.channel.send(
                `Please specify the time to mute ${mention.tag || mention.user.tag} for.`
            );

        const time = ms(args[1]);
        if (isNaN(args[1][0]))
            return message.channel.send(
                `Please specify a time to mute ${mention.tag || mention.user.tag} for.`
            );
        if (
            !args[1].endsWith("d") &&
            !args[1].endsWith("h") &&
            !args[1].endsWith("m") &&
            !args[1].endsWith("s")
        )
            return message.channel.send(
                `Please specify a time such as: 10m, 20s, 1d, 2h etc.`
            );

        const reason = args.slice(2).join(" ");
        if (!reason)
            return message.channel.send(`Please specify a reason for the mute.`);

        const role = message.guild.roles.cache.find((r) => r.name === "Muted");
        mention.roles.add(role); //.catch(Error)(message.channel.send(`Sorry there was an error. Error: \`\`\`${Error}\`\`\``)).then(console.log(Error))
        message.channel
            .send(
                `${mention.tag || mention.user.tag} has been muted for ${args[1]} with the reason ${reason}`
            )
            .then((m) => m.delete({ timeout: 20000 }));
        setTimeout(() => {
            mention.roles.remove(role);
        }, time);
    },
};
