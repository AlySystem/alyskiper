import React, { useState } from 'react'
import {
  StyleSheet,
  View,
  Text,
  ScrollView
} from 'react-native'
import { useSelector } from 'react-redux'

// Import components
import Background from '../../components/background/Background'
import Banner from '../../components/banner/Banner'
import Title from '../../components/title/Title'
import TextArea from '../../components/input/TextArea'
import ButtonQuantity from '../../components/button/ButtonQuantity'
import IconButton from '../../components/button/IconButton'
import CheckBox from '../../components/checkbox/CheckBox'
import Modal from '../../components/modal/Modal'

// Import theme
import { Theme } from '../../constants/Theme'
import OrderCheck from '../../components/orderCheck/OrderCheck'

const ProductScreen = props => {
  const userData = useSelector(state => state.user)
  const [product] = useState(props.navigation.getParam('product'))
  const [commerce] = useState(props.navigation.getParam('commerce'))
  const [checked, setChecked] = useState()
  const [value, setValue] = useState('')
  const [count] = useState(0)
  const [totalPrice, setTotalPrice] = useState(0)
  const [address, setAddress] = useState('')

  const [isVisible, setIsVisible] = useState(false)

  const handleOnSubmit = async (product) => {
    console.log(product)
    console.log(commerce)
    // setIsVisible(true)
  }

  return (
    <Background>
      {isVisible && (
        <Modal
          animationIn='zoomIn'
          backgroundColor={Theme.COLORS.colorMainAlt}
          opacity={1}
          style={{
            margin: 0
          }}

          isVisible={isVisible}
        >
          <OrderCheck
            setIsVisible={setIsVisible}
            isVisible={isVisible}
          />
        </Modal>
      )}
      <View style={styles.screen}>
        <ScrollView
          keyboardShouldPersistTaps='always'
        >
          <Banner
            sourceImage={{ uri: product.url_img_product }}
          />
          <View style={{ paddingVertical: 5 }} />
          <View style={styles.containerMain}>
            <Title
              title={product.name}
              styles={{
                fontFamily: 'Lato-Bold',
                color: Theme.COLORS.colorParagraph,
                fontSize: Theme.SIZES.normal
              }}
            />
            <Text allowFontScaling={false} style={styles.price}>{product.price}</Text>
          </View>
          <View style={styles.layout}>
            <Text allowFontScaling={false} style={styles.description}>{product.description}</Text>
            <View style={{ paddingVertical: 10 }} />
            {product.optionAddon.length > 0 &&
              <Title
                stylesContainer={{}}
                title='Extras'
                styles={styles.title}
              />}
            <View style={{ paddingVertical: 10 }} />
            {product.optionAddon.length > 0 &&
              product.optionAddon.map(item => (
                <View
                  style={styles.containerPrice}
                  key={item.id}
                >
                  <CheckBox
                    name={item.name}
                    handleCheck={() => console.log(item.id, item.name, item.extraPrice)}
                  />
                  <Text allowFontScaling={false} style={styles.extraPrice}>+{item.extraPrice}</Text>
                </View>
              ))}
            {product.optionAddon.length > 0 && (
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
                message='AGREGAR ORDEN'
                isActiveIcon
                iconName='add'
                onPress={() => handleOnSubmit(product)}
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
