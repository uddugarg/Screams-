const express = require('express');
const router = express.Router();

const { Comment } = require('../models/Comment');
const { Notification } = require('../models/Notification');

router.post('/postComment', (req, res) => {

    let variable = {
        postId: req.body.postId,
        postWriter: req.body.postWriter,
        writer: req.body.writer,
        comment: req.body.comment,
        reply: req.body.reply,
    }

    const comment = new Comment(req.body);

    comment.save((err, comment) => {
        if (err)
            return res.status(400).json({ success: false, err });

        const notification = new Notification(variable);
        notification.save((err, doc) => {
            if (err)
                return res.status(400).json({ success: false, err });
            
            Comment.find({ '_id': comment._id })
                .populate('writer')
                .exec((err, doc) => {
                    if (err)
                        return res.status(400).json({ success: false });
                    return res.status(200).json({ success: true, doc })
                })
        })
    })
})

router.post('/getComment', (req, res) => {
    Comment.find({ 'postId': req.body.postId })
        .populate('writer')
        .exec((err, comments) => {
            if (err)
                return res.status(400).json({ success: false, err });
            return res.status(200).json({ success: true, comments })
        })
})

module.exports = router;