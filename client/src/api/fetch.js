import axios from 'axios';
import { BASE_URL } from './constants';

export async function startDownload(body, setProgress, setPercentage) {
  try {
    let progress = 0;
    const bodyParsed = JSON.parse(body);
    const format = bodyParsed.format;
    const youtubeURL = bodyParsed.url;
    const url = `${BASE_URL}/${format}/download?url=${youtubeURL}&format=${format}`;

    const params = {
      method: 'GET',
      responseType: 'blob',
      url,
      onDownloadProgress(progressEvent) {
        progress = Math.round(
          (progressEvent.loaded / progressEvent.total) * 100
        );
        setPercentage(progress);
      },
    };

    setProgress('in-progress');
    axios(params)
      .then((res) => {
        console.log('response has arrived');
        const urlWindow = window.URL.createObjectURL(new Blob([res.data]));
        const url = new Blob([res.data]);
        const link = document.createElement('a');
        link.href = urlWindow;
        link.setAttribute('download', `file.${format}`);
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(url);
        sessionStorage.setItem(
          'file',
          JSON.stringify({
            url: urlWindow,
            format: `file.${format}`,
          })
        );
        setProgress('finished');
      })
      .catch((err) => console.log(err));
  } catch (error) {
    console.log(error);
    return null;
  }
}
