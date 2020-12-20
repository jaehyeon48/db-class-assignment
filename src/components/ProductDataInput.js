import React, { useState } from 'react';
import axios from 'axios';

const ProductDataInput = () => {
  const [productName, setProductName] = useState('');
  const [pid, setPid] = useState('');
  const [supplierName, setSupplierName] = useState('');

  const handleSubmit = async () => {
    if (productName.trim() === '' || pid.trim() === '' ||
      supplierName.trim() === '') {
      window.alert('정확한 데이터를 입력해 주세요!');
      return;
    }

    const postBody = JSON.stringify({
      productName,
      productId: pid,
      supplierName
    });

    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      await axios.post('http://localhost:5000/api/insert/product', postBody, config);
      setProductName('');
      setPid('');
      setSupplierName('');
      window.alert('상품 데이터가 성공적으로 저장되었습니다!');
    } catch (error) {
      console.log(error);
      window.alert('상품 데이터 저장실패.');
    }
  }

  return (
    <fieldset className="input-fieldset">
      <legend className="input-legend">상품 데이터</legend>
      <label>상품이름:&nbsp;
          <input
          type="text"
          className="input-product-name"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />
      </label>
      <label>상품번호:&nbsp;
          <input
          type="text"
          className="input-product-id"
          value={pid}
          onChange={(e) => setPid(e.target.value)}
        />
      </label>
      <label>공급자이름:&nbsp;
          <input
          type="text"
          className="input-supplier-name"
          value={supplierName}
          onChange={(e) => setSupplierName(e.target.value)}
        />
      </label>
      <button type="button" onClick={handleSubmit}>상품데이터 저장</button>
    </fieldset>
  );
}

export default ProductDataInput;
