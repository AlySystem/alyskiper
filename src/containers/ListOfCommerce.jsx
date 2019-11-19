import React from 'react'
import { FlatList, View, Text } from 'react-native'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { useSelector } from 'react-redux'

// Import components
import Card from '../components/card/Card'

// Import query
import { COMMERCERS } from '../graphql/querys/Querys'

// Import mutations
import { ADDFAVORITE } from '../graphql/mutations/Mutations'

// Import theme
import { Theme } from '../constants/Theme'

// Import skeleton
import SkeletonProduct from '../skeleton/SkeletonProduct'

const ListOfCommerce = props => {
  const { navigate } = props.navigation
  const { latitude, longitude } = props.location
  const { categoryId } = props
  const { userId } = useSelector(state => state.user)
  const [AddFavorite] = useMutation(ADDFAVORITE)
  const { loading, data, error } = useQuery(COMMERCERS, { variables: { latitud: latitude, longitud: longitude, radio: 40000, id_category_product: categoryId } })

  if (loading) return <SkeletonProduct />
  if (error) {
    return (
      <View style={{
        flex: 1,
        backgroundColor: Theme.COLORS.colorMainAlt,
        justifyContent: 'center',
        alignItems: 'center'
      }}
      >
        <Text style={{
          color: Theme.COLORS.colorParagraph,
          fontFamily: 'Lato-Regular'
        }}
        >SERVER INTERNAL ERROR
        </Text>
      </View>
    )
  }

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
