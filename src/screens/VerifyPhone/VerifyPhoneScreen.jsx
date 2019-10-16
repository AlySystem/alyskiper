import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  ScrollView,
  StyleSheet
} from 'react-native'
import SmsListener from 'react-native-android-sms-listener'
import { showMessage } from 'react-native-flash-message'
import { useMutation } from '@apollo/react-hooks'
import { KeycodeInput } from 'react-native-keycode'

// Import components
import Background from '../../components/background/Background'
import Title from '../../components/title/Title'
import IconButton from '../../components/button/IconButton'
import Picture from '../../components/picture/Picture'

// Import image
import logo from '../../../assets/images/img-alyskiper.png'

// Import theme
import { Theme } from '../../constants/Theme'

// Import mutations
import { VERIFYCODE } from '../../graphql/mutations/Mutations'

const VerifyPhoneScreen = props => {
  const { navigate } = props.navigation
  const [VerifyCode, { loading }] = useMutation(VERIFYCODE)
  const [code, setCode] = useState('')
  const [numberPhone] = useState(props.navigation.getParam('number'))

  const handleOnSubmit = async (codeVerify = code) => {
    const result = await VerifyCode({ variables: { verifycode: { phone_number: numberPhone, channel: 'sms', code: `${codeVerify}` } } })
    const { message } = result.data.verify_code

    if (message === 'Could not send verification code') {
      showMessage({
        message: 'Error',
        description: message,
        backgroundColor: 'red',
        color: '#fff',
        icon: 'danger',
        titleStyle: {
          fontFamily: 'Lato-Bold'
        },
        textStyle: {
          fontFamily: 'Lato-Regular'
        }
      })
    } else {
      navigate('SignUp')
    }
  }

  useEffect(() => {
    const subscription = SmsListener.addListener(message => {
      setCode(message.body.split(' ')[message.body.split(' ').length - 1])
      handleOnSubmit(message.body.split(' ')[message.body.split(' ').length - 1])
    })

    return () => {
      subscription.remove()
    }
  }, [handleOnSubmit])

  return (
    <Background>
      <View style={styles.screen}>
        <ScrollView
          keyboardShouldPersistTaps='always'
          contentContainerStyle={styles.scrollView}
        >
          <View style={styles.container}>
            <Picture
              source={logo}
            />
            <Title
              title='INGRESE EL CODIGO'
              styles={styles.title}
            />
            <Text style={styles.description}>Hemos enviado un codigo de verificación a tu numero de telefono.</Text>
            <View style={styles.containerMain}>
              <KeycodeInput
                length={6}
                textColor={Theme.COLORS.colorParagraph}
                tintColor={Theme.COLORS.colorSecondary}
                value={code}
                autoFocus
                numeric
                onChange={value => setCode(value)}
              />
            </View>
            <View style={styles.containerButton}>
              <IconButton
                isActiveIcon
                message='VERIFICAR'
                iconName='done'
                isLoading={loading}
                onPress={handleOnSubmit}
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
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20
  },
  containerMain: {
    marginVertical: 10
  },
  containerButton: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 20
  },
  scrollView: {
    flexGrow: 1
  },
  title: {
    color: Theme.COLORS.colorParagraph,
    fontSize: Theme.SIZES.normal,
    fontFamily: 'Lato-Bold'
  },
  description: {
    color: Theme.COLORS.colorParagraph,
    fontSize: Theme.SIZES.small,
    textAlign: 'center',
    fontFamily: 'Lato-Regular'
  }
})

export default VerifyPhoneScreen
