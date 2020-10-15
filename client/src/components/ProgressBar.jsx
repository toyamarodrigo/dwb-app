import React, { useEffect, useState } from 'react';
import { progressBarDownload } from '../api/socket';

export const ProgressBar = ({ btnDownloadFile }) => {
  const [startDownload, setStartDownload] = useState(false);
  useEffect(() => {
    progressBarDownload(setStartDownload);
  });
  return (
    <div className="container progress-bar-container">
      {startDownload ? (
        <div className="display-progressbar">
          <div className="row justify-content-center align-items-center">
            <div className="col-6">
              <small id="download-size" className="float-right py-2"></small>
            </div>
          </div>
          <div className="row justify-content-center align-items-center">
            <div className="progress col-6 p-0">
              <div
                id="progress-bar"
                className="progress-bar progress-bar-striped progress-bar-animated bg-info"
                role="progressbar"
                aria-valuenow="70"
                aria-valuemin="0"
                aria-valuemax="100"
              ></div>
            </div>
          </div>
        </div>
      ) : (
        <div className="hide-progressbar">
          <div className="row justify-content-center align-items-center">
            <div className="col-6">
              <small id="download-size" className="float-right py-2"></small>
            </div>
          </div>
          <div className="row justify-content-center align-items-center">
            <div className="progress col-6 p-0">
              <div
                id="progress-bar"
                className="progress-bar progress-bar-striped progress-bar-animated bg-info"
                role="progressbar"
                aria-valuenow="70"
                aria-valuemin="0"
                aria-valuemax="100"
              ></div>
            </div>
          </div>
        </div>
      )}
      <div className="row justify-content-center align-items-center pt-5">
        <div className="col-10 col-md-6 col-lg-5 mx-4 btn-container">
          <div className="row justify-content-center align-items-center">
            <div className="col-12 col-md-6">
              {btnDownloadFile ? (
                <button
                  id="btn-test"
                  className="btn btn-light btn-lg btn-test btn-block text-center display-btn"
                  target="_blank"
                  rel="noopener noreferrer"
                ></button>
              ) : (
                <button
                  id="btn-test"
                  className="btn btn-light btn-lg btn-test btn-block text-center hide-btn"
                  target="_blank"
                  rel="noopener noreferrer"
                ></button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
