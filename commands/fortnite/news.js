const dotenv = require('dotenv').config();

//Fortnite API
const Fortnite = require("fortnite-api");
let fortniteAPI = new Fortnite(
    [
        process.env.EMAIL,
        process.env.PASS,
        process.env.CLIENT,
        process.env.LAUNCH
    ],
    {
        debug: true
    }
);

//MUST HAVE
exports.run = (client, msg, args) => {
    //Grab News
    fortniteAPI.login().then(() => {
        fortniteAPI
            .getFortniteNews("en")
            .then(news => {
                console.log('Pass')
                var out = ""
                news.br.forEach(article => {
                    out+= "__**" + article.title + "**__\n" + article.body + "\n";
                });
                msg.channel.send(out + "\n```Called by: " + process.env.DEVNAME + "```")
            })
            .catch(err => {
                console.log('Fail')
                msg.reply(err);
            });
    });
}