const dotenv = require('dotenv').config();
var http = require('http');
const request = require('request');

//MUST HAVE
exports.run = (client, msg, args) => {
    if(args[2] == null)
        args[2] = "I AFK 4 Butts"
    //Grab User ID
    request(`https://na1.api.riotgames.com/lol/summoner/v3/summoners/by-name/${args[2]}?api_key=${process.env.LEAGUE}`, { json: true }, (err, res, body) => {
    if (err) { return console.log(err); }
        request(`https://na1.api.riotgames.com/lol/match/v3/matchlists/by-account/${body.id}/recent`)
        msg.channel.send(sumPrint);
    });
}