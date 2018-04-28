const dotenv = require('dotenv').config();
var http = require('http');
const request = require('request');

//MUST HAVE
exports.run = (client, msg, args) => {
    if(args[2] == null)
        args[2] = "I AFK 4 Butts"
    //Grab User ID
    msg.reply("```Fetching Data...```");
    request(`https://na1.api.riotgames.com/lol/summoner/v3/summoners/by-name/${args[2]}?api_key=${process.env.LEAGUE}`, { json: true }, (err, res, body) => {
    if (err) { return console.log(err); }
        request(`https://na1.api.riotgames.com/lol/match/v3/matchlists/by-account/${body.accountId}/recent`), {json: true}, (err, res, body) => {
            request(`https://na1.api.riotgames.com/lol/static-data/v3/champions/${id}?locale=en_US`), {json: true}, (err, res, body) => {

                var sumPrint =("__**Match History**__\n```")

                for(var i = 0; i < 10; i++){
                sumPrint += "Lane: " + body.lane + "\n Champion Played: " + body.name + "\n Server: " + body.platformId + "\n Role: " + body.role + "```"
                }
            }
        }
        msg.channel.send(sumPrint);
    });
}