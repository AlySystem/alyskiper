import React, { useEffect } from 'react'
import {
  FlatList,
  Text,
  View,
  TouchableOpacity,
  StyleSheet
} from 'react-native'
import { useQuery } from '@apollo/react-hooks'
import { useSelector, useDispatch } from 'react-redux'

// Import query
import { GETALLADDRESS } from '../graphql/querys/Querys'

// Import actions types
import { ADDRESS } from '../store/actionTypes'

// Import components
import Loader from '../components/loader/Loader'
import { LazyImage } from '../components/lazy/LazyImage'

// Import theme
import { Theme } from '../constants/Theme'

const ListOfAddress = props => {
  const dispatch = useDispatch()
  const { userId } = useSelector(state => state.user)
  const { loading, error, data } = useQuery(GETALLADDRESS, { variables: { id: userId } })

  useEffect(() => {
    const verifyData = () => {
      if (!loading) {
        dispatch({
          type: ADDRESS,
          payload: data.getUsersAddressByUser.length === 0 ? { flag: false } : { address: data.getUsersAddressByUser, flag: true }
        })
      }
    }
    verifyData()
  }, [loading])

  if (loading) {
    return (
      <View style={{
        flexGrow: 1,
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

  return (
    <FlatList
      data={data.getUsersAddressByUser}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.container}
          onPress={props.result ? () => props.handleResult(item) : () => {}}
        >
          <LazyImage
            styleLazyImage={{
              width: 40,
              height: 40,
              resizeMode: 'contain'
            }}
            sourceLazy={require('../../assets/images/img-lazy.png')}
            source={{ uri: item.catplaceuser.url_img }}
            styleImage={{
              width: 40,
              height: 40,
              resizeMode: 'contain'
            }}
          />

          <View style={{
            marginLeft: 10
          }}
          >
            <Text allowFontScaling={false} style={styles.title}>{item.catplaceuser.name}</Text>
            <View style={{ paddingVertical: 2 }} />
            <Text allowFontScaling={false} style={styles.description}>{item.address}</Text>
          </View>
        </TouchableOpacity>
      )}
      keyExtractor={(item, index) => index.toString()}
      ListEmptyComponent={
        <Text style={{
          color: Theme.COLORS.colorSecondary,
          fontFamily: 'Lato-Regular',
          fontSize: Theme.SIZES.small
        }}
        >No tienes direcciones agregadas
        </Text>
      }
    />
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 20,
    borderBottomColor: Theme.COLORS.colorSecondary,
    borderBottomWidth: 0.2,
    borderRadius: 200,
    width: '100%'
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
