import React, { useState, useEffect } from 'react';
import validator from 'validator';
import axios from 'axios';
import fileDownload from 'js-file-download';

import './App.scss';

function App() {
  const [url, setUrl] = useState('');
  const [itag, setItag] = useState('');

  const handleUrlChange = (e) => {
    e.persist();
    setUrl(e.target.value);
  };

  const handleFormatChange = (e) => {
    e.persist();
    setItag(e.target.value);
  };

  const handleSubmit = (e) => {
    // itag container quality codecs                 bitrate  audio bitrate
    // 18   mp4       360p    avc1.42001E, mp4a.40.2 696.66KB 96KB
    // 137  mp4       1080p   avc1.640028            4.53MB
    // 248  webm      1080p   vp9                    2.52MB
    // 136  mp4       720p    avc1.4d4016            2.2MB
    // 247  webm      720p    vp9                    1.44MB
    // 135  mp4       480p    avc1.4d4014            1.1MB
    // 134  mp4       360p    avc1.4d401e            593.26KB
    // 140  mp4               mp4a.40.2                       128KB

    e.preventDefault();
    const validURL = validator.isURL(url, { require_protocol: true });

    if (!validURL) {
      console.log(
        'Please ensure this URL is correct and includes the https protocol'
      );
    } else {
      console.log(`URL is: ${url}`);

      axios({
        url: `http://localhost:5000/download?URL=${url}&itag=${itag}`,
        method: 'GET',
        responseType: 'blob',
      })
        .then((res) => {
          console.log(res.data);
          if (res.data.type !== 'video/mp4') {
            fileDownload(res.data, 'audio.mp3');
          } else {
            fileDownload(res.data, 'video.mp4');
          }
        })
        .catch((err) => console.log(err));
    }
  };

  useEffect(() => {
    console.log(url);
    console.log(itag);
  }, [url, itag]);

  return (
    <div className="App">
      <div className="row justify-content-center align-items-center vertical-center">
        <div className="col-12">
          <div className="container py-5 card">
            <div className="row justify-content-center align-items-center">
              <div className="col-lg-3 mx-5 py-3">
                <h1 className="text-center display-1">DWL</h1>
              </div>
              <form onSubmit={handleSubmit} className="mx-4">
                <div className="row justify-content-center">
                  <div className="col-lg-8">
                    <div className="form-group">
                      <input
                        className="form-control"
                        type="text"
                        placeholder="http://..."
                        onChange={handleUrlChange}
                      />
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <select
                      className="custom-select"
                      name="itag"
                      onChange={handleFormatChange}
                    >
                      <option defaultValue value="0">
                        Format
                      </option>
                      <option disabled>&nbsp; Audio</option>
                      <option value="highestaudio">.mp3 [Audio only]</option>
                      <option disabled>&nbsp; Video</option>
                      <option value="highestvideo">.mp4 [Video only]</option>
                    </select>
                  </div>
                </div>
                <div className="row justify-content-center">
                  <div className="col-lg-12 btn-container">
                    <button
                      type="submit"
                      className="btn btn-success btn-block text-center"
                    >
                      Download
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
