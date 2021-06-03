const Discord = require('discord.js');
const dotenv = require('dotenv');
// const getQuote = require('./apiCalls.js');
const fetch = require('node-fetch');

const { prefix } = require('./config.json');
const client = new Discord.Client();

dotenv.config();

const getQuote = () => {
	// @ts-ignore
	return fetch('https://zenquotes.io/api/random')
		.then(res => res.json())
		.then(data => {
			return `>>> *${data[0].q} - ${data[0].a}*`;
		});
};

client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
	if (msg.content === `${prefix}hello`) {
		msg.reply('Yo, Hope you are doing fine!');
	} else if (msg.content === `${prefix}clear`) {
		// console.log('hello');
		msg.channel.messages.fetch().then(messages => {
			messages.forEach(m => {
				m.delete();
			});
		});
	} else if (msg.content === `${prefix}inspire`) {
		console.log('called');
		// @ts-ignore
		getQuote().then(quote => msg.channel.send(quote));
	}
});

client.login(process.env.TOKEN);
