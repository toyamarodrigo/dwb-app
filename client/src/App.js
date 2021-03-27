import React, { useState } from 'react';
import { DWB, Footer } from './components/index';

import './App.scss';

function App() {
  const [url, setUrl] = useState('');
  const [itag, setItag] = useState('');
  const [checkedMP3, setCheckedMP3] = useState(false);
  const [checkedMP4, setCheckedMP4] = useState(false);

  return (
    <div className="App">
      <div className="container">
        <div className="row justify-content-center align-items-center vertical-center">
          <div className="col-12">
            <DWB
              url={url}
              setUrl={setUrl}
              checkedMP3={checkedMP3}
              setCheckedMP3={setCheckedMP3}
              checkedMP4={checkedMP4}
              setCheckedMP4={setCheckedMP4}
              itag={itag}
              setItag={setItag}
            />
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
