import React, { useEffect, useState, useMemo } from "react"
import { Text, View, StyleSheet } from "react-native"
import { useLazyQuery } from "@apollo/react-hooks"
import { useSelector } from "react-redux"
import publicIP from "react-native-public-ip"

// Impoer actions
import { DETAILSTRAVEL } from "../../store/actionTypes"

// Import theme
import { Theme } from "../../constants/Theme"

// Import querys
import { CALCULATETARIFF } from "../../graphql/querys/Querys"

// Import components
import Loader from "../loader/Loader"

const PriceService = (props) => {
    const { steps } = useSelector(state => state.direction)
    const [price, setPrice] = useState('')
    const [symbol, setSymbol] = useState('')
    const [CalculateTariff, { loading, error, data }] = useLazyQuery(CALCULATETARIFF)

    useEffect(() => {
        publicIP()
            .then(ipAddress => {
                const { latitude, longitude } = props.location
                const variables = {
                    ip: ipAddress.toString(),
                    idcategoriaviaje: props.categoryId,
                    lat: latitude,
                    lng: longitude
                }
    
                CalculateTariff({ variables })
            })
    }, [])

    useEffect(() => {
        if (data !== null && data !== undefined) {
            const { duration, distance } = steps
            const durationMin = duration.value / 60
            const distanceKm = distance.value / 1000

            const {  pricebase, priceminute, priceckilometer, priceminimun, symbol, currencyID, } = data.CalculateTariff

            const minutes = durationMin * priceminute
            const km = distanceKm * priceckilometer
            const total = minutes + km + pricebase

            setSymbol(symbol)

            if (total < priceminimun) {
                setPrice(priceminimun)
                // props.onDetails({ 
                //     priceTravel: {
                //         priceTravel: priceminimun,
                //         priceBase: pricebase,
                //         pricecKilometer: km,
                //         priceMinimun: priceminimun,
                //         priceMinute: minutes,
                //         currencyID,
                //         symbol
                //     }
                // })
            } else {
                setPrice(total)
                // props.onDetails({
                //     priceTravel: {
                //         priceTravel: total,
                //         priceBase: pricebase,
                //         pricecKilometer: km,
                //         priceMinimun: priceminimun,
                //         priceMinute: minutes,
                //         currencyID,
                //         symbol
                //     }
                // })
            }
        }
    }, [data])

    if (loading) return <Loader size='small' />
    if (error) {
        props.error(error)
        return <View />
    }


    return (
        <Text allowFontScaling={false} style={styles.price}>
            {`${symbol} ${price === '' ? '' : price.toFixed(2).toString()}`}
        </Text>
    )
}

const styles = StyleSheet.create({
    price: {
        fontFamily: "Lato-Bold",
        color: Theme.COLORS.colorSecondary,
        fontSize: 18
    }
})

export default PriceService