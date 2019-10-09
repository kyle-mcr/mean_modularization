const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    name: { type: String, required: [true, "A name is required"] },
    comment: { type: String, required: [true, "Posts must have content"] },
}, { timestamps: true })
const MessageSchema = new mongoose.Schema({
    name: { type: String, required: [true, "A name is required"] },
    message: { type: String, required: [true, "Messages must have a title"], minlength: [3, "Titles must have at least 3 characters"] },
    comments: [CommentSchema]
}, { timestamps: true })

Message = mongoose.model('Message', MessageSchema); 
Comment = mongoose.model('comment', CommentSchema);