import React, { useState, useMemo, useEffect } from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native'
import { useLazyQuery } from '@apollo/react-hooks'
import { useDispatch, useSelector } from 'react-redux'
import Geolocation from 'react-native-geolocation-service'
import FastImage from 'react-native-fast-image'
import { Backdrop } from 'react-native-backdrop'

// Import actions
import { DETAILSTRAVEL, LOCATION } from '../store/actionTypes'

// Import querys
import { CATEGORIESTRAVEL } from '../graphql/querys/Querys'

// Import theme
import { Theme } from '../constants/Theme'

// Import components
import Picture from '../components/picture/Picture'
import SkeletonServices from '../skeleton/SkeletonServices'
import IconButton from '../components/button/IconButton'

const ListOfCategoryServices = React.memo(props => {
    const { navigate } = props.navigation
    const dispatch = useDispatch()
    const [active, setActive] = useState(0)
    const [location, setLocation] = useState()
    const [category, setCategory] = useState()
    const { steps } = useSelector(state => state.direction)
    const { duration, distance } = steps
    const [CategoryTravelsWhitPrice, { loading, error, data }] = useLazyQuery(CATEGORIESTRAVEL)
    
    useEffect(() => {
        if (steps) {
            const { duration, distance } = steps

            Geolocation.getCurrentPosition(
                async ({ coords: { latitude, longitude } }) => {
                    CategoryTravelsWhitPrice({ variables: {
                        lat: latitude, 
                        lng: longitude,
                        distance: distance.value,
                        duration: duration.value
                    }})
                    setLocation({ latitude, longitude })
                }, error => {
                  props.navigation.pop()
                }, { timeout: 20000, enableHighAccuracy: true, maximumAge: 100, distanceFilter: 0 }
            )
        }
    }, [steps])

    if (error) {
        return (
            <Backdrop>
                <View style={{ justifyContent: 'center', alignItems: 'center', height: '100%', width: '100%' }}>
                    <Picture styles={{ width: 100, height: 100, resizeMode: 'contain' }} source={require('../../assets/images/img-alyskiper-error.png')} />
                    <View style={{ marginVertical: 10 }} />
                    <Text style={{ color: Theme.COLORS.colorParagraph, fontFamily: 'Lato-Regular', textAlign: 'center', fontSize: Theme.SIZES.small }}>
                        AlySkiper no esta disponible en tu zona.
                    </Text>
                </View>
            </Backdrop>
        )
    }

    const handleSelect = (categoryId) => {
        setActive(categoryId)
    }
    
    const handleOnSubmit = () => {
        const { latitude, longitude } = location
        dispatch({
            type: DETAILSTRAVEL,
            payload: {
              travel: {
                categoryId: category.id,
                paymentMethod: 1
              },
              priceTravel: {
                priceTravel: category.total,
                currencyID: category.currency,
                symbol: category.symbol
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
        
        navigate('Request', { currency: category.currency })
    }

    return (
        <Backdrop
            closedHeight={50}
            header={() => (
                <View style={styles.closePlateContainer}>
                    <View style={styles.closePlate} />
                    <Text style={styles.textHeader}>Elige una de nuestras categorias</Text>
                </View>
            )}
            visible={true}
            handleOpen={() => {}}
            handleClose={() => {}}
            onClose={() => {}}
            swipeConfig={{ velocityThreshold: 0.3, directionalOffsetThreshold: 80 }}
            animationConfig={{ speed: 14, bounciness: 4, }}
            overlayColor='rgba(0,0,0,0. )'
            backdropStyle={{ backgroundColor: 'rgba(0,0,0,.8)', margin: 0, padding: 0 }}
            style={{ margin: 0, padding: 0 }}
        >
            {loading ? (
                <SkeletonServices />
            ) : data && Object.keys(data.CategoryTravelsWhitPrice).map((category, index) => {
                const result = data.CategoryTravelsWhitPrice[category]
                const isActive = active === result.id
                const color = isActive ? 'rgba(3,249,252,0.3)' : 'transparent'

                if (result !== 'AllCategoryDto') {
                    return (
                        <TouchableOpacity key={index} style={{ backgroundColor: color, paddingHorizontal: 16 }} onPress={() => { 
                            setCategory(result) 
                            return handleSelect(result.id) 
                        }}>
                            <View style={styles.container}>
                                <View style={styles.content}>
                                    <FastImage style={styles.image} source={{ uri: result.url_img_category }} resizeMode={FastImage.resizeMode.contain} />
                                    <View>
                                        <Text allowFontScaling={false} style={styles.name}>{result.name}</Text>
                                        <View style={{ marginVertical: 4 }} />
                                        <Text allowFontScaling={false} style={styles.description}>Llegada: {duration.text}</Text>
                                    </View>
                                </View>
                                <Text allowFontScaling={false} style={styles.total}>{`${result.symbol} ${Math.ceil(result.total)}`}</Text>
                            </View>
                        </TouchableOpacity>
                    )
                }
                return null
            })}
            
            {!loading && (
                <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                <IconButton
                    message='PEDIR SKIPER'
                    stylesMessage={{  color: '#fff', fontSize: Theme.SIZES.xsmall, fontFamily: 'Lato-Bold', marginLeft: 8 }}
                    isActiveIcon
                    iconName='check'
                    onPress={handleOnSubmit}
                    stylesButton={styles.button}
                />
            </View>
            )}
        </Backdrop>
    )
})

const styles = StyleSheet.create({
    closePlateContainer: {
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-evenly",
        height: 55
    },
    closePlate: {
        width: 40,
        height: 5,
        borderRadius: 5,
        backgroundColor: Theme.COLORS.colorSecondary
    },
    textHeader: {
        fontSize: 17,
        fontFamily: 'Lato-Regular',
        color: Theme.COLORS.colorSecondary,
        marginLeft: 20
    },
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 15
    },
    image: {
        width: 52,
        height: 52
    },
    imageTitle: {
        width: 100,
        height: 80
    },
    total: {
        fontSize: Theme.SIZES.small,
        fontFamily: 'Lato-Bold',
        color: Theme.COLORS.colorSecondary
    },
    content: {
        flexDirection: 'row'
    },
    name: {
        fontSize: Theme.SIZES.normal,
        fontFamily: 'Lato-Bold',
        color: Theme.COLORS.colorSecondary,
        marginLeft: 20
    },
    description: {
        fontSize: 14,
        fontFamily: 'Lato-Regular',
        color: '#fff',
        marginLeft: 20
    },
    button: {
        marginTop: 10,
        paddingHorizontal: 20,
        height: 50,
        borderRadius: 200,
        backgroundColor: Theme.COLORS.colorMainDark,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        width: 220,
        borderColor: Theme.COLORS.colorSecondary,
        borderWidth: 0.5,
        marginBottom: 5
    }
})

export default ListOfCategoryServices