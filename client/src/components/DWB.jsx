import React from 'react';
import { downloadFile } from '../api/index';

export const DWB = ({
  url,
  setUrl,
  checked,
  setChecked,
  itag,
  setItag,
  setdisplayProgressBar,
}) => {
  const handleUrlChange = (e) => {
    setUrl(e.target.value);
  };

  const handleRadioClick = () => {
    checked ? setItag('mp4') : setItag('mp3');
    setChecked(!checked);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    downloadFile(url, itag, setdisplayProgressBar);
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
                className={checked ? 'btn btn-danger active' : 'btn btn-light'}
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
                className={!checked ? 'btn btn-danger active' : 'btn btn-light'}
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
  );
};
