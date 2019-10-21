import React, { useState } from 'react'
import {
  StyleSheet,
  View,
  Text,
  ScrollView
} from 'react-native'

// Import components
import Background from '../../components/background/Background'
import Banner from '../../components/banner/Banner'
import Title from '../../components/title/Title'
import CheckBox from 'react-native-check-box'

// Import theme
import { Theme } from '../../constants/Theme'

const ProductScreen = props => {
  const [commerce] = useState(props.navigation.getParam('commerce'))
  const [checked, setChecked] = useState(false)

  return (
    <Background>
      <View style={styles.screen}>
        <ScrollView
          keyboardShouldPersistTaps='always'
        >
          <Banner
            sourceLogo={{}}
            sourceImage={{ uri: commerce.url_img_product }}
          />
          <View style={{ paddingVertical: 5 }} />
          <Title
            title={commerce.name}
          />
          <View style={styles.layout}>
            <Text style={styles.description}>{commerce.description}</Text>
            <View style={{ paddingVertical: 5 }} />
            {commerce.optionAddon.length > 0 &&
              <Title
                stylesContainer={{}}
                title='Extras'
                styles={styles.title}
              />}

            <View style={{ paddingVertical: 5 }} />
            {commerce.optionAddon.length > 0 &&
              commerce.optionAddon.map(item => (
                <View
                  style={styles.containerPrice}
                  key={item.id}
                >
                  <View style={{
                    flexDirection: 'row',
                    alignItems: 'center'
                  }}
                  >
                    <CheckBox
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'row'
                      }}
                      onClick={() => setChecked(!checked)}
                      isChecked={checked}
                      checkBoxColor={Theme.COLORS.colorSecondary}
                    />
                    <Text style={styles.nameStyle}>{item.name}</Text>
                  </View>
                  <Text style={styles.extraPrice}>+{item.extraPrice}</Text>
                </View>
              ))}
          </View>
        </ScrollView>
      </View>
    </Background>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,.5)'
  },
  layout: {
    paddingHorizontal: 10
  },
  description: {
    color: Theme.COLORS.colorParagraphSecondary
  },
  title: {
    color: Theme.COLORS.colorSecondary,
    fontFamily: 'Lato-Bold',
    fontSize: Theme.SIZES.subTitle
  },
  containerPrice: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row'
  },
  extraPrice: {
    color: Theme.COLORS.colorParagraphSecondary,
    fontFamily: 'Lato-Regular'
  },
  nameStyle: {
    color: Theme.COLORS.colorParagraph,
    fontFamily: 'Lato-Bold',
    paddingLeft: 8,
    fontSize: Theme.SIZES.normal
  }
})

export default ProductScreen
