import React, { useState } from 'react'
import {
  View,
  Animated,
  Image
} from 'react-native'

export const LazyImage = props => {
  const [opacity] = useState(new Animated.Value(0))

  const onLoad = event => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 300
    }).start()
  }

  return (
    <View style={props.stylesContainer}>
      <Image
        {...props}
        style={props.styleLazyImage}
        source={props.sourceLazy}
      />
      <Animated.Image
        {...props}
        style={[
          props.styleImage,
          { position: 'absolute', opacity: opacity }
        ]}
        onLoad={onLoad}
      />
    </View>
  )
}
