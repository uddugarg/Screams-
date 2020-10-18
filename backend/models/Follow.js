const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const followSchema = mongoose.Schema({
    following: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    follower: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    }
}, {
    timestamps: true,
})


const Follow = mongoose.model('Follow', followSchema);

module.exports = { Follow }