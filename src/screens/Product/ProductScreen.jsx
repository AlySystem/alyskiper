import React, { useState } from 'react'
import {
  StyleSheet,
  View,
  Text,
  ScrollView
} from 'react-native'
import CheckBox from 'react-native-check-box'

// Import components
import Background from '../../components/background/Background'
import Banner from '../../components/banner/Banner'
import Title from '../../components/title/Title'
import TextArea from '../../components/input/TextArea'
import ButtonQuantity from '../../components/button/ButtonQuantity'

// Import theme
import { Theme } from '../../constants/Theme'

const ProductScreen = props => {
  const [commerce] = useState(props.navigation.getParam('commerce'))
  const [checked, setChecked] = useState(false)
  const [value, setValue] = useState('')
  const [count, setCount] = useState(0)

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
            <View style={{ paddingVertical: 10 }} />
            {commerce.optionAddon.length > 0 &&
              <Title
                stylesContainer={{}}
                title='Extras'
                styles={styles.title}
              />}

            <View style={{ paddingVertical: 10 }} />
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
            {commerce.optionAddon.length > 0 && (
              <View style={{ paddingVertical: 10 }} />
            )}
            <TextArea
              onChangeText={(value) => setValue(value)}
              maxLength={120}
              value={value}
              placeholder='Agrega una nota a tu orden...'
              placeholderTextColor={Theme.COLORS.colorParagraph}
              stylesContainer={styles.textArea}
              stylesInput={styles.input}
            />
            <View style={{ paddingVertical: 5 }} />
            <View style={styles.containerQuantity}>
              <Title
                title='Escoge tu cantidad'
                styles={styles.smallTitle}
              />
              <ButtonQuantity
                count={count}
              />
            </View>
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
    color: Theme.COLORS.colorParagraph,
    fontFamily: 'Lato-Regular',
    fontSize: Theme.SIZES.small
  },
  nameStyle: {
    color: Theme.COLORS.colorParagraph,
    fontFamily: 'Lato-Bold',
    paddingLeft: 8,
    fontSize: Theme.SIZES.normal
  },
  textArea: {
    width: '100%',
    height: 90,
    position: 'relative',
    backgroundColor: Theme.COLORS.colorMainDark,
    borderRadius: 8,
    borderColor: Theme.COLORS.colorSecondary,
    borderWidth: 0.2,
    paddingHorizontal: 10
  },
  containerQuantity: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  input: {
    color: Theme.COLORS.colorSecondary
  },
  smallTitle: {
    fontFamily: 'Lato-Bold',
    fontSize: Theme.SIZES.small,
    color: Theme.COLORS.colorParagraph,
    marginBottom: 8
  }
})

export default ProductScreen
