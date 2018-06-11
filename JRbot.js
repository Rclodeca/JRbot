const Discord = require('discord.js');
const { prefix, token, insultsArray } = require('./config.json');
var counter = 0;

const client = new Discord.Client();


client.on("ready", () => {
	console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`);
	console.log("hi");
});

//

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
		case "<:chinkje:441425605293113375>":
			send = "<:chinkje:441425605293113375>";
			break;	
		case "<:hagfag:441419453184344065>":
			send = "<:hagfag:441419453184344065>";
			break;
		case "<@!202954427315781634>":
			send = "<:hagfag:441419453184344065>";
			break;
		case "<@333426438965559317>":
			send = "<:smallchode:441433602907963404>";
			break;
		case "<@141402947266281473>":
			send = "<:Weeaboo:441418967488397322>";
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
	const command = args.shift().toLowerCase();
	try {
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
			message.channel.send("type /server for server info.\ntype /insult {user} to roast them.\ntype /say {message} to make me say something.\ntype /help for command list.\ntype /purge {number} to delete a certain amount of messages.");
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

	}
	catch(error) {
		message.channel.send("You can't do that dummy");
	}
});


client.login(token);


