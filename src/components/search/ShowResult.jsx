import React from 'react'
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity
} from 'react-native'

import Fontisto from 'react-native-vector-icons/Fontisto'

// Import theme
import { Theme } from '../../constants/Theme'

const ShowResult = props => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={props.onPress}
    >
      <Fontisto
        name='clock'
        color={Theme.COLORS.colorSecondaryAlt}
        size={30}
      />

      <View style={styles.containerText}>
        <Text allowFontScaling={false} style={styles.title}>{props.title}</Text>
        <View style={{ paddingVertical: 2 }} />
        <Text allowFontScaling={false} style={styles.description}>{props.description}</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
    flexDirection: 'row'
  },
  title: {
    color: Theme.COLORS.colorSecondary,
    fontFamily: 'Lato-Bold',
    fontSize: 15
  },
  description: {
    color: Theme.COLORS.colorParagraphSecondary,
    fontFamily: 'Lato-Bold',
    fontSize: 12
  },
  containerText: {
    marginLeft: 15
  }
})

export default ShowResult
