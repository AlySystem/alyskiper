import React, { useState } from 'react'
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  ScrollView
} from 'react-native'

// Import components
import Background from '../../components/background/Background'
import InputControl from '../../components/input/InputControl'
import IconButton from '../../components/button/IconButton'

// Import theme
import { Theme } from '../../constants/Theme'

const { height } = Dimensions.get('window')

const CryptoWalletScreen = props => {
  const [alycoin, setAlycoin] = useState('')
  const [bitcoin, setBitcoin] = useState('')
  const [litecoin, setLitecoin] = useState('')
  const [dash, setDash] = useState('')
  const [ethereum, setEthereum] = useState('')

  return (
    <Background>
      <View style={styles.screen}>
        <View style={{ marginVertical: 10 }} />
        <View style={styles.container}>
          <Text style={styles.title} allowFontScaling={false}>¡AGREGA TUS WALLETS!</Text>
          <View style={{ marginVertical: 2 }} />

          <Text style={styles.description}>Tranquilo, estaran seguras con nosotros.</Text>
          <View style={{ marginVertical: 20 }} />

          <ScrollView keyboardShouldPersistTaps='always'>
            <InputControl
              value={alycoin}
              setValue={setAlycoin}
              placeholder='Alycoin'
              placeholderTextColor={Theme.COLORS.colorParagraphSecondary}
              onChangeText={value => setAlycoin(value)}
              isActiveButton
              isActiveIcon
              iconName='account-balance-wallet'
              iconSize={25}
              iconColor={Theme.COLORS.colorSecondary}
              stylesInput={styles.stylesInput}
              stylesIcon={styles.stylesIcon}
            />

            <InputControl
              value={bitcoin}
              setValue={setBitcoin}
              placeholder='Bitcoin'
              placeholderTextColor={Theme.COLORS.colorParagraphSecondary}
              onChangeText={value => setBitcoin(value)}
              isActiveButton
              iconName='account-balance-wallet'
              isActiveIcon
              iconSize={25}
              iconColor={Theme.COLORS.colorSecondary}
              stylesInput={styles.stylesInput}
              stylesIcon={styles.stylesIcon}
            />

            <InputControl
              value={litecoin}
              setValue={setLitecoin}
              placeholder='Litecoin'
              placeholderTextColor={Theme.COLORS.colorParagraphSecondary}
              onChangeText={value => setLitecoin(value)}
              isActiveButton
              iconName='account-balance-wallet'
              isActiveIcon
              iconSize={25}
              iconColor={Theme.COLORS.colorSecondary}
              stylesInput={styles.stylesInput}
              stylesIcon={styles.stylesIcon}
            />

            <InputControl
              value={dash}
              setValue={setDash}
              placeholder='Dash'
              placeholderTextColor={Theme.COLORS.colorParagraphSecondary}
              onChangeText={value => setDash(value)}
              isActiveButton
              iconName='account-balance-wallet'
              isActiveIcon
              iconSize={25}
              iconColor={Theme.COLORS.colorSecondary}
              stylesInput={styles.stylesInput}
              stylesIcon={styles.stylesIcon}
            />

            <InputControl
              value={ethereum}
              setValue={setEthereum}
              placeholder='Ethereum'
              placeholderTextColor={Theme.COLORS.colorParagraphSecondary}
              onChangeText={value => setEthereum(value)}
              isActiveButton
              iconName='account-balance-wallet'
              isActiveIcon
              iconSize={25}
              iconColor={Theme.COLORS.colorSecondary}
              stylesInput={styles.stylesInput}
              stylesIcon={styles.stylesIcon}
            />
            <View style={styles.containerButton}>
              <IconButton
                message='GUARDAR'
                iconName='check'
                isLoading={false}
                isActiveIcon
              />
            </View>
          </ScrollView>
        </View>
      </View>
    </Background>
  )
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: 'rgba(0,0,0,.5)',
    flex: 1
  },
  container: {
    paddingHorizontal: 20
  },
  title: {
    fontFamily: 'Lato-Bold',
    fontSize: Theme.SIZES.normal,
    color: Theme.COLORS.colorParagraph
  },
  stylesInput: {
    backgroundColor: Theme.COLORS.colorMainDark,
    borderRadius: 100,
    paddingLeft: 50,
    paddingRight: 50,
    paddingVertical: 8,
    marginBottom: height * 0.04,
    borderWidth: 0.3,
    borderColor: Theme.COLORS.colorSecondary,
    fontFamily: 'Lato-Regular',
    fontSize: Theme.SIZES.small,
    color: Theme.COLORS.colorParagraph
  },
  stylesIcon: {
    position: 'absolute',
    top: 10,
    left: 15
  },
  description: {
    fontFamily: 'Lato-Regular',
    color: Theme.COLORS.colorParagraphSecondary,
    fontSize: Theme.SIZES.small
  },
  containerButton: {
    width: '100%',
    alignItems: 'center'
  }
})

export default CryptoWalletScreen
