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
exports.run = (client, msg, args) => {
    fortniteAPI.login().then(() => {
        fortniteAPI
            .getScoreLeaderBoard("pc", Fortnite.SOLO)
            .then(leaderboard => {
                
                var leaderboardDisplay = "__**Leaderboard**__\n```";

                for(var i = 0; i < 10; i++){
                    leaderboardDisplay += "Rank: " + leaderboard[i].rank + "\nDisplay Name:"  + leaderboard[i].displayName + "\n\n"
                }
                //console.log(leaderboardDisplay);
                msg.channel.send(leaderboardDisplay + "```");
            })
            .catch(err => {
                console.log(err);
                msg.channel.send(err);
            });
    });
}