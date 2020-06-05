import React from 'react';
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
      <header>
        PerceptualPsychologyResearchKit(beta)
      </header>
      <div className="bg">
        <main>
          <div>
            <VideoRenderer />
          </div>
          <div>
            <ExpTitle />
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
        </main>
      </div>
      <footer>
        copylight. null
      </footer>
    </div>
  );
}

export default App;
