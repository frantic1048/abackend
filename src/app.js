const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('yahalo! GET!');
});

app.post('/', (req, res) => {
  res.send('yahalo! POST!');
});

const server = app.listen(3999, () => {
  const host = server.address().address;
  const port = server.address().port;
  console.log(`yooooo app listening at ${host}:${port}`);
});

export default server;
