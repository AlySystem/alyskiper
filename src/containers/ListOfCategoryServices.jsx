import React, { useState, useMemo } from 'react'
import {
    View,
    Text,
    Dimensions,
    StyleSheet,
    TouchableOpacity
} from 'react-native'
import * as Animatable from 'react-native-animatable'
import { useQuery } from '@apollo/react-hooks'
import { useDispatch } from 'react-redux'
import { Backdrop } from 'react-native-backdrop'

// Import actions
import { DETAILSTRAVEL, LOCATION } from '../store/actionTypes'

// Import querys
import { CATEGORYTRAVEL } from '../graphql/querys/Querys'

// Import theme
import { Theme } from '../constants/Theme'

// Import components
import Picture from '../components/picture/Picture'
import PriceService from '../components/price/PriceService'

const { height } = Dimensions.get('window')

const ListOfCategoryServices = React.memo(props => {
    const dispatch = useDispatch()
    const { navigate } = props.navigation
    const { data, loading } = useQuery(CATEGORYTRAVEL)
    const [error, setError] = useState()
    const [priceTravel, setPriceTravel] = useState()
    const [visible, setVisible] = useState(true)

    const handleOnSubmit = (category) => {
        console.log(category)
    }

    return (
        <Backdrop
            closedHeight={50}
            header={() => (
                <View style={styles.closePlateContainer}>
                    <View style={styles.closePlate} />
                </View>
            )}
            visible={true}
            handleOpen={() => console.log('handleOpen')}
            handleClose={() => console.log('handleClose')}
            onClose={() => console.log('onClose')}
            swipeConfig={{ velocityThreshold: 0.3, directionalOffsetThreshold: 80 }}
            animationConfig={{ speed: 14, bounciness: 4, }}
            overlayColor='rgba(0,0,0,0. )'
            backdropStyle={{ backgroundColor: Theme.COLORS.colorMainDark }}
        >
            {loading ? (
                <View />
            ) : data.skipercattravels.filter(item => item.btaxy === true).map(category => (
                <TouchableOpacity style={{ flexDirection: 'row'}} key={category.id}  onPress={() =>  handleOnSubmit(category)}>
                    <Text style={{color: 'white', fontSize: 40}}>{category.name}</Text>
                    <PriceService
                        categoryId={category.id}
                        navigation={props.navigation}
                        location={props.location}
                        error={(error) => setError(error)}
                    />
                </TouchableOpacity>
            ))}
        </Backdrop>
    )
})

const styles = StyleSheet.create({
    closePlateContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        height: 40
    },
    closePlate: {
        width: 40,
        height: 5,
        borderRadius: 5,
        backgroundColor: Theme.COLORS.colorSecondary
    }
})

export default ListOfCategoryServices