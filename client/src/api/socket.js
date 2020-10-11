import io from 'socket.io-client';

export const progressBarDownload = () => {
  const socket = io();
  socket.on('downloadingAudio', (data) => {
    let startDownload = (data.downloaded / 1024 / 1024).toFixed(2);
    let endDownload = (data.total / 1024 / 1024).toFixed(2);

    document.getElementById('progress-bar').innerText =
      (data.percent * 100).toFixed(1) + '%';
    document.getElementById('progress-bar').style.width =
      (data.percent * 100).toFixed(1) + '%';
    document.getElementById('download-size').innerHTML =
      startDownload + 'MB / ' + endDownload + 'MB';
  });

  socket.on('downloadingVideo', (data) => {
    let startDownloadVideo = (data.downloaded / 1024 / 1024).toFixed(2);
    let endDownloadVideo = (data.total / 1024 / 1024).toFixed(2);
    document.getElementById('progress-bar').innerText =
      (data.percent * 100).toFixed(1) + '%';
    document.getElementById('progress-bar').style.width =
      (data.percent * 100).toFixed(1) + '%';
    document.getElementById('download-size').innerHTML =
      startDownloadVideo + 'MB / ' + endDownloadVideo + 'MB';
  });
};
