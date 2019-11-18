import React, { useState } from 'react'
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Dimensions
} from 'react-native'

// Import components
import { LazyImage } from '../lazy/LazyImage'
import Icon from '../icon/Icon'

// Import default images
import logo from '../../../assets/images/img-logo-alycoin.png'
import image from '../../../assets/images/img-background.png'

// Import theme
import { Theme } from '../../constants/Theme'

const { width } = Dimensions.get('window')

const Card = props => {
  const [icon, setIcon] = useState(false)

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
      <View style={styles.containerImage}>
        <Icon
          styles={styles.icon}
          iconName={props.icon ? 'favorite' : 'favorite-border'}
          iconSize={32}
          iconColor={Theme.COLORS.colorSecondary}
          onPress={props.onPressFavorite}
        />
        <View style={{
          backgroundColor: 'rgba(0,0,0,.1)',
          position: 'absolute',
          width: '100%',
          height: '100%',
          top: 0,
          left: 0,
          zIndex: 1
        }}
        />
        <LazyImage
          styleLazyImage={{
            width: '100%',
            height: width > 420 ? 280 : 210,
            borderRadius: 12,
            resizeMode: 'cover'
          }}
          sourceLazy={require('../../../assets/images/img-lazy.png')}
          source={props.sourceImage}
          styleImage={{
            width: '100%',
            height: width > 420 ? 280 : 210,
            borderRadius: 10,
            resizeMode: 'contain'
          }}
        />
      </View>
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
    justifyContent: 'space-between',
    flexWrap: 'wrap'
  },
  name: {
    color: Theme.COLORS.colorParagraph,
    fontFamily: 'Lato-Bold',
    fontSize: Theme.SIZES.small
  },
  description: {
    color: Theme.COLORS.colorParagraphSecondary,
    fontFamily: 'Lato-Regular',
    fontSize: Theme.SIZES.xsmall,
    flexWrap: 'wrap'
  },
  containerImage: {
    position: 'relative'
  },
  icon: {
    position: 'absolute',
    top: 8,
    right: 8,
    zIndex: 2
  }
})

export default Card
