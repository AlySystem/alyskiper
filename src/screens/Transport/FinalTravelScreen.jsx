import React from 'react'
import {
  View,
  StyleSheet,
  Text
} from 'react-native'
import { useSelector, useDispatch } from 'react-redux'

// Import components
import Background from '../../components/background/Background'
import { LazyImage } from '../../components/lazy/LazyImage'

const FinalTravelScreen = props => {
  const { drive } = useSelector(state => state.drive)
  console.log(drive)

  return (
    <Background>
      <View style={styles.screen}>
        <View style={styles.layout}>
          <Text allowFontScaling={false} style={styles.title}>Completado</Text>
          <LazyImage
            styleLazyImage={{
              width: 40,
              height: 40,
              resizeMode: 'cover',
              marginRight: 15,
              borderRadius: 200
            }}
            sourceLazy={require('../../../assets/images/img-lazy.png')}
            source={require('../../../assets/images/img-lazy.png')}
            styleImage={{
              width: 40,
              height: 40,
              resizeMode: 'cover',
              marginRight: 15,
              borderRadius: 200
            }}
          />
          <Text allowFontScaling={false} style={styles.driveName}>Nombre del drive</Text>
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
  layout: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    paddingHorizontal: 20
  }
})

export default FinalTravelScreen
