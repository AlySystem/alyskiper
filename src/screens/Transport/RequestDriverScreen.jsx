import React, { useEffect, useState } from 'react'
import {
    View,
    Text
} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { useMutation } from '@apollo/react-hooks'
import { showMessage } from 'react-native-flash-message'
import PublicIp from 'react-native-public-ip'
import { isPointWithinRadius, orderByDistance } from 'geolib'

// Import querys
import { GENERATETRAVEL } from '../../graphql/mutations/Mutations'

// Import actions
import { REMOVEDETAILSTRAVEL, REMOVELOCATION } from '../../store/actionTypes'

// Import components
import Background from '../../components/background/Background'
import IconButton from '../../components/button/IconButton'
import Picture from '../../components/picture/Picture'
import Loader from '../../components/loader/Loader'

// Import theme
import { Theme } from '../../constants/Theme'

const RequestDriverScreen = props => {
    const radius = 25000
    const [categoryName, setCategoryName] = useState('')
    let orderDistance = null
    const [final, setFinal] = useState(false)
    const driverWithInRadius = []
    const [driverNearby, setDriverNearby] = useState(null)
    const dispatch = useDispatch()
    const { navigate } = props.navigation
    const { userId } = useSelector(state => state.user)
    const { travel } = useSelector(state => state.travel)
    const { steps } = useSelector(state => state.direction)
    const { latitude, longitude } = useSelector(state => state.location)
    const [GenerateTravel, { error }] = useMutation(GENERATETRAVEL)
    // const { silver, golden, vip, president } = useSelector(state => {
    //     if (state.drivers.length === 0) {
    //         return {
    //             silver: [],
    //             golden: [],
    //             vip: [],
    //             president: []
    //         }
    //     } else {
    //         return state.drivers
    //     }
    // })

    const silver = [
        { driveId: 48, latitude: 12.079605, longitude: -86.224510 },
        { driveId: 209, latitude: 12.035282, longitude: -86.198071 },
        { driveId: 18, latitude: 12.075062, longitude: -86.220573 },
        { driveId: 250, latitude: 12.055279, longitude: -86.202196 },
        { driveId: 205, latitude: 12.033435, longitude: -86.191172 }
    ]

    useEffect(() => {
        const { categoryId } = travel

        switch (categoryId) {
            case 1:
                if (silver) {
                    setCategoryName('SILVER')
                    silver.map(drive => {
                        if (isPointWithinRadius({ latitude, longitude }, { latitude: drive.latitude, longitude: drive.longitude }, radius)) {
                            driverWithInRadius.push({ driveId: drive.driveId, latitude: drive.latitude, longitude: drive.longitude })
                        }
                    })
                    orderDistance = orderByDistance({ latitude, longitude }, driverWithInRadius)
                    setDriverNearby(orderDistance[0])
                }

                break
            case 2:
                if (golden) {
                    setCategoryName('GOLDEN')
                    golden.map(drive => {
                        if (isPointWithinRadius({ latitude, longitude }, { latitude: drive.state.coords.latitude, longitude: drive.state.coords.longitude }, radius)) {
                            setDriverWithInRadius(state => state.push({ driveId: drive.state.SkiperAgentId, latitude: drive.state.coords.latitude, longitude: drive.state.coords.longitude }))
                            // driverWithInRadius.push({ driveId: drive.state.SkiperAgentId, latitude: drive.state.coords.latitude, longitude: drive.state.coords.longitude })
                        }
                    })
                    setOrderDistance(orderByDistance({ latitude, longitude }, driverWithInRadius))
                    setDriverNearby(orderDistance[0])
                }

                break
            case 3:
                if (vip) {
                    setCategoryName("VIP")
                    vip.map(drive => {
                        if (isPointWithinRadius({ latitude, longitude }, { latitude: drive.state.coords.latitude, longitude: drive.state.coords.longitude }, radius)) {
                            setDriverWithInRadius(state => state.push({ driveId: drive.state.SkiperAgentId, latitude: drive.state.coords.latitude, longitude: drive.state.coords.longitude }))
                        }
                    })
                    setOrderDistance(orderByDistance({ latitude, longitude }, driverWithInRadius))
                    setDriverNearby(orderDistance[0])
                }

                break
            case 4:
                if (president) {
                    setCategoryName('PRESIDENT')
                    president.map(drive => {
                        if (isPointWithinRadius({ latitude, longitude }, { latitude: drive.state.coords.latitude, longitude: drive.state.coords.longitude }, radius)) {
                            setDriverWithInRadius(state => state.push({ driveId: drive.state.SkiperAgentId, latitude: drive.state.coords.latitude, longitude: drive.state.coords.longitude }))
                        }
                    })
                    setOrderDistance(orderByDistance({ latitude, longitude }, driverWithInRadius))
                    setDriverNearby(orderDistance[0])
                }

                break
        }
        setFinal(true)
    }, [])

    useEffect(() => {
        if (final) {
            if (driverNearby !== null && driverNearby !== undefined) {
                const { categoryId } = travel
                const { duration, distance, end_address, start_address, start_location, end_location } = steps
                // do {
                GenerateTravel({
                    variables: {
                        inputviaje: {
                            idusers: userId,
                            iddriver: driverNearby['driveId'],
                            lat_initial: start_location.lat,
                            lng_initial: start_location.lng,
                            lat_final: end_location.lat,
                            lng_final: end_location.lng,
                            distance: parseInt(distance.value),
                            time: duration.value,
                            address_initial: start_address,
                            address_final: end_address,
                            idcurrency: 2,
                            idpayment_methods: 2,
                            categoryId: categoryId
                        },
                        ip: ' '
                    }
                })
                    .catch(error => {
                        const newArray = orderDistance.filter(status => status.driveId !== driverNearby['driveId'])
                        console.log('Nuevo arreglo: ', newArray)
                        orderByDistance = newArray
                        driverNearby = orderByDistance[0]
                    })
                // } while (error !== null && error !== undefined)
            } else {
                showMessage({
                    message: 'Skiper',
                    description: `No hay conductores cerca en tu zona para la categoria ${categoryName}, por favor selecciona otra de nuestras categorias.`,
                    backgroundColor: '#7f8c8d',
                    color: '#fff',
                    icon: 'danger',
                    duration: 8000,
                    titleStyle: {
                        fontFamily: 'Lato-Bold'
                    },
                    textStyle: {
                        fontFamily: 'Lato-Regular'
                    }
                })

                props.navigation.pop()
            }
        }
    }, [driverNearby, final, error])


    const handleOnCancel = () => {
        dispatch({
            type: REMOVEDETAILSTRAVEL
        })
        dispatch({
            type: REMOVELOCATION
        })
        props.navigation.pop()
    }

    return (
        <View>
            <Text>Cargando</Text>
        </View>
    )
}

export default RequestDriverScreen