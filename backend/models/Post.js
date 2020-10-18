const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = mongoose.Schema({
    writer: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    caption: {
        type: String
    },
    images: {
        type: Array,
    },
    video: {
        type: String,
    },
    duration: {
        type: String,
    },
    thumbnail: {
        type: String,
    },
    likes: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
    }]
}, {
    timestamps: true,
})

const Post = mongoose.model('Post', postSchema);

module.exports = { Post }