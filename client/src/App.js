import React, { useState, useEffect } from 'react';
import validator from 'validator';
import axios from 'axios';
import fileDownload from 'js-file-download';

import './App.scss';

function App() {
  const [url, setUrl] = useState('');

  const handleChange = (e) => {
    e.persist();
    setUrl(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validURL = validator.isURL(url, { require_protocol: true });

    if (!validURL) {
      console.log(
        'Please ensure this URL is correct and includes the https protocol'
      );
    } else {
      console.log(`URL is: ${url}`);

      axios({
        url: `http://localhost:5000/download?URL=${url}`,
        method: 'GET',
        responseType: 'blob',
      })
        .then((res) => {
          console.log(res);
          fileDownload(res.data, 'video.mp4');
        })
        .catch((err) => console.log(err));
    }
  };

  useEffect(() => {
    console.log(url);
  }, [url]);

  return (
    <div className="App">
      <div className="row justify-content-center align-items-center vertical-center">
        <div className="col-12">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-12">
                <h1 className="text-center">Download Youtube Videos</h1>
              </div>
            </div>
          </div>
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-6">
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <input
                      className="form-control"
                      type="text"
                      placeholder="http://..."
                      onChange={handleChange}
                    />
                  </div>
                </form>
              </div>
              <div className="col-lg-3">
                <select className="custom-select" name="format">
                  <option disabled>&nbsp; Audio</option>
                  <option>.mp3 [128kb]</option>
                  <option>.mp3 [320kb]</option>
                  <option disabled>&nbsp; Video</option>
                  <option>.mp4 [420p]</option>
                  <option>.mp4 [720p]</option>
                  <option>.mp4 [1080p]</option>
                </select>
              </div>
            </div>
            <div className="row justify-content-center">
              <div className="col-lg-2">
                <button type="button" className="btn btn-success btn-block text-center">
                  Download
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
