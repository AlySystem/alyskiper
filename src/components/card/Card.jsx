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
      <Picture
        source={props.sourceImage}
        styles={props.stylesImage || styles.image}
      />
    </TouchableOpacity>
  )
}

Card.defaultProps = {
  sourceLogo: ,
  sourceImage: ,
  name: 'Undefined',
  description: 'Undefined'
}

const styles = StyleSheet.create({
  container: {

  },
  containerHeader: {

  },
  logo: {

  },
  containerTitle: {

  },
  name: {

  },
  description: {

  },
  image: {

  }
})

export default Card
