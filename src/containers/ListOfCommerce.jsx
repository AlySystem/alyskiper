import React from 'react'
import { useQuery } from '@apollo/react-hooks'

// Import querys
import { COMMERCERS } from '../graphql/querys/Querys'

// Import components
import Card from '../components/card/Card'

// Import skeleton
import Skeleton from '../skeleton/SkeletonCommerce'

const ListOfCommerce = props => {
  const { navigate } = props.navigation
  const { loading, data } = useQuery(COMMERCERS, { variables: { latitud: props.region.latitude, longitud: props.region.longitude } })

  return (
    <>
      {loading ? (
        <Skeleton />
      ) : (
        data.CommercesIntoRadio.map((commerce, index) => (
          <Card
            key={index}
            name={commerce.namecommerce}
            description={commerce.address}
            sourceLogo={{ uri: commerce.url_logo }}
            sourceImage={{ uri: commerce.url_art }}
            onPress={() => navigate('ProfileCommerce', { commerce: commerce })}
          />
        ))
      )}
    </>
  )
}

export default ListOfCommerce
