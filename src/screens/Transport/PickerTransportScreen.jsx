import React, { useRef, useState } from 'react'
import {
  View,
  StyleSheet,
  SafeAreaView
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import Geocoder from 'react-native-geocoding'
import { useDispatch } from 'react-redux'

// Import actions types
import { DIRECTION } from '../../store/actionTypes'

// Import components
import { Map } from '../../components/map/MapView'
import IconButton from '../../components/button/IconButton'
import InputControl from '../../components/input/InputControl'

// Import utils
import { keys } from '../../utils/keys'

// Import hooks
import { useLocation } from '../../hooks/useLocation'

// Import theme
import { Theme } from '../../constants/Theme'

Geocoder.init(`${keys.googleMaps.apiKey}`)
const PickerTransportScreen = props => {
  const { navigate } = props.navigation
  const { location } = useLocation()
  const dispatch = useDispatch()
  const [changeLocation, setChangeLocation] = useState(null)
  const [value, setValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [details, setDetails] = useState({})
  const mapView = useRef(null)

  const onLocationChange = async location => {
    setChangeLocation(location)
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
      type: DIRECTION,
      payload: {
        directions: {
          placeId: details.placeId,
          address: details.address
        }
      }
    })
    navigate('Transport')
  }

  return (
    <View style={styles.screen}>
      {location.latitude && (
        <Map
          location={changeLocation || location}
          changeLocation={changeLocation}
          mapView={mapView}
          onLocationChange={onLocationChange}
        >
          <View style={styles.marker}>
            <Icon name='map-pin' color={Theme.COLORS.colorSecondary} size={40} />
          </View>
        </Map>
      )}
      <View style={styles.containerInput}>
        <InputControl
          value={value}
          placeholder={isLoading ? 'Cargando...' : 'Resultado...'}
          placeholderTextColor={Theme.COLORS.colorParagraphSecondary}
          stylesInput={styles.stylesInput}
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
  marker: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    marginTop: -48,
    marginLeft: -14,
    justifyContent: 'center',
    alignItems: 'center'
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
  },
  footer: {
    bottom: 28,
    paddingHorizontal: 20,
    position: 'absolute',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  button: {
    borderRadius: 100,
    paddingHorizontal: 20,
    height: 50,
    backgroundColor: Theme.COLORS.colorMainAlt,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width: 200,
    borderBottomColor: Theme.COLORS.colorSecondary,
    borderBottomWidth: 0.3
  }
})

export default PickerTransportScreen
