import React, { useEffect, useState } from "react"
import { Text, View } from "react-native"
import { useLazyQuery } from "@apollo/react-hooks"
import { useSelector, useDispatch } from "react-redux"
import publicIP from "react-native-public-ip"
// Impoer actions
import { DETAILSTRAVEL } from "../../store/actionTypes"
// Import theme
import { Theme } from "../../constants/Theme"
// Import querys
import { CALCULATETARIFF } from "../../graphql/querys/Querys"
// Import components
import Loader from "../loader/Loader"
// Import hooks
import { useLocation } from "../../hooks/useLocation"
import { FetchType } from "apollo-boost"

const PriceService = props => {
  const dispatch = useDispatch()
  const { steps } = useSelector(state => state.direction)
  const [price, setPrice] = useState("")
  const [symbol, setSymbol] = useState("")
  const [lastPrice, setLastPrice] = useState("")
  const [state, setState] = useState(1)
  const { location } = useLocation()
  const [ipAddressState, setIp] = useState('')
  const [CalculateTariff, { loading, data, error }] = useLazyQuery(
    CALCULATETARIFF
  )

  const { latitude, longitude } = location

  // Volvemos a calcular la tarifa cuando cambie de locacion
  useEffect(() => {
    const calculateRate = async () => {
      if (location.latitude) {
        publicIP().then(ipAddress => {
          setIp(ipAddress.toString())

          CalculateTariff({
            variables: {
              ip: ipAddress.toString(),
              idcategoriaviaje: props.categoryId,
              lat: latitude,
              lng: longitude
            }
          })
        })
      }
    }
    calculateRate()
  }, [location])

  // Volvemos a calcular la tarifa cuando cambie el tipo de viaje
  useEffect(
    () => {
      if (props.categoryId !== state) {

        setState(props.categoryId)

        CalculateTariff({
          variables: {
            ip: ipAddressState,
            idcategoriaviaje: props.categoryId,
            lat: latitude,
            lng: longitude
          }
        })

      }
    },
    [props.categoryId]
  )

  // Calculamos el precio segun la distancia y el tipo de viaje
  useEffect(() => {
    console.log(data)

    if (
      loading === false &&
      data &&
      data.CalculateTariff.priceckilometer !== lastPrice
    ) {
      setLastPrice(data.CalculateTariff.priceckilometer)
      const { duration, distance } = steps
      const durationMin = duration.value / 60
      const distanceKm = distance.value / 1000
      const {
        pricebase,
        priceminute,
        priceckilometer,
        priceminimun,
        symbol
      } = data.CalculateTariff
      const minutes = durationMin * priceminute
      const km = distanceKm * priceckilometer
      const total = minutes + km + pricebase
      setSymbol(symbol)
      /**
       * Si el total es menor al pecio minimo
       * siempre cobraremos el precio minimo
       */
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
        /**Seteamos el precios */

        setPrice(priceminimun)
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
        setPrice(total)
      }

      console.log(price)
    }
  }, [loading, data])

  // Si hay errores mostramos el mensaje de error
  if (error) {
    props.error(error)
    return <View />
  }

  // Mostramos el loader cuando los datos estan cargando
  if (loading && !data && price === 0) return <Loader size="small" />

  // Retornamos los precios cuando todo este correcto
  return (
    <Text
      allowFontScaling={false}
      style={{
        fontFamily: "Lato-Bold",
        color: Theme.COLORS.colorParagraph,
        fontSize: 18
      }}
    >
      {`${symbol} ${Math.ceil(price)}`}
    </Text>
  )
}
export default PriceService
