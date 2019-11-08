import React from 'react'
import {
  View,
  StyleSheet
} from 'react-native'

// Import components
import Background from '../../components/background/Background'
import Item from '../../components/item/Item'

const PaymentMethodScreen = props => {
  const { navigate } = props.navigation
  return (
    <Background>
      <View style={styles.screen}>
        <Item
          onPress={() => navigate('CryptoWallet')}
          icon=''
          name='CRIPTOMONEDA'
          description='Registro de tu wallet'
        />
        <Item
          onPress={() => navigate('CreditCard')}
          icon='credit-card'
          name='TARJETA BANCARIA'
          description='Retiro automatico de tu cuenta'
        />
      </View>
    </Background>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,.5)'
  }
})

export default PaymentMethodScreen
