import React, { useState, useEffect } from 'react';
import { downloadFile } from './api/index';
import './App.scss';

function App() {
  const [url, setUrl] = useState('');
  const [itag, setItag] = useState('mp3');
  const [checked, setChecked] = useState(true);
  const currentYear = new Date().getFullYear();

  const handleUrlChange = (e) => {
    setUrl(e.target.value);
  };

  const handleRadioClick = (e) => {
    setChecked(!checked);
    setItag(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    downloadFile(url, itag);
  };

  useEffect(() => {
    console.log(url);
    console.log(itag);
  }, [url, itag]);

  return (
    <div className="App">
      <div className="container">
        <div className="row justify-content-center align-items-center vertical-center">
          <div className="col-12">
            <div className="container py-5">
              <div className="row justify-content-center align-items-center">
                <div className="col-12 col-md-4 mx-2 py-3">
                  <h1 className="text-center title">dwb</h1>
                </div>
                <form
                  onSubmit={handleSubmit}
                  className="col-10 col-md-6 col-lg-5 mx-4"
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
                    >
                      <label
                        htmlFor="mp3"
                        className={
                          checked ? 'btn btn-danger active' : 'btn btn-light'
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
                        htmlFor="mp4"
                        className={
                          checked ? 'btn btn-light' : 'btn btn-danger active'
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
                        className="btn btn-lg btn-success btn-block text-center"
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
        <div className="row justify-content-center align-items-center">
          <footer className="footer">
            <small>&copy; Copyright {currentYear}, Toyama Rodrigo</small>
          </footer>
        </div>
      </div>
    </div>
  );
}

export default App;
