import React, { useState, useEffect } from 'react';
import { DWB, ProgressBar, Footer } from './components/index';

import './App.scss';

function App() {
  const [url, setUrl] = useState('');
  const [itag, setItag] = useState('mp3');
  const [checked, setChecked] = useState(true);
  const [displayProgressBar, setdisplayProgressBar] = useState(false);

  // useEffect(() => {
  //   console.log(url);
  //   console.log(itag);
  // }, [url, itag]);

  return (
    <div className="App">
      <div className="container">
        <div className="row justify-content-center align-items-center vertical-center">
          <div className="col-12">
            <DWB
              url={url}
              setUrl={setUrl}
              checked={checked}
              setChecked={setChecked}
              itag={itag}
              setItag={setItag}
              setdisplayProgressBar={setdisplayProgressBar}
            />
            {!displayProgressBar ? '' : <ProgressBar />}
          </div>
        </div>
        <div className="row justify-content-center align-items-center">
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default App;
