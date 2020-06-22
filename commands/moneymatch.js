const fs = require('fs')

module.exports = {
    name: 'moneymatch',
    aliases: ['mm'],
    description: 'Moneymatch someone on the server.',
    cooldown: 5,
    guildOnly: true,
    args: true,
    usage: '<value> <length> [pseudo]',
    execute(message, args){

        if(isNaN(args[0]) || args[0]<=0){ //If the passed bet value is not a positive number, returns
            return message.channel.send('Please provide a valid number as value');
        }else if(isNaN(args[1]) || !(args[1]%2) || args[1]<=0){ //If the passed BO length is not a positive odd number, returns
            return message.channel.send('Please provide a valid number as BO length');
        }else if(!message.mentions.users.size){ //If there is a second argument but it's not a mentionned user, returns
            if(args[2]){
                return message.channel.send('Please provide a valid user'); 
            }
        }

        //Finds the first available id for the match
        var id = 0;
        while(message.client.moneymatch[id]){
            id++;
        }

        //If no pseudo is specified, creates a moneymatch with only the message author as player
        if(!args[2]){
            message.client.moneymatch[id] = {
                type: 'mm',
                value: args[0],
                length: args[1],
                player1: message.author,
                player2: null,
                sidebet: {

                }
            }
            //Writes the changes to ./moneymatch.json
            fs.writeFile("./moneymatch.json", JSON.stringify(message.client.moneymatch, null, 4), err =>{
                if(err) throw err;
                message.channel.send(`Moneymatch ${id} created`);
            });
        }else{ //If an opponent is specified, creates a moneymatch with the author and the mentionned user as players
            message.client.moneymatch[id] = {
                type: 'mm',
                value: args[0],
                length: args[1],
                player1: message.author,
                player2: message.mentions.users.first(),
                sidebet: {
                    
                }
            }
            //Writes the changes to ./moneymatch.json
            fs.writeFile("./moneymatch.json", JSON.stringify(message.client.moneymatch, null, 4), err =>{
                if(err) throw err;
                message.channel.send(`Moneymatch ${id} created`);
            });
        }
    }
}