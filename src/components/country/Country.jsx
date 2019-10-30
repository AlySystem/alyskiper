import React from 'react'
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from 'react-native'

// Import theme
import { Theme } from '../../constants/Theme'

// Import components
import Picture from '../picture/Picture'

const Country = props => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={props.onPress}
    >
      <View style={styles.containerMain}>
        <Picture
          styles={styles.image}
          source={{ uri: props.flag }}
        />
        <Text allowFontScaling={false} style={styles.name}>{props.name}</Text>
      </View>
      <Text allowFontScaling={false} style={styles.phoneCode}>+{props.phonecode}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10
  },
  containerMain: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    width: 30,
    height: 20
  },
  name: {
    color: Theme.COLORS.colorParagraph,
    paddingLeft: 15,
    fontSize: 12
  },
  phoneCode: {
    color: Theme.COLORS.colorParagraph
  }
})

export default Country
