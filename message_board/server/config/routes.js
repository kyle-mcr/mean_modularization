const mongoose = require('mongoose'),
    Message = mongoose.model('Message'),
    Comment = mongoose.model('comment')
module.exports = function (app) {
app.get('/', (request, response) => {
    console.log(request.body)
    Message.find()
        .then(messagedata => {
            response.render('index', { messages: messagedata });
        })
        .catch(err => res.json(err));
})
app.post('/process_message', (req, res) => {
    const message = new Message(req.body)
    message.save()
        .then(() => res.redirect('/'))
        .catch(err => {
            console.log("We have an error!", err);
            // adjust the code below as needed to create a flash message with the tag and content you would like
            for (var key in err.errors) {
                req.flash('registration', err.errors[key].message);
            }
            res.redirect('/');
        });
});
app.post('/process_comment/:id', (req, res) => {
    const { id } = req.params;
    Comment.create(req.body, function (err, newcomment) {
        if (err) {
            res.json(err);
        }
        else {
            Message.findByIdAndUpdate({ _id: id }, { $push: { comments: newcomment } }, function (err, messageupdate) {
                if (err) {
                    res.json(err);
                }
                else {
                    res.redirect('/');
                }
            })
        }
    })

})
}   