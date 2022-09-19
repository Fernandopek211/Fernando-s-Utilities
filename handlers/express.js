const settings = require(`${process.cwd()}/botconfig/settings.json`);

module.exports = async (client) => {
  if (!settings[`express`]) return;
    const express = require('express');
    const app = express();
    const port = 8080;
    app.all('/', (req, res) => {  
      res.send(`Express Activated`);
      res.end();
    });
  }