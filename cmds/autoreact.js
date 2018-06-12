module.exports.run = async (client, message, args) => {
	console.log("autoReact is working");
	const { prefix, token, insultsArray, kaije, cameron } = require('./../config.json');

	message.channel.send("hi");

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
}

module.exports.help = {
	name: "autoreact"
}