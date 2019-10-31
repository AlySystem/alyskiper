import React, { useState, useRef } from 'react'
import {
  View,
  StyleSheet,
  Dimensions,
  Image,
  Platform
} from 'react-native'
import { useSelector } from 'react-redux'
import MapView, { Polyline, Marker } from 'react-native-maps'
// import PubNubReact from 'pubnub-react'

// Import components
import Background from '../../components/background/Background'
import Search from '../../components/search/Search'
import Loader from '../../components/loader/Loader'
import Details from '../../components/details/Details'
import Button from '../../components/button/Button'

// Import utils
// import { keys } from '../../utils/keys'

// Import containers
import ListOfCategoryServices from '../../containers/ListOfCategoryServices'

// Import image
import markerImage from '../../../assets/images/img-icon-alyskiper.png'

// Import theme
import { Theme } from '../../constants/Theme'

// Import utils
import { routeDirection } from '../../utils/Directions'
import { getPixelSize } from '../../utils/Pixel'

const { height, width } = Dimensions.get('window')

const TransportScreen = props => {
  const location = useSelector(state => state.location)
  const [users, setUsers] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [steps, setSteps] = useState(null)
  const [details, setDetails] = useState('')
  const [destination, setDestination] = useState(null)
  const mapView = useRef(null)
  const marker = useRef(null)

  // const pubnub = new PubNubReact({
  //   publishKey: 'pub-c-1271b42f-b90f-402d-99a8-749d0d2a13a7',
  //   subscribeKey: 'sub-c-36cd6120-e9e6-11e9-bee7-82748ed6f7e5',
  //   subscribeRequestTimeout: 60000,
  //   presenceTimeout: 122
  // })

  // useEffect(() => {
  //   setUpApp()

  //   return () => {
  //     pubnub.unsubscribe({
  //       channels: [`${keys.channels.drivers}`]
  //     })
  //   }
  // }, [pubnub])

  // const setUpApp = async () => {
  //   driverCount()

  //   pubnub.subscribe({
  //     channels: [`${keys.channels.drivers}`],
  //     withPresence: true
  //   })
  //   pubnub.addListener({
  //     status: function (statusEvent) {

  //     },
  //     message: function (message) {

  //     },
  //     presence: function (presenceEvent) {

  //     }
  //   })
  // }

  // const driverCount = () => {
  //   pubnub.hereNow({
  //     includeUUIDs: true,
  //     includeState: true,
  //     channels: [`${keys.channels.drivers}`]
  //   },
  //   function (status, response) {
  //     const { occupants } = response.channels.Conductor
  //     const newArray = occupants.filter(item => item.state !== undefined)
  //     setUsers(newArray)
  //   })
  // }

  const handleDetails = async (placeId, details) => {
    setIsLoading(true)
    const { latitude, longitude } = location
    const { pointCoords, steps } = await routeDirection(placeId, latitude, longitude)

    setIsLoading(false)
    setDestination(pointCoords)
    setSteps(steps)
    setDetails({ title: details.main_text, description: details.description })
    mapView.current.fitToCoordinates(pointCoords, {
      edgePadding: {
        right: getPixelSize(50),
        left: getPixelSize(50),
        top: getPixelSize(50),
        bottom: getPixelSize(280)
      }
    })
  }

  return (
    <Background>
      <View style={styles.screen}>
        <MapView
          style={{ flex: 1 }}
          ref={mapView}
          showsUserLocation
          loadingEnabled
          loadingBackgroundColor={Theme.COLORS.colorMainAlt}
          loadingIndicatorColor={Theme.COLORS.colorSecondary}
          initialRegion={location}
        >
          {users &&
            users.map(item => (
              <Marker.Animated
                style={styles.marker}
                key={item.uuid}
                coordinate={{
                  latitude: item.state.coords.latitude,
                  longitude: item.state.coords.longitude
                }}
                ref={marker}
              >
                <Image
                  style={styles.profile}
                  source={markerImage}
                />
              </Marker.Animated>
            ))}

          {destination && (
            <>
              <Polyline
                coordinates={destination}
                strokeWidth={3}
                strokeColor={Theme.COLORS.colorMainAlt}
              />

              <Marker
                coordinate={destination[destination.length - 1]}
                anchor={{ x: 0, y: 0 }}
                image={markerImage}
              >
                <Details
                  title={details.title}
                />
              </Marker>
            </>
          )}
        </MapView>
        {destination ? (
          <>
            <Button
              onPress={() => setDestination(null)}
              iconName='arrow-back'
              iconSize={28}
              stylesButton={styles.buttonBack}
              iconColor={Theme.COLORS.colorMainAlt}
            />
            <ListOfCategoryServices
              navigation={props.navigation}
              steps={steps}
            />
          </>
        ) : isLoading ? (
          <View style={styles.containerLoader}>
            <Loader
              color={Theme.COLORS.colorMainAlt}
            />
          </View>
        ) : (
          <View style={styles.containerInput}>
            <Search
              handleDetails={handleDetails}
              origen={location}
              stylesInput={styles.input}
              containerPredictions={styles.containerPredictions}
            />
          </View>
        )}
      </View>
    </Background>
  )
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: 'rgba(0,0,0,.5)',
    flex: 1
  },
  containerLoader: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '50%'
  },
  containerPredictions: {
    backgroundColor: Theme.COLORS.colorMainAlt,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 8,
    position: 'relative',
    top: 2
  },
  buttonBack: {
    position: 'absolute',
    top: height * 0.03,
    left: width * 0.05
  },
  marker: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Platform.OS === 'android' ? 100 : 0
  },
  profile: {
    width: 40,
    height: 40
  },
  input: {
    backgroundColor: Theme.COLORS.colorMainDark,
    borderRadius: 8,
    paddingLeft: 55,
    paddingRight: 50,
    paddingVertical: 10,
    borderWidth: 0.3,
    borderColor: Theme.COLORS.colorSecondary,
    fontFamily: 'Lato-Regular',
    fontSize: Theme.SIZES.small,
    color: Theme.COLORS.colorParagraph
  },
  containerInput: {
    position: 'absolute',
    top: height * 0.05,
    width: '100%',
    paddingHorizontal: 15
  }
})

export default TransportScreen
