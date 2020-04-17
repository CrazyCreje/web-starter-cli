/*
This template file was taken from this tutorial:
https://dev.to/loujaybee/using-create-react-app-with-express
*/

const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 8080;

app.use(express.static(path.join(__dirname, 'build')));

app.get('/ping', (req, res) => {
 return res.send('pong');
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
