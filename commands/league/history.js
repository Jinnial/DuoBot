const dotenv = require('dotenv').config();
const request = require('request');

//MUST HAVE
exports.run = (client, msg, args) => {
    var out = "___***Past Three Matches***___\n"
    if(args[2] == null)
        args[2] = "I AFK 4 Butts"
    //Grab User ID
    msg.channel.send("```Fetching Data...```");
    request(`https://na1.api.riotgames.com/lol/summoner/v3/summoners/by-name/${args[2]}?api_key=${process.env.LEAGUE}`, { json: true }, (err, res, summoner) => {
    if (err) { return console.log(err); }
        console.log("I MADE IT THROUGH 1")
        request(`https://na1.api.riotgames.com/lol/match/v3/matchlists/by-account/${summoner.accountId}/recent?api_key=${process.env.LEAGUE}`, { json: true }, (err, res, matches) => {
            if (err) { return console.log(err); }
            console.log("I MADE IT THROUGH 2")

            for (let i = 0; i <+ 3; i++) {
                console.log(matches.matches[i])
                request(`https://na1.api.riotgames.com/lol/static-data/v3/champions/${matches.matches[i].champion}?api_key=${process.env.LEAGUE}`, { json: true }, (err, res, champion) => {
                    if (err) { return console.log(err); }
                    console.log("I MADE IT THROUGH 3", champion)
                    out += `\`\`\`Lane: ${matches.matches[i].lane}\nChampion Played: ${champion.name}, ${champion.title}\n` +
                        `Server: ${matches.matches[i].platformId}\nRole: ${matches.matches[i].role}\`\`\``
                    if(i ==2 ){
                        msg.channel.send(out)
                        return
                    }
                })
            }
        });
    });
}