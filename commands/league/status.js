const dotenv = require('dotenv').config();
const request = require('request');


//MUST HAVE
exports.run = (client, msg, args) => {
    request(`https://na1.api.riotgames.com/lol/status/v3/shard-data?api_key=${process.env.LEAGUE}`), {json:true}, (err, res, body) => {
    if (err) { return console.log(err); }
        console.log(body);
        var sumPrint = ("__**Server Status**__\n"+
        "```Region: " + body.region_tag +
        "\nStatus: " + body.status +
        "\nIncidents: " + body.incidents + "```");
        msg.channel.send(sumPrint);
        console.log(sumPrint);
    };
}