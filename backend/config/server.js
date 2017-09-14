const express = require('express');
const consign = require('consign');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());

consign()
  .include('src/routes')
  .then('config/dbConnection.js')
  .then('src/services')
  .then('src/data')
  .then('src/controllers')
  .into(app);


module.exports = app;
