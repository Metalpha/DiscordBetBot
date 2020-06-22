const fs = require('fs')

module.exports = {
    name: 'accept',
    description: 'Accept a moneymatch or drink match.',
    cooldown: 3,
    guildOnly: true,
    args: true,
    usage: '<id>',
    execute(message, args){

        if(isNaN(args[0])){ //If the passed id isn't not a number, returns
            return message.channel.send('Please provide a valid number as ID');
        }else if(!message.client.moneymatch[args[0]]){ //If the passed id isn't not a match, returns
            return message.channel.send(`Invalid ID. No moneymatch found.`)
        }else if(message.client.moneymatch[args[0]].player2){  //If the found match is already full, returns
            return message.channel.send(`Moneymatch already full.`);
        }

        //Sets the message author as the player 2 for the match
        message.client.moneymatch[args[0]].player2 = message.author;

        //Writes the changes to ./moneymatch.json
        fs.writeFile("./moneymatch.json", JSON.stringify(message.client.moneymatch, null, 4), err =>{
            if(err) throw err;
            message.channel.send(`You accepted the challenge from ${message.client.moneymatch[args[0]].player1}!`);
        });
    }
}