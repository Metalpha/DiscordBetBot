const fs = require('fs')

module.exports = {
    name: 'boissonmatch',
    aliases: ['bm'],
    description: 'Boison Match someone on the server.',
    cooldown: 5,
    guildOnly: true,
    args: true,
    usage: '<length> [pseudo]',
    execute(message, args){

        if(isNaN(args[0]) || !(args[0]%2) || (args[0]<=0)){
            return message.channel.send('Please provide a valid number as BO length');
        }else if(!message.mentions.users.size){
            if(args[1]){
                return message.channel.send('Please provide a valid user'); 
            }
        }

        var id = 0;

        while(message.client.moneymatch[id]){
            id++;
        }

        //If no pseudo is specified
        if(!args[1]){
            message.client.moneymatch[id] = {
                type: 'bm',
                value: null,
                length: args[0],
                player1: message.author,
                player2: null,
                sidebet: {
                    
                }
            }
            fs.writeFile("./moneymatch.json", JSON.stringify(message.client.moneymatch, null, 4), err =>{
                if(err) throw err;
                message.channel.send(`Boisson Match ${id} created`);
            });
        }else{
            message.client.moneymatch[id] = {
                type: 'bm',
                value: null,
                length: args[0],
                player1: message.author,
                player2: message.mentions.users.first(),
                sidebet: {

                }
            }
            fs.writeFile("./moneymatch.json", JSON.stringify(message.client.moneymatch, null, 4), err =>{
                if(err) throw err;
                message.channel.send(`Boisson Match ${id} created`);
            });
        }
    }
}