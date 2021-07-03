require("dotenv").config();
const debug = require('debug')('app:startup');
const morgan = require('morgan')
const express = require("express");
const app = express();
const cors = require('cors')
app.use(cors());

app.set('view engine','pug')
app.set('views','./views')

if(app.get('env')==='development'){
  app.use(morgan('tiny'));  
  debug('Starting app in development mode');
}

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Listening on port ${port}`));