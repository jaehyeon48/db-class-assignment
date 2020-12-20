import React from 'react';

import CustomerDataInput from './CustomerDataInput';
import ProductDataInput from './ProductDataInput';
import TransactionDataInput from './TransactionDataInput';

const GuiInput = () => {
  return (
    <div className="gui-input">
      <p className="gui-input-header">GUI로 입력하기</p>
      <CustomerDataInput />
      <ProductDataInput />
      <TransactionDataInput />
    </div>
  );
}

export default GuiInput;
