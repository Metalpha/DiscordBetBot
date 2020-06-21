module.exports = {
	name: 'ping',
    description: 'Ping!',
    cooldown: 5,
    guildOnly: false,
	args: false,
	execute(message, args) {
		message.channel.send('Pong.');
	},
};