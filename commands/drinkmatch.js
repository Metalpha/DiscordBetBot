const fs = require('fs')

module.exports = {
    name: 'drinkmatch',
    aliases: ['dm'],
    description: 'Drink match someone on the server.',
    cooldown: 5,
    guildOnly: true,
    args: true,
    usage: '<length> [pseudo]',
    execute(message, args){

        if(isNaN(args[0]) || !(args[0]%2) || (args[0]<=0)){ //If the passed BO length is not a positive odd number, returns
            return message.channel.send('Please provide a valid number as BO length');
        }else if(!message.mentions.users.size){ //If there is a second argument but it's not a mentionned user, returns
            if(args[1]){
                return message.channel.send('Please provide a valid user'); 
            }
        }

        //Finds the first available id for the match
        var id = 0;
        while(message.client.moneymatch[id]){
            id++;
        }

        //If no pseudo is specified, creates a drinkmatch with only the message author as player
        if(!args[1]){
            message.client.moneymatch[id] = {
                type: 'dm',
                value: null,
                length: args[0],
                player1: message.author,
                player2: null,
                sidebet: {
                    
                }
            }
            //Writes the changes to ./moneymatch.json
            fs.writeFile("./moneymatch.json", JSON.stringify(message.client.moneymatch, null, 4), err =>{
                if(err) throw err;
                message.channel.send(`Drink Match ${id} created`);
            });
        }else{ //If an opponent is specified, creates a drinkmatch with the author and the mentionned user as players
            message.client.moneymatch[id] = {
                type: 'dm',
                value: null,
                length: args[0],
                player1: message.author,
                player2: message.mentions.users.first(),
                sidebet: {

                }
            }
            //Writes the changes to ./moneymatch.json
            fs.writeFile("./moneymatch.json", JSON.stringify(message.client.moneymatch, null, 4), err =>{
                if(err) throw err;
                message.channel.send(`Drink Match ${id} created`);
            });
        }
    }
}