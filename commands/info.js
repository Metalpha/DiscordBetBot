const Discord = require(`discord.js`);

module.exports = {
    name: 'info',
    description: 'Gives info on a moneymatch.',
    cooldown: 3,
    guildOnly: true,
    args: true,
    usage: '<id>',
    execute(message, args){

        if(isNaN(args[0])){ //If the passed id is not a number, returns
            return message.channel.send('Please provide a valid number as id');
        }else if(!message.client.moneymatch[args[0]]){ //If the match is not found, returns
            return message.channel.send(`This moneymatch doesn't exist`);
        }

        const mm = message.client.moneymatch[args[0]];

        const embed = new Discord.MessageEmbed();

        //Checks if the match has two players and creates the adequate title
        if(mm.player2) embed.setTitle(`${mm.player1.username} vs ${mm.player2.username}`);
        else embed.setTitle(`${mm.player1.username} waiting for an opponent`);

        if(mm.type == 'mm'){
            embed.setDescription(`Moneymatch`);
            embed.setColor('#32a864');
            embed.addField(`Bet`, `${mm.value}€`, false);
            embed.setThumbnail(`https://i.imgur.com/bh4KYDy.png`);
        }else{
            embed.setDescription(`Drink Match`);
            embed.setColor('#e6d765');
            embed.addField(`Bet`, `Drink`, false);
            embed.setThumbnail(`https://i.imgur.com/HXFx8rh.png`);
        }

        embed.addField(`Format`, `Best-of ${mm.length}`, false);

        var player1sb = ``;
        var player2sb = ``;

        //Adds every sidebet to each list of sidebets
        for(const sb in mm.sidebet){
            if(mm.sidebet[sb].player == mm.player1){
                player1sb += `${mm.sidebet[sb].bettor1.username} vs. ${mm.sidebet[sb].bettor2.username}, ${mm.sidebet[sb].value}€\n`;
            }else{
                player2sb += `${mm.sidebet[sb].bettor1.username} vs. ${mm.sidebet[sb].bettor2.username}, ${mm.sidebet[sb].value}€\n`;
            }
        }

        //If no sidebet was made
        if(player1sb == ``) player1sb = `No sidebet`;
        if(player2sb == ``) player2sb = `No sidebet`;

        if(mm.player2){
           embed.addFields(
                { name: `${mm.player1.username} wins sidebets`, value: player1sb, inline: true},
                { name: `${mm.player2.username} wins sidebets`, value: player2sb, inline: true}
            ); 
        }

        if(mm.note){
            embed.addField('Note', mm.note, false)
        }
        

        message.channel.send(embed);
    }
}