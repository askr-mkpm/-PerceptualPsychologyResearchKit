import React from 'react';
import './App.scss';

import VectionSlider from './component/VectionSlider';
import VideoRenderer from './component/VideoRenderer';
import ExpTitle from './component/ExpTitle';
// import VideoNum from './component/VideoNum';
// import UrlInput from './component/UrlInput';
import RepeatNum from './component/RepeatNum';
import CreateVideoList from './component/CreateVideoList';
import StartButton from './component/StartButton';
import StopButton from './component/StopButton';
import VectionButton from './component/VectionButton';
import VectionAdress from './component/VectionAdress';
import VectionExport from './component/VectionExport';
import VideoList from './component/VideoList';
import Download from './component/SampleExportExcel';
// import SampleProp from './component/Sampleprop';
import InputUrlList from './component/InputUrlList';
import InputList from './component/InputList';

function App() {
  // const [sampleNum, setSampleNum] = React.useState<number>(0);

  return (
    <div className="App">
      <header>
        PerceptualPsychologyResearchKit(beta)
      </header>
      <div className="bg">
        <main>
          {/* <div>
            <SampleProp sampleNumber={sampleNum} />
          </div> */}
          <div>
            {/* <VideoRenderer /> */}
          </div>
          <div>
            <ExpTitle />
            <InputList />
            {/* <InputUrlList /> */}
            {/* <VideoNum /> */}
            {/* <UrlInput /> */}
            {/* <VideoList /> */}
            {/* <RepeatNum /> */}
            {/* <CreateVideoList /> */}
          </div>
          <div>
            {/* <StartButton />
            <StopButton /> */}
          </div>
          <div>
            {/* <VectionButton /> */}
            {/* <VectionSlider /> */}
          </div>
          <div>
            {/* <VectionAdress /> */}
            {/* <VectionExport /> */}
            {/* <Download /> */}
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
