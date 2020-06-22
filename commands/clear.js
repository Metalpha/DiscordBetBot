const fs = require('fs')

module.exports = {
    name: 'clear',
    aliases: ['purge'],
    description: 'Removes all moneymatches from the list.',
    cooldown: 10,
    guildOnly: true,
    args: false,
    execute(message, args){

        //Goes through all matches and deletes them
        for(const mm in message.client.moneymatch){
            delete message.client.moneymatch[mm];
        }

        //Writes the changes to ./moneymatch.json
        fs.writeFile("./moneymatch.json", JSON.stringify(message.client.moneymatch, null, 4), err =>{
            if(err) throw err;
            message.channel.send("All moneymatches got deleted.")
        });
    }
}