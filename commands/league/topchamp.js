const dotenv = require('dotenv').config();
const request = require('request');

//MUST HAVE
exports.run = (client, msg, args) => {
    if(args[2] == '' || args[2] == null){
        msg.reply("the username is required to get the Top Mastery.");
        return;
    }

    var champStats = '';
    //Grab User ID
    request(`https://na1.api.riotgames.com/lol/summoner/v3/summoners/by-name/${args[2]}?api_key=${process.env.LEAGUE}`, { json: true }, (err, res, body) => {
        if (err) { return console.log(err); }
        request(`https://na1.api.riotgames.com/lol/champion-mastery/v3/champion-masteries/by-summoner/${body.id}?api_key=${process.env.LEAGUE}`, { json: true }, (err, res, body) => {
            if (err) { return console.log(err); }
            champStats = "\nChampion Level: " + body[0].championLevel + "\nChampion Points: " + body[0].championPoints;
            request(`https://na1.api.riotgames.com/lol/static-data/v3/champions/${body[0].championId}?api_key=${process.env.LEAGUE}`, { json: true }, (err, res, body) => {
                msg.channel.send("```Top Champion: " + body.key + ", " + body.title + champStats + "```");
            });
        });
    });
}