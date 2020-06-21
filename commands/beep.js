module.exports = {
	name: 'beep',
	description: 'Beep!',
    cooldown: 3,
    guildOnly: false,
    args: false,
	execute(message, args) {
		message.channel.send('Boop.');
	},
};