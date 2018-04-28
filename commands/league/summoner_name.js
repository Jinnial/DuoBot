const dotenv = require('dotenv').config();
var http = require('http');

//League API
var lol = require('node-of-legends');
lol.setConfig({
    region: lol.REGION.NORTH_AMERICA,
    apikey: 'RGAPI-ab5befbc-caf7-4675-b526-437f942d3ade'
});

//MUST HAVE
exports.run = (client, msg, args) => {
    //Grab User ID
    const request = require('request');
 
    request('https://na1.api.riotgames.com/lol/summoner/v3/summoners/by-name/I AFK 4 Butts?api_key=RGAPI-ab5befbc-caf7-4675-b526-437f942d3ade', { json: true }, (err, res, body) => {
    if (err) { return console.log(err); }
        msg.reply(body.name);
    });
}