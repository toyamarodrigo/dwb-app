// Require
const express = require('express');
const { exec } = require('child_process');
const cors = require('cors');
const ytdl = require('ytdl-core');

const fs = require('fs');

const ffmpegInstaller = require('@ffmpeg-installer/ffmpeg');
const ffmpeg = require('fluent-ffmpeg');
const { nextTick } = require('process');

ffmpeg.setFfmpegPath(ffmpegInstaller.path);

// Init
const app = express();
app.use(express.static('public'));
app.use(cors());

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
      const title = info.videoDetails.title
        .split(' ')
        .join('')
        .replace(/\W/g, '');

      if (itag !== 'mp3') {
        const ytdlVideo = fs.createWriteStream(
          `${subDirectory}/${Date.now()}Video.mp4`
        );
        const ytdlAudio = fs.createWriteStream(
          `${subDirectory}/${Date.now()}Audio.mp4`
        );

        const output = `${Date.now() + title}`;

        ytdlAudio.on('finish', () => {
          console.log(`${title} downloaded audio successfully`),
            ytdl(url, {
              filter: 'videoonly',
              quality: 'highestvideo',
            }).pipe(ytdlVideo);
          ytdlVideo.on('finish', () => {
            console.log(`${title} downloaded video successfully`),
              exec(
                `ffmpeg -i ${ytdlVideo.path} -i ${ytdlAudio.path} -c:v copy -c:a aac ${subDirectory}/${output}.mp4`,
                (error) => {
                  if (error) {
                    console.log('error: ' + error.message);
                  } else {
                    console.log('File has been created');
                    fs.unlinkSync(ytdlVideo.path);
                    fs.unlinkSync(ytdlAudio.path);
                    const ytdlFinal = `${subDirectory}/${output}.mp4`;
                    res.download(ytdlFinal, (err) => {
                      if (err) throw err;
                      console.log("nombre o path del archivo: " + ytdlFinal);
                      fs.unlinkSync(ytdlFinal);
                      console.log('termino');
                    });
                  }
                }
              );
          });
        });

        ytdl(url, {
          filter: 'audioonly',
          quality: 'highestaudio',
        }).pipe(ytdlAudio);
      } else {
        const ytdlVideo = fs.createWriteStream(
          `${subDirectory}/${Date.now()}.mp4`
        );

        ytdlVideo.on('finish', () => {
          console.log(`${title} downloaded successfully`);
          var output = `${subDirectory}/${Date.now()}output.mp3`;

          exec(`ffmpeg -i ${ytdlVideo.path} ${output}`, (error) => {
            if (error) {
              console.log('error: ' + error.message);
            } else {
              console.log('File has been created');
              res.download(output, (err) => {
                if (err) throw err;
                fs.unlinkSync(ytdlVideo.path);
                fs.unlinkSync(output);
              });
            }
          });
        });

        ytdl(url, {
          filter: 'audioonly',
          quality: 'highestaudio',
        }).pipe(ytdlVideo);
      }
    });
  } catch (error) {
    console.log(error);
  }
});
