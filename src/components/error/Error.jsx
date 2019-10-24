import React from 'react'
import {
  View,
  Text,
  StyleSheet
} from 'react-native'

// Import theme
import { Theme } from '../../constants/Theme'

// Import components
import Picture from '../../components/picture/Picture'
import Title from '../../components/title/Title'

// Import image
import image from '../../../assets/images/img-alyskiper-warning.png'

const Error = props => {
  return (
    <View style={styles.container}>
      <Picture
        source={image}
        styles={styles.image}
      />
      <View style={{ paddingVertical: 10 }} />
      <Title
        title={props.title}
        styles={styles.title}
        stylesContainer={{}}
      />
      <View style={{ paddingVertical: 5 }} />
      <Text style={styles.message}>{props.message}</Text>

      {props.children}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Theme.COLORS.colorMainAlt,
    paddingHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
  image: {
    width: 100,
    height: 100
  },
  title: {
    fontFamily: 'Lato-Bold',
    color: Theme.COLORS.colorParagraph,
    fontSize: Theme.SIZES.subTitle
  },
  message: {
    fontFamily: 'Lato-Bold',
    color: Theme.COLORS.colorParagraphSecondary,
    fontSize: Theme.SIZES.small,
    textAlign: 'center'
  }
})

export default Error
