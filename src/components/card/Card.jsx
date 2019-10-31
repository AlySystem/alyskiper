import React from 'react'
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet
} from 'react-native'

// Import components
import { LazyImage } from '../lazy/LazyImage'

// Import default images
import logo from '../../../assets/images/img-logo-alycoin.png'
import image from '../../../assets/images/img-background.png'

// Import theme
import { Theme } from '../../constants/Theme'

const Card = props => {
  return (
    <TouchableOpacity
      activeOpacity={props.activeOpacity}
      onPress={props.onPress}
      style={props.stylesContainer || styles.container}
    >
      <View style={props.stylesContainerHeader || styles.containerHeader}>
        <LazyImage
          styleLazyImage={{
            width: 40,
            height: 35,
            resizeMode: 'cover',
            marginRight: 15,
            borderRadius: 5
          }}
          sourceLazy={require('../../../assets/images/img-lazy.png')}
          source={props.sourceLogo}
          styleImage={{
            width: 40,
            height: 35,
            resizeMode: 'cover',
            marginRight: 15,
            borderRadius: 5
          }}
        />

        <View style={props.stylesContainerTitle || styles.containerTitle}>
          <Text allowFontScaling={false} style={props.stylesName || styles.name}>{props.name}</Text>
          <Text allowFontScaling={false} style={props.stylesDescription || styles.description}>{props.description}</Text>
        </View>
      </View>
      <View style={{ paddingVertical: 2 }} />
      <LazyImage
        styleLazyImage={{
          width: '100%',
          maxWidth: 420,
          height: 220,
          borderRadius: 12
        }}
        sourceLazy={require('../../../assets/images/img-lazy.png')}
        source={props.sourceImage}
        styleImage={{
          width: '100%',
          maxWidth: 420,
          height: 220,
          borderRadius: 10
        }}
      />
    </TouchableOpacity>
  )
}

Card.defaultProps = {
  sourceLogo: logo,
  sourceImage: image,
  name: 'Undefined',
  description: 'Undefined'
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    marginBottom: 20
  },
  containerHeader: {
    flexDirection: 'row',
    paddingVertical: 10,
    alignItems: 'center'
  },
  containerTitle: {
    justifyContent: 'space-between'
  },
  name: {
    color: Theme.COLORS.colorParagraph,
    fontFamily: 'Lato-Bold',
    fontSize: Theme.SIZES.small
  },
  description: {
    color: Theme.COLORS.colorParagraphSecondary,
    fontFamily: 'Lato-Regular',
    fontSize: Theme.SIZES.xsmall
  }
})

export default Card
