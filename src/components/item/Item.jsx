import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native'

// Import image
import Logo from '../../../assets/images/img-logo-alycoin.png'

// Import component
import Icon from '../icon/Icon'
import Picture from '../picture/Picture'

// Import theme
import { Theme } from '../../constants/Theme'

const Item = (props) => {
  const handleOnPress = () => {
    props.setActive(props.id)
  }

  return (
    <TouchableOpacity
      onPress={props.onPress || handleOnPress}
      style={[props.styles || styles.container, {
        backgroundColor: props.classActive
      }]}
    >
      <View style={styles.left}>
        {props.icon ? (
          <Icon
            iconName={props.icon}
            iconSize={props.iconSize || 28}
            styles={styles.icon}
          />
        ) : (
          <Picture
            source={props.source}
            styles={styles.logo}
          />
        )}
        <View style={styles.content}>
          <Text allowFontScaling={false} style={styles.name}>{props.name}</Text>
          {props.description ? (
            <Text allowFontScaling={false} style={styles.description}>{props.description}</Text>
          ) : null}
        </View>
      </View>
      <Icon
        iconName={props.iconNameCheck || 'chevron-right'}
        iconSize={30}
      />
    </TouchableOpacity>
  )
}

Item.defaultProps = {
  source: Logo
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 15
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  icon: {
    marginRight: 20
  },
  name: {
    fontFamily: 'Lato-Regular',
    color: '#fff',
    fontSize: Theme.SIZES.small
  },
  logo: {
    height: 30,
    width: 30,
    resizeMode: 'contain',
    marginRight: 20
  },
  description: {
    fontFamily: 'Lato-Regular',
    color: Theme.COLORS.colorParagraphSecondary,
    fontSize: Theme.SIZES.xsamll,
    paddingVertical: 5
  }
})

export default Item
