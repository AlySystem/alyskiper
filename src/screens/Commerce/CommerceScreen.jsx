import React, { useEffect, useState } from 'react'
import {
  View,
  ScrollView,
  StyleSheet
} from 'react-native'
import Geolocation from 'react-native-geolocation-service'

// Import container
import ListOfPromotion from '../../containers/ListOfPromotion'
import ListOfCommerce from '../../containers/ListOfCommerce'

// Import components
import Background from '../../components/background/Background'

const CommerceScreen = props => {
  const [region, setRegion] = useState(null)

  let watchId

  useEffect(() => {
    watchId = Geolocation.watchPosition(
      async ({ coords: { latitude, longitude } }) => {
        setRegion({ latitude, longitude })
      },
      (error) => {
        console.log(error)
      },
      {
        timeout: 2000,
        enableHighAccuracy: true,
        maximumAge: 1000,
        distanceFilter: 100
      }
    )

    return () => {
      Geolocation.clearWatch(watchId)
    }
  }, [setRegion])

  return (
    <Background>
      <View style={styles.screen}>
        <ScrollView
          keyboardShouldPersistTaps='always'
        >
          <ListOfPromotion />
          <View style={{ paddingVertical: 10 }} />
          {region && (
            <ListOfCommerce
              navigation={props.navigation}
              region={region}
            />
          )}
        </ScrollView>
      </View>
    </Background>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,.5)'
  }
})

export default CommerceScreen
