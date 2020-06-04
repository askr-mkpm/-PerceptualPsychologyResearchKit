import React from 'react';
import logo from './logo.svg';
import './App.css';

import VectionSlider from './component/VectionSlider';
import VideoRenderer from './component/VideoRenderer';
import ExpTitle from './component/ExpTitle';

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
        <VectionSlider />
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
