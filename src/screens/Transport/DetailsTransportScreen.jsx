import React, { useEffect, useState } from 'react'
import {
  View,
  StyleSheet,
  Text,
  ScrollView
} from 'react-native'
import moment from 'moment'
import PubNubReact from 'pubnub-react'
import { useQuery } from '@apollo/react-hooks'
import { useSelector } from 'react-redux'

// Import components
import Background from '../../components/background/Background'
import IconButton from '../../components/button/IconButton'
import Loader from '../../components/loader/Loader'

// Import querys
import { CALCULATERATE } from '../../graphql/querys/Querys'

// Import theme
import { Theme } from '../../constants/Theme'
import Picture from '../../components/picture/Picture'

const DetailsTransportScreen = props => {
  const { country_id, cidy_id } = useSelector(state => state.user)
  const [steps] = useState(props.navigation.getParam('steps', ''))
  const [id] = useState(props.navigation.getParam('id', ''))
  const [category] = useState(props.navigation.getParam('category', ''))
  const [priceTotal, setPriceTotal] = useState(0)
  const { distance, duration, end_address, start_address, end_location } = steps
  const [isLoading, setIsLoading] = useState(false)
  const hour = new Date().getHours()
  const min = new Date().getMinutes()

  const pubnub = new PubNubReact({
    publishKey: 'pub-c-1271b42f-b90f-402d-99a8-749d0d2a13a7',
    subscribeKey: 'sub-c-36cd6120-e9e6-11e9-bee7-82748ed6f7e5'
  })

  const { data, loading } = useQuery(CALCULATERATE, {
    variables: {
      idcountry: country_id,
      idcity: 1,
      idcategoriaviaje: id,
      date_init: `${moment().format('YYYY-MM-DD')} ${moment().format('HH:mm:ss')}`
    }
  })

  useEffect(() => {
    const calculate = () => {
      if (!loading) {
        const durationMin = duration.text.split(' ')[0]
        const distanceKm = distance.text.split(' ')[0]

        const { pricebase, priceminute, priceckilometer, priceminimun } = data.CalcularTarifa
        const minutes = durationMin * priceminute
        const km = distanceKm * priceckilometer

        const total = minutes + km + pricebase
        if (total < priceminimun) {
          setPriceTotal(priceminimun)
        } else {
          setPriceTotal(total)
        }
      }
    }
    calculate()
  }, [distance, duration, data, loading])

  const handleOnSubmit = async () => {
    setIsLoading(true)
    pubnub.publish({
      message: {
        tipodeviaje: 2,
        detallesviaje: {
          message: 'Idsarth Juarez'
        },
        origen: {
          latitude: 12.116791,
          longitude: -86.251011
        },
        destino: {
          latitude: end_location.lat,
          longitude: end_location.lng
        }
      },
      channel: 'Driver'
    })
  }

  return (
    <Background>
      <View style={styles.screen}>
        <ScrollView
          keyboardShouldPersistTaps='always'
        >
          <View style={styles.layout}>

            <View style={styles.container}>
              <View style={styles.itemAlt}>
                <Text style={styles.text}>DURACION</Text>
                <Text style={styles.value}>{duration.text}</Text>
              </View>
              <View style={styles.item}>
                <Text style={styles.text}>DISTANCIA</Text>
                <Text style={styles.value}>{distance.text}</Text>
              </View>
            </View>

            <View style={styles.containerAddress}>
              <Text style={styles.text}>ORIGEN</Text>
              <Text style={styles.textAddress}>{start_address}</Text>
            </View>

            <View style={styles.containerAddress}>
              <Text style={styles.text}>DESTINO</Text>
              <Text style={styles.textAddress}>{end_address}</Text>
            </View>

            <View style={styles.container}>
              <Text style={styles.text}>HORARIO SOLICITADO</Text>
              <Text style={styles.value}>{`${hour}:${min}`}</Text>
            </View>

            <View style={styles.container}>
              <Text style={styles.text}>CATEGORIA</Text>
              <Text style={styles.textCategory}>{category.toUpperCase()}</Text>
            </View>

            <View style={styles.containerPrice}>
              <View style={styles.container}>
                <Text style={styles.text}>PRECIO BASE</Text>
                {loading ? (
                  <Loader
                    size='small'
                  />
                ) : (
                  <Text style={styles.value}>{data.CalcularTarifa.pricebase}</Text>
                )}
              </View>

              <View style={styles.container}>
                <Text style={styles.text}>PRECIO POR DISTANCIA</Text>
                {loading ? (
                  <Loader
                    size='small'
                  />
                ) : (
                  <Text style={styles.value}>{Math.round(data.CalcularTarifa.priceckilometer * distance.text.split(' ')[0])}</Text>
                )}
              </View>

              <View style={styles.container}>
                <Text style={styles.text}>PRECIO POR TIEMPO</Text>
                {loading ? (
                  <Loader
                    size='small'
                  />
                ) : (
                  <Text style={styles.value}>{Math.round(duration.text.split(' ')[0] * data.CalcularTarifa.priceminute)}</Text>
                )}
              </View>
            </View>

            <View style={styles.container}>
              <Text style={styles.text}>METODO DE PAGO</Text>
              <View>
                <Picture
                  source={require('../../../assets/images/img-cash.png')}
                  styles={styles.image}
                />
                <Text style={styles.value}>Efectivo</Text>
              </View>
            </View>

            <View style={styles.container}>
              <Text style={styles.text}>TOTAL</Text>
              {loading ? (
                <Loader
                  size='small'
                />
              ) : (
                <Text style={styles.priceTotal}>{Math.round(priceTotal)}</Text>
              )}
            </View>

            <View style={styles.containerButton}>
              <IconButton
                message='SOLICITAR'
                isActiveIcon
                onPress={handleOnSubmit}
                isLoading={isLoading}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    </Background>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,.5)'
  },
  layout: {
    paddingHorizontal: 10,
    paddingVertical: 20
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 10
  },
  containerAddress: {
    paddingHorizontal: 10,
    paddingVertical: 10
  },
  textAddress: {
    color: Theme.COLORS.colorParagraph,
    fontFamily: 'Lato-Regular',
    fontSize: Theme.SIZES.small,
    paddingVertical: 5
  },
  item: {
    flexGrow: 1,
    borderLeftColor: Theme.COLORS.colorSecondary,
    borderLeftWidth: 1,
    alignItems: 'flex-end'
  },
  itemAlt: {
    flexGrow: 1
  },
  text: {
    fontFamily: 'Lato-Regular',
    color: Theme.COLORS.colorParagraph,
    fontSize: Theme.SIZES.small,
    marginVertical: 3
  },
  priceTotal: {
    fontFamily: 'Lato-Bold',
    color: Theme.COLORS.colorParagraph,
    fontSize: 28
  },
  value: {
    fontFamily: 'Lato-Bold',
    color: Theme.COLORS.colorParagraph,
    fontSize: Theme.SIZES.small
  },
  image: {
    height: 40,
    width: 60,
    resizeMode: 'contain'
  },
  textCategory: {
    color: Theme.COLORS.colorSecondary,
    fontFamily: 'Lato-Bold',
    fontSize: Theme.SIZES.normal
  },
  containerButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginVertical: 20
  }
})

export default DetailsTransportScreen
