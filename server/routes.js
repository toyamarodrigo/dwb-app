const express = require('express');
const downloadController = require('./controllers/download');

const router = express.Router();

router.get('/mp4/download', downloadController.downloadVideo);
router.get('/mp3/download', downloadController.downloadAudio);

module.exports = router;
