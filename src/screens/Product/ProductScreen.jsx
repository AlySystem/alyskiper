import React, { useState, useEffect, Component } from 'react'
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TextInput
} from 'react-native'
import { useSelector } from 'react-redux'
import NumericInput from '../../components/numericInput'

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

class ProductScreen extends Component {
  state = {
    product: this.props.navigation.getParam('product'),
    commerce: this.props.navigation.getParam('commerce'),
    value: '',
    count: 0,
    addOn: [],
    order: {},
    isVisible: false,
    priceAdd: [],
    total: 0
  }

  componentDidMount() {
    if (this.state.product.price) {
      this.setState({ total: this.state.product.price })
    }

    if (this.state.product.optionAddon) {
      const priceAdd = []

      this.state.product.optionAddon.map(
        ({ extraPrice }) => priceAdd.push(extraPrice)
      )

      this.setState({ priceAdd })
    }
  }

  handleOnCart = async (product) => {
    this.setState({ order: { product, commerce: this.state.commerce } })
    this.setState({ isVisible: !isVisible })
  }

  componentFooter = () => (
    <React.Fragment>
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
        <Title
          title='Escoge tu cantidad'
          styles={styles.smallTitle}
        />
        {/* <ButtonQuantity price={this.state.total} onChange={total => this.setState({ total })} /> */}
        <NumericInput textColor="#FFF" onChange={total => this.setState({ total })} />
      </View>

      <View style={styles.containerButton}>
        <IconButton
          message='AGREGAR ORDEN'
          isActiveIcon
          iconName='add'
          onPress={() => this.handleOnCart(product)}
        />
      </View>
    </React.Fragment>
  )

  checkedAddOn = (index) => {
    const addOn = Object.assign(this.state.addOn)
    const { optionAddon } = this.state.product
    let total = 0
    addOn[index] = !addOn[index]

    if (addOn[index]) {
      total = this.state.total + optionAddon[index].extraPrice
    } else {
      total = this.state.total - optionAddon[index].extraPrice
    }

    this.setState({ addOn, total })
  }

  changeQuantityAddOn = () => {

  }

  componentAddOn = () => (
    this.state.product.optionAddon.length > 0 &&
    this.state.product.optionAddon.map(
      (item, index) => (
        <View style={styles.containerPrice} key={item.id}>
          <CheckBox
            checked={this.state.addOn[index]}
            name={item.name}
            handleCheck={() => this.checkedAddOn(index)}
          />


          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ flexDirection: 'column', alignItems: 'center', marginRight: 10 }}>

              <NumericInput
                iconSize={10}
                iconStyle={{ fontSize: 12, borderRadius: 5, padding: 5 }}
                inputStyle={{ fontSize: 14, backgroundColor: '#FFF' }}
                valueType="real"
                minValue={1}
                rounded
                totalWidth={120}
                totalHeight={25}
                enabled={this.state.addOn[index]}
                onChange={value => console.log(value)} />
            </View>
            <Text allowFontScaling={false} style={styles.extraPrice}>+{item.extraPrice}</Text>
          </View>

        </View>
      )
    )
  )

  render() {
    return (
      <Background>
        {this.state.isVisible && (
          <Modal
            animationIn='zoomIn'
            backgroundColor={Theme.COLORS.colorMainAlt}
            opacity={1}
            style={{
              margin: 0
            }}
            isVisible={this.state.isVisible}
          >
            <OrderCheck
              setIsVisible={(e) => this.setState({ isVisible: e })}
              isVisible={this.state.isVisible}
              order={this.state.order}
              navigation={props.navigation}
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
              {/* <Text allowFontScaling={false} style={styles.price}>{this.state.product.price}</Text> */}
              <Text allowFontScaling={false} style={styles.price}>{this.state.total}</Text>
            </View>

            <View style={styles.layout}>
              <Text allowFontScaling={false} style={styles.description}>{this.state.product.description}</Text>
              <View style={{ paddingVertical: 10 }} />
              {this.state.product.optionAddon.length > 0 &&
                <Title
                  title='Extras'
                  styles={styles.title}
                />}
              <View style={{ paddingVertical: 10 }} />

              {
                this.componentAddOn()
              }

              {
                this.state.product.optionAddon.length > 0 &&
                <View style={{ paddingVertical: 10 }} />
              }

              {
                this.componentFooter()
              }

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
