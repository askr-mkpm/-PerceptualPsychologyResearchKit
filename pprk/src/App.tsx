import React from 'react';
import './App.scss';

import ExpTitle from './component/_old/ExpTitle';
import InputList from './component/InputList';
// import UploadData from './component/UploadData';

function App() {
  return (
    <div className="App">
      <header>
        VectionResearchKit
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
        copylight. Kakeru Ito, SenoLab
      </footer>
    </div>
  );
}

export default App;