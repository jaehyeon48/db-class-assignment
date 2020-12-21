import React, { useState } from 'react';
import axios from 'axios';

import SearchLoadingSpinner from '../search-loading-spinner.gif';

const TransactionDataSearch = () => {
  const [transactionData, setTransactionData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearchAllTransactionData = async () => {
    setIsLoading(true);
    try {
      const searchRes = await axios.get('http://localhost:5000/api/search/transaction/all');
      setTransactionData(searchRes.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  const handleSearchAllTransactionNumber = async () => {
    setIsLoading(true);
    try {
      const searchRes = await axios.get('http://localhost:5000/api/search/transaction/number');
      setTransactionData(searchRes.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  const handleSearchAllProductId = async () => {
    setIsLoading(true);
    try {
      const searchRes = await axios.get('http://localhost:5000/api/search/transaction/productId');
      setTransactionData(searchRes.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  const handleSearchAllTransactionPrice = async () => {
    setIsLoading(true);
    try {
      const searchRes = await axios.get('http://localhost:5000/api/search/transaction/price');
      setTransactionData(searchRes.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  const handleSearchAllTransactionDate = async () => {
    setIsLoading(true);
    try {
      const searchRes = await axios.get('http://localhost:5000/api/search/transaction/date');
      setTransactionData(searchRes.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  const handleSearchAllCustomerName = async () => {
    setIsLoading(true);
    try {
      const searchRes = await axios.get('http://localhost:5000/api/search/transaction/customerName');
      setTransactionData(searchRes.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="transaction-search">
      <div className="transaction-search-btns">
        <button
          type="button"
          className="search-btn"
          onClick={handleSearchAllTransactionData}
        >전체 거래 데이터 검색</button>
        <button
          type="button"
          className="search-btn"
          onClick={handleSearchAllTransactionNumber}
        >전체 거래번호 검색</button>
        <button
          type="button"
          className="search-btn"
          onClick={handleSearchAllProductId}
        >전체 거래 상품번호 검색</button>
        <button
          type="button"
          className="search-btn"
          onClick={handleSearchAllTransactionPrice}
        >전체 거래 가격 검색</button>
        <button
          type="button"
          className="search-btn"
          onClick={handleSearchAllTransactionDate}
        >전체 거래일자 검색</button>
        <button
          type="button"
          className="search-btn"
          onClick={handleSearchAllCustomerName}
        >전체 거래 고객 검색</button>
      </div>
      <div className="transaction-result">
        {isLoading ? (
          <img
            className="search-loading-spinner"
            src={SearchLoadingSpinner}
            alt="search loading spinner"
          />
        ) : (
            <React.Fragment>
              {transactionData && transactionData.length > 0 ? (
                <table>
                  <thead>
                    <tr>
                      {transactionData[0].transactionNumber && <th>TransactionNumber</th>}
                      {transactionData[0].productId && <th>ProductId</th>}
                      {transactionData[0].price && <th>Price</th>}
                      {transactionData[0].date && <th>Date</th>}
                      {transactionData[0].customerName && <th>CustomerName</th>}
                    </tr>
                  </thead>
                  <tbody>
                    {transactionData.map((data, i) => (
                      <tr key={i}>
                        {data.transactionNumber && <td>{data.transactionNumber}</td>}
                        {data.productId && <td>{data.productId}</td>}
                        {data.price && <td>{data.price}</td>}
                        {data.date && <td>{data.date.slice(0, 10)}</td>}
                        {data.customerName && <td>{data.customerName}</td>}
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : <p className="no-data-notice">데이터가 없습니다.</p>}
            </React.Fragment>
          )}
      </div>
    </div>
  );
}

export default TransactionDataSearch;
