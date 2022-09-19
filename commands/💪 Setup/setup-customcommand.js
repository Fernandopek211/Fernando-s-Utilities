var {
  MessageEmbed
} = require(`discord.js`);
var Discord = require(`discord.js`);
var config = require(`${process.cwd()}/botconfig/config.json`);
var ee = require(`${process.cwd()}/botconfig/embed.json`);
var emoji = require(`${process.cwd()}/botconfig/emojis.json`);
var {
  databasing,
  edit_msg,
  send_roster
} = require(`${process.cwd()}/handlers/functions`);
const { MessageButton, MessageActionRow, MessageSelectMenu } = require('discord.js')
module.exports = {
  name: "setup-customcommand",
  category: "💪 Setup",
  aliases: ["setupcustomcommand","setupcustomcommands", "customcommand-setup", "setup-customcommands"],
  cooldown: 5,
  usage: "setup-customcommand  --> Follow the Steps",
  description: "Define Custom Commands, Create Custom Commands and Remove Custom Commands --> \"Custom Command Names, that sends Custom Messages\"",
  memberpermissions: ["ADMINISTRATOR"],
  type: "system",
  run: async (client, message, args, cmduser, text, prefix) => {
    
    let es = client.settings.get(message.guild.id, "embed");let ls = client.settings.get(message.guild.id, "language")
    try {
      var originalowner = message.author.id;
      let timeouterror;
      let NumberEmojiIds = getNumberEmojis().map(emoji => emoji?.replace(">", "").split(":")[2])
      first_layer()
      async function first_layer(){
        let menuoptions = [{
            value: "Create Custom Command",
            description: `Create a Custom Command of your Choice`,
            emoji: "✅"
          },
          {
            value: "Delete Custom Command",
            description: `Delete one of the Custom Command(s)`,
            emoji: "❌"
          },
          {
            value: "Show Settings",
            description: `Show the all Custom Commands!`,
            emoji: "📑"
          }
        ]
        //define the selection
        let Selection = new MessageSelectMenu()
          .setCustomId('MenuSelection') 
          .setMaxValues(1) //OPTIONAL, this is how many values you can have at each selection
          .setMinValues(1) //OPTIONAL , this is how many values you need to have at each selection
          .setPlaceholder('Click me to setup the Automated Embed System!') 
          .addOptions(
          menuoptions.map(option => {
            let Obj = {
              label: option.label ? option.label.substr(0, 50) : option.value.substr(0, 50),
              value: option.value.substr(0, 50),
              description: option.description.substr(0, 50),
            }
          if(option.emoji) Obj.emoji = option.emoji;
          return Obj;
         }))
        
        //define the embed
        let MenuEmbed = new Discord.MessageEmbed()
        .setColor(es.color)
        .setAuthor('Custom Command Setup', 'https://images-ext-1.discordapp.net/external/HF-XNy3iUP4D95zv2fuTUy1csYWuNa5IZj2HSCSkvhs/https/emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/google/298/flexed-biceps_1f4aa.png', 'https://discord.gg/SzP9BdFPYF')
        .setDescription(eval(client.la[ls]["cmds"]["setup"]["setup-ticket"]["variable2"]))
        //send the menu msg
        let menumsg = await message.reply({embeds: [MenuEmbed], components: [new MessageActionRow().addComponents(Selection)]})

        //Create the collector
        const collector = menumsg.createMessageComponentCollector({ 
          filter: i => i?.isSelectMenu() && i?.message.author.id == client.user.id && i?.user,
          time: 90000
        })
        //Menu Collections
        collector.on('collect', menu => {
          if (menu?.user.id === cmduser.id) {
            collector.stop();
            let menuoptiondata = menuoptions.find(v=>v.value == menu?.values[0])
            if(menu?.values[0] == "Cancel") return menu?.reply(eval(client.la[ls]["cmds"]["setup"]["setup-ticket"]["variable3"]))
            menu?.deferUpdate();
            used1 = true;
            handle_the_picks(menu?.values[0], menuoptiondata)
          }
          else menu?.reply({content: `<:Error1:913418748105490472> You are not allowed to do that! Only: <@${cmduser.id}>`, ephemeral: true});
        });
        //Once the Collections ended edit the menu message
        collector.on('end', collected => {
          menumsg.edit({embeds: [menumsg.embeds[0].setDescription(`~~${menumsg.embeds[0].description}~~`)], components: [], content: `${collected && collected.first() && collected.first().values ? `<a:success:902091899802910760> **Selected: \`${collected ? collected.first().values[0] : "Nothing"}\`**` : "❌ **NOTHING SELECTED - CANCELLED**" }`})
        });
      }
      async function handle_the_picks(optionhandletype, menuoptiondata) {
        switch (optionhandletype){ // return message.reply
          case "Create Custom Command": {
            if(client.customcommands.get(message.guild.id, "commands").length > 24)
              return message.reply({embeds: [new Discord.MessageEmbed()
                .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-customcommand"]["variable5"]))
                .setColor(es.wrongcolor)
                .setDescription(`You cannot have more then **25** Custom Commands`.substr(0, 2000))
                .setFooter(client.getFooter(es))
              ]});
            tempmsg = await message.reply({embeds: [new Discord.MessageEmbed()
              .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-customcommand"]["variable6"]))
              .setColor(es.color)
              .setDescription(eval(client.la[ls]["cmds"]["setup"]["setup-customcommand"]["variable7"]))
              .setFooter(client.getFooter(es))]
            })
            await tempmsg.channel.awaitMessages({filter: m => m.author.id === message.author.id,
                max: 1,
                time: 120000,
                errors: ["time"]
              })
            .then(async collected => {
              var msg = collected.first().content.split(" ")[0];
              if (msg) {
                  var thecustomcommand = {
                    name: msg,
                    output: "ye",
                    embeds: false,
                  }
                tempmsg = await message.reply({embeds: [new Discord.MessageEmbed()
                  .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-customcommand"]["variable8"]))
                  .setColor(es.color)
                  .setDescription(eval(client.la[ls]["cmds"]["setup"]["setup-customcommand"]["variable9"]))
                  .setFooter(client.getFooter(es))
                ]})
                await tempmsg.channel.awaitMessages({filter: m => m.author.id === message.author.id,
                    max: 1,
                    time: 120000,
                    errors: ["time"]
                  })
                  .then(async collected => {
                    var msg = collected.first().content;
                    if (msg) {
                        thecustomcommand.output = msg;
                        var ttempmsg = await message.reply({embeds: [new Discord.MessageEmbed()
                          .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-customcommand"]["variable10"]))
                          .setColor(es.color)
                          .setDescription(eval(client.la[ls]["cmds"]["setup"]["setup-customcommand"]["variable11"]))
                          .setFooter(client.getFooter(es))
                        ]})
                        try{
                          ttempmsg.react("✅")
                          ttempmsg.react("❌")
                        }catch{

                        }
                        await ttempmsg.awaitReactions({ filter: (reaction, user) => user == originalowner, 
                            max: 1,
                            time: 90000,
                            errors: ["time"]
                          })
                          .then(collected => {
                            var reaction = collected.first();
                            if (reaction) {
                              if(reaction.emoji?.name == "✅") {
                                thecustomcommand.embed = true;
                              } else {
                                thecustomcommand.embed = false;
                              }
                              client.customcommands.push(message.guild.id, thecustomcommand, "commands")

                              message.reply({embeds: [new Discord.MessageEmbed()
                                .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-customcommand"]["variable12"]))
                                .setColor(es.color)
                                .setDescription(eval(client.la[ls]["cmds"]["setup"]["setup-customcommand"]["variable13"]))
                                .setFooter(client.getFooter(es))
                              ]})

                              if(reaction.emoji?.name == "✅") {
                                message.reply({embeds: [new Discord.MessageEmbed()
                                  .setColor(es.color)
                                  .setDescription(thecustomcommand.output)
                                  .setFooter(client.getFooter(es))
                                ]})
                              } else {
                                message.reply(thecustomcommand.output)
                              }
                              
                
                            } else {
                              throw "<:Error1:913418748105490472> you didn't ping a valid Channel"
                            }
                          })
                          .catch(e => {
                            console.log(e.stack ? String(e.stack).grey : String(e).grey)
                            timeouterror = e;
                          })
                        if (timeouterror)
                          return message.reply({embeds: [new Discord.MessageEmbed()
                            .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-customcommand"]["variable14"]))
                            .setColor(es.wrongcolor)
                            .setDescription(`Cancelled the Operation!`.substr(0, 2000))
                            .setFooter(client.getFooter(es))
                          ]});

                    } else {
                      throw "<:Error1:913418748105490472> you didn't ping a valid Channel"
                    }
                  })
                  .catch(e => {
                    console.log(e.stack ? String(e.stack).grey : String(e).grey)
                    timeouterror = e;
                  })
                if (timeouterror)
                  return message.reply({embeds: [new Discord.MessageEmbed()
                    .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-customcommand"]["variable15"]))
                    .setColor(es.wrongcolor)
                    .setDescription(`Cancelled the Operation!`.substr(0, 2000))
                    .setFooter(client.getFooter(es))
                  ]});


              } else {
                throw "<:Error1:913418748105490472> you didn't ping a valid Channel"
              }
            })
            .catch(e => {
              console.log(e.stack ? String(e.stack).grey : String(e).grey)
              return message.reply({embeds: [new Discord.MessageEmbed()
                .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-customcommand"]["variable16"]))
                .setColor(es.wrongcolor)
                .setDescription(`Cancelled the Operation!`.substr(0, 2000))
                .setFooter(client.getFooter(es))
              ]});
            })
          } break;
          case "Delete Custom Command": {
            let cuc = client.customcommands.get(message.guild.id, "commands");
            if(!cuc || cuc.length < 1) return message.reply("<:Error1:913418748105490472> There are no Custom Commands")
            let menuoptions = [
            ]
            cuc.forEach((cc, index)=>{
              menuoptions.push({
                value: `${cc.name}`.substr(0, 25),
                description: `Delete ${cc.name} ${cc.embed ? "[✅ Embed]" : "[❌ Embed]"}`.substr(0, 50),
                emoji: NumberEmojiIds[index + 1]
              })
            })
            //define the selection
            let Selection = new MessageSelectMenu()
              .setCustomId('MenuSelection') 
              .setMaxValues(cuc.length) //OPTIONAL, this is how many values you can have at each selection
              .setMinValues(1) //OPTIONAL , this is how many values you need to have at each selection
              .setPlaceholder('Select all Custom Commands which should get deleted') 
              .addOptions(
              menuoptions.map(option => {
                let Obj = {
                  label: option.label ? option.label.substr(0, 50) : option.value.substr(0, 50),
                  value: option.value.substr(0, 50),
                  description: option.description.substr(0, 50),
                }
              if(option.emoji) Obj.emoji = option.emoji;
              return Obj;
             }))
            
            //define the embed
            let MenuEmbed = new Discord.MessageEmbed()
            .setColor(es.color)
            .setAuthor('Custom Command Setup', 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/google/298/flexed-biceps_1f4aa.png', 'https://discord.gg/SzP9BdFPYF')
            .setDescription(`**Select all \`Custom Commands\` which should get __deleted__**`)
            //send the menu msg
            let menumsg = await message.reply({embeds: [MenuEmbed], components: [new MessageActionRow().addComponents(Selection)]})
            //Create the collector
            const collector = menumsg.createMessageComponentCollector({ 
              filter: i => i?.isSelectMenu() && i?.message.author.id == client.user.id && i?.user,
              time: 90000
            })
            //Menu Collections
            collector.on('collect', menu => {
              if (menu?.user.id === cmduser.id) {
                collector.stop();
                for(const value of menu?.values){
                  client.customcommands.remove(message.guild.id, d => String(d.name).substr(0, 25).toLowerCase() == String(value).toLowerCase(), "commands")
                }
                return message.reply({embeds: [new Discord.MessageEmbed()
                  .setTitle(`Deleted ${menu?.values.length} Custom Commands!`)
                  .setDescription(`There are now \`${cuc.length - menu?.values.length} Custom Commands\` left!`)
                  .setColor(es.color)
                  .setFooter(client.getFooter(es))
                ]});
              }
              else menu?.reply({content: `<:Error1:913418748105490472> You are not allowed to do that! Only: <@${cmduser.id}>`, ephemeral: true});
            });
            //Once the Collections ended edit the menu message
            collector.on('end', collected => {
              menumsg.edit({embeds: [menumsg.embeds[0].setDescription(`~~${menumsg.embeds[0].description}~~`)], components: [], content: `${collected && collected.first() && collected.first().values ? `<a:success:902091899802910760> **Selected: \`${collected.first().values.length} Commands\`**` : "❌ **NOTHING SELECTED - CANCELLED**" }`})
            });
          } break;
          case "Show Settings": {
            let cuc = client.customcommands.get(message.guild.id, "commands");
            var embed = new Discord.MessageEmbed()
            .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-customcommand"]["variable22"]))
            .setColor(es.color)
            .setFooter(ee.footertext, es.footericon && (es.footericon.includes("http://") || es.footericon.includes("https://")) ? es.footericon : client.user.displayAvatarURL())
            var embed2 = new Discord.MessageEmbed()
            .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-customcommand"]["variable22"]))
            .setColor(es.color)
            .setFooter(ee.footertext, es.footericon && (es.footericon.includes("http://") || es.footericon.includes("https://")) ? es.footericon : client.user.displayAvatarURL())
            var sendembed2 = false;
            for(let i = 0; i < cuc.length; i++){
              try{
                var string = `${cuc[i].output}`;
                if(string.length > 250) string = string.substr(0, 250) + " ..."
                if(i > 13){
                  sendembed2 = true;
                  embed2.addField(`<:arrow:905708227998670868> \`${cuc[i].name}\` | ${cuc[i].embed ? "✅ Embed" : "❌ Embed"}`, ">>> "+ string)
                } else 
                embed.addField(`<:arrow:905708227998670868> \`${cuc[i].name}\` | ${cuc[i].embed ? "✅ Embed" : "❌ Embed"}`, ">>> "+ string)
              }catch (e){
                console.log(e.stack ? String(e.stack).grey : String(e).grey)
              }
            }
            if(sendembed2)
              await message.reply({embeds: [embed, embed2]})
            else
              await message.reply({embeds: [embed]})
          } break;
        }
      }
    } catch (e) {
      console.log(String(e.stack).grey.bgRed)
      return message.reply({embeds: [new MessageEmbed()
        .setColor(es.wrongcolor).setFooter(client.getFooter(es))
        .setTitle(client.la[ls].common.erroroccur)
        .setDescription(`\`\`\`${String(e.message ? e.message : e).substr(0, 2000)}\`\`\``)
      ]});
    }
  },
};


 function getNumberEmojis() {
  return [
    "<:Number_0:1001441213439807528>",
    "<:Number_1:1001441215415337010>",
    "<:Number_2:1001441217734774785>",
    "<:Number_3:1001441219899047967>",
    "<:Number_4:1001441221614522440>",
    "<:Number_5:1001441223350960230>",
    "<:Number_6:1001441225682976808>",
    "<:Number_7:1001441227469754491>",
    "<:Number_8:1001441229541748836>",
    "<:Number_9:1001441231022333953>",
    "<:Number_10:1001441233643769856>",
    "<:Number_11:1001441235631874098>",
    "<:Number_12:1001441237745799228>",
    "<:Number_13:1001441239738093608>",
    "<:Number_14:1001441241738772583>",
    "<:Number_15:1001441244913860629>",
    "<:Number_16:1001441247224934502>",
    "<:Number_17:1001441249238196225>",
    "<:Number_18:1001441251905769482>",
    "<:Number_19:1001441254585938000>",
    "<:Number_20:1001441256997666866>",
    "<:Number_21:1001441259539419176>",
    "<:Number_22:1001441261749817364>",
    "<:Number_23:1001441263825997854>",
    "<:Number_24:1001441266090922064>",
    "<:Number_25:1001441268234203168>"
  ]
}