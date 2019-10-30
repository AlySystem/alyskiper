import React from 'react'
import {
  View,
  Text,
  StyleSheet
} from 'react-native'

// Import theme
import { Theme } from '../../constants/Theme'

// Import components
import Icon from '../icon/Icon'

const Details = props => {
  return (
    <View style={styles.container}>
      <Icon
        iconName='arrow-drop-up'
        iconColor={Theme.COLORS.colorMainAlt}
        iconSize={30}
        styles={styles.design}
      />
      <Text allowFontScaling={false} style={styles.title}>{props.title}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Theme.COLORS.colorMainAlt,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginTop: 35,
    position: 'relative'
  },
  title: {
    color: Theme.COLORS.colorParagraph,
    fontFamily: 'Lato-Bold',
    fontSize: 12
  },
  design: {
    position: 'absolute',
    top: -18,
    left: 2
  }
})

export default Details
