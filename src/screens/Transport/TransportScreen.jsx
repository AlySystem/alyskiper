import React, { useState, useEffect, useRef } from 'react'
import {
  View,
  StyleSheet,
  SafeAreaView,
  Dimensions
} from 'react-native'
import MapView, { AnimatedRegion } from 'react-native-maps'

// Import components
import Background from '../../components/background/Background'
import Search from '../../components/search/Search'

// Import hoooks
import { useLocation } from '../../hooks/useLocation'

// Import theme
import { Theme } from '../../constants/Theme'

const { height, width } = Dimensions.get('window')

const TransportScreen = props => {
  const { region, error } = useLocation()
  const [isLoading, setIsLoading] = useState(false)
  const [destination, setDestination] = useState(null)
  const mapView = useRef(null)

  const handleDetails = (placeId, details) => {
    console.log(placeId, details)
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
          region={region}
        />
        <View style={styles.containerInput}>
          <Search
            handleDetails={handleDetails}
            origen={region}
            stylesInput={styles.input}
            containerPredictions={styles.containerPredictions}
          />
        </View>
      </View>
    </Background>
  )
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: 'rgba(0,0,0,.5)',
    flex: 1
  },
  containerPredictions: {
    backgroundColor: Theme.COLORS.colorMainAlt,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 8,
    position: 'relative',
    top: 2
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
