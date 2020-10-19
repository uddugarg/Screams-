const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const notificationSchema = mongoose.Schema({
    writer: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    postWriter: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    postId: {
        type: Schema.Types.ObjectId,
        ref: 'Post',
    },
    comment: {
        type: String,
    },
    reply: {
        type: String,
    },
}, {
    timestamps: true,
})

const Notification = mongoose.model('Notification', notificationSchema);

module.exports = { Notification }