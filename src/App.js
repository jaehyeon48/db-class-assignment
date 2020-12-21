import React from 'react';
import './App.css';

import GuiInput from './components/GuiInput';
import FileInput from './components/FileInput';
import CustomerDataSearch from './components/CustomerDataSearch';
import ProductDataSearch from './components/ProductDataSearch';
import TransactionDataSearch from './components/TransactionDataSearch';

const App = () => {
  return (
    <React.Fragment>
      <h1 className="main-header">201629115 김재현 데이터베이스 과제 사이트</h1>
      <section className="input-page">
        <header className="input-page-header">데이터 입력</header>
        <GuiInput />
        <FileInput />
      </section>
      <section className="search-page">
        <header className="search-page-header">데이터 검색</header>
        <CustomerDataSearch />
        <ProductDataSearch />
        <TransactionDataSearch />
      </section>
    </React.Fragment>
  );
}

export default App;
