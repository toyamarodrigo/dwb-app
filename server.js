// Require
const express = require('express');
const { exec } = require('child_process');
const cors = require('cors');
const ytdl = require('ytdl-core');

const fs = require('fs');

const ffmpegInstaller = require('@ffmpeg-installer/ffmpeg');
const ffmpeg = require('fluent-ffmpeg');

ffmpeg.setFfmpegPath(ffmpegInstaller.path);

// Init
const app = express();
app.use(
  express.static('public'),
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
    exposedHeaders: ['Content-Disposition'],
  })
);

var dir = 'public';
var subDirectory = 'public/uploads';

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
  fs.mkdirSync(subDirectory);
}

// Port
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running on port ${port}`));

app.get('/download', async (req, res) => {
  try {
    // Get http://youtube.com/watch?v=example and itag
    const url = req.query.URL;
    const itag = req.query.itag;

    console.log(url);
    console.log(itag);

    // Get VideoID of URL
    const id = ytdl.getURLVideoID(url);

    // Get metainfo from video
    ytdl.getInfo(id).then((info) => {
      const title = info.videoDetails.title;
      console.log(title);

      if (itag !== 'mp3') {
        const video = ytdl(url, {
          filter: 'videoonly',
          quality: 'highestvideo',
        });
        const audio = ytdl(url, {
          filter: 'audioonly',
          quality: 'highestaudio',
        });
      } else {
        const ytdlVideo = fs.createWriteStream(
          `${subDirectory}/${Date.now()}.mp4`
        );

        ytdlVideo.on('finish', () => {
          console.log(`${title} downloaded successfully`);
          var output = `${subDirectory}/${Date.now()}output.mp3`;

          // ffmpeg(ytdlVideo.path).inputOption('-i').format('mp3');
          // console.log("WOWW")

          exec(`ffmpeg -i ${ytdlVideo.path} ${output}`, (error) => {
            if (error) {
              console.log('error: ' + error.message);
            } else {
              console.log('File has been created');
            }
          });
        });

        const audio = ytdl(url, {
          filter: 'audioonly',
          quality: 'highestaudio',
        }).pipe(ytdlVideo);
        
      }
    });

    // ytdl(url, { filter: (format) => format.container === `${itag}` }).pipe(res);
  } catch (error) {
    console.log(error);
  }
});
