const Discord = require('discord.js');
const { prefix, token, insultsArray, kaije, cameron } = require('./config.json');
const fs = require("fs");
var counter = 0;

const client = new Discord.Client({disableEveryone: true});
client.commands = new Discord.Collection();


fs.readdir("./cmds/", (err, files) => {
	if (err) console.error(err);

	let jsfiles = files.filter(f => f.split(".").pop() === "js");
	if(jsfiles.length <= 0){
		console.log("No commands to load.");
		return;
	}
	console.log(`Loaded ${jsfiles.length} commands.`);

	jsfiles.forEach((file, i) => {
		let properties = require(`./cmds/${file}`);
		console.log(`${i + 1}: ${file}`);
		client.commands.set(properties.help.name, properties);
	});
})


client.on("ready", () => {
	console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`);
	//console.log(client.commands);
});


client.on("message", async message => {
try{
	client.commands.get("autoreact").run(client, message,);
} catch(err) {
	console.log(err);
}

	
});


client.on("message", async message => {
	if (!message.content.startsWith(prefix) || message.author.bot || message.channel.type === "dm") return;

	const args = message.content.slice(prefix.length).split(/ +/);
	let command = client.commands.get(args.shift().toLowerCase());


	try {
		if (command) command.run(client, message, args);
	}
	catch(error) {
		message.channel.send("You can't do that.");
		console.log(error.stack);
	}
});


client.login(token);


