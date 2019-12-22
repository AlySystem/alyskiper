import React from 'react'
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from 'react-native'

// Import icons
import iconMessage from '../../assets/images/img-icon-message.png'
import iconTransport from '../../assets/images/img-icon-transport.png'
import iconSkiper from '../../assets/images/img-alyskiper.png'
import Picture from '../components/picture/Picture'

// Import theme
import { Theme } from '../constants/Theme'

const items = [
  {
    key: 1,
    icon: iconMessage,
    title: 'Mensajeria',
    routeName: 'Message'
  },
  {
    key: 2,
    icon: '',
    image: iconSkiper,
    title: '',
    subTitle: 'Categorias',
    routeName: 'Category'
  },
  {
    key: 3,
    icon: iconTransport,
    title: 'Transporte',
    routeName: 'Transport'
  }
]

const ListOfServices = props => {

  const handleOnSelect = (item) => {
    return props.navigate(item)
  }

  return (
    <>
      <View style={styles.container}>
        {items.map(item => (
          <TouchableOpacity
            onPress={() => handleOnSelect(item.routeName)}
            key={item.key}
            style={styles.containerImage}
          >
            {item.icon ? (
              <Picture source={item.icon} styles={styles.image} />
            ) : (
                <Picture source={item.image} styles={styles.stylesImage} />
              )}
            <View style={{ paddingVertical: 5 }} />
            {item.title ? (
              <Text allowFontScaling={false} style={styles.title}>{item.title}</Text>
            ) : (
                <Text allowFontScaling={false} style={styles.stylesTitle}>{item.subTitle}</Text>
              )}
          </TouchableOpacity>
        ))}
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  containerImage: {
    alignItems: 'center'
  },
  image: {
    height: 60,
    width: 60
  },
  stylesImage: {
    height: 85,
    width: 85,
    marginTop: -10
  },
  title: {
    color: Theme.COLORS.colorParagraph,
    fontFamily: 'Lato-Regular',
    fontSize: Theme.SIZES.small
  },
  stylesTitle: {
    color: Theme.COLORS.colorParagraph,
    fontFamily: 'Lato-Regular',
    fontSize: Theme.SIZES.small,
    marginTop: -14
  }
})

export default ListOfServices
