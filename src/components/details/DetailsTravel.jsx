import React, { useState, useEffect } from 'react'
import {
  View,
  StyleSheet,
  Text
} from 'react-native'
import moment from 'moment'
import { useSelector } from 'react-redux'
import { useQuery } from '@apollo/react-hooks'

// Import querys
import { CALCULATERATE } from '../../graphql/querys/Querys'

// Import theme
import { Theme } from '../../constants/Theme'

// Import components
import Picture from '../../components/picture/Picture'
import Loader from '../../components/loader/Loader'

const DetailsTravel = props => {
  const { country_id, city_id } = useSelector(state => state.user)
  const [steps] = useState(props.steps)
  const [id] = useState(props.categoryId)
  const [category] = useState(props.category)
  const [priceTotal, setPriceTotal] = useState(0)
  const { distance, duration, end_address, start_address } = steps
  const hour = new Date().getHours()
  const min = new Date().getMinutes()

  const { data, loading } = useQuery(CALCULATERATE, {
    variables: {
      idcountry: country_id,
      idcity: city_id,
      idcategoriaviaje: id,
      date_init: `${moment().format('YYYY-MM-DD')} ${moment().format('HH:mm:ss')}`
    }
  })

  const calculate = (isLoading) => {
    if (!isLoading) {
      // const durationMin = duration.text.split(' ')[0]
      const durationMin = duration.value / 60
      // const distanceKm = distance.text.split(' ')[0]
      const distanceKm = distance.value / 1000

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
  useEffect(() => {
    calculate(loading)
  }, [loading])

  return (
    <View style={styles.layout}>
      <View style={styles.container}>
        <View style={styles.itemAlt}>
          <Text allowFontScaling={false} style={styles.text}>DURACION</Text>
          <Text allowFontScaling={false} style={styles.value}>{duration.text}</Text>
        </View>
        <View style={styles.item}>
          <Text allowFontScaling={false} style={styles.text}>DISTANCIA</Text>
          <Text allowFontScaling={false} style={styles.value}>{distance.text}</Text>
        </View>
      </View>

      <View style={styles.containerAddress}>
        <Text allowFontScaling={false} style={styles.text}>ORIGEN</Text>
        <Text allowFontScaling={false} style={styles.textAddress}>{start_address}</Text>
      </View>

      <View style={styles.containerAddress}>
        <Text allowFontScaling={false} style={styles.text}>DESTINO</Text>
        <Text allowFontScaling={false} style={styles.textAddress}>{end_address}</Text>
      </View>

      <View style={styles.container}>
        <Text allowFontScaling={false} style={styles.text}>HORARIO SOLICITADO</Text>
        <Text allowFontScaling={false} style={styles.value}>{`${hour}:${min}`}</Text>
      </View>

      <View style={styles.container}>
        <Text allowFontScaling={false} style={styles.text}>CATEGORIA</Text>
        <Text allowFontScaling={false} style={styles.textCategory}>{category.toUpperCase()}</Text>
      </View>

      <View style={styles.containerPrice}>
        <View style={styles.container}>
          <Text allowFontScaling={false} style={styles.text}>PRECIO BASE</Text>
          {loading ? (
            <Loader
              size='small'
            />
          ) : (
            <Text allowFontScaling={false} style={styles.value}>{data.CalcularTarifa.pricebase}</Text>
          )}
        </View>

        <View style={styles.container}>
          <Text allowFontScaling={false} style={styles.text}>PRECIO POR DISTANCIA</Text>
          {loading ? (
            <Loader
              size='small'
            />
          ) : (
            <Text allowFontScaling={false} style={styles.value}>{Math.round(data.CalcularTarifa.priceckilometer * distance.text.split(' ')[0])}</Text>
          )}
        </View>

        <View style={styles.container}>
          <Text allowFontScaling={false} style={styles.text}>PRECIO POR TIEMPO</Text>
          {loading ? (
            <Loader
              size='small'
            />
          ) : (
            <Text allowFontScaling={false} style={styles.value}>{Math.round(duration.text.split(' ')[0] * data.CalcularTarifa.priceminute)}</Text>
          )}
        </View>
      </View>

      <View style={styles.container}>
        <Text allowFontScaling={false} style={styles.text}>METODO DE PAGO</Text>
        <View>
          <Picture
            source={require('../../../assets/images/img-cash.png')}
            styles={styles.image}
          />
          <Text allowFontScaling={false} style={styles.value}>Efectivo</Text>
        </View>
      </View>

      <View style={styles.container}>
        <Text allowFontScaling={false} style={styles.text}>TOTAL</Text>
        {loading ? (
          <Loader
            size='small'
          />
        ) : (
          <Text allowFontScaling={false} style={styles.priceTotal}>{Math.round(priceTotal)}</Text>
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
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
    color: Theme.COLORS.colorSecondary,
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

export default DetailsTravel
