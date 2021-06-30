# dwb - HQ Youtube Downloader

![preview](https://i.imgur.com/FTR7VCS.png)

## Main objective

The main objective of this project was to find a way to download videos from Youtube at their highest quality possible.

Why?

Everytime I looked for a website to download a video or audio files, it didn't work or was full of ads.

So I created this tiny webapp where you and I can download mp3's or mp4's at their highest quality possible.

## How does it work

Since heroku has a timeout request at 30sec. If the download takes more than that it will break. It works for small video files (around 2/3min), depends on internet connection though. 😅

1. First copy and enter the URL of the desire Youtube video.

2. Select the format and Click Download.

3. In this Web app `node-ytdl-core` will firstly download Youtube videos in `mp4` format no matter if its `Audio only` or `Video only`.

4. If the selected output was `mp3`, `FFmpeg` will convert that `mp4` file into `mp3`. and then send it to the client.

5. If the selected output was `mp4`, `FFmpeg` will download first their `highest quality audio possible` and then their `highest quality video`. Why? because ytdl does not allow downloads highest audio and video at the same time.

6. And finally FFmpeg will merge them into a single mp4 file and send it to the client.

## Run it locally

Make sure to have [NodeJS](https://nodejs.org/en/) & [FFmpeg](https://ffmpeg.org/).

Once you install them, go to `/client` and `/server` folders and run

    npm install

And finally run on `/server` folder

    npm run dev

It will run client and server concurrently

## Tech used

* `HTML`, `CSS`, `ChakraUI`, `JS`, `ReactJS`, `Express`, `NodeJS`

## Dependencies

client

* `chakra-ui`, `fortawesome`, `axios`, `framer-motion`, `styled-components`, `ytdl-core`, `react-router`, `formik`, `framer-motion`

server

* `ytdl-core`, `@ffmpeg-installer/ffmpeg`, `fluent-ffmpeg`, `concurrently`, `cors`, `nodemon`.

## Screenshot

Desktop
![preview](https://i.imgur.com/72uYoyk.png)

Mobile
![preview](https://i.imgur.com/UmyYOiO.png)
