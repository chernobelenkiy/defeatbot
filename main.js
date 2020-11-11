const config = require('dotenv').config().parsed;
const fs = require('fs');
const Discord = require('discord.js');
let client = new Discord.Client();
client.commands = new Discord.Collection();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

client.on('message', message => {
    if (!message.content.startsWith(config.PREFIX) || message.author.bot) return;

	const args = message.content.slice(config.PREFIX.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    console.log(client.commands.has(command))

    if (!client.commands.has(command)) return;

    try {
        client.commands.get(command).execute(message, args);
    } catch (error) {
        console.error(error);
        message.reply('there was an error trying to execute that command!');
    }
});

client.login(config.TOKEN);