const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const api = require('./routes/api');
const passport = require('passport');
const passportlocal = require('passport-local');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const path = require('path');
const db = require('./db');

// initialize the app
let app = express();

// add middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}))

// Serve up static assets
app.use(express.static('client/build'));

// configure cookies
app.use(cookieParser('topsecret'));

// store session config
app.use(session({
  secret: 'topsecret',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true },
}));

// add the routes to the app
app = api(app);

// add session middleware
app.set('trust proxy', 1);

// specify the port to use
var PORT = process.env.PORT || 3001;

app.listen(PORT, function() {
  console.log('Server listening on: http://localhost:' + PORT);
});