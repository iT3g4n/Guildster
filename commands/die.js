module.exports = {
    description: 'BOT-OWNER-ONLY\nStops the bot and makes it go offline!',
    async run(bot, message, args) {
        if (message.author.id != '381024325974622209') return message.channel.send(`You can't do that!`).then(msg => msg.delete({ timeout: 5000 }));

        let msg = await message.channel.send(`Shutting Down...`)

        try {
            process.exit().then(
                msg.edit(`Shutdown Complete!`)
            )
        } catch (err) {
            msg.edit(`ERROR: ${err}`);
            console.error(err);
        }
    }
}