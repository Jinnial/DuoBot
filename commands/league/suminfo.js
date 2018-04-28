const dotenv = require('dotenv').config();
const request = require('request');

//MUST HAVE
exports.run = (client, msg, args) => {
    console.log('I MADE IT')
    console.log(args +`\nhttps://na1.api.riotgames.com/lol/summoner/v3/summoners/by-name/${args[2]}?api_key=${process.env.LEAGUE}`)
    if(args[2] == '')
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