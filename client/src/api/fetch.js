import axios from 'axios';
import ytdl from 'ytdl-core';
import { BASE_URL } from './constants';

export async function getDownload(body) {
  try {
    const bodyParsed = JSON.parse(body);
    const youtubeID = ytdl.getURLVideoID(bodyParsed.url);
    console.log(`youtubeID`, youtubeID);

    if (bodyParsed.format === 'mp3') {
      const url = `${BASE_URL}/audio/${youtubeID}`;
      const result = await axios({
        url,
        method: 'POST',
        body: bodyParsed,
      }).then((res) => {
        console.log(res.data);
      });

      console.log(`result`, result);
      const response = result.json();
      console.log(`response`, response);
      
    } else {
      const url = `${BASE_URL}/video/${youtubeID}`;
      const result = await fetch(url);
      console.log(`result`, result);
      const response = result.json();
      console.log(`response`, response);
    }
  } catch (error) {
    console.log(error);
    return null;
  }
}
