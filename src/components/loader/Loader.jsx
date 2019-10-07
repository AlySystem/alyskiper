import React from 'react'
import {
  ActivityIndicator
} from 'react-native'

// Import theme
import { Theme } from '../../constants/Theme'

const Loader = props => {
  return (
    <ActivityIndicator
      color={props.color}
      size={props.size}
    />
  )
}

Loader.defaultProps = {
  color: Theme.COLORS.colorSecondary,
  size: 'large'
}

export default Loader
