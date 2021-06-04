// @ts-nocheck
const Discord = require('discord.js');
const dotenv = require('dotenv');
const fetch = require('node-fetch');

const client = new Discord.Client();
dotenv.config();

const prefix = ';';
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
	if (!msg.content.startsWith(prefix) || msg.author.bot) return;

	const args = msg.content.slice(prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();
	console.log(args, command);

	if (command === 'args-info') {
		if (!args.length) {
			return msg.channel.send(
				`You didn't provide any arguments, ${msg.author}!`
			);
		}

		return msg.channel.send(`Command name: ${command}\nArguments: ${args}`);
	}

	if (command === 'hello') {
		return msg.reply('Yo, Hope you are doing fine!');
	} else if (command === 'clear') {
		msg.channel.messages.fetch().then(messages => {
			let limit = messages.size;
			if (args[0] && parseInt(args[0]) < messages.size) {
				limit = args[0];
			}

			const iterator = messages.values();
			for (let i = 1; i <= limit; i++) {
				const msgToDel = iterator.next().value;
				console.log('deleting message: ', msgToDel.content);
				msgToDel.delete();
			}
		});
	} else if (command === 'inspire') {
		console.log('called');
		getQuote().then(quote => msg.channel.send(quote));
	}
});

client.login(process.env.TOKEN);
