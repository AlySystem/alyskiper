import React from 'react'
import { FlatList, Text } from 'react-native'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { useSelector, useDispatch } from 'react-redux'

// Import components
import Card from '../components/card/Card'

// Import containers
import ListEmpty from '../containers/ListEmpty'

// Import query
import { COMMERCERS } from '../graphql/querys/Querys'

// Import mutations
import { ADDFAVORITE } from '../graphql/mutations/Mutations'

// Import skeleton
import SkeletonProduct from '../skeleton/SkeletonProduct'

// Import actions types
import { FAVORITE } from '../store/actionTypes'

const ListOfCommerce = props => {
  const { navigate } = props.navigation
  const dispatch = useDispatch()
  const region = useSelector(state => state.location)
  const { userId } = useSelector(state => state.user)
  const [AddFavorite] = useMutation(ADDFAVORITE)
  const { loading, data } = useQuery(COMMERCERS, { variables: { latitud: region.latitude, longitud: region.longitude, radio: 40000, id_category_product: props.categoryId } })

  if (loading) return <SkeletonProduct />

  const handleOnFavorite = (idCommerce) => {
    console.log(idCommerce)
    return AddFavorite({ variables: { input: { user_id: userId, commerce_id: idCommerce } } })
  }

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
          onPressFavorite={() => handleOnFavorite(item.id)}
          icon={}
        />
      )}
      keyExtractor={(item, index) => index.toString()}
    />
  )
}

export default ListOfCommerce
