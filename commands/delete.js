const fs = require('fs')

module.exports = {
    name: 'delete',
    aliases: ['remove'],
    description: 'Removes a moneymatch from the list by id.',
    cooldown: 1,
    guildOnly: true,
    args: true,
    usage: '<id>',
    execute(message, args){

        if(isNaN(args[0])){ //If the passed id is not a number, returns
            return message.channel.send('Please provide a valid number as id');
        }else if(!message.client.moneymatch[args[0]]){ //If the match is not found, returns
            return message.channel.send(`This moneymatch doesn't exist`);
        }

        delete message.client.moneymatch[args[0]];

        //Writes the changes to ./moneymatch.json
        fs.writeFile("./moneymatch.json", JSON.stringify(message.client.moneymatch, null, 4), err =>{
            if(err) throw err;
            message.channel.send(`Moneymatch ${args[0]} deleted`);
        });
    }
}