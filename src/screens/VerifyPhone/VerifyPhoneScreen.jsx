import React, { useState } from 'react'
import {
  View,
  ScrollView,
  TextInput,
  StyleSheet
} from 'react-native'
import { showMessage } from 'react-native-flash-message'
import { useMutation } from '@apollo/react-hooks'

// Import components
import Background from '../../components/background/Background'
import Title from '../../components/title/Title'
import IconButton from '../../components/button/IconButton'
import Picture from '../../components/picture/Picture'
import SmsListener from 'react-native-android-sms-listener'

// Import theme
import { Theme } from '../../constants/Theme'

// Import mutations
import { VERIFYCODE } from '../../graphql/mutations/Mutations'

const VerifyPhoneScreen = props => {
  const { navigate } = props.navigation
  const [VerifyCode, { loading }] = useMutation(VERIFYCODE)
  const [code, setCode] = useState('')
  const [numberPhone] = useState(props.navigation.getParam('number'))

  SmsListener.addListener(message => {
    handleOnSubmit(message.body.split(' ')[message.body.split(' ').length - 1])
  })

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
      return
    }
    navigate('SignUp')
  }

  return (
    <Background>
      <View style={styles.screen}>
        <ScrollView
          keyboardShouldPersistTaps='always'
          contentContainerStyle={styles.scrollView}
        >
          <Picture />
          <Title
            title='INGRESE EL CODIGO'
            styles={styles.title}
          />
          <View>
            <TextInput
              value={code}
              style={{ color: Theme.COLORS.colorSecondary }}
              handleOnChange={value => setCode(value)}
              placeholder='codigo'
              placeholderTextColor={Theme.COLORS.colorParagraph}
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
  containerButton: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  scrollView: {
    flexGrow: 1
  },
  title: {
    color: Theme.COLORS.colorParagraph,
    fontSize: Theme.SIZES.normal,
    fontFamily: 'Lato-Bold'
  }
})

export default VerifyPhoneScreen
