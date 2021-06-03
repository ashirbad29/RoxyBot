const Discord = require('discord.js');
const dotenv = require('dotenv');
const { prefix } = require('./config.json');
const client = new Discord.Client();

dotenv.config();

client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
	if (msg.content === `${prefix}hello`) {
		msg.reply('Yo, Hope your doing fine!');
	}
});

client.login(process.env.TOKEN);
