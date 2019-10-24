import React from 'react'
import {
  View,
  StyleSheet
} from 'react-native'
import * as Animatable from 'react-native-animatable'

// Import components
import Picture from '../picture/Picture'
import Button from '../button/Button'

// Import image
import Logo from '../../../assets/images/logo.png'

const Header = props => {
  return (
    <View style={props.stylesContainer || styles.container}>
      {props.isActiveImage && (
        <Animatable.View
          animation={props.animationImage}
          iterationCount={1}
        >
          <Picture
            source={Logo}
            styles={styles.image}
          />
        </Animatable.View>
      )}
      <Animatable.View
        animation={props.animationButton}
        iterationCount={1}
      >
        <Button
          stylesButton={styles.button}
          onPress={props.onPress}
          iconName={props.iconName || 'arrow-back'}
        />
      </Animatable.View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    paddingVertical: 12
  },
  image: {
    resizeMode: 'contain',
    width: 130,
    height: 40,
    marginHorizontal: 20
  },
  button: {
    marginLeft: 10
  }
})

export default Header
