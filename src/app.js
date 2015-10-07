const express = require('express');
const app = express();
const appPort = require('../abackend.conf.json').server_port;

app.get('/', (req, res) => {
  res.send('yahalo! GET!');
});

app.post('/', (req, res) => {
  res.send('yahalo! POST!');
});

const server = app.listen(appPort, () => {
  const host = server.address().address;
  const port = server.address().port;
  console.log(`abackend listening at ${host}:${port}`);
});

export default server;
