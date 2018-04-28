const dotenv = require('dotenv').config();
const request = require('request');

//MUST HAVE
exports.run = (client, msg, args) => {
    if(args[2] == '')
        args[2] = "I AFK 4 Butts"

    msg.channel.send("```Fetching Data```");
    //Grab User ID
    request(`https://na1.api.riotgames.com/lol/summoner/v3/summoners/by-name/${args[2]}?api_key=${process.env.LEAGUE}`, { json: true }, (err, res, body) => {
        if (err) { return console.log(err); }
        request(`https://na1.api.riotgames.com/lol/champion-mastery/v3/scores/by-summoner/${body.id}?api_key=${process.env.LEAGUE}`, { json: true }, (err, res, body) => {
            if (err) { return console.log(err); }
            msg.channel.send("``` Total Champion Mastery Score: " + body + "```");
        });
    });
}