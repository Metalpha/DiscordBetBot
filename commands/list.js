const fs = require('fs')

module.exports = {
    name: 'list',
    description: `Lists all active matches.`,
    cooldown: 5,
    guildOnly: true,
    args: false,
    execute(message, args){
        var reply = ``;

        for(const mm in message.client.moneymatch){
            if(message.client.moneymatch[mm].type == 'mm'){
                if(message.client.moneymatch[mm].player2){
                    reply += `\`Moneymatch ${mm}: ${message.client.moneymatch[mm].player1.username} vs ${message.client.moneymatch[mm].player2.username}, ${message.client.moneymatch[mm].value}€, BO${message.client.moneymatch[mm].length}\`\n`;
                }
                else{
                    reply += `\`Moneymatch ${mm}: ${message.client.moneymatch[mm].player1.username}, ${message.client.moneymatch[mm].value}€, BO${message.client.moneymatch[mm].length}, waiting\`\n`;
                }
            }
            if(message.client.moneymatch[mm].type == 'bm'){
                if(message.client.moneymatch[mm].player2){
                    reply += `\`Drink Match ${mm}: ${message.client.moneymatch[mm].player1.username} vs ${message.client.moneymatch[mm].player2.username}, BO${message.client.moneymatch[mm].length}\`\n`;
                }
                else{
                    reply += `\`Drink Match ${mm}: ${message.client.moneymatch[mm].player1.username}, BO${message.client.moneymatch[mm].length}, waiting\`\n`;
                }
            }
        }

        if(reply == ``) return message.channel.send(`No active matches.`);

        message.channel.send(reply);
    }
}