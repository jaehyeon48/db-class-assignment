import React, { useState } from 'react';
import axios from 'axios';

import SearchLoadingSpinner from '../search-loading-spinner.gif';

const CustomerDataSearch = () => {
  const [customerData, setCustomerData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearchAllCustomerData = async () => {
    setIsLoading(true);
    try {
      const searchRes = await axios.get('https://db-assignment-project.herokuapp.com/api/search/customer/all');
      setCustomerData(searchRes.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  const handleSearchAllCustomerName = async () => {
    setIsLoading(true);
    try {
      const searchRes = await axios.get('https://db-assignment-project.herokuapp.com/api/search/customer/name');
      setCustomerData(searchRes.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  const handleSearchAllCustomerPhone = async () => {
    setIsLoading(true);
    try {
      const searchRes = await axios.get('https://db-assignment-project.herokuapp.com/api/search/customer/phone');
      setCustomerData(searchRes.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  const handleSearchAllCustomerAddress = async () => {
    setIsLoading(true);
    try {
      const searchRes = await axios.get('https://db-assignment-project.herokuapp.com/api/search/customer/address');
      setCustomerData(searchRes.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  const handleSearchAllCustomerGender = async () => {
    setIsLoading(true);
    try {
      const searchRes = await axios.get('https://db-assignment-project.herokuapp.com/api/search/customer/gender');
      setCustomerData(searchRes.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="customer-search">
      <div className="customer-search-btns">
        <button
          type="button"
          className="search-btn"
          onClick={handleSearchAllCustomerData}
        >전체 고객 데이터 검색</button>
        <button
          type="button"
          className="search-btn"
          onClick={handleSearchAllCustomerName}
        >전체 고객 이름 검색</button>
        <button
          type="button"
          className="search-btn"
          onClick={handleSearchAllCustomerPhone}
        >전체 고객 전화번호 검색</button>
        <button
          type="button"
          className="search-btn"
          onClick={handleSearchAllCustomerAddress}
        >전체 고객 주소 검색</button>
        <button
          type="button"
          className="search-btn"
          onClick={handleSearchAllCustomerGender}
        >전체 고객 성별 검색</button>
      </div>
      <div className="customer-result">
        {isLoading ? (
          <img
            className="search-loading-spinner"
            src={SearchLoadingSpinner}
            alt="search loading spinner"
          />
        ) : (
            <React.Fragment>
              {customerData && customerData.length > 0 ? (
                <table>
                  <thead>
                    <tr>
                      {customerData[0].name && <th>Name</th>}
                      {customerData[0].phone && <th>Phone</th>}
                      {customerData[0].address && <th>Address</th>}
                      {customerData[0].gender && <th>Gender</th>}
                    </tr>
                  </thead>
                  <tbody>
                    {customerData.map((data, i) => (
                      <tr key={i}>
                        {data.name && <td>{data.name}</td>}
                        {data.phone && <td>{data.phone}</td>}
                        {data.address && <td>{data.address}</td>}
                        {data.gender && <td>{data.gender}</td>}
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

export default CustomerDataSearch;
