import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native'
import FastImage from 'react-native-fast-image'

// Import theme
import { Theme } from '../../constants/Theme'

const Profile = (props) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={props.activeOpacity}
        style={styles.containerMain}
        onPress={props.onPress}
      >
        {props.avatarInitial && (
          <View style={styles.image}>
            <Text allowFontScaling={false} style={styles.textAvatar}>{props.avatarInitial}</Text>
          </View>
        )}

        {props.sourceImage && (
          <FastImage
            style={styles.image}
            source={{ uri: props.sourceImage }}
            resizeMode={FastImage.resizeMode.cover}
          />
        )}

        <View style={styles.containerText}>
          <Text allowFontScaling={false} style={styles.user}>{props.username}</Text>
          <View style={{ paddingVertical: 2 }} />
          <Text allowFontScaling={false} style={styles.email}>{props.email}</Text>
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
  textAvatar: {
    color: Theme.COLORS.colorMainAlt,
    fontFamily: 'Lato-Bold',
    fontSize: Theme.SIZES.title
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
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default Profile
