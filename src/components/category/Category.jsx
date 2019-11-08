import React from 'react'
import {
  TouchableOpacity,
  StyleSheet
} from 'react-native'

// Import theme
import { Theme } from '../../constants/Theme'

// Import components
import Title from '../title/Title'
import { LazyImage } from '../lazy/LazyImage'

// Import default image
import defaultImage from '../../../assets/images/img-background.png'

const Category = props => {
  const handleOnPress = () => {
    props.setActive(props.id)
    props.onPress()
  }

  return (
    <TouchableOpacity
      activeOpacity={props.activeOpacity}
      onPress={handleOnPress}
      style={props.styles || styles.container}
    >
      <LazyImage
        styleLazyImage={{
          width: 85,
          height: 85,
          resizeMode: 'cover',
          borderRadius: 200
        }}
        sourceLazy={require('../../../assets/images/img-lazy.png')}
        source={props.source}
        styleImage={{
          width: 85,
          height: 85,
          borderRadius: 200,
          resizeMode: 'cover',
          borderColor: props.classActive,
          borderWidth: 1
        }}
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
    paddingHorizontal: 10,
    alignItems: 'center'
  },
  title: {
    fontFamily: 'Lato-Bold',
    fontSize: Theme.SIZES.xsmall,
    color: Theme.COLORS.colorParagraph,
    textAlign: 'center'
  },
  image: {
    width: 85,
    height: 85,
    resizeMode: 'cover',
    borderRadius: 100
  }
})

export default Category
