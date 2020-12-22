import React, { useState } from 'react';
import axios from 'axios';

import conditionSearchSpinner from '../condition-search-spinner.gif';

const ConditionSearch = () => {
  const [itemsWomenBoughtMore, setItemsWomenBoughtMore] = useState([]);
  const [isIwbmLoading, setIsIwbmLoading] = useState(false);
  const [mostTransactedDate, setMostTransactedDate] = useState('');
  const [mostTransactedNumber, setMostTransactedNumber] = useState('');
  const [mostTransactedResult, setMostTransactedResult] = useState([]);
  const [isMtLoading, setIsMtLoading] = useState(false);
  const [moreThanMResult, setMoreThanMResult] = useState([]);
  const [cbmmNumber, setCbmmNumber] = useState('');
  const [isCbmmLoading, setIsCbmmLoading] = useState(false);


  const getItemsWomenBoughtMore = async () => {
    setIsIwbmLoading(true);
    try {
      const res = await axios.get('https://db-assignment-project.herokuapp.com/api/condition/iwbm');
      setItemsWomenBoughtMore(res.data);
      setIsIwbmLoading(false);
    } catch (error) {
      console.log(error);
      setIsIwbmLoading(false);
    }
  }

  const getMostTransactionItems = async () => {
    if (mostTransactedDate === '' || mostTransactedNumber === '') {
      window.alert('검색 조건을 입력해 주세요!');
      return;
    }
    try {
      setIsMtLoading(true);
      const res = await axios.get(`https://db-assignment-project.herokuapp.com/api/condition/most-transaction?mtd=${mostTransactedDate}&mtn=${mostTransactedNumber}`);
      setMostTransactedResult(res.data);
      setIsMtLoading(false);
    } catch (error) {
      console.log(error);
      setIsMtLoading(false);
    }
  }

  const getCustomersBoughtMoreThanM = async () => {
    if (cbmmNumber === '') {
      window.alert('검색 조건을 입력해 주세요!');
      return;
    }
    try {
      setIsCbmmLoading(true);
      const res = await axios.get(`https://db-assignment-project.herokuapp.com/api/condition/more-than-m?m=${cbmmNumber}`);
      setMoreThanMResult([...Object.keys(res.data)].sort());
      setIsCbmmLoading(false);
    } catch (error) {
      console.log(error);
      setIsCbmmLoading(false);
    }
  }

  return (
    <div className="condition-search">
      <div className="iwbm-result">
        <button
          type="button"
          className="iwbm-btn"
          onClick={getItemsWomenBoughtMore}
        >남자보다 여자가 많이 산 상품의 이름 검색</button>
        <fieldset>
          <legend>남자보다 여자가 많이 산 상품의 이름</legend>
          {isIwbmLoading ? (
            <img src={conditionSearchSpinner} alt="spinner" />
          ) : (
              <React.Fragment>
                {itemsWomenBoughtMore.map((item, i) => (
                  <span
                    key={i}
                    className="iwbm-item"
                  >{item}</span>
                ))}
              </React.Fragment>
            )}
        </fieldset>
      </div>
      <div className="most-transacted-result">
        <form>
          <input
            type="date"
            className="most-transacted-field"
            value={mostTransactedDate}
            onChange={(e) => setMostTransactedDate(e.target.value)}
          />
          &nbsp;일 이전에 가장 많은 거래(금액기준)가 이루어진&nbsp;
          <input
            type="number"
            className="most-transacted-field"
            value={mostTransactedNumber}
            onChange={(e) => setMostTransactedNumber(e.target.value)}
          />
          &nbsp; 가지 상품 &nbsp;
          <button type="button" onClick={getMostTransactionItems}>검색</button>
        </form>
        <fieldset>
          <legend>주어진 날 이전에 가장 많은 거래(금액기준)가 이루어진 k 가지 상품</legend>
          {isMtLoading ? (
            <img src={conditionSearchSpinner} alt="spinner" />
          ) : (
              <React.Fragment>
                {mostTransactedResult.map((data, i) => (
                  <span
                    key={i}
                    className="mt-item"
                  >{data.name}, ${data.total}</span>
                ))}
              </React.Fragment>
            )}
        </fieldset>
      </div>
      <div className="cbmm-result">
        <form>
          하나의 공급업자로부터 &nbsp;
          <input
            type="number"
            className="cbmm-field"
            value={cbmmNumber}
            onChange={(e) => setCbmmNumber(e.target.value)}
          />
          &nbsp; 번 이상 제품을 산 고객의 이름&nbsp;
          <button type="button" onClick={getCustomersBoughtMoreThanM}>검색</button>
        </form>
        <fieldset>
          <legend>하나의 공급업자로부터 m번 이상 제품을 산 고객의 이름</legend>
          {isCbmmLoading ? (
            <img src={conditionSearchSpinner} alt="spinner" />
          ) : (
              <React.Fragment>
                {moreThanMResult.map((data, i) => (
                  <span
                    key={i}
                    className="cbmm-item"
                  >{data}</span>
                ))}
              </React.Fragment>
            )}
        </fieldset>
      </div>
    </div>
  );
}

export default ConditionSearch;
