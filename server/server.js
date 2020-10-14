// Require
const express = require('express');
const ytdl = require('ytdl-core');
const fs = require('fs');
const { exec } = require('child_process');
const readline = require('readline');
const cors = require('cors');
const ffmpegInstaller = require('@ffmpeg-installer/ffmpeg');
const ffmpeg = require('fluent-ffmpeg');
const socketIo = require('socket.io');
const http = require('http');

ffmpeg.setFfmpegPath(ffmpegInstaller.path);

// Init
const app = express();
const server = http.createServer(app);
app.use(express.static('public'));
app.use(cors());
const io = socketIo(server);

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

var dir = 'public';
var subDirectory = 'public/uploads';

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
  fs.mkdirSync(subDirectory);
}

// Port
const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`Server is running on port ${port}`));

// Download
app.get('/download', async (req, res, next) => {
  req.setTimeout(500000);
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
      let starttime;

      // VIDEO
      if (itag !== 'mp3') {
        const ytdlVideo = fs.createWriteStream(
          `${subDirectory}/${Date.now()}Video.mp4`
        );
        const ytdlAudio = fs.createWriteStream(
          `${subDirectory}/${Date.now()}Audio.mp4`
        );

        const audio = ytdl(url, {
          filter: 'audioonly',
          quality: 'highestaudio',
        });

        audio.pipe(ytdlAudio);

        audio.once('response', () => {
          starttime = Date.now();
        });

        audio.on('progress', (chunkLength, downloaded, total) => {
          const percent = downloaded / total;
          const downloadedMinutes = (Date.now() - starttime) / 1000 / 60;
          const estimatedDownloadTime =
            downloadedMinutes / percent - downloadedMinutes;
          readline.cursorTo(process.stdout, 0);
          process.stdout.write(`${(percent * 100).toFixed(2)}% downloaded `);
          process.stdout.write(
            `(${(downloaded / 1024 / 1024).toFixed(2)}MB of ${(
              total /
              1024 /
              1024
            ).toFixed(2)}MB)\n`
          );
          process.stdout.write(
            `running for: ${downloadedMinutes.toFixed(2)}minutes`
          );
          process.stdout.write(
            `, estimated time left: ${estimatedDownloadTime.toFixed(2)}minutes `
          );
          readline.moveCursor(process.stdout, 0, -1);
        });

        const output = `${title}`;

        ytdlAudio.on('finish', () => {
          console.log(`${title} downloaded audio successfully`);
          const video = ytdl(url, {
            filter: 'videoonly',
            quality: 'highestvideo',
          });
          video.once('response', () => {
            starttime = Date.now();
          });
          video.on('progress', (chunkLength, downloaded, total) => {
            const percent = downloaded / total;
            const downloadedMinutes = (Date.now() - starttime) / 1000 / 60;
            const estimatedDownloadTime =
              downloadedMinutes / percent - downloadedMinutes;
            readline.cursorTo(process.stdout, 0);
            process.stdout.write(`${(percent * 100).toFixed(2)}% downloaded `);
            process.stdout.write(
              `(${(downloaded / 1024 / 1024).toFixed(2)}MB of ${(
                total /
                1024 /
                1024
              ).toFixed(2)}MB)\n`
            );
            process.stdout.write(
              `running for: ${downloadedMinutes.toFixed(2)}minutes`
            );
            process.stdout.write(
              `, estimated time left: ${estimatedDownloadTime.toFixed(
                2
              )}minutes `
            );
            readline.moveCursor(process.stdout, 0, -1);
            setTimeout(() => {
              io.emit('downloadingVideo', {
                downloaded: downloaded,
                total: total,
                percent: percent,
                estimatedDownloadTime: estimatedDownloadTime,
              });
            }, 200);
          });
          video.pipe(ytdlVideo);
          ytdlVideo.on('finish', () => {
            console.log(`${title} downloaded video successfully`),
              exec(
                `ffmpeg -i ${ytdlVideo.path} -i ${ytdlAudio.path} -c:v copy -c:a aac ${subDirectory}/${output}.mp4`,
                (error) => {
                  if (error) {
                    console.log('error: ' + error.message);
                  } else {
                    console.log('File has been created');
                    const ytdlFinal = `${subDirectory}/${output}.mp4`;
                    res.header(
                      'Content-Disposition',
                      'attachment; filename="Video.mp4'
                    );
                    res.download(ytdlFinal, (err) => {
                      if (err) throw err;
                      fs.unlinkSync(ytdlVideo.path);
                      fs.unlinkSync(ytdlAudio.path);
                      fs.unlinkSync(ytdlFinal);
                      console.log('termino');
                      res.end();
                    });
                  }
                }
              );
          });
        });
      } else {
        // AUDIO
        const ytdlVideo = fs.createWriteStream(
          `${subDirectory}/${Date.now()}.mp4`
        );

        const video = ytdl(url, {
          filter: 'audioonly',
          quality: 'highestaudio',
        });

        video.pipe(ytdlVideo);

        video.once('response', () => {
          starttime = Date.now();
        });

        video.on('progress', (chunkLength, downloaded, total) => {
          const percent = downloaded / total;
          const downloadedMinutes = (Date.now() - starttime) / 1000 / 60;
          const estimatedDownloadTime =
            downloadedMinutes / percent - downloadedMinutes;
          readline.cursorTo(process.stdout, 0);
          process.stdout.write(`${(percent * 100).toFixed(2)}% downloaded `);
          process.stdout.write(
            `(${(downloaded / 1024 / 1024).toFixed(2)}MB of ${(
              total /
              1024 /
              1024
            ).toFixed(2)}MB)\n`
          );
          process.stdout.write(
            `running for: ${downloadedMinutes.toFixed(2)}minutes`
          );
          process.stdout.write(
            `, estimated time left: ${estimatedDownloadTime.toFixed(2)}minutes `
          );
          readline.moveCursor(process.stdout, 0, -1);
          setTimeout(() => {
            io.emit('downloadingAudio', {
              downloaded: downloaded,
              total: total,
              percent: percent,
              estimatedDownloadTime: estimatedDownloadTime,
            });
          }, 100);
        });

        ytdlVideo.on('finish', () => {
          process.stdout.write('\n\n');
          console.log(`${title} downloaded successfully`);
          var output = `${subDirectory}/${Date.now()}output.mp3`;

          exec(`ffmpeg -i ${ytdlVideo.path} ${output}`, (error) => {
            if (error) {
              console.log('error: ' + error.message);
            } else {
              console.log('File has been created');
              res.header(
                'Content-Disposition',
                'attachment; filename="Video.mp4'
              );
              res.download(output, (err) => {
                if (err) throw err;
                console.log('Download started');
                fs.unlinkSync(ytdlVideo.path);
                fs.unlinkSync(output);
                res.end();
              });
            }
          });
        });
      }
    });
  } catch (error) {
    console.log(error);
  }
});
