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
    console.log(msg.content.substring(0, 2))
    if (msg.content.substring(0, 2) == process.env.PREFIX) {
        const args = msg.content.split(" ");
        console.log(args[1]);
        try {
            let commandFile = require(`./commands/${args[1]}.js`);
            commandFile.run(client, msg, args);
        } catch (err) {
            console.error(err);
        }
    }
});

client.login(token);