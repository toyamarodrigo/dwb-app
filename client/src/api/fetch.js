import axios from 'axios';
import { BASE_URL } from './constants';

export async function getDownload(body) {
  try {
    const bodyParsed = JSON.parse(body);
    const format = bodyParsed.format;
    const youtubeURL = bodyParsed.url;
    const url = `${BASE_URL}/${format}/download?url=${youtubeURL}&format=${format}`;

    const params = {
      method: 'GET',
      responseType: 'blob',
      url,
    };

    axios(params)
      .then((res) => {
        const urlWindow = window.URL.createObjectURL(new Blob([res.data]));
        const url = new Blob([res.data]);
        const link = document.createElement('a');
        link.href = urlWindow;
        link.setAttribute('download', `file.${format}`);
        document.body.appendChild(link);
        window.open(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(url);
      })
      .catch((err) => console.log(err));
  } catch (error) {
    console.log(error);
    return null;
  }
}
