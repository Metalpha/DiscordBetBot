const fs = require('fs')

module.exports = {
    name: 'note',
    description: 'Writes a note.',
    cooldown: 1,
    guildOnly: true,
    args: true,
    usage: '<id> <note>',
    execute(message, args){
        if(!message.client.moneymatch[args[0]]){ //If the match is not found, returns
            return message.channel.send(`This moneymatch doesn't exist`);
        }

        let note = '';

        for (let i = 1; i < args.length; i++){
            note += `${args[i]} `;
        }

        message.client.moneymatch[args[0]].note = note;

        fs.writeFile("./moneymatch.json", JSON.stringify(message.client.moneymatch, null, 4), err =>{
            if(err) throw err;
            message.channel.send(`You added a note`);
        });
        }
    }