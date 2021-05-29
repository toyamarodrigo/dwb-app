const ytdl = require('ytdl-core');
const {
  folderCreation,
  getYoutubeTitle,
  createAudioFile,
  createVideoFile,
  downloadAudioFile,
  downloadVideoFile,
} = require('../helpers');
const fs = require('fs');
const dir = 'public';
const subDirectory = 'public/uploads';

const downloadAudio = async (req, res) => {
  try {
    folderCreation(dir, subDirectory);

    const youtubeURL = req.query.url;
    const youtubeID = ytdl.getURLVideoID(youtubeURL);

    const mp4Audio = fs.createWriteStream(
      `${subDirectory}/${Date.now()}Audio.mp4`
    );

    const title = await getYoutubeTitle(youtubeID);

    await createAudioFile(youtubeURL, mp4Audio);
    await downloadAudioFile(title, mp4Audio, subDirectory, res);
  } catch (error) {
    console.log(error);
    return res.status(400);
  }
};

const downloadVideo = async (req, res) => {
  try {
    folderCreation(dir, subDirectory);

    const youtubeURL = req.query.url;
    const youtubeID = ytdl.getURLVideoID(youtubeURL);

    const mp4Audio = fs.createWriteStream(
      `${subDirectory}/${Date.now()}Audio.mp4`
    );

    const mp4Video = fs.createWriteStream(
      `${subDirectory}/${Date.now()}Video.mp4`
    );

    const title = await getYoutubeTitle(youtubeID);

    await createAudioFile(youtubeURL, mp4Audio);
    await createVideoFile(youtubeURL, mp4Video);
    await downloadVideoFile(
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

module.exports = {
  downloadAudio,
  downloadVideo,
};
