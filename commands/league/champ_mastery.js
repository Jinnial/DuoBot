const dotenv = require('dotenv').config();
const request = require('request');

//MUST HAVE
exports.run = (client, msg, args) => {
    console.log("together, we made it");
    //Grab User ID
    request(`https://na1.api.riotgames.com/lol/summoner/v3/summoners/by-name/I AFK 4 Butts?api_key=${process.env.LEAGUE}`, { json: true }, (err, res, body) => {
        if (err) { return console.log(err); }
        console.log(body);
        //msg.channel.send();
    });
    // request(`/lol/champion-mastery/v3/champion-masteries/by-summoner/${args[2]}/by-champion/${args[3]}?api_key=RGAPI-ab5befbc-caf7-4675-b526-437f942d3ade`, { json: true }, (err, res, body) => {
    //     if (err) { return console.log(err); }
    //     msg.channel.send(body);
    // });
}