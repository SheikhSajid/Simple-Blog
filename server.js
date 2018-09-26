const express = require('express');
const path = require('path');
const connection = require('./connection');
const bodyParser = require('body-parser');

const apiRouter = require('./routes/apiRouter');

const PORT = process.env.PORT || 3001;

const app = express();

const publicPath = path.resolve(__dirname, 'client', 'dist');
app.use(express.static(publicPath));

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.redirect('/index.html');
});

app.use('/api', apiRouter);

connection
  .then(db => {
    app.listen(PORT);
  })
  .catch(err => {
    console.error('Connection to mlabs failed. Server NOT running.');
    console.error(err.message);
  });
