module.exports.run = async (client, message, args) => {

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

module.exports.help = {
	name: "mute"
}