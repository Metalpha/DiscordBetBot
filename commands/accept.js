const fs = require('fs')

module.exports = {
    name: 'accept',
    description: 'Accept a moneymatch or boisson match.',
    cooldown: 3,
    guildOnly: true,
    args: true,
    usage: '<id>',
    execute(message, args){
        if(isNaN(args[0])){
            return message.channel.send('Please provide a valid number as ID');
        }else if(!message.client.moneymatch[args[0]]){
            return message.channel.send(`Invalid ID. No moneymatch found.`)
        }else if(message.client.moneymatch[args[0]].player2){
            return message.channel.send(`Moneymatch already full.`);
        }

        message.client.moneymatch[args[0]].player2 = message.author;

        fs.writeFile("./moneymatch.json", JSON.stringify(message.client.moneymatch, null, 4), err =>{
            if(err) throw err;
            message.channel.send(`You accepted the challenge from ${message.client.moneymatch[args[0]].player1}!`);
        });
    }
}