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
import Picture from '../picture/Picture'

const Profile = (props) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={props.activeOpacity}
        style={styles.containerMain}
        onPress={props.onPress}
      >
        <Picture
          source={props.source}
          styles={styles.image}
        />
        <View style={styles.containerText}>
          <Text style={styles.user}>{props.username}</Text>
          <View style={{ paddingVertical: 2 }} />
          <Text style={styles.email}>{props.email}</Text>
        </View>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 20,
    borderBottomColor: Theme.COLORS.colorSecondary,
    borderBottomWidth: 0.2,
    borderRadius: 100
  },
  containerMain: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  containerText: {
    paddingLeft: 20
  },
  user: {
    color: Theme.COLORS.colorParagraph,
    fontFamily: 'Lato-Bold',
    fontSize: Theme.SIZES.small
  },
  email: {
    color: Theme.COLORS.colorParagraph,
    fontFamily: 'Lato-Regular',
    fontSize: Theme.SIZES.xsmall
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 100,
    backgroundColor: Theme.COLORS.colorSecondary,
    borderColor: Theme.COLORS.colorSecondary,
    borderWidth: 1
  }
})

export default Profile
