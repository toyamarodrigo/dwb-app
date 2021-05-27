// import ytdl from 'ytdl-core';
const ytdl = require('ytdl-core');

export function validateURL(value) {
  let error;
  const videoURL = value;
  const isYoutubeURL = ytdl.validateURL(videoURL);

  if (!isYoutubeURL) {
    error = 'Youtube URL is invalid';
  }

  return error;
}

export function validateFormat(value) {
  let error;
  const videoFormat = value;

  if (!videoFormat) {
    error = 'Select a video Format';
  }

  return error;
}
