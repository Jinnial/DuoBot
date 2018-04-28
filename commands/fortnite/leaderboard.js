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
    //Check for Valid 
    if(args[3] != null){ 
        if(args[3] != "pc" || args[3] != "ps4" || args[3] != "xb1"){ 
            msg.reply("Please make sure to pass in either the proper platform.") 
            return 
        } 
    } 
 
    //Find Platform 
    var plat = (args[3] == null ? "pc" : args[3]) 
 
    //Find Match Type 
    var matchType = null; 
    switch(args[2]) { 
        case "solo": 
            console.log("s: " + args[2]) 
            matchType = Fortnite.SOLO; 
            break; 
        case "duo": 
            console.log("d: " + args[2]) 
            matchType = Fortnite.DUO; 
            break; 
        case "squad": 
            console.log("sq: " + args[2]) 
            matchType = Fortnite.SQUAD; 
            break; 
        default: 
            matchType = Fortnite.SOLO; 
    } 

    fortniteAPI.login().then(() => {
        fortniteAPI
            .getScoreLeaderBoard(plat, matchType)
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