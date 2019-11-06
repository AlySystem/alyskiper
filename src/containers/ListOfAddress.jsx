import React from 'react'
import {
  FlatList,
  Text,
  View,
  TouchableOpacity,
  StyleSheet
} from 'react-native'
import { useQuery } from '@apollo/react-hooks'
import { useDispatch, useSelector } from 'react-redux'

// Import query
import { GETALLADDRESS } from '../graphql/querys/Querys'

// Import action types
import { ADDRESS } from '../store/actionTypes'

// Import components
import Loader from '../components/loader/Loader'
import Picture from '../components/picture/Picture'

// Import theme
import { Theme } from '../constants/Theme'

const ListOfAddress = props => {
  const dispatch = useDispatch()
  const { userId } = useSelector(state => state.user)
  const { loading, error, data } = useQuery(GETALLADDRESS, { variables: { id: userId } })

  if (loading) {
    return (
      <View style={{
        backgroundColor: Theme.COLORS.colorMainAlt,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      }}
      >
        <Loader />
      </View>
    )
  }

  if (error) {
    return (
      <View style={{
        backgroundColor: Theme.COLORS.colorMainAlt,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      }}
      >
        <Text style={{
          color: Theme.COLORS.colorParagraph,
          fontFamily: 'Lato-Regular',
          fontSize: Theme.SIZES.normal
        }}
        >{error.graphQLErrors[0].message}
        </Text>
      </View>
    )
  }

  if (data.getUsersAddressById) {
    dispatch({
      type: ADDRESS,
      payload: {
        address: data.getUsersAddressById
      }
    })
  }

  return (
    <FlatList
      data={data.getUsersAddressById}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.container}
          onPress={() => {}}
        >
          <Picture
            source={{ uri: item.catplaceuser.url_img }}
            styles={styles.image}
          />
          <View style={{
            marginLeft: 10
          }}
          >
            <Text allowFontScaling={false} style={styles.title}>{item.catplaceuser.name}</Text>
            <Text allowFontScaling={false} style={styles.description}>{item.address}</Text>
          </View>
        </TouchableOpacity>
      )}
      keyExtractor={(item, index) => index.toString()}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 10
  },
  image: {
    width: 70,
    height: 70,
    resizeMode: 'contain'
  },
  title: {
    fontFamily: 'Lato-Bold',
    fontSize: Theme.SIZES.small,
    color: Theme.COLORS.colorSecondary
  },
  description: {
    color: Theme.COLORS.colorParagraphSecondary,
    fontFamily: 'Lato-Regular',
    fontSize: Theme.SIZES.xsmall
  }
})

export default ListOfAddress
