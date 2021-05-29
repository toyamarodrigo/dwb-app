const ytdl = require('ytdl-core');
const helpers = require('../helpers');
const fs = require('fs');
const dir = 'public';
const subDirectory = 'public/uploads';

exports.downloadAudio = async (req, res) => {
  try {
    helpers.folderCreation(dir, subDirectory);

    const youtubeID = ytdl.getURLVideoID(req.query.url);
    const youtubeURL = req.query.url;

    const mp4Audio = fs.createWriteStream(
      `${subDirectory}/${Date.now()}Audio.mp4`
    );

    const title = await helpers.getYoutubeTitle(youtubeID);

    await helpers.createAudioFile(youtubeURL, mp4Audio);
    await helpers.downloadAudioFile(title, mp4Audio, subDirectory, res);
  } catch (error) {
    console.log(error);
    return res.status(400);
  }
};

exports.downloadVideo = async (req, res) => {
  try {
    helpers.folderCreation(dir, subDirectory);

    const youtubeID = ytdl.getURLVideoID(req.query.url);
    const youtubeURL = req.query.url;

    const mp4Audio = fs.createWriteStream(
      `${subDirectory}/${Date.now()}Audio.mp4`
    );

    const mp4Video = fs.createWriteStream(
      `${subDirectory}/${Date.now()}Video.mp4`
    );

    const title = await helpers.getYoutubeTitle(youtubeID);

    await helpers.createAudioFile(youtubeURL, mp4Audio);
    await helpers.createVideoFile(youtubeURL, mp4Video);
    await helpers.downloadVideoFile(
      title,
      mp4Audio,
      mp4Video,
      subDirectory,
      res
    );
  } catch (error) {
    console.log(error);
    return null;
  }
};
