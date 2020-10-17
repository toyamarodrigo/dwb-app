import React, { useEffect, useState } from 'react';
import { progressBarDownload } from '../api/socket';

export const ProgressBar = ({ btnDownloadFile }) => {
  const [startDownload, setStartDownload] = useState(false);
  useEffect(() => {
    progressBarDownload(setStartDownload);
  }, []);
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
            <div className="col-12 col-md-7">
              {btnDownloadFile ? (
                <button
                  id="btn-test"
                  className="btn btn-light btn-lg btn-test btn-block text-center display-btn"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg
                    width="1em"
                    height="1em"
                    viewBox="0 0 16 16"
                    className="bi bi-file-earmark-arrow-down mx-2 align-items-center"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M4 0h5.5v1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5h1V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2z" />
                    <path d="M9.5 3V0L14 4.5h-3A1.5 1.5 0 0 1 9.5 3z" />
                    <path
                      fillRule="evenodd"
                      d="M8 6a.5.5 0 0 1 .5.5v3.793l1.146-1.147a.5.5 0 0 1 .708.708l-2 2a.5.5 0 0 1-.708 0l-2-2a.5.5 0 1 1 .708-.708L7.5 10.293V6.5A.5.5 0 0 1 8 6z"
                    />
                  </svg>
                  Download file
                </button>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
