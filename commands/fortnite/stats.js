const dotenv = require('dotenv').config();

//Fortnite API
const Fortnite = require("fortnite-api");
let fortniteAPI = new Fortnite(
    [
        process.env.EMAIL,
        process.env.PASS,
        process.env.CLIENT,
        process.env.LAUNCH
    ],
    {
        debug: true
    }
);

//MUST HAVE
exports.run = (client, msg, args) => {
    console.log(args)

    //Make Header
    var out = "__**User " + (args[3] == "solo" ? "Solo" : args[3] == "duo" ? "Duo" : args[3] == "squad" ? "Squad" : "Lifetime") + " Stats**__\n```User: " + args[2];

    //Check for Valid
    if(args[4] != null){
        if(args[4] != "pc" || args[4] != "ps4" || args[4] != "xb1"){
            msg.reply("Please make sure to pass in either the proper platform.")
            return
        }
    }

    //Find Platform
    var plat = (args[4] == null ? "pc" : args[4])
    out+= (plat == "pc" ? " (PC)\n" : plat == "ps4" ? " (PS4)\n" : "Xbox One\n")
    console.log(plat, args[2])
    console.log(out)

    //Grab Stats
    fortniteAPI.login().then(() => {
        fortniteAPI
            .getStatsBR(args[2], plat)
            .then(stats => {
                if(args[3] == "solo"){
                    out += `Total Wins: ${stats.group.solo.wins}\nTop 3: ${stats.group.solo.top3}\n`+
                        `Top 5: ${stats.group.solo.top5}\nTop 6: ${stats.group.solo.top6}\nTop 10:${stats.group.solo.top10}\n` +
                        `Top 12: ${stats.group.solo.top12}\nTop 25: ${stats.group.solo.top25}\nKill/Death Ratio: ${stats.group.solo['k/d']}\n` +
                        `Win Percentage: ${stats.group.solo['win%']}\nMatches Played: ${stats.group.solo.matches}\nTotal Kills: ${stats.group.solo.kills}\n` +
                        `Time Played: ${stats.group.solo.timePlayed}\nKills Per Match: ${stats.group.solo.killsPerMatch}\n` +
                        `Kills Per Minute: ${stats.group.solo.killsPerMin}\nScore: ${stats.group.solo.score}`
                    msg.channel.send(out + "```")
                }
                if(args[3] == "duo"){
                    out += `Total Wins: ${stats.group.duo.wins}\nTop 3: ${stats.group.duo.top3}\n`+
                        `Top 5: ${stats.group.duo.top5}\nTop 6: ${stats.group.duo.top6}\nTop 10:${stats.group.duo.top10}\n` +
                        `Top 12: ${stats.group.duo.top12}\nTop 25: ${stats.group.duo.top25}\nKill/Death Ratio: ${stats.group.duo['k/d']}\n` +
                        `Win Percentage: ${stats.group.duo['win%']}\nMatches Played: ${stats.group.duo.matches}\nTotal Kills: ${stats.group.duo.kills}\n` +
                        `Time Played: ${stats.group.duo.timePlayed}\nKills Per Match: ${stats.group.duo.killsPerMatch}\n` +
                        `Kills Per Minute: ${stats.group.duo.killsPerMin}\nScore: ${stats.group.duo.score}`
                    msg.channel.send(out + "```")
                }
                if(args[3] == "squad"){
                    out += `Total Wins: ${stats.group.squad.wins}\nTop 3: ${stats.group.squad.top3}\n`+
                        `Top 5: ${stats.group.squad.top5}\nTop 6: ${stats.group.squad.top6}\nTop 10:${stats.group.squad.top10}\n` +
                        `Top 12: ${stats.group.squad.top12}\nTop 25: ${stats.group.squad.top25}\nKill/Death Ratio: ${stats.group.squad['k/d']}\n` +
                        `Win Percentage: ${stats.group.squad['win%']}\nMatches Played: ${stats.group.squad.matches}\nTotal Kills: ${stats.group.squad.kills}\n` +
                        `Time Played: ${stats.group.squad.timePlayed}\nKills Per Match: ${stats.group.squad.killsPerMatch}\n` +
                        `Kills Per Minute: ${stats.group.squad.killsPerMin}\nScore: ${stats.group.squad.score}`
                    msg.channel.send(out + "```")
                }
                if(args[3] == "lifetime"){
                    out += `Total Wins: ${stats.lifetimeStats.wins}\nScore: ${stats.lifetimeStats.score}\nTop 3: ${stats.lifetimeStats.top3s}\n`+
                        `Top 5: ${stats.lifetimeStats.top5s}\nTop 6: ${stats.lifetimeStats.top6s}\nTop 10:${stats.lifetimeStats.top10s}\n` +
                        `Top 12: ${stats.lifetimeStats.top12s}\nTop 25: ${stats.lifetimeStats.top25s}\nKill/Death Ratio: ${stats.lifetimeStats['k/d']}\n` +
                        `Win Percentage: ${stats.lifetimeStats['win%']}\nMatches Played: ${stats.lifetimeStats.matches}\nTotal Kills: ${stats.lifetimeStats.kills}\n` +
                        `Time Played: ${stats.lifetimeStats.timePlayed}\nKills Per Match: ${stats.lifetimeStats.killsPerMatch}\n` +
                        `Kills Per Minute: ${stats.lifetimeStats.killsPerMin}`
                    msg.channel.send(out + "```")
                }
            })
            .catch(err => {
                console.log("THERE WAS AN ERROR: " + err);
            });
    });
}