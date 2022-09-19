const config = require(`${process.cwd()}/botconfig/config.json`);
const {
  Client,
  Message,
  MessageEmbed
} = require('discord.js');
const glob = require('glob');

module.exports = {
  name: "restartrobot",
  category: "👑 Owner",
  aliases: ["restart"],
  cooldown: 5,
  usage: "restartrobot",
  type: "bot",
  description: "Restarts the Bot, if it`s not working as intended or so..",

  /**
   * @param {Client} client 
   * @param {Message} message
   * @param {String[]} args
   */

  run: async (client, message, args, cmduser, text, prefix) => {
    try {
      const msg = await message.reply({ embeds:[new MessageEmbed()
        .setColor(`#FF0000`)
        .setDescription(`Bot is Resetting...`)]});
      await client.destroy();
      await client.login(process.env.token);
      await msg.edit({ embeds:[new MessageEmbed()
        .setColor(`#FF0000`)
        .setTitle(`<a:success:902091899802910760> Successfully Resetted`)]});
    } catch (e) {
      console.log(String(e.stack).dim.bgRed)
      return message.channel.send({embeds : [new MessageEmbed()
        .setColor(`#FF0000`)
        .setFooter(client.getFooter(es))
        .setTitle(`<:Error1:913418748105490472> An error occurred`)
        .setDescription(`\`\`\`${e.message ? e.message : e.stack ? String(e.stack).substr(0, 2000) : String(e).substr(0, 2000)}\`\`\``)
      ]});
    }
  },
};