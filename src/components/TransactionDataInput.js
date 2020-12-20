import React, { useState } from 'react';
import axios from 'axios';

const TransactionDataInput = () => {
  const [tid, setTid] = useState('');
  const [pid, setPid] = useState('');
  const [price, setPrice] = useState('');
  const [date, setDate] = useState('');
  const [customerName, setCustomerName] = useState('');

  const handleSubmit = async () => {
    if (tid.trim() === '' || pid.trim() === '' || price.trim() === '' ||
      date.trim() === '' || customerName.trim() === '') {
      window.alert('정확한 데이터를 입력해 주세요!');
      return;
    }

    const postBody = JSON.stringify({
      transactionNumber: tid,
      productId: pid,
      price,
      date,
      customerName
    });

    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      await axios.post('http://localhost:5000/api/insert/transaction', postBody, config);
      setTid('');
      setPid('');
      setPrice('');
      setDate('');
      setCustomerName('');
      window.alert('거래 데이터가 성공적으로 저장되었습니다!');
    } catch (error) {
      console.log(error);
      window.alert('거래 데이터 저장실패.');
    }
  }

  return (
    <fieldset className="input-fieldset">
      <legend className="input-legend">거래 데이터</legend>
      <label>거래번호:&nbsp;
          <input
          type="text"
          className="input-transaction-id"
          value={tid}
          onChange={(e) => setTid(e.target.value)}
        />
      </label>
      <label>상품번호:&nbsp;
          <input
          type="text"
          className="input-transaction-product-id"
          value={pid}
          onChange={(e) => setPid(e.target.value)}
        />
      </label>
      <label>가격:&nbsp;
          <input
          type="text"
          className="input-transaction-price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </label>
      <label>날짜:&nbsp;
          <input
          type="date"
          className="input-transaction-date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </label>
      <label>고객이름:&nbsp;
          <input
          type="text"
          className="input-transaction-customer-name"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
        />
      </label>
      <button type="button" onClick={handleSubmit}>거래데이터 저장</button>
    </fieldset>
  );
}

export default TransactionDataInput;
