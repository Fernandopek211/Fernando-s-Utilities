const { MessageEmbed } = require(`discord.js`);
const config = require(`${process.cwd()}/botconfig/config.json`);
var ee = require(`${process.cwd()}/botconfig/embed.json`);
const emoji = require(`${process.cwd()}/botconfig/emojis.json`);
module.exports = {
  name: `reset`,
  aliases: [`hardreset`],
  category: `⚙️ Settings`,
  description: `Resets / Deletes all of the Setups as well as the prefix!`,
  usage: `reset`,
  type: "bot",
  run: async (client, message, args, cmduser, text, prefix) => {
    if (message.author.id !== '795885541090132008') return message.channel.send("<:Error1:913418748105490472> You do not have permission to use this command!");
    
    let es = client.settings.get(message.guild.id, "embed");let ls = client.settings.get(message.guild.id, "language")
    try{
      
      //ask for second yes
      let themsg = message.reply({embeds : [new MessageEmbed()
        .setColor(es.color).setThumbnail(es.thumb ? es.footericon && (es.footericon.includes("http://") || es.footericon.includes("https://")) ? es.footericon : client.user.displayAvatarURL() : null)
        .setFooter(client.getFooter(es))
        .setTitle(eval(client.la[ls]["cmds"]["settings"]["reset"]["variable2"]))
        .setDescription(eval(client.la[ls]["cmds"]["settings"]["reset"]["variable3"]))
      ]}).then((msg) => {
        //wait for answer of the right user
        msg.channel.awaitMessages({filter: m => m.author.id === message.author.id,
          max: 1,
          time: 30 * 1000,
          errors: ['time']
        })
        //after right user answered
        .then(async collected => {
          //and if its yes
          if(collected.first().content.toLowerCase() === `yes`)
          {
            //reset the database of the setup
            client.setups.set(message.guild.id, {
                textchannel: `0`,
                voicechannel: `0`,
                category: `0`,
                message_cmd_info: `0`,
                message_queue_info: `0`,
                message_track_info: `0`
            });
            //reset the settings like prefix djroles and botchannels
            client.settings.set(message.guild.id, {
                prefix: config.prefix,
                djroles: [],
                botchannel: [],
            });
            //send the success message
            return message.reply({embeds : [new MessageEmbed()
              .setColor(es.color).setThumbnail(es.thumb ? es.footericon && (es.footericon.includes("http://") || es.footericon.includes("https://")) ? es.footericon : client.user.displayAvatarURL() : null)
              .setFooter(client.getFooter(es))
              .setTitle(eval(client.la[ls]["cmds"]["settings"]["reset"]["variable4"]))
              .setDescription(eval(client.la[ls]["cmds"]["settings"]["reset"]["variable5"]))
            ]});
          }
          //if an error happens, reply
        }).catch(e => {
          console.log(String(e.stack).grey.yellow)
          return message.reply({embeds :[new MessageEmbed()
            .setColor(es.wrongcolor)
            .setFooter(client.getFooter(es))
            .setTitle(eval(client.la[ls]["cmds"]["settings"]["reset"]["variable6"]))
          ]});
        })
      });
    } catch (e) {
        console.log(String(e.stack).grey.bgRed)
        return message.reply({embeds :[new MessageEmbed()
            .setColor(es.wrongcolor)
						.setFooter(client.getFooter(es))
            .setTitle(client.la[ls].common.erroroccur)
            .setDescription(eval(client.la[ls]["cmds"]["settings"]["reset"]["variable7"]))
        ]});
    }
  }
};
