const {
	MessageEmbed
} = require("discord.js")
const config = require(`${process.cwd()}/botconfig/config.json`)
var ee = require(`${process.cwd()}/botconfig/embed.json`)
const emoji = require(`${process.cwd()}/botconfig/emojis.json`);
const { MessageButton, MessageActionRow } = require('discord.js')
const { handlemsg } = require(`${process.cwd()}/handlers/functions`)
module.exports = {
	name: "developer",
	category: "🔰 Info",
	aliases: ["dev", "fern"],
	description: "Shows Information about the Developer",
	usage: "developer",	
	type: "bot",
	run: async (client, message, args, cmduser, text, prefix) => {
    if ("1" !== message.author.id)
      return message.channel.send({embeds : [new MessageEmbed()
        .setColor(`RED`)
        .setTitle(`<:Error1:913418748105490472> Error | You are not allowed to run this commands`)
        .setDescription(`> **You have to only owner this** \`Fernandopek21#6236\``)
      ]});
    
		let es = client.settings.get(message.guild.id, "embed");let ls = client.settings.get(message.guild.id, "language")
		
	}
}
//Soon coding