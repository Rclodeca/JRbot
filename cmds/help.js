module.exports.run = async (client, message, args) => {
	message.channel.send(
		"type /server for server info.\n" +
		"type /insult {user} to roast them.\n" +
		"type /say {message} to make me say something.\n" +
		"type /help for command list.\n" +
		"type /purge {number} to delete a certain amount of messages.\n" + 
		"type /mute {user} to mute someone.\n" +
		"type /unmute {user} to unmute someone."
	);
}

module.exports.help = {
	name: "help"
}