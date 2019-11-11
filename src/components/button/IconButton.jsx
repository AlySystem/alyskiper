import React from 'react'
import {
  TouchableOpacity,
  Text,
  StyleSheet
} from 'react-native'

// Import theme
import { Theme } from '../../constants/Theme'

// Import components
import Icon from '../icon/Icon'
import Loader from '../loader/Loader'

const IconButton = (props) => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={props.stylesButton || styles.button}
      activeOpacity={props.activeOpacity}
    >
      {!(props.isLoading) ? (
        <>
          {props.isActiveIcon && (
            <Icon
              iconName={props.iconName}
              iconSize={props.iconSize}
              iconColor={props.iconColor}
              styles={props.stylesIcon}
            />
          )}
          <Text allowFontScaling={false} style={props.stylesMessage || styles.message}>{props.message}</Text>
        </>
      ) : (
        <Loader />
      )}
    </TouchableOpacity>
  )
}

IconButton.defaultProps = {
  styles: {
    marginRight: 8
  }
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 100,
    paddingHorizontal: 20,
    height: 55,
    backgroundColor: Theme.COLORS.colorMainAlt,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width: 250,
    borderBottomColor: Theme.COLORS.colorSecondary,
    borderBottomWidth: 0.3
  },
  message: {
    color: '#fff',
    fontSize: Theme.SIZES.xsamll,
    fontFamily: 'Lato-Bold',
    marginLeft: 8
  }
})

export default IconButton
