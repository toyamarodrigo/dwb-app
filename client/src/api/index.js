import axios from 'axios';
import validator from 'validator';

export const downloadFile = async (url, itag, setdisplayProgressBar) => {
  try {
    const validURL = validator.isURL(url, { require_protocol: true });

    if (!validURL) {
      console.log(
        'Please ensure this URL is correct and includes the https protocol'
      );
    } else {
      console.log(`URL is: ${url}`);
      setdisplayProgressBar(true);
      axios({
        url: `http://localhost:5000/download?URL=${url}&itag=${itag}`,
        method: 'GET',
        responseType: 'blob',
      })
        .then((res) => {
          console.log(res.data);
          const url = window.URL.createObjectURL(new Blob([res.data]));
          const link = document.createElement('a');
          link.href = url;
          if (res.data.type !== 'video/mp4') {
            link.setAttribute('download', 'file.mp3'); //or any other extension
            document.body.appendChild(link);
            link.click();
          } else {
            link.setAttribute('download', 'file.mp4'); //or any other extension
            document.body.appendChild(link);
            link.click();
          }
        })
        .catch((err) => console.log(err));
    }
  } catch (error) {
    console.log(error);
  }
};
