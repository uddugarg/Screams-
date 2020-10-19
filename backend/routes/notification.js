const express = require('express');
const router = express.Router();

const { Notification } = require('../models/Notification');

router.post('/getNotifications', (req, res) => {
    Notification.find({ 'postWriter': req.body.writer })
        .populate('writer')
        .exec((err, notifications) => {
            if (err)
                return res.status(400).json({ success: false });
            return res.status(200).json({ success: true, notifications });
    })
})

module.exports = router