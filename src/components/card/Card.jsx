import React from 'react'

import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet
} from 'react-native'

// Import components
import Picture from '../picture/Picture'

// Import default images
import logo from '../../../assets/images/img-logo-alycoin.png'
import image from '../../../assets/images/img-background-alt.png'

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
        <Picture
          source={props.sourceLogo}
          styles={props.stylesLogo || styles.logo}
        />
        <View style={props.stylesContainerTitle || styles.containerTitle}>
          <Text style={props.stylesName || styles.name}>{props.name}</Text>
          <Text style={props.stylesDescription || styles.description}>{props.description}</Text>
        </View>
      </View>
      <View style={{ paddingVertical: 2 }} />
      <Picture
        source={props.sourceImage}
        styles={props.stylesImage || styles.image}
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
    paddingVertical: 5,
    alignItems: 'center'
  },
  logo: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
    marginRight: 15
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
  },
  image: {
    width: '100%',
    maxWidth: 420,
    height: 260,
    borderRadius: 10
  }
})

export default Card
