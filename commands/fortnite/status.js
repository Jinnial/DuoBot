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
    if(args[2] == null){
        msg.reply("Please make sure to pass in either `royal`, `pve`, or `store`.")
        return;
    }

    //Grab Battle Royal
    if(args[2].toLocaleLowerCase() == "royal"){
        fortniteAPI.login().then(() => {
            fortniteAPI
                .checkFortniteStatus()
                .then(status => {
                    console.log()
                    msg.channel.send("Battle Royal: " + (status == true ? "Online" : "Offline"));
                })
                .catch(err => {
                    console.log(err);
                });
        });
    }
    
    //Grab PVE
    if(args[2].toLocaleLowerCase() == "pve"){
        fortniteAPI.login().then(() => {
            fortniteAPI
                .getFortnitePVEInfo("en")
                .then(status => {
                    msg.channel.send("PVE: " + (status == true ? "Online" : "Offline"));
                })
                .catch(err => {
                    console.log(err);
                });
        });
    }
    
    //Grab Store
    if(args[2].toLocaleLowerCase() == "store"){
        fortniteAPI.login().then(() => {
            fortniteAPI
                .getStore("en")
                .then(status => {
                    msg.channel.send("Store: " + (status == true ? "Online" : "Offline"));
                })
                .catch(err => {
                    console.log(err);
                });
        });
    }
}