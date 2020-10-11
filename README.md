# dwb - HQ Youtube Downloader

## Main objective

The main objective of this project was to find a way to download videos from Youtube at their highest quality possible.

Why?

Everytime I search for one website to download a video or audio file, it doesn't work or it's full of ads.

So I created this tiny webapp where you and I can download mp3's or mp4's at their highest quality possible.

## How does it work?

1. First copy and enter the URL of the desire Youtube video.

2. Select the format and Click Download.

3. In this Web app `node-ytdl-core` will firstly download Youtube videos in `mp4` format no matter if its `Audio only` or `Video only`.

4. If the selected output was `mp3`, `FFmpeg` will convert that `mp4` file into `mp3`. and then send it to the client.

5. If the selected output was `mp4`, `FFmpeg` will download first their `highest quality audio ONLY` and then their `highest quality video ONLY`.

6. And finally FFmpeg will merge them into a single mp4 file and send it to the client.

## Want to run it locally?

Make sure to have [NodeJS](https://nodejs.org/en/), [FFmpeg](https://ffmpeg.org/).

Once you install them, go to `/client` and `/server` folders and run

    npm install

And finally run on `/server` folder

    npm run dev

It will run client and server concurrently

## Tech used

* `HTML`, `CSS`, `Bootstrap`, `JS/JSX`, `ReactJS`, `Express`, `NodeJS`, `Socket.io`

* `node-ytdl-core`, `axios`, `validator`, `@ffmpeg-installer/ffmpeg`, `fluent-ffmpeg`, `concurrently`, `cors`, `nodemon`.

Screenshot:
![preview](https://i.imgur.com/j87CH8e.png)
