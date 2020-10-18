const express = require('express');
const router = express.Router();

const { Like } = require('../models/Like');
const { Post } = require('../models/Post');


router.post('/postLike', (req, res) => {
    let variable = {}
    if (req.body.postId) {
        variable = {
            postId: req.body.postId,
            writer: req.body.writer,
        }
    } else {
        variable = {
            commentId: req.body.commentId,
            writer: req.body.writer,
        }
    }


    const like = new Like(variable);

    like.save((err, liked) => {
        if (err)
            return res.status(400).json({ success: false });
        Post.findOneAndUpdate({ "_id": req.body.postId }, {
            $push: { 'likes': req.body.writer }
        }, { new: true })
            .exec((err) => {
                if (err)
                    return res.status(400).json({ success: false });
                return res.status(200).json({ success: true });
            })
    })
})

router.post('/getLikes', (req, res) => {
    let variable = {}
    if (req.body.postId) {
        variable = {
            postId: req.body.postId,
            writer: req.body.writer,
        }
    } else {
        variable = {
            commentId: req.body.commentId,
            writer: req.body.writer,
        }
    }

    Like.find(variable)
        .exec((err, likes) => {
            if (err)
                return res.status(400).json({ success: false });
            return res.status(200).json({ success: true, likes });
        })
})

router.post('/deleteLike', (req, res) => {
    let variable = {}
    if (req.body.postId) {
        variable = {
            postId: req.body.postId,
            writer: req.body.writer,
        }
    } else {
        variable = {
            commentId: req.body.commentId,
            writer: req.body.writer,
        }
    }

    Like.findOneAndDelete(variable)
        .exec((err, result) => {
            if (err)
                return res.status(400).json({ success: false });
            Post.findOneAndUpdate({ "_id": req.body.postId }, {
                $pull: { 'likes': req.body.writer }
            }, { new: true })
                .exec((err) => {
                    if (err)
                        return res.status(400).json({ success: false });
                    return res.status(200).json({ success: true });
                })
        })
})



module.exports = router;