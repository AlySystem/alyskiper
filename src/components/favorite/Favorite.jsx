import React from 'react'
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text
} from 'react-native'

// Import components
import { LazyImage } from '../lazy/LazyImage'

// Import theme
import { Theme } from '../../constants/Theme'

const Favorite = props => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={styles.container}
    >
      <View style={styles.containerContent}>
        <LazyImage
          styleLazyImage={{
            width: 30,
            height: 30,
            borderRadius: 200,
            resizeMode: 'cover'
          }}
          sourceLazy={require('../../../assets/images/img-lazy.png')}
          source={props.sourceLogo}
          styleImage={{
            width: 30,
            height: 30,
            borderRadius: 200,
            resizeMode: 'cover'
          }}
        />
        <Text adjustsFontSizeToFit={false} style={styles.name}>{props.name}</Text>
      </View>
      <LazyImage
        styleLazyImage={{
          width: '100%',
          height: 130,
          borderRadius: 12,
          resizeMode: 'cover'
        }}
        sourceLazy={require('../../../assets/images/img-lazy.png')}
        source={props.sourceImage}
        styleImage={{
          width: '100%',
          height: 130,
          borderRadius: 10,
          resizeMode: 'contain'
        }}
      />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    width: 200,
    marginHorizontal: 10
  },
  containerContent: {
    paddingVertical: 5,
    flexDirection: 'row',
    alignItems: 'center'
  },
  name: {
    fontFamily: 'Lato-Bold',
    color: Theme.COLORS.colorParagraph,
    fontSize: 12,
    marginLeft: 10
  }
})

export default Favorite
