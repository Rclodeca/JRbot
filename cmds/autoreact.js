const { prefix, token, insultsArray, kaije } = require('./../config.json');
module.exports.run = async (client, message, args) => {

	if(message.author.bot) return;

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
		default:
			return;			
	}
	message.channel.send(send);
}

module.exports.help = {
	name: "autoreact"
}