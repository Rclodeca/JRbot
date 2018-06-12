module.exports.run = async (client, message, args) => {
	const sayMessage = args.join(" ");

	message.delete().catch(error=>{}); 
	message.channel.send(sayMessage);
}

module.exports.help = {
	name: "say"
}