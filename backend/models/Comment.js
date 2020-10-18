const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = mongoose.Schema({
    writer: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    postId: {
        type: Schema.Types.ObjectId,
        ref: 'Post'
    },
    commentId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    comment: {
        type: String,
    }
}, {
    timestamps: true,
})

const Comment = mongoose.model('Comment', commentSchema);

module.exports = { Comment }