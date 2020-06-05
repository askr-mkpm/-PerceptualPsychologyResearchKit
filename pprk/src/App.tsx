import React from 'react';
import logo from './logo.svg';
import './App.scss';

import VectionSlider from './component/VectionSlider';
import VideoRenderer from './component/VideoRenderer';
import ExpTitle from './component/ExpTitle';
import VideoNum from './component/VideoNum';
import UrlInput from './component/UrlInput';
import RepeatNum from './component/RepeatNum';
import StartButton from './component/StartButton';
import StopButton from './component/StopButton';
import VectionButton from './component/VectionButton';
import VectionAdress from './component/VectionAdress';
import VectionExport from './component/VectionExport';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div>
          <ExpTitle />
        </div>
      <div>
        <VideoRenderer />
      </div>
      <div>
        <VideoNum />
        <UrlInput />
        <RepeatNum />
      </div>
      <div>
        <StartButton />
        <StopButton />
      </div>
      <div>
        <VectionButton />
        <VectionSlider />
      </div>
      <div>
        <VectionAdress />
        <VectionExport />
      </div>
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
