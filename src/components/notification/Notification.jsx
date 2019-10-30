import React from 'react'
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from 'react-native'

// Import components
import Picture from '../picture/Picture'
import Title from '../title/Title'

// Import image
import logo from '../../../assets/images/launcher_icon.png'

// Import theme
import { Theme } from '../../constants/Theme'

const Notification = props => {
  return (
    <TouchableOpacity
      style={props.stylesContainer || styles.container}
      onPress={props.onPress}
      onLongPress={props.onLongPress}
    >
      <Picture
        source={logo}
        styles={styles.image}
      />
      <View style={styles.containerText}>
        <Title
          stylesContainer={{}}
          title='Tele pizza'
          styles={styles.title}
        />
        <View style={{ paddingVertical: 1 }} />
        <Text allowFontScaling={false} style={styles.description}>Su pizza fue aceptada.</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderBottomColor: Theme.COLORS.colorSecondary,
    borderBottomWidth: 0.2,
    borderRadius: 100
  },
  image: {
    width: 65,
    height: 65,
    borderRadius: 100
  },
  containerText: {
    paddingLeft: 10,
    paddingVertical: 8
  },
  title: {
    fontFamily: 'Lato-Bold',
    color: Theme.COLORS.colorParagraph,
    fontSize: Theme.SIZES.small
  },
  description: {
    fontFamily: 'Lato-Regular',
    color: Theme.COLORS.colorParagraphSecondary,
    fontSize: Theme.SIZES.xsmall
  }
})

export default Notification
