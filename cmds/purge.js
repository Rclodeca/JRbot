module.exports.run = async (client, message, args) => {
	const deleteCount = parseInt(args[0], 10);

	if(!deleteCount || deleteCount < 2 || deleteCount > 100)
		return message.reply("Number must be between 2 and 100 to purge.");

	const fetched = await message.channel.fetchMessages({limit: deleteCount});
	message.channel.bulkDelete(fetched).catch(error => {
		message.reply(`Couldn't delete messages because of: ${error}`)
	});
}

module.exports.help = {
	name: "purge"
}