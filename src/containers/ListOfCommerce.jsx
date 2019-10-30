import React from 'react'
import { FlatList, Text } from 'react-native'
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
  const { loading, data } = useQuery(COMMERCERS, { variables: { latitud: region.latitude, longitud: region.longitude, radio: 6000 } })

  if (loading) return <SkeletonProduct />

  return (
    <FlatList
      data={data.CommercesIntoRadio}
      renderItem={({ item }) => (
        <Card
          name={item.namecommerce}
          description={item.address}
          sourceLogo={{ uri: item.url_logo }}
          sourceImage={{ uri: item.url_art }}
          onPress={() => navigate('ProfileCommerce', { commerce: item })}
        />
      )}
      keyExtractor={(item, index) => index.toString()}
      ListEmptyComponent={<Text allowFontScaling={false}>No hay comercios</Text>}
    />
  )
}

export default ListOfCommerce
