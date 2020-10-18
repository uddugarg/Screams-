const express = require('express');
const router = express.Router();
const multer = require('multer');
const ffmpeg = require('fluent-ffmpeg');

const { Post } = require('../models/Post');
const { Like } = require('../models/Like');
const { Follow } = require('../models/Follow');

var storage = multer.diskStorage({
    destination: (req, res, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`)
    },
})

var upload = multer({ storage: storage }).single('file');

router.post('/uploadImage', (req, res) => {
    upload(req, res, (err) => {
        let filePath = res.req.file.path.replace(/\\/g, '/');
        if (err)
            return res.status(400).json({ success: false, err });
        return res.status(200).json({ success: true, filePath: filePath, filename: res.req.file.filename });
    })
})

router.post('/uploadVideo', (req, res) => {
    upload(req, res, (err) => {
        let videoFilePath = res.req.file.path.replace(/\\/g, '/');
        if (err)
            return res.status(400).json({ success: false, err });
        return res.status(200).json({ success: true, videoFilePath: videoFilePath, filename: res.req.file.filename });
    })
})

router.post('/thumbnail', (req, res) => {

    let thumbsFilePath = '';
    let thumbsFileDuration = '';

    ffmpeg.ffprobe(req.body.filePath, function (err, metadata) {
        console.dir(metadata);
        console.log(metadata.format.duration);

        thumbsFileDuration = metadata.format.duration;
    })

    ffmpeg(req.body.filePath)
        .on('filenames', function (filenames) {
            console.log('Will generate ' + filenames.join(', '))
            thumbsFilePath = 'uploads/thumbnails/' + filenames[0];
        })
        .on('end', function () {
            console.log('Screenshots taken');
            return res.json({
                success: true,
                thumbsFilePath: thumbsFilePath,
                thumbsFileDuration: thumbsFileDuration
            })
        })
        .screenshots({
            // Will take screens at 20%, 40%, 60% and 80% of the video
            count: 1,
            folder: 'uploads/thumbnails',
            timestamps: [30.5, '50%', '01:10.123'],
            filename: 'thumbnail-%b.png',
            size: '300x240'
        });
})

router.post('/uploadPost', (req, res) => {
    const post = new Post(req.body);

    post.save((err) => {
        if (err)
            return res.status(400).json({ success: false });
        return res.status(200).json({ success: true });
    })
})

router.get('/getPosts', (req, res) => {
    Post.find()
        .sort({ 'createdAt': -1 })
        .populate('writer')
        .exec((err, posts) => {
            if (err)
                return res.status(400).json({ success: false });
            return res.status(200).json({ success: true, posts });
        })
})

router.post('/getPost', (req, res) => {
    Post.findOne({ '_id': req.body.postId })
        .populate('writer')
        .exec((err, post) => {
            if (err)
                return res.status(400).send(err);
            return res.status(200).json({ success: true, post });
        })
})

router.post('/getUserPosts', (req, res) => {
    Post.find({ 'writer': req.body.writer })
        .sort({ 'createdAt': -1 })
        .populate('writer')
        .exec((err, posts) => {
            if (err)
                return res.status(400).send(err);
            return res.status(200).json({ success: true, usersPosts: posts });
        })
})


router.put('/postLike', (req, res) => {

    let variable = {
        postId: req.body.postId,
        writer: req.body.writer
    }

    Post.findOneAndUpdate({ "_id": req.body.postId }, {
        $push: { 'likes': req.body.writer }
    }, { new: true })
        .exec((err, like) => {
            if (err) {
                return res.status(400).json({ success: false, err });
            } else {
                const like = new Like(variable);
                like.save((err, liked) => {
                    if (err)
                        return res.status(400).json({ success: false });
                    return res.status(200).json({ success: true, liked });
                })
            }
        })
})

router.put('/deleteLike', (req, res) => {

    let variable = {
        postId: req.body.postId,
        writer: req.body.writer
    }

    Post.findOneAndUpdate({ "_id": req.body.postId }, {
        $pull: { 'likes': req.body.writer }
    }, { new: true })
        .exec((err, like) => {
            if (err)
                return res.status(400).json({ success: false, err });
            Like.findOneAndDelete(variable)
                .exec((err, liked) => {
                    if (err)
                        return res.status(400).json({ success: false });
                    return res.status(200).json({ success: true, liked });
                })
        })
})


router.post('/getFollowedPosts', (req, res) => {
    Follow.find({ 'follower': req.body.writer })
        .exec((err, result) => {
            if (err) {
                return res.status(400).send(err);
            } else {
                let followedPost = [];
                result.map((post, i) => {
                    followedPost.push(post.following)
                })

                Post.find({ writer: { $in: followedPost } })
                    .sort({ 'createdAt': -1 })
                    .populate('writer')
                    .exec((err, posts) => {
                        if (err)
                            return res.status(400).json({ success: false });
                        return res.status(200).json({ success: true, posts });
                    })
            }

        })
})

module.exports = router;