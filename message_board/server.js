const express = require("express");
const app = express();
const path = require('path');
const flash = require('express-flash');
const mongoose = require("mongoose");
const session = require("express-session");

app.use(express.static(__dirname + "/static"));
app.use(express.urlencoded({ extended: true }));
app.use(flash());
app.use(session({
    secret: 'keyboardkitteh',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}))
app.set('view engine', 'ejs');
app.set('views', __dirname + '/client/views');

require('./server/config/mongoose.js');
require('./server/config/routes.js')(app);
app.listen(8000, () => console.log("listening on port 8000"));