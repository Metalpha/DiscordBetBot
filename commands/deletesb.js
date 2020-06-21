const fs = require('fs')

module.exports = {
    name: 'deletesb',
    aliases: ['removesb'],
    description: 'Removes a sidebet from the list by id.',
    cooldown: 1,
    guildOnly: true,
    args: true,
    usage: '<idmatch> <idsb>',
    execute(message, args){

        if(isNaN(args[0])){
            return message.channel.send('Please provide a valid number as mm id');
        }else if(!message.client.moneymatch[args[0]]){
            return message.channel.send(`This moneymatch doesn't exist`);
        }else if(isNaN(args[1])){
            return message.channel.send('Please provide a valid number as sidebet id');
        }else if(!message.client.moneymatch[args[0]].sidebet[args[1]]){
            return message.channel.send(`This sidebet doesn't exist`);
        }

        delete message.client.moneymatch[args[0]].sidebet[args[1]];
        fs.writeFile("./moneymatch.json", JSON.stringify(message.client.moneymatch, null, 4), err =>{
            if(err) throw err;
            message.channel.send(`Sidebet ${args[1]} deleted from moneymatch ${args[0]}`);
        });
    }
}