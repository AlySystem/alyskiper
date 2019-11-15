import React, { useRef, useState, useEffect } from 'react'
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions
} from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { Polyline, Marker } from 'react-native-maps'

// Import actions
import { DIRECCION } from '../../store/actionTypes'

// Import theme
import { Theme } from '../../constants/Theme'

// Import custom hooks
import { useLocation } from '../../hooks/useLocation'

// Import components
import { Map } from '../../components/map/MapView'
import InputControl from '../../components/input/InputControl'
import ModalTransport from '../../components/modal/ModalTransport'
import Button from '../../components/button/Button'
import Loader from '../../components/loader/Loader'

// Import containers
import ListOfCategoryServices from '../../containers/ListOfCategoryServices'

// Import utils
import { getPixelSize } from '../../utils/Pixel'
import { routeDirection } from '../../utils/Directions'

const { height, width } = Dimensions.get('window')

const TransportScreen = props => {
  const dispatch = useDispatch()
  const { location, loading } = useLocation()
  const { firstName } = useSelector(state => state.user)
  const { directions } = useSelector(state => state.direction)
  const [isVisible, setIsVisible] = useState(false)
  const [destination, setDestination] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [, setDetails] = useState('')
  const [steps, setSteps] = useState(null)

  const mapView = useRef(null)

  const handleDirecctions = async (placeId, details) => {
    setIsLoading(true)
    const { latitude, longitude } = location
    const { pointCoords, steps } = await routeDirection(placeId, latitude, longitude)
    setIsLoading(false)
    setDestination(pointCoords)
    setSteps(steps)
    setDetails(details)
    mapView.current.fitToCoordinates(pointCoords, {
      edgePadding: {
        right: getPixelSize(50),
        left: getPixelSize(50),
        top: getPixelSize(50),
        bottom: getPixelSize(250)
      }
    })
  }

  useEffect(() => {
    if (directions !== null) {
      const { placeId, address } = directions
      handleDirecctions(placeId, address)
    }
  }, [directions])

  const handleBack = () => {
    setDestination(null)

    dispatch({
      type: DIRECCION,
      payload: {
        directions: null
      }
    })
  }

  return (
    <View style={styles.screen}>
      <ModalTransport
        navigation={props.navigation}
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        location={location}
      />
      {!loading && (
        <Map
          mapView={mapView}
          location={location}
        >
          {destination && (
            <>
              <Polyline
                coordinates={destination}
                strokeWidth={3}
                strokeColor={Theme.COLORS.colorMainAlt}
              />
              <Marker coordinate={destination[destination.length - 1]} />
            </>
          )}
        </Map>
      )}
      {destination ? (
        <>
          <Button
            onPress={handleBack}
            iconName='arrow-back'
            iconSize={30}
            stylesButton={styles.buttonBack}
            iconColor={Theme.COLORS.colorMainAlt}
          />
          <ListOfCategoryServices
            steps={steps}
            navigation={props.navigation}
          />
        </>
      ) : isLoading ? (
        <View style={{
          position: 'absolute',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          height: '50%'
        }}
        >
          <Loader color={Theme.COLORS.colorMainAlt} />
        </View>
      ) : (
        <TouchableOpacity
          onPress={() => setIsVisible(!isVisible)}
          style={styles.containerInput}
        >
          <View pointerEvents='none'>
            <InputControl
              stylesContainer={styles.container}
              stylesInput={styles.input}
              placeholder={`${firstName} ¿Donde quieres ir?`}
              placeholderTextColor={Theme.COLORS.colorParagraphSecondary}
              isActiveIcon
              iconSize={25}
              iconColor={Theme.COLORS.colorSecondary}
              iconName='search'
            />
          </View>
        </TouchableOpacity>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Theme.COLORS.colorMainAlt
  },
  fixed: {
    backgroundColor: Theme.COLORS.colorMainDark,
    paddingHorizontal: 20,
    paddingVertical: 20,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    position: 'absolute',
    width: '100%',
    top: 0,
    left: 0,
    flexDirection: 'row'
  },
  fixedText: {
    fontFamily: 'Lato-Bold',
    fontSize: Theme.SIZES.xsmall,
    color: Theme.COLORS.colorParagraph
  },
  containerInput: {
    position: 'absolute',
    top: 20,
    right: 0,
    width: '100%',
    paddingHorizontal: 20
  },
  container: {

  },
  input: {
    backgroundColor: Theme.COLORS.colorMainDark,
    borderRadius: 100,
    paddingLeft: 50,
    paddingVertical: 10,
    borderWidth: 0.3,
    borderColor: Theme.COLORS.colorSecondary,
    fontFamily: 'Lato-Regular',
    fontSize: Theme.SIZES.small,
    color: Theme.COLORS.colorParagraph
  },
  buttonBack: {
    position: 'absolute',
    top: height * 0.02,
    left: width * 0.05
  }
})

export default TransportScreen
