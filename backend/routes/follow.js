const express = require('express');
const router = express.Router();

const { Follow } = require('../models/Follow');

router.post('/follow', (req, res) => {
    const follow = new Follow(req.body);

    follow.save((err, doc) => {
        if (err)
            return res.status(400).json({ success: false, err });
        return res.status(200).json({ success: true, doc });
    })
})

router.post('/followers', (req, res) => {
    Follow.find({ 'following': req.body.following })
        .exec((err, follower) => {
            if (err)
                return res.status(400).json({ success: false, err });
            return res.status(200).json({ success: true, followers: follower });
        })
})

router.post('/userFollowers', (req, res) => {
    Follow.find({ 'following': req.body.writer })
        .populate('follower')
        .exec((err, followers) => {
            if (err)
                return res.status(400).json({ success: false, err });
            return res.status(200).json({ success: true, followers });
        })
})

router.post('/userFollowing', (req, res) => {
    Follow.find({ 'follower': req.body.writer })
        .populate('following')
        .exec((err, following) => {
            if (err)
                return res.status(400).json({ success: false, err });
            return res.status(200).json({ success: true, following });
        })
})

router.post('/followed', (req, res) => {
    Follow.find({ 'following': req.body.following, 'follower': req.body.follower })
        .exec((err, follow) => {
            if (err)
                return res.status(400).json({ success: false, err });
            return res.status(200).json({ success: true, followed: follow });
        })
})

router.post('/unfollow', (req, res) => {
    Follow.findOneAndDelete({ 'following': req.body.following, 'follower': req.body.follower })
        .exec((err, doc) => {
            if (err)
                return res.status(400).json({ success: false, err });
            return res.status(200).json({ success: true, doc });
        })
})

module.exports = router;