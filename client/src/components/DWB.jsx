import React, { useState } from 'react';
import { downloadFile } from '../api/index';
import { validate } from '../api/validate';

export const DWB = ({
  url,
  setUrl,
  checkedMP3,
  setCheckedMP3,
  checkedMP4,
  setCheckedMP4,
  itag,
  setItag,
  setdisplayProgressBar,
  setBtnDownloadFile,
}) => {
  const [error, setError] = useState([]);
  const handleUrlChange = (e) => {
    setUrl(e.target.value);
  };

  const handleRadioClickMP3 = (e) => {
    if (!checkedMP3) {
      setCheckedMP4(false);
      setCheckedMP3(true);
      setItag(e.target.value);
    } else {
      setCheckedMP3(false);
      setItag('');
    }
  };

  const handleRadioClickMP4 = (e) => {
    if (!checkedMP4) {
      setCheckedMP3(false);
      setCheckedMP4(true);
      setItag(e.target.value);
    } else {
      setCheckedMP4(false);
      setItag('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(validate(url, itag, setError));
    if (validate(url, itag, setError)) {
      downloadFile(url, itag, setdisplayProgressBar, setBtnDownloadFile);
    }
  };

  const hasError = (key) => {
    return error.indexOf(key) !== -1;
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center align-items-center">
        <div className="col-12 col-md-4 mx-2 py-3">
          <h1 className="text-center title">dwb</h1>
        </div>
        <form onSubmit={handleSubmit} className="col-10 col-md-6 col-lg-5 mx-4">
          <div className="row justify-content-center">
            <div className="col-lg-12">
              <div className="form-group">
                <input
                  className={
                    hasError('url')
                      ? 'form-control is-invalid'
                      : 'form-control'
                  }
                  type="text"
                  placeholder="https://..."
                  onChange={handleUrlChange}
                />
                {hasError('url') ? (
                  <small className="text-danger font-weight-bold">
                    Please ensure this URL is correct and includes the https protocol
                  </small>
                ) : (
                  ''
                )}
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
                  checkedMP3 ? 'btn btn-format active' : 'btn btn-light'
                }
              >
                <input
                  type="radio"
                  name="mp3"
                  id="mp3"
                  value="mp3"
                  onClick={handleRadioClickMP3}
                />
                MP3
              </label>
              <label
                htmlFor="mp4"
                className={
                  checkedMP4 ? 'btn btn-format active' : 'btn btn-light'
                }
              >
                <input
                  type="radio"
                  name="mp4"
                  id="mp4"
                  value="mp4"
                  onClick={handleRadioClickMP4}
                />
                MP4
              </label>
            </div>
            <div className="col-12">
              {hasError('itag') ? (
                <small className="text-danger font-weight-bold">
                  Please select a format
                </small>
              ) : (
                ''
              )}
            </div>
          </div>
          <div className="row justify-content-center align-items-center">
            <div className="col-lg-12 btn-container">
              <button
                type="submit"
                className="btn btn-lg btn-download btn-block text-center"
              >
                <svg
                  width="1em"
                  height="1em"
                  viewBox="0 0 16 16"
                  className="bi bi-download mx-2"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"
                  />
                  <path
                    fillRule="evenodd"
                    d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"
                  />
                </svg>
                Download
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
