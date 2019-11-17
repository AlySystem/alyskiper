import React from 'react'
import { FlatList, View } from 'react-native'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { useSelector } from 'react-redux'

// Import components
import Card from '../components/card/Card'

// Import query
import { COMMERCERS } from '../graphql/querys/Querys'

// Import mutations
import { ADDFAVORITE } from '../graphql/mutations/Mutations'

// Import skeleton
import SkeletonProduct from '../skeleton/SkeletonProduct'

const ListOfCommerce = props => {
  const { navigate } = props.navigation
  const { latitude, longitude, categoryId } = props.location
  const { userId } = useSelector(state => state.user)
  const [AddFavorite] = useMutation(ADDFAVORITE)
  const { loading, data } = useQuery(COMMERCERS, { variables: { latitud: latitude, longitud: longitude, radio: 40000, id_category_product: categoryId } })

  if (loading) return <SkeletonProduct />

  const handleOnFavorite = (idCommerce) => {
    return AddFavorite({ variables: { input: { user_id: userId, commerce_id: idCommerce } } })
  }

  const renderItem = (item) => {
    return (
      <View
        style={{
          width: '100%'
        }}
      >
        <Card
          name={`${item.namecommerce}`}
          description={item.address}
          sourceLogo={{ uri: item.url_logo }}
          sourceImage={{ uri: item.url_art }}
          onPress={() => navigate('ProfileCommerce', { commerce: item })}
          onPressFavorite={() => handleOnFavorite(item.id)}
          icon=''
        />
      </View>
    )
  }

  return (
    <View>
      <FlatList
        data={data.CommercesIntoRadio}
        renderItem={({ item }) => renderItem(item)}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  )
}

export default ListOfCommerce
