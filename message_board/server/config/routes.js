const mongoose = require('mongoose'),
    Message = mongoose.model('Message'),
    Comment = mongoose.model('comment');
    const messages = require("./../controllers/messages.js")
module.exports = function (app) {
    app.get('/', (req, res) => {
        messages.index(req, res);
    })
    app.post('/process_message', (req, res) => {
        messages.create_comment(req, res);
    });
    app.post('/process_comment/:id', (req, res) => {
        messages.create_message(req, res);
    })
}   