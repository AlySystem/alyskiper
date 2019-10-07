import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native'
import { withNavigation } from 'react-navigation'

// Import image
import Logo from '../../../assets/images/img-logo-alycoin.png'

// Import component
import Icon from '../Icon/Icon'
import Picture from '../Picture/Picture'

// Import theme
import { Theme } from '../../constants/Theme'

const Item = (props) => {
  const { navigate } = props.navigation

  return (
    <TouchableOpacity
      onPress={() => navigate(props.routeName)}
      style={props.styles || styles.container}
    >
      <View style={styles.left}>
        {props.icon ? (
          <Icon
            iconName={props.icon}
            iconSize={28}
            styles={styles.icon}
          />
        ) : (
          <Picture
            source={props.source}
            styles={styles.logo}
          />
        )}
        <View style={styles.content}>
          <Text style={styles.name}>{props.name}</Text>
          {props.description ? (
            <Text style={styles.description}>{props.description}</Text>
          ) : null}
        </View>
      </View>
      <Icon
        iconName='chevron-right'
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
    paddingLeft: 20,
    paddingRight: 10,
    paddingVertical: 15
  },
  content: {},
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

export default withNavigation(Item)
