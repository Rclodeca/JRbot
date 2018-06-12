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
		console.log(`${i + 1}: ${file} loaded.`);
		client.commands.set(properties.help.name, properties);
	});
})


client.on("ready", () => {
	console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`);
	console.log(client.commands);
});


client.on("message", (message) => {
	if(message.author.bot) {
		return;
	}
	var send;
	switch(message.content) {
		case "hello":
			send = "Hi there!";
			break;
		case "💩":
			send = "really?";
			break;
		case kaije:
			send = kaije;
			break;	
		case cameron:
			send = cameron;
			break;
		default:
			counter++;
			if (counter === 100) {
				send = `"${message.content}" :joy: :ok_hand:`;
				counter = 0;
			} 
			else if (counter % 30 === 0) {
				message.react(message.guild.emojis.get('442122186871013396'))
				return;
			}
			else {
				return;
			}
							
	}
	message.channel.send(send);
});


client.on("message", async message => {
	if (!message.content.startsWith(prefix) || message.author.bot || message.channel.type === "dm") return;

	const args = message.content.slice(prefix.length).split(/ +/);
	let command = client.commands.get(args.shift().toLowerCase());

	if (command) {
		command.run(client, message, args);
	}

	/*try {


		if (command === "server") {
    		message.channel.send(`Server name: ${message.guild.name}\nTotal members: ${message.guild.memberCount}`);
		}


		else if (command === "insult") {
			const taggedUser = message.mentions.users.first();
			var rand = insultsArray[Math.floor(Math.random() * insultsArray.length)];

			if (taggedUser.username === "JRbot") {
				message.channel.send("Nice try kid");
			}
			else {
				message.channel.send(`${taggedUser.username} ${rand}`);
			}
		}


		else if(command === "say") {
			const sayMessage = args.join(" ");

			message.delete().catch(error=>{}); 
			message.channel.send(sayMessage);
		}


		else if(command === "help") {
			message.channel.send("type /server for server info.\ntype /insult {user} to roast them.\ntype /say {message} to make me say something.\ntype /help for command list.\ntype /purge {number} to delete a certain amount of messages." +
				"\ntype /mute {user} to mute someone.\ntype /unmute {user} to unmute someone."
				);
		}


		else if(command === "purge") {
			const deleteCount = parseInt(args[0], 10);

			if(!deleteCount || deleteCount < 2 || deleteCount > 100)
				return message.reply("Number must be between 2 and 100 to purge.");

			const fetched = await message.channel.fetchMessages({limit: deleteCount});
			message.channel.bulkDelete(fetched)
			.catch(error => message.reply(`Couldn't delete messages because of: ${error}`));
		}


		else if(command === "vote") {
			const voteMessage = args.join(" ");

			message.channel.send(`VOTE: ${voteMessage}`);
			message.react('👍');
			message.react('👎');

			const filter = (reaction) => reaction.emoji.name === '👍';
			message.awaitReactions(filter, { time: 15000 })
			.then(collected => console.log(`Collected ${collected.size} reactions`))
			.catch(console.error);
		}
  

		else if (command === "mute") {
			if (!message.member.hasPermission("MANAGE_MESSAGES"))
				return message.channel.send("You don't have permission for that.");

			let toMute = message.guild.member(message.mentions.users.first());
			if (!toMute) return message.channel.send("No specified user.");

			if (toMute.highestRole.position >= message.member.highestRole.position) 
				return message.channel.send("Can't mute a member of a higher or equal role.");

			let role = message.guild.roles.find(r => r.name === "Muted");
			if(!role) {
				try {
					role = await message.guild.createRole({
						name: "Muted",
						permissions: []
					});

					message.guild.channels.forEach(async (channel, id) => {
						await channel.overwritePermissions(role, {
							SEND_MESSAGES: false,
							ADD_REACTIONS: false
						});
					});

				} catch(err) {
					console.log(err.stack);
				}
			}

			if(toMute.roles.has(role.id)) 
				return message.channel.send("That user is already muted");

			await toMute.addRole(role);
			message.channel.send("Muted");

			return;
		}


		else if (command === "unmute") {
			if (!message.member.hasPermission("MANAGE_MESSAGES"))
				return message.channel.send("You don't have permission for that.");

			let toMute = message.guild.member(message.mentions.users.first());
			if (!toMute) return message.channel.send("No specified user.");
			if (toMute.highestRole.position > message.member.highestRole.position) 
				return message.channel.send("Can't unmute a member of a higher role.");
			

			let role = message.guild.roles.find(r => r.name === "Muted");
		
			if(!role || !toMute.roles.has(role.id)) 
				return message.channel.send("That user is not muted");

			await toMute.removeRole(role);
			message.channel.send("Unmuted");

			return;
		}



	}
	catch(error) {
		message.channel.send("You can't do that dummy");
		console.log(error.stack);
	}*/
});


client.login(token);


