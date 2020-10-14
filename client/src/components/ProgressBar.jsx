import React, { useEffect } from 'react';
import { progressBarDownload } from '../api/socket';

export const ProgressBar = ({ btnDownloadFile, setBtnDownloadFile }) => {
  useEffect(() => {
    progressBarDownload(setBtnDownloadFile);
  });
  return (
    <div className="container progress-bar-container">
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
      <div className="row justify-content-center align-items-center pt-5">
        <div className="col-10 col-md-6 col-lg-5 btn-container">
          <div className="row justify-content-center align-items-center">
            <div className="col-lg-12">
              {btnDownloadFile ? (
                <button
                  id="btn-test"
                  className="btn btn-light btn-lg btn-test btn-block text-center"
                  target="_blank"
                  rel="noopener noreferrer"
                ></button>
              ) : (
                ''
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
