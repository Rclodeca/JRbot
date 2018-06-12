module.exports.run = async (client, message, args) => {
	
	if (!message.member.hasPermission("MANAGE_MESSAGES"))
		return message.channel.send("You don't have permission for that.");

	let toMute = message.guild.member(message.mentions.users.first());
	if (!toMute) return message.channel.send("No specified user.");
	if (toMute.highestRole.position > message.member.highestRole.position) 
		return message.channel.send("Can't unmute a member of a higher role.");


	let role = message.guild.roles.find(r => r.name === "Muted");

	if(!role || !toMute.roles.has(role.id)) 
		return message.channel.send("That user is not muted");

	await toMute.removeRole(role);
	message.channel.send("Unmuted");

	return;
}

module.exports.help = {
	name: "vote"
}