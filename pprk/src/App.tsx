import React from 'react';
import './App.scss';

import ExpTitle from './component/_old/ExpTitle';
import InputList from './component/InputList';
// import UploadData from './component/UploadData';

function App() {
  return (
    <div className="App">
      <header>
        PerceptualPsychologyResearchKit(beta)
      </header>
      <div className="bg">
        <main>
          <div>
            {/* <ExpTitle /> */}
            <InputList />
            {/* <VideoList /> */}
            {/* <UploadData /> */}
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