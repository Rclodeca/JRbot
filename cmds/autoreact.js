module.exports.run = async (client, message, args) => {
	console.log("autoReact is working");
	const { prefix, token, insultsArray, kaije } = require('./../config.json');

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