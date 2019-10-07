import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native'

// Import theme
import { Theme } from '../../constants/Theme'

// Import components
// import Picture from '../Picture/Picture'

const Profile = (props) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={props.onPress}
    >
      <View style={styles.containerImage}>
        <Text style={styles.text}>IJ</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>Idsarth Juarez</Text>
        <Text style={styles.subtitle}>Idsarthdev19@gmail.com</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    borderBottomColor: Theme.COLORS.colorBorder,
    borderBottomWidth: 0.3,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingVertical: 20
  },
  content: {
    padding: 5,
    justifyContent: 'space-evenly',
    marginLeft: 8
  },
  text: {
    color: Theme.COLORS.colorParagraphSecondary,
    fontSize: Theme.SIZES.samll,
    fontFamily: 'Lato-Regular'
  },
  containerImage: {
    backgroundColor: 'yellow',
    width: 50,
    height: 50,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    color: Theme.COLORS.colorParagraph,
    fontSize: Theme.SIZES.normal,
    fontFamily: 'Lato-Bold'
  },
  subtitle: {
    color: Theme.COLORS.colorParagraphSecondary,
    fontSize: Theme.SIZES.xsmall,
    fontFamily: 'Lato-Regular',
    marginTop: 5
  }
})

export default Profile
