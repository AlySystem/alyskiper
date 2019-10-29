import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { useSelector } from 'react-redux'

// Import components
import Card from '../components/card/Card'

// Import query
import { COMMERCERS } from '../graphql/querys/Querys'

// Import skeleton
import SkeletonProduct from '../skeleton/SkeletonProduct'

const ListOfCommerce = props => {
  const { navigate } = props.navigation
  const region = useSelector(state => state.location)
  const { loading, data } = useQuery(COMMERCERS, { variables: { latitud: region.latitude, longitud: region.longitude, radio: 6 } })

  return (
    <>
      {loading ? (
        <SkeletonProduct />
      ) : data.CommercesIntoRadio.map((commerce, index) => (
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
