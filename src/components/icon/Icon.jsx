import React from 'react'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

// Import theme
import { Theme } from '../../constants/Theme'

const Icon = (props) => {
  return (
    <MaterialIcons
      style={props.styles}
      size={props.iconSize}
      color={props.iconColor}
      name={props.iconName}
      onPress={props.onPress}
    />
  )
}

Icon.defaultProps = {
  iconName: 'done',
  iconSize: 28,
  iconColor: Theme.COLORS.colorSecondary
}

export default Icon
