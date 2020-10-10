import React, { useState, useEffect } from 'react';
import validator from 'validator';
import axios from 'axios';
import './App.scss';

function App() {
  const [url, setUrl] = useState('');
  const [itag, setItag] = useState('mp3');
  const [checked, setChecked] = useState(true);

  const handleUrlChange = (e) => {
    setUrl(e.target.value);
  };

  const handleFormatChange = (e) => {
    setItag(e.target.value);
  };

  const handleRadioClick = (e) => {
    setChecked(!checked);
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
              <div className="col-12 col-md-4 mx-2 py-3">
                <h1 className="text-center display-1">DWL</h1>
              </div>
              <form
                onSubmit={handleSubmit}
                className="col-10 col-md-6 col-lg-4 mx-4"
              >
                <div className="row justify-content-center">
                  <div className="col-lg-12">
                    <div className="form-group">
                      <input
                        className="form-control"
                        type="text"
                        placeholder="http://..."
                        onChange={handleUrlChange}
                      />
                    </div>
                  </div>
                </div>
                <div className="row justify-content-center align-items-center">
                  <div
                    className="col-12 btn-group btn-group-toggle"
                    data-toggle="buttons"
                    onChange={handleFormatChange}
                  >
                    <label
                      className={
                        checked
                          ? 'btn btn-danger active'
                          : 'btn btn-light'
                      }
                    >
                      <input
                        type="radio"
                        name="mp3"
                        id="mp3"
                        value="mp3"
                        onClick={handleRadioClick}
                      />
                      MP3
                    </label>
                    <label
                      className={
                        !checked
                          ? 'btn btn-danger active'
                          : 'btn btn-light'
                      }
                    >
                      <input
                        type="radio"
                        name="mp4"
                        id="mp4"
                        value="mp4"
                        onClick={handleRadioClick}
                      />
                      MP4
                    </label>
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
