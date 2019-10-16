import React from 'react'
import {
  TouchableOpacity,
  StyleSheet
} from 'react-native'

// Import components
import Icon from '../icon/Icon'

// Import theme
import { Theme } from '../../constants/Theme'

const FloatingActionButton = props => {
  return (
    <TouchableOpacity
      style={props.stylesButton || styles.button}
      onPress={props.onPress}
      activeOpacity={props.activeOpacity}
    >
      <Icon
        iconName={props.iconName}
        iconSize={props.iconSize}
        iconColor={props.iconColor}
        stylesIcon={props.stylesIcon}
      />
    </TouchableOpacity>
  )
}

FloatingActionButton.defaultProps = {
  iconName: 'arrow-forward',
  iconSize: 45
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: Theme.COLORS.colorMainAlt,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 20,
    bottom: 20,
    padding: 15,
    zIndex: 1000,
    borderRadius: 100
  }
})

export default FloatingActionButton
