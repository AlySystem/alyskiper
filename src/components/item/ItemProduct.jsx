import React from 'react'
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from 'react-native'

// Import components
import Title from '../../components/title/Title'
import { LazyImage } from '../../components/lazy/LazyImage'

// Import theme
import { Theme } from '../../constants/Theme'

const ItemProduct = props => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={styles.container}
    >
      <View style={styles.containerImage}>
        <LazyImage
          styleLazyImage={{
            resizeMode: 'cover',
            width: 70,
            height: 70,
            borderRadius: 100
          }}
          sourceLazy={require('../../../assets/images/img-lazy.png')}
          source={props.sourceImage}
          styleImage={{
            resizeMode: 'cover',
            width: 70,
            height: 70,
            borderRadius: 100
          }}
        />

      </View>
      <View style={styles.containerText}>
        <Title
          stylesContainer={styles.containerName}
          title={props.name}
          styles={styles.name}
        />
        <View style={{ paddingVertical: 2 }} />
        <Text allowFontScaling={false} style={styles.description}>{props.description}</Text>
        <View style={{ paddingVertical: 2 }} />
        <Text allowFontScaling={false} style={styles.price}>${props.price}</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 100,
    marginBottom: 8,
    maxWidth: 500,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: Theme.COLORS.colorSecondary,
    borderBottomWidth: 0.3,
    borderRadius: 100
  },
  name: {
    color: Theme.COLORS.colorParagraph,
    fontFamily: 'Lato-Bold',
    fontSize: Theme.SIZES.small
  },
  containerImage: {
    width: '20%'
  },
  containerName: {
    paddingHorizontal: 0
  },
  image: {
    resizeMode: 'cover',
    width: 70,
    height: 70,
    borderRadius: 100
  },
  description: {
    color: Theme.COLORS.colorParagraphSecondary,
    fontFamily: 'Lato-Regular'
  },
  containerText: {
    width: '80%',
    height: '100%',
    paddingLeft: 10,
    justifyContent: 'center'
  },
  price: {
    color: Theme.COLORS.colorParagraph,
    fontFamily: 'Lato-Bold',
    fontSize: Theme.SIZES.small,
    alignSelf: 'flex-end'
  }
})

export default ItemProduct
