import React, { useState, useRef } from 'react'
import {
  View,
  StyleSheet,
  SafeAreaView
} from 'react-native'
import MapView from 'react-native-maps'
import { useSelector, useDispatch } from 'react-redux'
import FontAwesomeIcons from 'react-native-vector-icons/FontAwesome5'
import Geocoder from 'react-native-geocoding'

// Import actions types
import { LOCATION } from '../../store/actionTypes'

// Import Theme
import { Theme } from '../../constants/Theme'

// Import components
import IconButton from '../../components/button/IconButton'
import InputControl from '../../components/input/InputControl'

// Import utils
import { keys } from '../../utils/keys'

Geocoder.init(`${keys.googleMaps.apiKey}`)
const FixedMapScreen = props => {
  const { navigate } = props.navigation
  const dispatch = useDispatch()
  const [region, setRegion] = useState(useSelector(state => state.location))
  const [value, setValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [details, setDetails] = useState({})
  const mapView = useRef(null)

  const handleOnRegionChange = async location => {
    setRegion(location)
    setIsLoading(true)
    const { latitude, longitude } = location
    const response = await Geocoder.from({ latitude, longitude })
    const address = response.results[0].formatted_address
    const { lat, lng } = response.results[0].geometry.location
    const { place_id } = response.results[0]
    const newLocation = address.substring(0, address.indexOf(','))
    setValue(newLocation)
    setDetails({
      destination: { latitude: lat, longitude: lng },
      placeId: place_id,
      address: newLocation
    })
    setIsLoading(false)
  }

  const handleOnSubmit = () => {
    dispatch({
      type: LOCATION,
      payload: {
        details
      }
    })
    navigate('Transport')
  }

  return (
    <View style={styles.screen}>
      <MapView
        style={{ flex: 1 }}
        loadingBackgroundColor={Theme.COLORS.colorMainDark}
        loadingIndicatorColor={Theme.COLORS.colorSecondary}
        showsUserLocation
        loadingEnabled
        initialRegion={region}
        onRegionChangeComplete={handleOnRegionChange}
        showsCompass={false}
        showsMyLocationButton={false}
        ref={mapView}
      />
      <View style={styles.containerInput}>
        <InputControl
          value={value}
          placeholder={isLoading ? 'Cargando...' : 'Resultado...'}
          placeholderTextColor={Theme.COLORS.colorParagraphSecondary}
          stylesInput={styles.stylesInput}
        />
      </View>
      <View style={styles.markerFixed}>
        <FontAwesomeIcons
          name='map-pin'
          size={40}
          color={Theme.COLORS.colorMainAlt}
          style={styles.marker}
        />
      </View>
      <SafeAreaView style={styles.footer}>
        <IconButton
          message='LISTO, FIJAR!'
          isActiveIcon
          stylesButton={styles.button}
          onPress={handleOnSubmit}
        />
      </SafeAreaView>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1
  },
  markerFixed: {
    left: '50%',
    marginLeft: -24,
    marginTop: -48,
    position: 'absolute',
    top: '50%'
  },
  footer: {
    bottom: 28,
    position: 'absolute',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    borderRadius: 100,
    paddingHorizontal: 20,
    height: 50,
    backgroundColor: Theme.COLORS.colorMainAlt,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width: 320,
    borderBottomColor: Theme.COLORS.colorSecondary,
    borderBottomWidth: 0.3
  },
  containerInput: {
    position: 'absolute',
    top: 40,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20
  },
  stylesInput: {
    backgroundColor: Theme.COLORS.colorMainDark,
    borderRadius: 200,
    paddingLeft: 25,
    paddingRight: 50,
    paddingVertical: 8,
    borderWidth: 0.3,
    borderColor: Theme.COLORS.colorSecondary,
    fontFamily: 'Lato-Regular',
    fontSize: Theme.SIZES.small,
    color: Theme.COLORS.colorParagraph
  }
})

export default FixedMapScreen
