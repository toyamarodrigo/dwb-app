import axios from 'axios';
import { saveAs } from 'file-saver';

export const downloadFile = async (
  url,
  itag,
  setdisplayProgressBar,
  setBtnDownloadFile
) => {
  try {
    console.log(`URL is: ${url}`);
    setdisplayProgressBar(true);
    axios({
      url: `http://localhost:5000/download?URL=${url}&itag=${itag}`,
      // url: `https://rt-dwb-app.herokuapp.com/download?URL=${url}&itag=${itag}`,
      method: 'GET',
      responseType: 'blob',
    })
      .then((res) => {
        console.log(res.data);
        const urlWindow = window.URL.createObjectURL(new Blob([res.data]));
        const url = new Blob([res.data]);
        const link = document.createElement('a');
        link.href = urlWindow;
        if (res.data.type !== 'video/mp4') {
          setBtnDownloadFile(true);
          document.getElementById('btn-test').addEventListener('click', () => {
            saveAs(url, 'file.mp3');
          });
          link.setAttribute('download', 'file.mp3'); //or any other extension
          document.body.appendChild(link);
          window.open(link);
          link.click();
          link.remove();
          window.URL.revokeObjectURL(url);
        } else {
          setBtnDownloadFile(true);
          document.getElementById('btn-test').addEventListener('click', () => {
            saveAs(url, 'file.mp4');
          });
          link.setAttribute('download', 'file.mp4'); //or any other extension
          document.body.appendChild(link);
          window.open(link);
          link.click();
          link.remove();
          window.URL.revokeObjectURL(url);
        }
      })
      .catch((err) => console.log(err));
  } catch (error) {
    console.log(error);
  }
};
