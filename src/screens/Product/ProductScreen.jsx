import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TextInput
} from 'react-native'
// import { useSelector } from 'react-redux'
import NumericInput from '../../components/numericInput'
import _ from 'lodash'
// import NumericInput from 'react-native-numeric-input'

// Import components
import Background from '../../components/background/Background'
import Banner from '../../components/banner/Banner'
import Title from '../../components/title/Title'
import TextArea from '../../components/input/TextArea'
// import ButtonQuantity from '../../components/button/ButtonQuantity'
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
    productQuantity: 1,
    productAddQuantity: [],
    priceAdd: [],
    total: 0
  }

  componentWillMount() {
    console.disableYellowBox = true;
  }

  componentDidMount() {
    if (this.state.product.price) {
      this.setState({ total: this.state.product.price })
    }
  }

  /**Creacion de objeto para enviarlo a carro de compras */
  handleOnCart = () => {
    const { product, productQuantity, productAddQuantity } = this.state
    const { description, id, name, price } = product

    const products = {
      id,
      name,
      description,
      price,
      quantity: productQuantity,
      addOn: productAddQuantity,
    }

    console.log(products)

    // this.setState(
    //   {
    //     order: {
    //       product: this.state.product,
    //       commerce: this.state.commerce
    //     }
    //   }, () => {
    //     console.log(this.state.order)
    //   }
    // )

    // this.setState({ isVisible: !this.state.isVisible })
  }

  /**Renderizacion de pie de productos (cantidad, comentarios, agregar a carrito) */
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
        <NumericInput
          iconSize={10}
          iconStyle={{ fontSize: 12, borderRadius: 5, padding: 5, color: Theme.COLORS.colorSecondary }}
          inputStyle={{ fontSize: 14, color: Theme.COLORS.colorSecondary, backgroundColor: Theme.COLORS.colorMain }}
          valueType="real"
          minValue={1}
          initValue={1}
          maxValue={10}
          enabled={true}
          rounded
          borderColor={Theme.COLORS.colorSecondary}
          totalWidth={200}
          totalHeight={50}
          rightButtonBackgroundColor={Theme.COLORS.colorMain}
          leftButtonBackgroundColor={Theme.COLORS.colorMain}
          onChange={this.changeQuantity} />
      </View>

      <View style={styles.containerButton}>
        <IconButton
          message='AGREGAR ORDEN'
          isActiveIcon
          iconName='add'
          onPress={this.handleOnCart}
        />
      </View>
    </React.Fragment>
  )

  /**Algorito de checkboxs dinamicos */
  checkedAddOn = (index) => {
    const addOn = Object.assign(this.state.addOn)
    const priceAdd = Object.assign(this.state.priceAdd)
    let productAddQuantity = Object.assign(this.state.productAddQuantity)
    const { optionAddon } = this.state.product

    // Checkbox Toggle
    addOn[index] = !addOn[index]

    // Verficamos si el check esta en estado checked
    if (addOn[index]) {
      // almacenamos el precio del producto extra
      priceAdd[index] = optionAddon[index].extraPrice

      // Agregamos informacion detallada
      productAddQuantity[index] = {
        product: this.state.product.optionAddon[index],
        quantity: 1
      }
    } else {

      // Si no, formateamos la informacion a cero
      // Suprimimos el detalle del producto extra
      priceAdd[index] = 0
      productAddQuantity = productAddQuantity.slice(index - 1, index)
    }

    this.setState({ addOn, priceAdd, productAddQuantity })
  }

  /**Precio del producto por la cantidad */
  changeQuantity = (value) => {

    // Multimplicamos el precio del producto por la cantidad
    // Sumamos la cantidad del prodcuto
    this.setState({
      total: this.state.product.price * value,
      productQuantity: value
    })
  }

  /**Cambio de cantidad de extras, precio por cantidad */
  changeQuantityAddOn = (value, index, product) => {
    const priceAdd = Object.assign(this.state.priceAdd)
    const productAddQuantity = Object.assign(this.state.productAddQuantity)

    // Modificamos el precio total, multiplicamos el precio del producto por la cantidad 
    priceAdd[index] = this.state.product.optionAddon[index].extraPrice * value
    productAddQuantity[index] = {
      product,
      quantity: value
    }

    this.setState({ priceAdd })
  }

  /**Renderizacion de productos extras */
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
                iconStyle={{ fontSize: 12, borderRadius: 5, padding: 5, color: Theme.COLORS.colorSecondary }}
                inputStyle={{ fontSize: 14, color: Theme.COLORS.colorSecondary, backgroundColor: Theme.COLORS.colorMain }}
                valueType="real"
                initValue={1}
                minValue={1}
                maxValue={10}
                value={1}
                rounded
                totalWidth={120}
                totalHeight={25}
                borderColor={Theme.COLORS.colorSecondary}
                rightButtonBackgroundColor={Theme.COLORS.colorMain}
                leftButtonBackgroundColor={Theme.COLORS.colorMain}
                enabled={this.state.addOn[index]}
                onChange={value => this.changeQuantityAddOn(value, index, item)} />
            </View>
            {/* <Text allowFontScaling={false} style={styles.extraPrice}>
              +
              {
                this.state.priceAdd[index] ? this.state.priceAdd[index] : item.extraPrice
              }
            </Text> */}

            <Text allowFontScaling={false} style={styles.extraPrice}>+ {item.extraPrice}</Text>
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
              {/* <Text allowFontScaling={false} style={styles.price}>{this.state.product.price}</Text> */}
              <Text allowFontScaling={false} style={styles.price}>{this.state.total + _.sum(this.state.priceAdd)}</Text>
            </View>

            <View style={styles.layout}>
              <Text allowFontScaling={false} style={styles.description}>{this.state.product.description}</Text>
              <View style={{ paddingVertical: 10 }} />
              {this.state.product.optionAddon.length > 0 &&
                <Title title='Extras' styles={styles.title} />}
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
