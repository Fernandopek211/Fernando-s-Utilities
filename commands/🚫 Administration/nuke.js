const { Client, Message, MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
  name: "nuke",
  aliases: ["bomb"],
  categories: "🚫 Administration",
  userpremissions: ["ADMINISTRATOR"],
  description: "Nuke channel your channel",
  cooldown: 5,
  usage: "",
  memberpermissions: ["ADMINISTRATOR"],
    
run: async (client, message, args) => {
    let nukeButton = new MessageActionRow().addComponents(
      new MessageButton().setCustomId("YES").setStyle("SUCCESS").setLabel("Yes"),

      new MessageButton().setCustomId("NO").setStyle("DANGER").setLabel("No")
    );

    message.reply({
      content: "You Are Sure Nuked That Channel For Click with Button?",
      components: [nukeButton],
    });
    const filter = (interaction) => {
      if (interaction.user.id === message.author.id) return true;
      return interaction.reply({
        content: "Only owner this buttons to use this button",
        ephemeral: true,
      });
    };

    const collector = message.channel.createMessageComponentCollector({
      filter,
      max: 1,
    });

    collector.on("collect", (buttonInteraction) => {
      const id = buttonInteraction.customId;

      if (id === "YES") {
        message.channel.clone().then((ch) => {
          let reason = args.join(" ") || "No Reason";
          let embed = new MessageEmbed().setTitle("**Channel Succesfuly Nuked**").setColor("#ffa500").setDescription(reason).setImage("https://tenor.com/view/explosion-mushroom-cloud-atomic-bomb-bomb-boom-gif-4464831");
          ch.setParent(message.channel.parent);
          ch.setPosition(message.channel.position);
          message.channel.delete().then(() => {
            ch.send({ embeds: [embed] }).then((msg) => {
              setTimeout(() => msg.delete(), 10000);
            });
          });
        });
      }
      if (id === "NO") {
        return message.channel.bulkDelete("5", true).then(message.react("thumbsup"));
      }
    });
  },
};