const dotenv = require('dotenv').config();
const request = require('request');

//MUST HAVE
exports.run = (client, msg, args) => {
    if(args[2] == '' || args[2] == null){
        msg.reply("the username is required to get the Champion Mastery.");
        return;
    }
    //Grab User ID
    request(`https://na1.api.riotgames.com/lol/summoner/v3/summoners/by-name/${args[2]}?api_key=${process.env.LEAGUE}`, { json: true }, (err, res, body) => {
        if (err) { return console.log(err); }
        request(`https://na1.api.riotgames.com/lol/champion-mastery/v3/scores/by-summoner/${body.id}?api_key=${process.env.LEAGUE}`, { json: true }, (err, res, body) => {
            if (err) { return console.log(err); }
            console.log(body);
            if (body != null){
                msg.reply("that username does not exist.");
                return;
            }
            msg.channel.send("``` Total Champion Mastery Score: " + body + "```");
        });
    });
}