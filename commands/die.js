module.exports = {
    async run (bot, message, args) {
        if (message.author.id != '381024325974622209') return; 
        
        let msg = await message.channel.send(`Shutting Down...`)
        process.exit().then(
            msg.edit(`Shutdown Complete!`)
        )
    }
}