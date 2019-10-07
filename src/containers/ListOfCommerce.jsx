import React from 'react'

// Import components
import Card from '../components/card/Card'

const ListOfCommerce = props => {
  const { navigate } = props.navigation
  return (
    <>
      {[1, 2, 3, 4, 5].map((item, index) => (
        <Card
          key={index}
          sourceImage={{ uri: 'https://userscontent2.emaze.com/images/50a47c7f-0ab5-4038-af60-a822eec00dd8/652296452549ce574b272fcd57c1fcfc.jpg' }}
          onPress={() => navigate('ProfileCommerce')}
        />
      ))}
    </>
  )
}

export default ListOfCommerce
