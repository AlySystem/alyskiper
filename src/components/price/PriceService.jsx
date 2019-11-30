import React from 'react'
import {
  Text,
  View
} from 'react-native'
import { useQuery } from '@apollo/react-hooks'
import { useSelector, useDispatch } from 'react-redux'
import timezone from 'moment-timezone'
import * as RNLocalize from 'react-native-localize'

// Impoer actions
import { DETAILSTRAVEL } from '../../store/actionTypes'

// Import theme
import { Theme } from '../../constants/Theme'

// Import querys
import { CALCULATERATE } from '../../graphql/querys/Querys'

// Import components
import Loader from '../loader/Loader'

const PriceService = props => {
  const time = RNLocalize.getTimeZone()
  const date = timezone().tz(time).format('YYYY-MM-DD HH:mm:ss')
  const dispatch = useDispatch()
  const { country_id, city_id } = useSelector(state => state.user)
  const { steps } = useSelector(state => state.direction)

  const { loading, data, error } = useQuery(CALCULATERATE, {
    variables: {
      idcountry: country_id,
      idcity: city_id,
      idcategoriaviaje: props.categoryId,
      date_init: date
    }
  })

  if (error) {
    props.error(error)
    return <View />
  }
  if (loading) return <Loader size='small' />

  const calculate = () => {
    const { duration, distance } = steps
    const durationMin = duration.value / 60
    const distanceKm = distance.value / 1000

    const { pricebase, priceminute, priceckilometer, priceminimun } = data.CalcularTarifa
    const minutes = durationMin * priceminute
    const km = distanceKm * priceckilometer

    const total = minutes + km + pricebase
    if (total < priceminimun) {
      dispatch({
        type: DETAILSTRAVEL,
        payload: {
          priceTravel: {
            priceTravel: priceminimun,
            priceBase: pricebase,
            pricecKilometer: km,
            priceMinimun: priceminimun,
            priceMinute: minutes
          }
        }
      })
      return priceminimun
    } else {
      dispatch({
        type: DETAILSTRAVEL,
        payload: {
          priceTravel: total,
          priceBase: pricebase,
          pricecKilometer: km,
          priceMinimun: priceminimun,
          priceMinute: minutes
        }
      })
      return total
    }
  }

  return (
    <Text
      allowFontScaling={false}
      style={{
        fontFamily: 'Lato-Bold',
        color: Theme.COLORS.colorParagraph,
        fontSize: 18
      }}
    >C$ {Math.round(calculate())}
    </Text>
  )
}

export default PriceService
