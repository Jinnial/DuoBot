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
    //Check for Valid
    if(args[3] != null){
        if(args[3] != "pc" || args[3] != "ps4" || args[3] != "xb1"){
            msg.reply("Please make sure to pass in either the proper platform.")
            return
        }
    }

    //Grab Stats
    ffortniteAPI.login().then(() => {
        fortniteAPI
            .getStatsBR(args[2], (arg[3] == null ? "pc" : args[3]))
            .then(stats => {
                console.log(stats);
            })
            .catch(err => {
                console.log(err);
            });
    });
}