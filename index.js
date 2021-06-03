const Discord = require('discord.js');
const dotenv = require('dotenv');
const client = new Discord.Client();

dotenv.config();

client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
	if (msg.content === 'ping') {
		msg.reply('Pong!');
	}
});

client.login(process.env.TOKEN);
