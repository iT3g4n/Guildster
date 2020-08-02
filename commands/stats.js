const Client = require('fortnite');
const fortnite = new Client('c1092f79-edaf-40f7-b130-a4c3b218bd76');

module.exports = {
    name: "stats",
    description: "stats for fortnite",
    async run(bot, message, args) {

        let msgargs = args.slice(1).join(" ")

        let username = msgargs
        let platform = args[0] || "pc"

        if (!username) return message.channel.send("Please provide a username")

        let data = fortnite.user(username, platform).then(data => {
            let stats = data.stats
            let lifetime = stats.lifetime
            console.log(lifetime)

            let matches = lifetime[6]("Matches Played")
            let wins = lifetime[7]("Wins")
            let KD = lifetime[9]("KD")
            let kills = lifetime[8]("Kills")
        })

        message.channel.send(matches + wins + kd + kills + " stats for " + username)

    }
}

// API KEY = c1092f79-edaf-40f7-b130-a4c3b218bd76