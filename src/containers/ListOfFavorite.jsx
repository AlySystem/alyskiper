import React from 'react'
import {
  FlatList,
  View,
  StyleSheet
} from 'react-native'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { useSelector } from 'react-redux'

// Import components
import Card from '../components/card/Card'
import Favorite from '../components/favorite/Favorite'
import Title from '../components/title/Title'

// Import theme
import { Theme } from '../constants/Theme'

// Import querys
import { GETFAVORITE } from '../graphql/querys/Querys'

// Import mutation
import { REMOVEFAVORITE } from '../graphql/mutations/Mutations'

// Import skeleton
import SkeletonFavorite from '../skeleton/SkeletonFavorite'

const ListOfFavorite = () => {
  const { userId } = useSelector(state => state.user)
  const { data, loading } = useQuery(GETFAVORITE, { variables: { id_user: userId } })
  const [RemoveFavorite] = useMutation(REMOVEFAVORITE)

  if (loading) return <SkeletonFavorite />

  return (
    <View style={styles.container}>
      <Title
        title='Favoritos'
        styles={styles.title}
      />
      <FlatList
        horizontal
        data={data.getAllCommerceFavoriteByUserId}
        renderItem={({ item }) => (
          <Favorite
            name={item.skiperCommerce.namecommerce}
            sourceLogo={{ uri: item.skiperCommerce.url_logo }}
            sourceImage={{ uri: item.skiperCommerce.url_art }}
            onPress={() => {}}
            onPressFavorite={() => RemoveFavorite({ variables: { user_id: userId } })}
          />
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  title: {
    color: Theme.COLORS.colorSecondary,
    fontSize: Theme.SIZES.title,
    fontFamily: 'Lato-Bold'
  }
})

export default ListOfFavorite
