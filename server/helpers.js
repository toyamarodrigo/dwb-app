const fs = require('fs');
const ytdl = require('ytdl-core');
const { exec } = require('child_process');

exports.folderCreation = (dir, subDirectory) => {
  try {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
      fs.mkdirSync(subDirectory);
    }
  } catch (error) {
    console.log(error, 'Creation folder Failed');
    return null;
  }
};

exports.getYoutubeTitle = async (youtubeID) => {
  try {
    const youtubeMeta = await ytdl.getInfo(youtubeID);
    const title = youtubeMeta.videoDetails.title
      .split(' ')
      .join('')
      .replace(/\W/g, '');
    return title;
  } catch (error) {
    console.log(error, 'Getting Youtube Title Failed');
    return null;
  }
};

exports.createFile = (url, mp4File) => {
  try {
    const bestAudio = ytdl(url, {
      filter: 'audioonly',
      quality: 'highestaudio',
    });

    bestAudio.pipe(mp4File);
  } catch (error) {
    console.log(error, 'Creation audio file Failed');
    return null;
  }
};

exports.downloadAudioFile = (title, mp4File, subDirectory, res) => {
  try {
    mp4File.on('finish', () => {
      process.stdout.write('\n\n');
      console.log(`${title} downloaded audio successfully`);
      let output = `${subDirectory}/${Date.now()}output.mp3`;

      exec(`ffmpeg -i ${mp4File.path} ${output}`, (error) => {
        if (error) return console.log('Error: ' + error.message);

        console.log('File has been created');
        res.header('Content-Disposition', 'attachment; filename="Video.mp4');
        res.download(output, (err) => {
          if (err) throw err;
          console.log('Download started');
          fs.unlinkSync(mp4File.path);
          fs.unlinkSync(output);
          console.log('Deleted files from server');
          res.end();
        });
      });
    });
  } catch (error) {
    console.log(error);
    res.status(400).send('Download File Failed');
    return null;
  }
};

exports.downloadVideoFile = (
  title,
  mp4Audio,
  mp4Video,
  subDirectory,
  youtubeURL,
  res
) => {
  try {
    const output = title;

    mp4Audio.on('finish', () => {
      console.log(`${title} downloaded audio successfully`);

      const video = ytdl(youtubeURL, {
        filter: 'videoonly',
        quality: 'highestvideo',
      });
      video.pipe(mp4Video);
    });

    mp4Video.on('finish', () => {
      console.log(`${title} downloaded video successfully`);
      exec(
        `ffmpeg -i ${mp4Video.path} -i ${mp4Audio.path} -c:v copy -c:a aac ${subDirectory}/${output}.mp4`,
        (error) => {
          if (error) console.log('error: ' + error.message);

          console.log('File has been created');
          const finalFile = `${subDirectory}/${output}.mp4`;

          res.header('Content-Disposition', 'attachment; filename="Video.mp4');
          res.download(finalFile, (err) => {
            if (err) throw err;
            console.log('Download send');
            fs.unlinkSync(mp4Video.path);
            fs.unlinkSync(mp4Audio.path);
            fs.unlinkSync(finalFile);
            console.log('Deleted files from server');
            res.end();
          });
        }
      );
    });
  } catch (error) {
    console.log(error);
    res.status(400).send('Download File Failed');
    return null;
  }
};
