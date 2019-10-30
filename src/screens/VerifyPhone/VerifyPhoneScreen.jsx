import React, { useState } from 'react'
import {
  View,
  Text,
  ScrollView,
  StyleSheet
} from 'react-native'
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
  const [numberPhone] = useState(props.navigation.getParam('number', ''))
  const [routeName] = useState(props.navigation.getParam('routeName', ''))
  const [id] = useState(props.navigation.getParam('id', ''))

  const handleOnSubmit = async () => {
    const result = await VerifyCode({ variables: { verifycode: { phone_number: numberPhone, channel: 'sms', code: `${code}` } } })
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
      navigate(routeName, {
        number: numberPhone,
        id: id
      })
    }
  }

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
            <Text allowFontScaling={false} style={styles.description}>Hemos enviado un codigo de verificación a tu numero de telefono.</Text>
            <View style={styles.containerMain}>
              <KeycodeInput
                length={6}
                textColor={Theme.COLORS.colorParagraph}
                tintColor={Theme.COLORS.colorSecondary}
                value={code}
                autoFocus
                numeric
                style={{

                }}
                onComplete={handleOnSubmit}
                onChange={value => setCode(value)}
              />
            </View>
            <View style={styles.containerButton}>
              <IconButton
                isActiveIcon
                message='VERIFICAR'
                iconName='done'
                stylesButton={styles.button}
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
    marginTop: 30
  },
  containerButton: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
    marginBottom: 20
  },
  scrollView: {
    flexGrow: 1
  },
  title: {
    color: Theme.COLORS.colorSecondary,
    fontSize: Theme.SIZES.normal,
    fontFamily: 'Lato-Bold'
  },
  description: {
    color: Theme.COLORS.colorParagraph,
    fontSize: Theme.SIZES.small,
    textAlign: 'center',
    fontFamily: 'Lato-Regular'
  },
  button: {
    borderRadius: 100,
    paddingHorizontal: 20,
    height: 57,
    backgroundColor: Theme.COLORS.colorMainAlt,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width: 180,
    borderBottomColor: Theme.COLORS.colorSecondary,
    borderBottomWidth: 0.3
  }
})

export default VerifyPhoneScreen
