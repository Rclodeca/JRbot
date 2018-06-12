module.exports.run = async (client, message, args) => {
	const sayMessage = args.join(" ");

	if(!sayMessage) return message.reply("You didn't type anything");

	message.delete().catch(error=>{}); 
	message.channel.send(sayMessage);
}

module.exports.help = {
	name: "say"
}