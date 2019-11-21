import React from 'react'
import {
  Text,
  View
} from 'react-native'
import { useQuery } from '@apollo/react-hooks'
import { useSelector, useDispatch } from 'react-redux'
import moment from 'moment'

// Impoer actions
import { DETAILSTRAVEL } from '../../store/actionTypes'

// Import theme
import { Theme } from '../../constants/Theme'

// Import querys
import { CALCULATERATE } from '../../graphql/querys/Querys'

// Import components
import Loader from '../loader/Loader'

const PriceService = props => {
  const dispatch = useDispatch()
  const { country_id, city_id } = useSelector(state => state.user)
  const { steps } = useSelector(state => state.direction)

  const { loading, data, error } = useQuery(CALCULATERATE, {
    variables: {
      idcountry: country_id,
      idcity: city_id,
      idcategoriaviaje: props.categoryId,
      date_init: `${moment().format('YYYY-MM-DD')} ${moment().format('HH:mm:ss')}`
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
          priceTravel: priceminimun
        }
      })
      return priceminimun
    } else {
      dispatch({
        type: DETAILSTRAVEL,
        payload: {
          priceTravel: total
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
