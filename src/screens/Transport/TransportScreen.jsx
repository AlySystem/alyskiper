import React, { useState, useRef, useEffect } from 'react'
import {
  View,
  StyleSheet,
  Dimensions
} from 'react-native'
import { useSelector } from 'react-redux'
import MapView, { Polyline, Marker } from 'react-native-maps'
import PubNubReact from 'pubnub-react'

// Import components
import Background from '../../components/background/Background'
import Search from '../../components/search/Search'
import Loader from '../../components/loader/Loader'
import Details from '../../components/details/Details'
import Button from '../../components/button/Button'

// Import containers
import ListOfCategoryServices from '../../containers/ListOfCategoryServices'

// Import image
import marker from '../../../assets/images/img-icon-alyskiper.png'

// Import theme
import { Theme } from '../../constants/Theme'

// Import utils
import { routeDirection } from '../../utils/Directions'
import { getPixelSize } from '../../utils/Pixel'

const { height, width } = Dimensions.get('window')

const TransportScreen = props => {
  const location = useSelector(state => state.location)
  const [numberUser, setNumberUser] = useState(0)
  const [users, setUsers] = useState(new Map())
  const [isLoading, setIsLoading] = useState(false)
  const [steps, setSteps] = useState(null)
  const [details, setDetails] = useState('')
  const [destination, setDestination] = useState(null)
  const mapView = useRef(null)

  const pubnub = new PubNubReact({
    publishKey: 'pub-c-1271b42f-b90f-402d-99a8-749d0d2a13a7',
    subscribeKey: 'sub-c-36cd6120-e9e6-11e9-bee7-82748ed6f7e5'
  })

  // useEffect(() => {
  //   const subscribe = () => {
  //     pubnub.addListener({
  //       status: function (statusEvent) {
  //         // console.log(statusEvent)
  //       },
  //       message: function (message) {

  //       },
  //       presence: function (presenceEvent) {
  //         console.log(presenceEvent)
  //         // const { state: { coords } } = presenceEvent.state
  //         // const uuid = presenceEvent.uuid
  //         // if (presenceEvent.action === 'timeout') {
  //         //   console.log(coords, uuid)
  //         // }
  //         // console.log(coords, uuid)
  //       }
  //     })
  //     pubnub.subscribe({
  //       channels: ['Driver'],
  //       withPresence: true
  //     })
  //   }

  //   subscribe()
  // }, [pubnub])

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
          region={location}
        >
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
                image={marker}
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
