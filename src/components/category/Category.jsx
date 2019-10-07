import React from 'react'
import {
  TouchableOpacity,
  StyleSheet
} from 'react-native'

// Import theme
import { Theme } from '../../constants/Theme'

// Import components
import Picture from '../picture/Picture'
import Title from '../title/Title'

// Import default image
import defaultImage from '../../../assets/images/img-background-alt.png'

const Category = props => {
  return (
    <TouchableOpacity
      activeOpacity={props.activeOpacity}
      onPress={props.onPress}
      style={props.styles || styles.container}
    >
      <Picture
        source={props.source}
        styles={props.stylesImage || styles.image}
      />

      <Title
        styles={props.stylesTitle || styles.title}
        title={props.title}
      />

    </TouchableOpacity>
  )
}

Category.defaultProps = {
  source: defaultImage,
  title: 'undefined'
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10
  },
  title: {
    fontFamily: 'Lato-Bold',
    fontSize: Theme.SIZES.small,
    color: Theme.COLORS.colorParagraph
  },
  image: {
    width: 120,
    height: 120,
    resizeMode: 'cover'
  }
})

export default Category
