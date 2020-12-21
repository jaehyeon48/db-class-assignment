import React from 'react';
import './App.css';

import GuiInput from './components/GuiInput';
import FileInput from './components/FileInput';

const App = () => {
  return (
    <section className="input-page">
      <h1 className="main-header">201629115 김재현 데이터베이스 과제 사이트</h1>
      <GuiInput />
      <FileInput />
    </section>
  );
}

export default App;
