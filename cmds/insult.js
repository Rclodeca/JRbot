module.exports.run = async (client, message, args) => {
	const { insultsArray } = require('./../config.json');

	const taggedUser = message.mentions.users.first();
			var rand = insultsArray[Math.floor(Math.random() * insultsArray.length)];

			if (!taggedUser) 
				return message.channel.send("No user specified");
			if (taggedUser.username === "JRbot") 
				return message.channel.send("Nice try");
			
			message.channel.send(`${taggedUser.username} ${rand}`);
}

module.exports.help = {
	name: "insult"
}