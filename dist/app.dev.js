"use strict";

require("dotenv").config();

var debug = require('debug')('app:startup');

var morgan = require('morgan');

var express = require("express");

var app = express();

var cors = require('cors');

app.use(cors());
app.set('view engine', 'pug');
app.set('views', './views');

if (app.get('env') === 'development') {
  app.use(morgan('tiny'));
  debug('Starting app in development mode');
}

var port = process.env.PORT || 3001;
app.listen(port, function () {
  return console.log("Listening on port ".concat(port));
});