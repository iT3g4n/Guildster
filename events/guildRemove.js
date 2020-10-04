const mongo = require("../mongo")
const guildSchema = require(`../schemas/guildSchema`)
const warnSchema = require(`../schemas/warnSchema`)
const { Guild, Client } = require("discord.js")

module.exports = {
    /**
     * @param {Guild} guild
     * @param {Client} bot
     */
    run: async (bot, guild) => {
        console.log(`Guild Deleted:`, guild.name)
        const data = await guildSchema.findOneAndRemove({ _id: guild.id })

        const moredata = await warnSchema.deleteMany({ Guild: guild.id });
    }
}