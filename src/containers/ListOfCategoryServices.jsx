import React, { useState } from 'react'
import {
  StyleSheet,
  Dimensions,
  View,
  Text
} from 'react-native'
import * as Animatable from 'react-native-animatable'
import { Picker } from '@react-native-community/picker'
import { useQuery } from '@apollo/react-hooks'
import { useDispatch } from 'react-redux'

// Import actions
import { DETAILSTRAVEL, LOCATION } from '../store/actionTypes'

// Import querys
import { CATEGORYTRAVEL } from '../graphql/querys/Querys'

// Import theme
import { Theme } from '../constants/Theme'

// Import components
import PriceService from '../components/price/PriceService'
import IconButton from '../components/button/IconButton'
import Background from '../components/background/Background'
import Payment from '../components/payment/Payment'

// Import skeleton
import SkeletonServices from '../skeleton/SkeletonServices'
import Picture from '../components/picture/Picture'

const { height } = Dimensions.get('window')

const ListOfCategoryServices = props => {
  const dispatch = useDispatch()
  const { navigate } = props.navigation
  const { latitude, longitude } = props.location
  const [selectCategory, setSelectCategory] = useState(1)
  const [error, setError] = useState(null)
  const { data, loading } = useQuery(CATEGORYTRAVEL)

  if (loading) {
    return (
      <Animatable.View
        animation='fadeInUp'
        iterationCount={1}
        style={{
          backgroundColor: Theme.COLORS.colorMainAlt,
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          height: height * 0.35,
          paddingVertical: 20,
          paddingHorizontal: 20
        }}
      >
        <SkeletonServices />
      </Animatable.View>
    )
  }

  const handleOnSubmit = () => {
    dispatch({
      type: DETAILSTRAVEL,
      payload: {
        travel: {
          categoryId: selectCategory,
          paymentMethod: 1
        }
      }
    })
    dispatch({
      type: LOCATION,
      payload: {
        latitude: latitude,
        longitude: longitude,
        latitudeDelta: 0.0143,
        longitudeDelta: 0.0134
      }
    })
    navigate('Request')
  }

  return (
    <Animatable.View
      animation='fadeInUp'
      iterationCount={1}
      style={styles.container}
    >
      <Background source={require('../../assets/images/img-background-alyskiper.png')}>
        <View style={styles.layout}>
          {error ? (
            <View style={{
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
              width: '100%'
            }}
            >
              <Picture
                styles={{
                  width: 100,
                  height: 100,
                  resizeMode: 'contain'
                }}
                source={require('../../assets/images/img-alyskiper-error.png')}
              />
              <View style={{ marginVertical: 10 }} />
              <Text style={{
                color: Theme.COLORS.colorParagraph,
                fontFamily: 'Lato-Regular',
                textAlign: 'center',
                fontSize: Theme.SIZES.small
              }}
              >AlySkiper no esta disponible en tu zona.
              </Text>
            </View>
          ) : (
            <>
              <View style={styles.containerHeader}>
                <Text style={styles.textPrice}>Precio estimado</Text>
                <View style={{ marginVertical: 2 }} />
                <PriceService
                  categoryId={selectCategory}
                  navigation={props.navigation}
                  error={(error) => setError(error)}
                />
              </View>
              <View style={styles.containerRow}>
                <View>
                  <Text style={styles.category}>CATEGORIAS</Text>
                  <Picker
                    selectedValue={selectCategory}
                    style={{
                      textAlign: 'right',
                      height: 50,
                      width: 200,
                      color: Theme.COLORS.colorSecondary,
                      fontFamily: 'Lato-Regular',
                      borderColor: Theme.COLORS.colorSecondary,
                      borderWidth: 1
                    }}
                    mode='dialog'
                    onValueChange={(itemValue, itemIndex) =>
                      setSelectCategory(itemValue)}
                  >
                    {data.skipercattravels.filter(item => item.btaxy === true).map(category => (
                      <Picker.Item
                        key={category.id}
                        label={category.name.toUpperCase()}
                        value={category.id}
                      />
                    ))}
                  </Picker>
                </View>
                <Payment />
              </View>
              <View style={{
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                marginVertical: 20
              }}
              >
                <IconButton
                  message='PEDIR SKIPER'
                  isActiveIcon
                  iconName='check'
                  onPress={handleOnSubmit}
                  isLoading={false}
                  stylesButton={styles.button}
                />
              </View>
            </>
          )}
        </View>
      </Background>
    </Animatable.View>
  )
}

const styles = StyleSheet.create({
  viewPager: {
    flexShrink: 1,
    width: '100%',
    height: 100,
    justifyContent: 'center',
    alignItems: 'center'
  },
  container: {
    backgroundColor: Theme.COLORS.colorMainAlt,
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: height * 0.35
  },
  layout: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,.1)'
  },
  title: {
    color: Theme.COLORS.colorParagraph,
    fontFamily: 'Lato-Regular',
    fontSize: Theme.SIZES.small,
    textAlign: 'center'
  },
  button: {
    borderRadius: 100,
    paddingHorizontal: 20,
    height: 50,
    backgroundColor: Theme.COLORS.colorMain,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width: 220,
    borderBottomColor: Theme.COLORS.colorSecondary,
    borderBottomWidth: 0.3
  },
  containerRow: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  containerHeader: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  textPrice: {
    fontFamily: 'Lato-Regular',
    fontSize: Theme.SIZES.small,
    color: Theme.COLORS.colorSecondary
  },
  category: {
    color: Theme.COLORS.colorParagraph,
    fontFamily: 'Lato-Bold'
  }
})

export default ListOfCategoryServices
