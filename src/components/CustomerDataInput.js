import React, { useState } from 'react';
import axios from 'axios';

const CustomerDataInput = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [gender, setGender] = useState('');

  const handleSubmit = async () => {
    if (name.trim() === '' || phone.trim() === '' ||
      address.trim() === '' || gender.trim() === '') {
      window.alert('정확한 데이터를 입력해 주세요!');
      return;
    }

    const postBody = JSON.stringify({
      customerName: name,
      customerPhone: phone,
      customerAddress: address,
      customerGender: gender
    });

    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      await axios.post('http://localhost:5000/api/insert/customer', postBody, config);
      setName('');
      setPhone('');
      setAddress('');
      setGender('');
      window.alert('고객 데이터가 성공적으로 저장되었습니다!');
    } catch (error) {
      console.log(error);
      window.alert('고객 데이터 저장실패.');
    }
  }

  return (
    <fieldset className="input-fieldset">
      <legend className="input-legend">고객 데이터</legend>
      <label>고객이름:&nbsp;
          <input
          type="text"
          className="input-customer-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <label>전화번호:&nbsp;
          <input
          type="text"
          className="input-customer-phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </label>
      <label>주소:&nbsp;
          <input
          type="text"
          className="input-customer-address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </label>
      <label>성별:&nbsp;
          <input
          type="text"
          className="input-customer-gender"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
        />
      </label>
      <button type="button" onClick={handleSubmit}>고객데이터 저장</button>
    </fieldset>
  );
}

export default CustomerDataInput;
