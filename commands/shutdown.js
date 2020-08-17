module.exports = {
    async run (bot, message, args) {
        let msg = await message.channel.send(`Shutting Down...`)
        process.exit()
    }
}