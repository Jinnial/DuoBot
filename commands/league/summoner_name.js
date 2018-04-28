const dotenv = require('dotenv').config();
var http = require('http');
const request = require('request');

//League API
var lol = require('node-of-legends');
lol.setConfig({
    region: lol.REGION.NORTH_AMERICA,
    apikey: 'RGAPI-ab5befbc-caf7-4675-b526-437f942d3ade'
});

//MUST HAVE
exports.run = (client, msg, args) => {
    if(args[2] == null)
        args[2] = "I AFK 4 Butts"
    //Grab User ID
    request(`https://na1.api.riotgames.com/lol/summoner/v3/summoners/by-name/${args[2]}?api_key=${process.env.LEAGUE}`, { json: true }, (err, res, body) => {
    if (err) { return console.log(err); }
        var sumPrint = ("__**Summoner Info**__\n"+
        "```Summoner Name: " + body.name +
        "\nSummoner ID: " + body.id +
        "\nSummoner Level: " + body.summonerLevel + "```");
        msg.channel.send(sumPrint);
    });
}