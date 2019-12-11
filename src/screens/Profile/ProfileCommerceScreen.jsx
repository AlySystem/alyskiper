import React, { useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  ScrollView
} from 'react-native'

// Import components
import Background from '../../components/background/Background'
import Banner from '../../components/banner/Banner'
import ItemProduct from '../../components/item/ItemProduct'

// Import theme
import { Theme } from '../../constants/Theme'

const ProfileCommerceScreen = props => {
  const { navigate } = props.navigation
  const [commerce] = useState(props.navigation.getParam('commerce'))

  return (
    <Background>
      <View style={styles.screen}>
        <ScrollView
          keyboardShouldPersistTaps='always'
        >
          <Banner
            sourceLogo={{ uri: commerce.url_logo }}
            sourceImage={{ uri: commerce.url_art }}
          />
          <View style={{ paddingVertical: 8 }} />
          <View style={styles.container}>
            <Text allowFontScaling={false} style={styles.name}>{commerce.namecommerce}</Text>
            <Text allowFontScaling={false} style={styles.description}>{commerce.address}</Text>
          </View>
          <View style={{ paddingVertical: 8 }} />

          {commerce.skiperCatProductsCommerce.map(catProduct => (
            <View
              key={catProduct.id}
              style={styles.containerProduct}
            >
              <Text allowFontScaling={false} style={styles.title}>{catProduct.name}</Text>
              {catProduct.skiperProductCommerce.map(product => (
                <ItemProduct
                  key={product.id}
                  sourceImage={{ uri: product.url_img_product }}
                  name={product.name}
                  description={product.description}
                  price={product.price}
                  onPress={() => navigate('Product', {
                    product,
                    commerce
                  })}
                />
              ))}
            </View>
          ))}
        </ScrollView>
      </View>
    </Background>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,.7)'
  },
  container: {
    paddingHorizontal: 10
  },
  containerProduct: {
    paddingHorizontal: 10
  },
  name: {
    color: Theme.COLORS.colorParagraph,
    fontSize: Theme.SIZES.subTitle,
    fontFamily: 'Lato-Bold'
  },
  description: {
    color: Theme.COLORS.colorParagraphSecondary,
    fontSize: Theme.SIZES.small,
    fontFamily: 'Lato-Regular',
    paddingVertical: 5
  },
  title: {
    color: Theme.COLORS.colorSecondary,
    fontSize: Theme.SIZES.subTitle,
    fontFamily: 'Lato-Bold',
    marginVertical: 10
  }
})

export default ProfileCommerceScreen
