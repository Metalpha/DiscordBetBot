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

        if(isNaN(args[0])){
            return message.channel.send('Please provide a valid number as value');
        }else if(isNaN(args[1]) || !(args[1]%2)){
            return message.channel.send('Please provide a valid number as BO length');
        }else if(!message.mentions.users.size){
            if(args[2]){
                return message.channel.send('Please provide a valid user'); 
            }
        }

        var id = 0;

        while(message.client.moneymatch[id]){
            id++;
        }

        //If no pseudo is specified
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
            fs.writeFile("./moneymatch.json", JSON.stringify(message.client.moneymatch, null, 4), err =>{
                if(err) throw err;
                message.channel.send(`Moneymatch ${id} created`);
            });
        }else{
            message.client.moneymatch[id] = {
                type: 'mm',
                value: args[0],
                length: args[1],
                player1: message.author,
                player2: message.mentions.users.first(),
                sidebet: {
                    
                }
            }
            fs.writeFile("./moneymatch.json", JSON.stringify(message.client.moneymatch, null, 4), err =>{
                if(err) throw err;
                message.channel.send(`Moneymatch ${id} created`);
            });
        }
    }
}