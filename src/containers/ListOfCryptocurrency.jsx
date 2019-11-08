import React from 'react'

// Import components
import ItemCommission from '../components/item/ItemCommission'

const items = [
  {
    key: 1,
    img: require('../../assets/images/img-logo-alycoin-alt.png'),
    name: 'Alycoin',
    symbol: 'ALY',
    price: 1,
    percent_change: 0.30
  },
  {
    key: 2,
    img: require('../../assets/images/img-logo-bitcoin.png'),
    name: 'Bitcoin',
    symbol: 'BTC',
    price: 8030,
    percent_change: 1.80
  },
  {
    key: 3,
    img: require('../../assets/images/img-logo-dash.png'),
    name: 'Dash',
    symbol: 'DASH',
    price: 120,
    percent_change: 1.0
  },
  {
    key: 4,
    img: require('../../assets/images/img-logo-ethereum.png'),
    name: 'Ethereum',
    symbol: 'ETH',
    price: 140,
    percent_change: 0.90
  },
  {
    key: 5,
    img: require('../../assets/images/img-logo-litecoin.png'),
    name: 'Litecoin',
    symbol: 'LTC',
    price: 180,
    percent_change: 1.20
  }
]

const ListOfCryptocurrency = props => {
  // const urls = [
  //   'https://api.coinmarketcap.com/v1/ticker/bitcoin/',
  //   'https://api.coinmarketcap.com/v1/ticker/litecoin/',
  //   'https://api.coinmarketcap.com/v1/ticker/ethereum/',
  //   'https://api.coinmarketcap.com/v1/ticker/dash/'
  // ]
  // Promise.all(urls.map(url =>
  //   fetch(url).then(resp => resp.json())
  // )).then(texts => {
  //   console.log(texts)
  // })

  return (
    <>
      {items.map(item => (
        <ItemCommission
          key={item.key}
          name={item.name}
          symbol={item.symbol}
          source={item.img}
          price={item.price}
          percent_change={item.percent_change}
        />
      ))}
    </>
  )
}

export default ListOfCryptocurrency
