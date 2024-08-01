import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Coin from './Coin';
import CoinHeader from './CoinHeader';

function App() {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState('');
  const [sortCriteria, setSortCriteria] = useState('market_cap_desc');

  useEffect(() => {
    axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en')
      .then(res => {
        setCoins(res.data);
        console.log(res.data);
      })
      .catch(error => console.log(error));
  }, []);

  const handleChange = e => {
    setSearch(e.target.value);
  };

  const handleSortChange = e => {
    setSortCriteria(e.target.value);
  };

  const filteredCoins = coins.filter(coin =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );

  const sortedCoins = [...filteredCoins].sort((a, b) => {
    switch (sortCriteria) {
      case 'price_asc':
        return a.current_price - b.current_price;
      case 'price_desc':
        return b.current_price - a.current_price;
      case 'percent_change_asc':
        return a.price_change_percentage_24h - b.price_change_percentage_24h;
      case 'percent_change_desc':
        return b.price_change_percentage_24h - a.price_change_percentage_24h;
      default:
        return 0;
    }
  });

  return (
    <div className='coin-app'>
      <div className='coin-search'>
        <h1 className='coin-text'>Find your right currency</h1>
        <form>
          <input
            className='coin-input'
            type='text'
            onChange={handleChange}
            placeholder='Search'
          />
          <select className='coin-select' onChange={handleSortChange}>
            <option value="market_cap_desc">high to low Market Cap</option>
            <option value="price_asc">low to high Price</option>
            <option value="price_desc">high to low Price</option>
            <option value="percent_change_asc">lowest Percent Change</option>
            <option value="percent_change_desc">highest Percent Change</option>
          </select>
        </form>
      </div>
      <CoinHeader />
      {sortedCoins.map(coin => {
        return (
          <Coin
            key={coin.id}
            name={coin.name}
            price={coin.current_price}
            symbol={coin.symbol}
            marketcap={coin.total_volume}
            volume={coin.market_cap}
            image={coin.image}
            priceChange={coin.price_change_percentage_24h}
          />
        );
      })}
    </div>
  );
}

export default App;
