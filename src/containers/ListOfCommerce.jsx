import React from 'react'

// Import components
import Card from '../components/card/Card'

const ListOfCommerce = props => {
  const { navigate } = props.navigation
  console.log(props.data)
  return (
    <>
      {props.data.commerces.map((commerce, index) => (
        <Card
          key={index}
          name={commerce.namecommerce}
          description={commerce.address}
          sourceLogo={{ uri: commerce.url_logo }}
          sourceImage={{ uri: commerce.url_art }}
          onPress={() => navigate('ProfileCommerce', { commerce: commerce })}
        />
      ))}
    </>
  )
}

export default ListOfCommerce
