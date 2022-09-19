const settings = require(`${process.cwd()}/botconfig/settings.json`);

module.exports = (client, info) => {
  if (!settings[`debug-logs`]) return;
  console.log(String(info).blue);
}