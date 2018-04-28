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
    //Grab User ID
    fortniteAPI.login().then(() => {
        fortniteAPI
            .getStatsBR(args[2], "pc")
            .then(stats => {
                console.log('Pass')
                msg.reply("The account ID is: " + stats.info.accountId);
            })
            .catch(err => {
                console.log('Fail')
                msg.reply(err);
            });
    });
}