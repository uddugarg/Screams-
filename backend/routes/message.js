const express = require('express');
const { Message } = require('../models/Message');
const router = express.Router();

router.post('/postMessage', (req, res) => {
    const message = new Message(req.body);

    message.save((err, doc) => {
        if (err)
            return res.status(400).json({ success: false, err });
        return res.status(200).json({ success: true, doc });
    })
})


router.post('/getUserMessages', (req, res) => {
    Message.find({ 'writer': req.body.writer, 'contactId': req.body.contactId, })
        .populate('writer')
        .exec((err, messages) => {
            if (err)
                return res.status(400).json({ success: false, err });
            return res.status(200).json({ success: true, messages });
        })
})

router.post('/getContactMessages', (req, res) => {
    Message.find({ 'writer': req.body.contactId, 'contactId': req.body.writer, })
        .populate('writer')
        .exec((err, messages) => {
            if (err)
                return res.status(400).json({ success: false, err });
            return res.status(200).json({ success: true, messages });
        })
})

module.exports = router