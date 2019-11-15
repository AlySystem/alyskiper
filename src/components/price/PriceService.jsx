import React, { useEffect, useState } from 'react'
import {
  Text
} from 'react-native'
import { useQuery } from '@apollo/react-hooks'
import { useSelector } from 'react-redux'
import moment from 'moment'

// Import theme
import { Theme } from '../../constants/Theme'

// Import querys
import { CALCULATERATE } from '../../graphql/querys/Querys'

// Import components
import Loader from '../loader/Loader'

const PriceService = props => {
  const { navigate } = props.navigation
  const { country_id, cidy_id } = useSelector(state => state.user)
  const { distance, duration } = props.steps
  const [priceTotal, setPriceTotal] = useState(0)

  const { loading, data, error } = useQuery(CALCULATERATE, {
    variables: {
      idcountry: country_id,
      idcity: 1,
      idcategoriaviaje: props.categoryId,
      date_init: `${moment().format('YYYY-MM-DD')} ${moment().format('HH:mm:ss')}`
    }
  })

  if (error) return navigate('Home')
  useEffect(() => {
    const calculate = () => {
      if (!loading) {
        const durationMin = duration.value / 60
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
    calculate()
  }, [loading])

  if (loading) return <Loader size='small' />

  return (
    <Text
      allowFontScaling={false}
      style={{
        fontFamily: 'Lato-Bold',
        color: Theme.COLORS.colorParagraph,
        fontSize: 18
      }}
    >C$ {Math.round(priceTotal)}
    </Text>
  )
}

export default PriceService
