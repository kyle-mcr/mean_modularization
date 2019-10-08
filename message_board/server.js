const express = require("express");
const app = express();
const flash = require('express-flash');
const mongoose = require("mongoose");
const session = require("express-session");
const CommentSchema = new mongoose.Schema({
    name: { type: String, required: [true, "A name is required"] },
    comment: { type: String, required: [true, "Posts must have content"] },
}, { timestamps: true })
const MessageSchema = new mongoose.Schema({
    name: { type: String, required: [true, "A name is required"] },
    message: { type: String, required: [true, "Messages must have a title"], minlength: [3, "Titles must have at least 3 characters"] },
    comments: [CommentSchema]
}, { timestamps: true })

const Message = mongoose.model('Message', MessageSchema);
const Comment = mongoose.model('comment', CommentSchema);
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
require('./server/config/routes.js')(app)
app.listen(8000, () => console.log("listening on port 8000"));
mongoose.connect('mongodb://localhost/users', { useNewUrlParser: true });