import React from 'react'
import {
  View
} from 'react-native'
import FastImage from 'react-native-fast-image'

export const LazyImage = props => {
  return (
    <View style={props.stylesContainer}>
      <FastImage
        {...props}
        style={props.styleLazyImage}
        source={props.sourceLazy}
        resizeMode={FastImage.resizeMode.cover}
      />

      <FastImage
        {...props}
        style={[
          props.styleImage,
          { position: 'absolute', opacity: 1 }
        ]}
      />
    </View>
  )
}
