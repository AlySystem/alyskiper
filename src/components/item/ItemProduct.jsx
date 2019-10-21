import React from 'react'
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from 'react-native'

// Import components
import Title from '../../components/title/Title'
import Picture from '../../components/picture/Picture'

// Import theme
import { Theme } from '../../constants/Theme'

const ItemProduct = props => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={styles.container}
    >
      <View style={styles.containerImage}>
        <Picture
          source={props.sourceImage}
          styles={styles.image}
        />
      </View>

      <View style={styles.containerText}>
        <Title
          stylesContainer={styles.containerName}
          title={props.name}
          styles={styles.name}
        />
        <View style={{ paddingVertical: 2 }} />
        <Text style={styles.description}>{props.description}</Text>
        <View style={{ paddingVertical: 2 }} />
        <Text style={styles.price}>${props.price}</Text>
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
