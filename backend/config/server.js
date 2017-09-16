const express = require('express');
const consign = require('consign');
const cors = require('cors');

const app = express();

app.use(cors());
app.disable('etag');

consign()
  .include('src/routes')
  .then('config/dbConnection.js')
  .then('config/constants.js')
  .then('src/services')
  .then('src/data')
  .then('src/controllers')
  .into(app);


module.exports = app;
