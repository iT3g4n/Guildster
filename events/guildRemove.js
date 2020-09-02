const mongo = require("../mongo")
const guildSchema = require(`../schemas/guildSchema`)
const warnSchema = require(`../schemas/warnSchema`)
const { Guild, Client } = require("discord.js")

module.exports = {
    /**
     * @param {Guild} guild
     * @param {Client} bot
     */
    run: async(bot, guild) => {
        await mongo().then(async mongoose => {
            try {
                let data = await guildSchema.findOneAndRemove( {_id: guild.id} ).then()
                console.log(`Guild Deleted:`, guild.name)

                let moredata = await warnSchema.deleteMany({Guild: guild.id}).then()
                
            } finally {
                mongoose.connection.close()
            }
        })
    }
}