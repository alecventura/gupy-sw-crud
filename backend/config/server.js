const express = require('express');
const consign = require('consign');
const cors = require('cors');

const app = express();

app.use(cors());

consign()
  .include('src/routes')
  .then('config/dbConnection.js')
  .then('src/services')
  .then('src/data')
  .then('src/controllers')
  .into(app);


module.exports = app;
