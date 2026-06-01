const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: [true, 'User ID is Required']
    },
    comment: {
        type: String,
        required: [true, 'Comment is Required']
    },
    createdOn: {
        type: Date,
        default: Date.now
    }
});

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Blog Title is Required']
    },
    content: {
        type: String,
        required: [true, 'Blog Content Description is Required']
    },
    author: {
        type: String,
        required: [true, 'Blog Author is Required']
    },
    comments: [commentSchema],
    isActive: {
        type: Boolean,
        default: true
    },
    createdOn: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Blogs', blogSchema);