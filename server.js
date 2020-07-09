// Require
const express = require('express');
const cors = require('cors');
const ytdl = require('ytdl-core');
const fs = require('fs');

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

    console.log(url);

    // Get VideoID of URL
    const id = ytdl.getURLVideoID(url);

    // Get metainfo from video
    const info = await ytdl.getInfo(id);

    const avFormats = ytdl.filterFormats(info.formats, 'audioandvideo');

    console.log(avFormats);

    res.header('Content-Disposition', 'attachment; filename="video.mp4"');
    res.header('Content-Type', 'video/webm');

    ytdl(url).pipe(res);
  } catch (error) {
    console.log(error);
  }

  // Download from info

  // const dlfrom = ytdl.downloadFromInfo(info);
  // console.log(dlfrom);

  // axios({
  //   url: `http://localhost:5000/download?URL=${URL}`,
  //   method: 'GET',
  //   responseType: 'blob',
  // })
});
