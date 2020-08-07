module.exports = {
    async run (bot, message, args) {
        let mention = message.mentions.users.first() || message.guild.members.cache.get(args[0]);
    }
}