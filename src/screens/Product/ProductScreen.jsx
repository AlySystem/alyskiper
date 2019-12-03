import React, { Component } from 'react'
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
import TextArea from '../../components/input/TextArea'
import ButtonQuantity from '../../components/button/ButtonQuantity'
import IconButton from '../../components/button/IconButton'
import CheckBox from '../../components/checkbox/CheckBox'
import Modal from '../../components/modal/Modal'
import OrderCheck from '../../components/orderCheck/OrderCheck'

// Import theme
import { Theme } from '../../constants/Theme'

class ProductScreen extends Component {
  state = {
    product: this.props.navigation.getParam('product'),
    commerce: this.props.navigation.getParam('commerce'),
    value: '',
    count: 0,
    addOn: [],
    order: {},
    isVisible: false,
  }

  handleOnCart = async  => {
    this.setState({ order: { product: this.state.product, commerce: this.state.commerce } })
    this.setState({ isVisible: !this.state.isVisible })
  }

  render() {
    return (
      <Background>
        {this.state.isVisible && (
          <Modal
            animationIn='zoomIn'
            backgroundColor={Theme.COLORS.colorMainAlt}
            opacity={1}
            isVisible={this.state.isVisible}
            style={{
              margin: 0
            }}
          >
            <OrderCheck
              setIsVisible={(e) => this.setState({ isVisible: e })}
              isVisible={this.state.isVisible}
              order={this.state.order}
              navigation={this.props.navigation}
            />
          </Modal>
        )}
        <View style={styles.screen}>
          <ScrollView keyboardShouldPersistTaps='always'>
            <Banner sourceImage={{ uri: this.state.product.url_img_product }} />
            <View style={{ paddingVertical: 5 }} />
            <View style={styles.containerMain}>
              <Title
                title={this.state.product.name}
                styles={{
                  fontFamily: 'Lato-Bold',
                  color: Theme.COLORS.colorParagraph,
                  fontSize: Theme.SIZES.normal
                }}
              />
              <Text allowFontScaling={false} style={styles.price}>{this.state.product.price}</Text>
            </View>
            <View style={styles.layout}>
              <Text allowFontScaling={false} style={styles.description}>{this.state.product.description}</Text>
              <View style={{ paddingVertical: 10 }} />
              {this.state.product.optionAddon.length > 0 &&
                <Title title='Extras' styles={styles.title} />}
              <View style={{ paddingVertical: 10 }} />
              {this.state.product.optionAddon.length > 0 &&
                this.state.product.optionAddon.map((item, index) => (
                  <View style={styles.containerPrice} key={item.id}>
                    <CheckBox
                      checked={this.state.addOn[index]}
                      name={item.name}
                      handleCheck={() => {
                        const addOn = Object.assign(this.state.addOn)
                        addOn[index] = !addOn[index]
                        this.setState({ addOn })
                      }}
                    />
                    <Text allowFontScaling={false} style={styles.extraPrice}>+{item.extraPrice}</Text>
                  </View>
                ))}
              {this.state.product.optionAddon.length > 0 && (
                <View style={{ paddingVertical: 10 }} />
              )}
              <TextArea
                onChangeText={(value) => this.setState({ value })}
                maxLength={120}
                value={this.state.value}
                placeholder='Agrega una nota a tu orden...'
                placeholderTextColor={Theme.COLORS.colorParagraph}
                stylesContainer={styles.textArea}
                stylesInput={styles.input}
              />
              <View style={{ paddingVertical: 5 }} />
              <View style={styles.containerQuantity}>
                <Title title='Escoge tu cantidad' styles={styles.smallTitle} />
                <ButtonQuantity count={this.state.count}/>
              </View>

              <View style={styles.containerButton}>
                <IconButton
                  message='AGREGAR ORDEN'
                  isActiveIcon
                  iconName='add'
                  onPress={this.handleOnCart}
                />
              </View>
            </View>
          </ScrollView>
        </View>
      </Background>
    )
  }
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
