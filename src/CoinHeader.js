import React from 'react';
import './CoinHeader.css';

const CoinHeader = () => {
  return (
    <div className='coin-header'>
      <div className='coin-header-row'>
        <div className='coin-header-item'>Name</div>
        <div className='coin-header-item'>Symbol</div>
        <div className='coin-header-item'>Price</div>
        <div className='coin-header-item'>Volume</div>
        <div className='coin-header-item'>Price Change</div>
        <div className='coin-header-item'>Market Cap</div>
      </div>
    </div>
  );
};

export default CoinHeader;
