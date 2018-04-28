const Discord = require("discord.js");
const client = new Discord.Client();
const Fortnite = require("fortnite-api");
const dotenv = require('dotenv').config();

if (!(process.env.TOKEN && process.env.PREFIX && process.CHANNEL_ID)) {
    require('dotenv-safe').config();
}
var token = process.env.TOKEN

//Alert Is Online
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
    console.log(msg.content.substring(0, 5))
    if (msg.content.substring(0, 2) == process.env.PREFIX) {
        var args = msg.content.toLocaleLowerCase().split(" ");
        var newArgs = []
        try {
            var commandFile = ""
            if(args[0].substring(2) == "ftn"){
                commandFile = require(`./commands/fortnite/${args[1]}.js`);
                commandFile.run(client, msg, args);
            }
            else if(args[0].substring(2) == "lol"){
                if(args[1] != "status"){
                    //Get Summoner Name
                    let noPrefix = msg.content.substring(5)
                    let startPos = noPrefix.indexOf('"') + 1;
                    let endPos = noPrefix.indexOf('"', startPos);
                    var name = noPrefix.substring(startPos,endPos)

                    //Print Data to Console
                    console.log(noPrefix, startPos, endPos, name)

                    //Rebuild Args
                    newArgs = [args[0], args[1], name]
                    var restArgs = noPrefix.substring(endPos + 1).split(" ")
                    restArgs.forEach(item => {
                        newArgs.push(item)
                    });
                    console.log(newArgs)
                    args = restArgs;
                    commandFile = require(`./commands/league/${newArgs}.js`);
                } else{
                    commandFile = require(`./commands/league/${args}.js`);
                }
                //console.log(args[1])
            }
        } catch (err) {
            console.error(err);
        }
    }
});

client.login(token);