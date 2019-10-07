import React from 'react'
import {
  TouchableOpacity
} from 'react-native'

// Import components
import Icon from '../icon/Icon'

const Button = props => {
  return (
    <TouchableOpacity
      style={props.stylesButton}
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

export default Button
