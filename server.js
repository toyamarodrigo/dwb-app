// Require
const express = require('express');
const path = require('path');
const cors = require('cors');
const ytdl = require('ytdl-core');
const fs = require('fs');
const ffmpeg = require('fluent-ffmpeg');
const readline = require('readline');

// Init
const app = express();
app.use(cors());

// Port
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running on port ${port}`));

app.get('/download', async (req, res) => {
  try {
    // Get http://youtube.com/watch?v=example
    const url = req.query.URL;
    const audioOutput = path.resolve(__dirname, 'sound.mp4');
    const mainOutput = path.resolve(__dirname, 'output.mp4');
    console.log(url);

    // Get VideoID of URL
    const id = ytdl.getURLVideoID(url);

    // Get metainfo from video
    const info = await ytdl.getInfo(id);

    // checks audio and video formats available for the video
    const avFormats = ytdl.filterFormats(info.formats, 'audioandvideo');
    console.log(avFormats);

    const onProgress = (chunkLength, downloaded, total) => {
      const percent = downloaded / total;
      readline.cursorTo(process.stdout, 0);
      process.stdout.write(`${(percent * 100).toFixed(2)}% downloaded `);
      process.stdout.write(
        `(${(downloaded / 1024 / 1024).toFixed(2)}MB of ${(
          total /
          1024 /
          1024
        ).toFixed(2)}MB)`
      );
    };

    console.log('downloading audio track');

    // Header
    res.header('Content-Disposition', 'attachment; filename="video.mp4"');
    res.header('Content-Type', 'video/webm');

    // ytdl(url).pipe(res);

    ytdl(url, {
      filter: (format) => format.container === 'mp4' && !format.qualityLabel,
    })
      .on('error', console.error)
      .on('progress', onProgress)

      // Write audio to file since ffmpeg supports only one input stream

      .pipe(fs.createWriteStream(audioOutput))
      .on('finish', () => {
        console.log('\ndownloading video');
        const video = ytdl(url, {
          filter: (format) =>
            format.container === 'mp4' && !format.audioEncoding,
        });
        video.on('progress', onProgress);
        ffmpeg()
          .input(video)
          .videoCodec('copy')
          .input(audioOutput)
          .audioCodec('copy')
          .save(mainOutput)
          .on('error', console.error)
          .on('end', () => {
            fs.unlink(audioOutput, (err) => {
              if (err) console.error(err);
              else
                console.log(`\nfinished downloading, saved to ${mainOutput}`);
            });
          });
      });
  } catch (error) {
    console.log(error);
  }
});
