const {
  MessageEmbed
} = require("discord.js");
const config = require(`${process.cwd()}/botconfig/config.json`);
var ee = require(`${process.cwd()}/botconfig/embed.json`);
const emoji = require(`${process.cwd()}/botconfig/emojis.json`);
const {
  duration
} = require(`${process.cwd()}/handlers/functions`)
const moment = require("moment")
require("moment-duration-format");
const os = require('os')
const si = require('systeminformation');
let cpuStat = require("cpu-stat");
const pretty = require('prettysize');
const { cpu } = require('node-os-utils');
module.exports = {
  name: "powerinfo",
  description: "show all bot hosting status",
  run: async (client, interaction, cmduser, es, ls, prefix, player, message) => {
    
    const duration1 = moment.duration(message.client.uptime).format(" D [days], H [hrs], m [mins], s [secs]");
        const cpu = await si.cpu();
        let ccount = client.channels.cache.size;
        let scount = client.guilds.cache.size;
        let mcount = 0;
    client.guilds.cache.forEach((guild) => {
    mcount += guild.memberCount 

})
   
    
    try {
      let date = new Date()
      let timestamp = date.getTime() - Math.floor(client.uptime);
      let diskdata = await si.fsSize();
      let netdata = await si.networkStats();
      let memdata = await si.mem();
      let osdata = await si.osInfo();
      
      let cpudata = await si.cpu();
      let uptime = await os.uptime();
     interaction.reply({embeds: [new MessageEmbed()
        .setColor(`#00ffff`)
        .setTitle('BOT HOSTING SYSTEM')
        .setURL(`https://discord.gg/SzP9BdFPYF`)
        .setAuthor(`Fernando's Utilities Information`, `https://cdn.discordapp.com/attachments/963774142103035934/1001817326506741811/Fernandos_Utilities.png?width=180&height=180`, `https://discord.gg/SzP9BdFPYF`)
        .setThumbnail('https://cdn.discordapp.com/attachments/963774142103035934/1001817326506741811/Fernandos_Utilities.png?width=180&height=180')
        .setFooter(client.getFooter(es))
        .setImage(`https://share.creavite.co/crBMHBnzdlh2PXfo.gif`)
        .addField(`<:arrow:905708227998670868> **Stats System**`, `\`\`\`yml\n❯ Ping: ${client.ws.ping}ms\n❯ Bot Ping: ${Math.floor((Date.now() - message.createdTimestamp) - 2 * Math.floor(client.ws.ping))}ms\n❯ Platfrom: ${os.type}\n❯ Cores: ${cpu.cores}\n❯ RAM: ${(process.memoryUsage().heapUsed/1024/1024).toFixed(0)}\n❯ DISK: ${pretty(diskdata[0].size)} / ${pretty(diskdata[0].used)}\n❯ Model: ${os.cpus()[0].model}\n❯ Speed: ${os.cpus()[0].speed} MHz\n❯ PID: ${process.pid}\n❯ Array Buffer: ${Math.round(process.memoryUsage().rss / 1024 / 1024)}\n❯ External: ${Math.round(process.memoryUsage().external / 1024 / 1024)}\`\`\``)
        .addField(`**<:arrow:905708227998670868> Memory System**`,`\`\`\`yml\n❯ Total Memory: ${(os.totalmem() / 1024 / 1024).toFixed(2)} Mbps\n❯ Free Memory: ${(os.freemem() / 1024 / 1024).toFixed(2)} Mbps\n❯ Heap Total: ${(process.memoryUsage().heapTotal / 1024 / 1024).toFixed(2)} Mbps\n❯ Heap Usage: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} Mbps\n❯ Heap Used: ${Math.round(process.memoryUsage().heapUsed / 1024 / 1024)} Mbps\`\`\``)
        .addField(`**<:arrow:905708227998670868> Network**`, `\`\`\`yml\n❯ Ping: ${Math.round(netdata[0].ms)}ms\n❯ Up: ${pretty(netdata[0].tx_sec)}\n❯ Down: ${pretty(netdata[0].rx_sec)}\n❯ Total Up: ${pretty(netdata[0].tx_bytes)}\n❯ Total Down: ${pretty(netdata[0].rx_bytes)}\`\`\``)
        .addField(`**<:arrow:905708227998670868> Bot Stats**`, `\`\`\`yml\n❯ Node.js: ${process.version}\n❯ Discord.js: v13.8.0\n❯ Enmap: v5.8.4\`\`\``)
        .addField(`<:arrow:905708227998670868> **Developer**`, `\`\`\`yml\n❯ Name: Fernandopek21#6236\n❯ ID: [795885541090132008]\`\`\``)
        .addField(`<:arrow:905708227998670868> Important Links`, `> [Join Get from guild server](https://discord.gg/SzP9BdFPYF)\n > [Add Invite Bot](https://discord.com/api/oauth2/authorize?client_id=941305934809010186&permissions=8&scope=applications.commands%20bot)`)
        ]}
      );
    } catch (e) {
      console.log(String(e.stack).grey.bgRed)
    }
  }
}