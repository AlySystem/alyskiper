import React, { useState } from 'react'
import {
  StyleSheet,
  View,
  Text,
  ScrollView
} from 'react-native'
// import moment from 'moment'
import CheckBox from 'react-native-check-box'
// import { useSelector } from 'react-redux'

// Import components
import Background from '../../components/background/Background'
import Banner from '../../components/banner/Banner'
import Title from '../../components/title/Title'
import TextArea from '../../components/input/TextArea'
import ButtonQuantity from '../../components/button/ButtonQuantity'
import IconButton from '../../components/button/IconButton'

// Import theme
import { Theme } from '../../constants/Theme'

const ProductScreen = props => {
  // const userData = useSelector(state => state.user)
  const [commerce] = useState(props.navigation.getParam('commerce'))
  const [checked, setChecked] = useState(false)
  const [value, setValue] = useState('')
  const [count] = useState(0)
  // const [totalPrice, setTotalPrice] = useState(0)
  // const [address, setAddress] = useState('')

  const handleOnSubmit = async (commerce) => {

  }

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
          <View style={styles.containerMain}>
            <Title
              title={commerce.name}
            />
            <Text style={styles.price}>{commerce.price}</Text>
          </View>
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

            <View style={styles.containerButton}>
              <IconButton
                message='GENERAR ORDEN'
                isActiveIcon
                onPress={() => handleOnSubmit(commerce)}
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
  price: {
    color: Theme.COLORS.colorSecondary,
    fontFamily: 'Lato-Bold',
    fontSize: Theme.SIZES.subTitle,
    paddingRight: 10
  },
  title: {
    color: Theme.COLORS.colorSecondary,
    fontFamily: 'Lato-Bold',
    fontSize: Theme.SIZES.subTitle
  },
  containerMain: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  containerPrice: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 25
  },
  containerButton: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 25,
    marginTop: 10
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
    fontSize: Theme.SIZES.small
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
