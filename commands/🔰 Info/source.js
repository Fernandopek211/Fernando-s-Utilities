const {
  Client,
  Message,
  MessageEmbed
} = require('discord.js');

module.exports = {
  name: "source",
  aliases: ["code", "src", "github", "replit"],
  usage: "",
  description: "",
  category: "🔰 Info",
  cooldown: 0,
  userPermissions: "",
  botPermissions: "",
  ownerOnly: false,
  toggleOff: false,

  /**
   * @param {Client} client 
   * @param {Message} message
   * @param {String[]} args
   */

  run: async (client, message, args, cmduser, text, prefix) => {
    try {

      return message.channel.send({
        embeds: [new MessageEmbed()
          .setColor(ee.color)
          .setFooter({
            text: `Fernando's Utilities | Made By: https://discord.gg/SzP9BdFPYF`,
            iconURL: client.user.displayAvatarURL({ dynamic: true })
          })
          .setAuthor({
            name: `Fernando's Utilities Source Code`,
            iconURL: client.user.displayAvatarURL({ dynamic: true })
          })
          .setDescription(`**[This Bot is Made by: \`Fernandopek21#6236\`](https://discordapp.com/users/795885541090132008/)**`)
          .setFields({
            name: `Discord.js`,
            value: `[\`v13.5.0\`](https://discord.js.org/)`,
            inline: true
          }, {
              name: `Node.js`,
              value: `[\`v16.13.1\`](https://nodejs.org/en/)`,
              inline: true
            }, {
              name: `Enmap`,
              value: `[\`v5.8.7\`](https://enmap.evie.dev/api)`,
              inline: true
            }, {
              name: `MongoDB`,
              value: `[\`v6.0.11\`](https://mongoosejs.com/)`,
              inline: true
            }, {
              name: `Source Code`,
              value: `Don't just use the source for yourself, Please [invite me](https://discord.com/api/oauth2/authorize?client_id=941305934809010186&permissions=8&scope=bot%20applications.commands) too in your server!`,
            }, {
              name: `Github Fork`,
              value: `Soon`,
              inline: true
            }, {
              name: `Replit Fork`,
              value: `[Click Me to Fork From Replit](https://replit.com/@OxyFernando/Fernandos-Utilities-Updated?v=1)`,
              inline: true
            })]
      });


    } catch (e) {
        console.log(String(e.stack).grey.bgRed)
		return message.reply({embeds: [new MessageEmbed()
		  .setColor(es.wrongcolor)
		  .setFooter(client.getFooter(es))
		  .setTitle(client.la[ls].common.erroroccur)
		  .setDescription(eval(client.la[ls]["cmds"]["info"]["color"]["variable2"]))
		]});
    }
  }
}