const fs = require('fs')

module.exports = {
    name: 'sidebet',
    aliases: ['sb'],
    description: 'Adds a sidebet.',
    cooldown: 1,
    guildOnly: true,
    args: true,
    usage: '<id> <value> <player> <member>',
    execute(message, args){

    if(isNaN(args[0])){
        return message.channel.send('Please provide a valid number as id');
    }else if(!message.client.moneymatch[args[0]]){
        return message.channel.send(`This moneymatch doesn't exist`);
    }else if(isNaN(args[1])){
        return message.channel.send('Please provide a valid number as value');
    }else if(message.mentions.users.size != 2){
        if(message.mentions.users.first() == message.mentions.users.last()) return message.channel.send(`Please provide enough users`);        
    }else if(!message.client.moneymatch[args[0]].player2){
        return message.channel.send(`Can't bet when there is only one player`); 
    }else if((message.mentions.users.first().username != message.client.moneymatch[args[0]].player1.username) && (message.mentions.users.first().username != message.client.moneymatch[args[0]].player2.username)){
        return message.channel.send(`Please bet on one of the players`); 
    }

    const mm = message.client.moneymatch[args[0]];

    var idsb = 0;

    while(message.client.moneymatch[args[0]].sidebet[idsb]){
        idsb++;
    }

    mm.sidebet[idsb] = {
        bettor1: message.author,
        bettor2: message.mentions.users.last(),
        value: args[1],
        player: message.mentions.users.first()
    }
    fs.writeFile("./moneymatch.json", JSON.stringify(message.client.moneymatch, null, 4), err =>{
        if(err) throw err;
        message.channel.send(`Sidebet ${idsb} created`);
    });

    }
}