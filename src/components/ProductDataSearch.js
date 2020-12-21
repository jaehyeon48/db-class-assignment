import React, { useState } from 'react';
import axios from 'axios';

import SearchLoadingSpinner from '../search-loading-spinner.gif';

const ProductDataSearch = () => {
  const [productData, setProductData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearchAllProductData = async () => {
    setIsLoading(true);
    try {
      const searchRes = await axios.get('http://localhost:5000/api/search/product/all');
      setProductData(searchRes.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  }
  const handleSearchAllProductId = async () => {
    setIsLoading(true);
    try {
      const searchRes = await axios.get('http://localhost:5000/api/search/product/id');
      setProductData(searchRes.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  const handleSearchAllSupplierName = async () => {
    setIsLoading(true);
    try {
      const searchRes = await axios.get('http://localhost:5000/api/search/product/supplier');
      setProductData(searchRes.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="product-search">
      <div className="product-search-btns">
        <button
          type="button"
          className="search-btn"
          onClick={handleSearchAllProductData}
        >전체 제품 데이터 검색</button>
        <button
          type="button"
          className="search-btn"
          onClick={handleSearchAllProductId}
        >전체 제품 번호 검색</button>
        <button
          type="button"
          className="search-btn"
          onClick={handleSearchAllSupplierName}
        >전체 제품 공급업자 검색</button>
      </div>
      <div className="product-result">
        {isLoading ? (
          <img
            className="search-loading-spinner"
            src={SearchLoadingSpinner}
            alt="search loading spinner"
          />
        ) : (
            <React.Fragment>
              {productData && productData.length > 0 ? (
                <table>
                  <thead>
                    <tr>
                      {productData[0].name && <th>Name</th>}
                      {productData[0].productId && <th>ProductId</th>}
                      {productData[0].supplierName && <th>SupplierName</th>}
                    </tr>
                  </thead>
                  <tbody>
                    {productData.map((data, i) => (
                      <tr key={i}>
                        {data.name && <td>{data.name}</td>}
                        {data.productId && <td>{data.productId}</td>}
                        {data.supplierName && <td>{data.supplierName}</td>}
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

export default ProductDataSearch;
