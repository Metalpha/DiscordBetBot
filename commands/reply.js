module.exports = {
    name: 'reply',
    aliases: ['say'],
    description: 'Replies with the text specified in arguments',
    cooldown: 3,
    guildOnly: false,
	args: true,
	usage: '<text>',
	execute(message, args) {
        let reply = '';
		for (const arg in args){
            reply += `${args[arg]} `;
        }

        message.channel.send(reply);
	},
};